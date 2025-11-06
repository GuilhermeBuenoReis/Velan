<?php

namespace App\Http\Resources;

use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AppointmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public function __construct(Appointment $resource)
    {
        parent::__construct($resource);
    }

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,
            'user_id' => $this->resource->user_id,
            'title' => $this->resource->title,
            'date' => $this->resource->date,
            'start_time' => $this->resource->start_time,
            'duration' => $this->resource->duration,
            'event_type' => $this->resource->event_type,
            'location' => $this->resource->location,
            'doctor' => $this->resource->doctor,
            'notes' => $this->resource->notes,
        ];
    }
}
