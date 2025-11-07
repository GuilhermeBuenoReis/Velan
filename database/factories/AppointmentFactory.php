<?php

namespace Database\Factories;

use App\Models\Appointment;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Appointment>
 */
class AppointmentFactory extends Factory
{
    protected $model = Appointment::class;

    public function definition(): array
    {
        $start = $this->faker->dateTimeBetween('+1 day', '+1 month');

        return [
            'user_id' => User::factory(),
            'title' => $this->faker->sentence(3),
            'date' => $start->format('Y-m-d'),
            'start_time' => $start->format('H:i'),
            'duration' => $this->faker->randomElement([30, 45, 60, 90]),
            'event_type' => $this->faker->randomElement(['blue', 'purple', 'orange', 'red']),
            'location' => $this->faker->optional()->city(),
            'doctor' => $this->faker->optional()->name(),
            'notes' => $this->faker->optional()->sentence(),
        ];
    }
}
