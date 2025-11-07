<?php

namespace App\Http\Repositories;

use App\Models\Appointment;

class AppointmentRepository extends BaseRepository
{
    public function __construct(Appointment $model)
    {
        parent::__construct($model);
    }

    public function index(array $data)
    {
        $appointments = $this->model->query();

        if (isset($data['user_id'])) {
            $appointments->where('user_id', $data['user_id']);
        }

        if (isset($data['year'])) {
            $appointments->whereYear('date', $data['year']);
        }

        if (isset($data['month']) && $data['view'] === 'month') {
            $appointments->whereMonth('date', $data['month']);
        }

        if (isset($data['week']) && $data['view'] === 'week') {
            $appointments->whereRaw('WEEK(date) = ?', [$data['week']]);
        }

        if (isset($data['day']) && $data['view'] === 'day') {
            $appointments->whereDate('date', $data['day']);
        }

        return $appointments
            ->select([
                'id',
                'user_id',
                'title',
                'date',
                'start_time',
                'duration',
                'event_type',
                'location',
                'doctor',
                'notes',
                'created_at',
                'updated_at',
            ])
            ->orderBy('date')
            ->orderBy('start_time')
            ->get();
    }

    public function update(array $data, string $id)
    {
        unset($data['user_id']);

        return parent::update($data, $id);
    }
}
