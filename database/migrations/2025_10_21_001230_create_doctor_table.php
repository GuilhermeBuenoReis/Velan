<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (! Schema::hasTable('doctor')) {
            Schema::create('doctor', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
                $table->foreignId('clinic_id')->constrained('clinic')->onDelete('cascade');

                $table->string('crm');
                $table->string('specialty');
                $table->string('description')->nullable();
                $table->decimal('average_rating')->nullable();
                $table->decimal('consultation_fee');
                $table->date('work_start_time');
                $table->date('work_end_time');
                $table->string('available_days');
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doctor');
    }
};
