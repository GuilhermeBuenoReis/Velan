<?php

namespace Tests\Feature\Appointment;

use App\Models\Appointment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AppointmentControllerTest extends TestCase
{
    use RefreshDatabase;

    private function authenticate(?User $user = null): User
    {
        $user ??= User::factory()->create();

        Sanctum::actingAs($user);

        return $user;
    }

    public function test_user_can_list_appointments_filtered_by_day(): void
    {
        $user = $this->authenticate();

        Appointment::factory()
            ->for($user)
            ->count(2)
            ->create([
                'date' => '2025-02-10',
            ]);

        Appointment::factory()->for($user)->create([
            'date' => '2025-02-11',
        ]);

        Appointment::factory()->create([
            'date' => '2025-02-10',
        ]);

        $response = $this->getJson('/api/appointments?view=day&day=2025-02-10&year=2025');

        $response
            ->assertOk()
            ->assertJsonCount(2, 'data')
            ->assertJsonPath('data.0.user_id', $user->id);
    }

    public function test_user_can_create_an_appointment(): void
    {
        $user = $this->authenticate();

        $payload = [
            'user_id' => $user->id,
            'title' => 'Consulta de rotina',
            'date' => '2025-03-05',
            'start_time' => '09:30',
            'duration' => 60,
            'event_type' => 'blue',
            'location' => 'Clínica Central',
            'doctor' => 'Dr. Silva',
            'notes' => 'Trazer exames anteriores',
        ];

        $response = $this->postJson('/api/appointments', $payload);

        $response
            ->assertStatus(200)
            ->assertJsonPath('data.title', 'Consulta de rotina')
            ->assertJsonPath('data.user_id', $user->id);

        $this->assertDatabaseHas('appointments', [
            'title' => 'Consulta de rotina',
            'user_id' => $user->id,
        ]);
    }

    public function test_store_endpoint_validates_required_fields(): void
    {
        $this->authenticate();

        $this->postJson('/api/appointments', [])
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'user_id',
                'title',
                'date',
                'start_time',
                'duration',
                'event_type',
            ]);
    }

    public function test_user_can_view_an_appointment(): void
    {
        $user = $this->authenticate();
        $appointment = Appointment::factory()->for($user)->create();

        $this->getJson("/api/appointments/{$appointment->id}")
            ->assertOk()
            ->assertJsonPath('data.id', $appointment->id)
            ->assertJsonPath('data.user_id', $user->id);
    }

    public function test_user_can_update_an_appointment(): void
    {
        $user = $this->authenticate();
        $appointment = Appointment::factory()->for($user)->create([
            'title' => 'Consulta antiga',
            'duration' => 45,
        ]);

        $payload = [
            'title' => 'Consulta atualizada',
            'date' => '2025-04-01',
            'start_time' => '10:15',
            'duration' => 90,
            'event_type' => 'orange',
            'notes' => 'Paciente solicita retorno',
        ];

        $this->putJson("/api/appointments/{$appointment->id}", $payload)
            ->assertOk()
            ->assertJsonPath('data.title', 'Consulta atualizada')
            ->assertJsonPath('data.duration', 90);

        $this->assertDatabaseHas('appointments', [
            'id' => $appointment->id,
            'title' => 'Consulta atualizada',
            'duration' => 90,
        ]);
    }

    public function test_update_does_not_allow_changing_user(): void
    {
        $user = $this->authenticate();
        $appointment = Appointment::factory()->for($user)->create();
        $otherUser = User::factory()->create();

        $this->putJson("/api/appointments/{$appointment->id}", [
            'user_id' => $otherUser->id,
            'title' => 'Tentativa de transferência',
        ])->assertOk();

        $this->assertDatabaseHas('appointments', [
            'id' => $appointment->id,
            'user_id' => $user->id,
        ]);
    }

    public function test_user_can_delete_an_appointment(): void
    {
        $user = $this->authenticate();
        $appointment = Appointment::factory()->for($user)->create();

        $this->deleteJson("/api/appointments/{$appointment->id}")
            ->assertNoContent();

        $this->assertDatabaseMissing('appointments', [
            'id' => $appointment->id,
        ]);
    }
}
