<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateAppointmentRequest;
use App\Http\Resources\AppointmentResource;
use App\Http\Services\AppointmentService;
use App\Http\Requests\UpdateAppointmentRequest;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    private AppointmentService $appointmentService;

    public function __construct(AppointmentService $appointmentService)
    {
        $this->appointmentService = $appointmentService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $getAppointments = $this->appointmentService->index($request->all());

        return AppointmentResource::collection($getAppointments);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateAppointmentRequest $appointmentRequest)
    {
        $createAppointment = $this->appointmentService->store($appointmentRequest->validated());

        return (new AppointmentResource($createAppointment))
            ->response()
            ->setStatusCode(200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $getAppointmentById = $this->appointmentService->show($id);

        return new AppointmentResource($getAppointmentById);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAppointmentRequest $request, string $id)
    {
        $updateAppointment = $this->appointmentService->update($request->validated(), $id);

        return new AppointmentResource($updateAppointment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->appointmentService->destroy($id);

        return response()->noContent();
    }
}
