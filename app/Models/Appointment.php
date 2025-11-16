<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'date',
        'start_time',
        'duration',
        'event_type',
        'location',
        'doctor',
        'notes',
    ];

    protected $casts = [
        'user_id' => 'integer',
        'date' => 'date',
        'duration' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
