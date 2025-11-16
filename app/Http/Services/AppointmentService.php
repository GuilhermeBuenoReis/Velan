<?php

namespace App\Http\Services;

use App\Http\Repositories\AppointmentRepository;
use App\Http\Services\BaseService;

class AppointmentService extends BaseService {
    protected AppointmentRepository $appointmentRepository;

    public function __construct(AppointmentRepository $appointmentRepository)
    {
        parent::__construct($appointmentRepository);
        $this->appointmentRepository = $appointmentRepository;
    }

    public function index(array $data) {
        $data['user_id'] ??= auth()->id();

        return $this->appointmentRepository->index($data);
    }
}
