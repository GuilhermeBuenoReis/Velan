<?php

namespace App\Swagger;

/**
 * @OA\OpenApi(
 *   @OA\Info(
 *     title="Velan API Documentation",
 *     version="1.0.0",
 *     description="Session-based authentication, settings management, and appointment APIs."
 *   ),
 *   @OA\Server(
 *     url="http://localhost:8000",
 *     description="Local development server"
 *   )
 * )
 *
 * @OA\Tag(
 *   name="Authentication",
 *   description="Register, log in, and manage session-based authentication."
 * )
 * @OA\Tag(
 *   name="Password Reset",
 *   description="Request and apply password reset links."
 * )
 * @OA\Tag(
 *   name="Email Verification",
 *   description="Endpoints for verifying and resending verification emails."
 * )
 * @OA\Tag(
 *   name="Settings",
 *   description="Authenticated endpoints for managing profile, password, and preferences."
 * )
 * @OA\Tag(
 *   name="Appointments",
 *   description="CRUD operations for appointments."
 * )
 *
 * @OA\SecurityScheme(
 *   securityScheme="SanctumSession",
 *   type="apiKey",
 *   in="cookie",
 *   name="laravel_session",
 *   description="Session cookie issued by Sanctum when authenticating via web guards."
 * )
 *
 * @OA\Schema(
 *   schema="ApiMessage",
 *   type="object",
 *   required={"message"},
 *   @OA\Property(
 *     property="message",
 *     type="string",
 *     example="Operation completed."
 *   )
 * )
 * @OA\Schema(
 *   schema="LoginRequest",
 *   type="object",
 *   required={"email","password"},
 *   @OA\Property(property="email", type="string", format="email", example="user@example.com"),
 *   @OA\Property(property="password", type="string", format="password", example="secret"),
 *   @OA\Property(property="remember", type="boolean", example=true, nullable=true)
 * )
 * @OA\Schema(
 *   schema="RegisterRequest",
 *   type="object",
 *   required={"name","email","phone","role","type","password","password_confirmation"},
 *   @OA\Property(property="name", type="string", maxLength=255, example="Patient Example"),
 *   @OA\Property(property="email", type="string", format="email", example="patient@example.com"),
 *   @OA\Property(property="phone", type="string", maxLength=20, example="+55 11 99999-0000"),
 *   @OA\Property(property="role", type="string", enum={"patient","doctor","clinic"}, example="patient"),
 *   @OA\Property(property="type", type="string", maxLength=255, example="premium"),
 *   @OA\Property(property="password", type="string", format="password", example="secret-password"),
 *   @OA\Property(property="password_confirmation", type="string", format="password", example="secret-password")
 * )
 * @OA\Schema(
 *   schema="ForgotPasswordRequest",
 *   type="object",
 *   required={"email"},
 *   @OA\Property(property="email", type="string", format="email", example="patient@example.com")
 * )
 * @OA\Schema(
 *   schema="ResetPasswordRequest",
 *   type="object",
 *   required={"token","email","password","password_confirmation"},
 *   @OA\Property(property="token", type="string", example="abcdef"),
 *   @OA\Property(property="email", type="string", format="email", example="patient@example.com"),
 *   @OA\Property(property="password", type="string", format="password", example="new-secret"),
 *   @OA\Property(property="password_confirmation", type="string", format="password", example="new-secret")
 * )
 * @OA\Schema(
 *   schema="ProfileUpdateRequest",
 *   type="object",
 *   required={"name","email"},
 *   @OA\Property(property="name", type="string", maxLength=255, example="Patient Example"),
 *   @OA\Property(property="email", type="string", format="email", example="patient@example.com"),
 *   @OA\Property(property="type", type="string", nullable=true, maxLength=255, example="premium")
 * )
 * @OA\Schema(
 *   schema="AccountDeletionRequest",
 *   type="object",
 *   required={"password"},
 *   @OA\Property(property="password", type="string", format="password", example="current-password")
 * )
 * @OA\Schema(
 *   schema="PasswordUpdateRequest",
 *   type="object",
 *   required={"current_password","password","password_confirmation"},
 *   @OA\Property(property="current_password", type="string", format="password", example="current-password"),
 *   @OA\Property(property="password", type="string", format="password", example="new-secret"),
 *   @OA\Property(property="password_confirmation", type="string", format="password", example="new-secret")
 * )
 * @OA\Schema(
 *   schema="Appointment",
 *   type="object",
 *   required={
 *     "id",
 *     "user_id",
 *     "title",
 *     "date",
 *     "start_time",
 *     "duration",
 *     "event_type"
 *   },
 *   @OA\Property(property="id", type="integer", example=1),
 *   @OA\Property(property="user_id", type="integer", example=5),
 *   @OA\Property(property="title", type="string", example="Initial Consultation"),
 *   @OA\Property(property="date", type="string", format="date", example="2024-08-01"),
 *   @OA\Property(property="start_time", type="string", pattern="^\\d{2}:\\d{2}$", example="14:30"),
 *   @OA\Property(property="duration", type="integer", minimum=1, example=45),
 *   @OA\Property(property="event_type", type="string", example="consultation"),
 *   @OA\Property(property="location", type="string", nullable=true, example="Clinic A - Room 3"),
 *   @OA\Property(property="doctor", type="string", nullable=true, example="Dr. Jane Doe"),
 *   @OA\Property(property="notes", type="string", nullable=true, example="Bring previous exams.")
 * )
 * @OA\Schema(
 *   schema="AppointmentCreateRequest",
 *   type="object",
 *   required={
 *     "user_id",
 *     "title",
 *     "date",
 *     "start_time",
 *     "duration",
 *     "event_type"
 *   },
 *   @OA\Property(property="user_id", type="integer", example=5),
 *   @OA\Property(property="title", type="string", maxLength=255, example="Initial Consultation"),
 *   @OA\Property(property="date", type="string", format="date", example="2024-08-01"),
 *   @OA\Property(property="start_time", type="string", pattern="^\\d{2}:\\d{2}$", example="14:30"),
 *   @OA\Property(property="duration", type="integer", minimum=1, example=45),
 *   @OA\Property(property="event_type", type="string", maxLength=100, example="consultation"),
 *   @OA\Property(property="location", type="string", nullable=true, example="Clinic A - Room 3"),
 *   @OA\Property(property="doctor", type="string", nullable=true, example="Dr. Jane Doe"),
 *   @OA\Property(property="notes", type="string", nullable=true, example="Bring previous exams.")
 * )
 * @OA\Schema(
 *   schema="AppointmentUpdateRequest",
 *   type="object",
 *   description="Provide only fields that need to be updated.",
 *   @OA\Property(property="title", type="string", maxLength=255, example="Initial Consultation (updated)"),
 *   @OA\Property(property="date", type="string", format="date", example="2024-08-02"),
 *   @OA\Property(property="start_time", type="string", pattern="^\\d{2}:\\d{2}$", example="15:00"),
 *   @OA\Property(property="duration", type="integer", minimum=1, example=60),
 *   @OA\Property(property="event_type", type="string", maxLength=100, example="follow-up"),
 *   @OA\Property(property="location", type="string", nullable=true, example="Clinic A - Room 5"),
 *   @OA\Property(property="doctor", type="string", nullable=true, example="Dr. Jane Doe"),
 *   @OA\Property(property="notes", type="string", nullable=true, example="Patient requested extra time.")
 * )
 *
 * @OA\Post(
 *   path="/login",
 *   operationId="login",
 *   tags={"Authentication"},
 *   summary="Authenticate a user",
 *   description="Authenticates the user using email and password. Requires a valid CSRF token header.",
 *   @OA\Parameter(
 *     name="X-XSRF-TOKEN",
 *     in="header",
 *     required=true,
 *     description="CSRF token value (HTML encoded) that matches the `XSRF-TOKEN` cookie issued by `/sanctum/csrf-cookie`.",
 *     @OA\Schema(type="string", example="eyJpdiI6IkpXbE9YdEhVUWtOY3pKMGoyeU5zd0E9PSIsInZhbHVlIjoi...")
 *   ),
 *   @OA\RequestBody(
 *     required=true,
 *     @OA\JsonContent(ref="#/components/schemas/LoginRequest")
 *   ),
 *   @OA\Response(
 *     response=200,
 *     description="Authenticated successfully.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   ),
 *   @OA\Response(
 *     response=422,
 *     description="Validation error or invalid credentials.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   )
 * )

 * @OA\Get(
 *   path="/sanctum/csrf-cookie",
 *   operationId="sanctumCsrfCookie",
 *   tags={"Authentication"},
 *   summary="Issue CSRF cookie for Sanctum session authentication",
 *   description="Call this endpoint first to receive the `XSRF-TOKEN` and `laravel_session` cookies required for session-authenticated requests from Swagger UI or other API clients.",
 *   @OA\Response(
 *     response=204,
 *     description="CSRF cookie set successfully (no content returned)."
 *   )
 * )
 * @OA\Post(
 *   path="/logout",
 *   operationId="logout",
 *   tags={"Authentication"},
 *   summary="Log out the authenticated user",
 *   security={{"SanctumSession": {}}},
 *   @OA\Response(
 *     response=200,
 *     description="Logged out successfully.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   )
 *   @OA\Response(
 *     response=401,
 *     description="Unauthenticated.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   )
 * )
 * @OA\Post(
 *   path="/register",
 *   operationId="register",
 *   tags={"Authentication"},
 *   summary="Register a new user",
 *   description="Registers a new user and starts an authenticated session.",
 *   @OA\RequestBody(
 *     required=true,
 *     @OA\JsonContent(ref="#/components/schemas/RegisterRequest")
 *   ),
 *   @OA\Response(
 *     response=201,
 *     description="Account created successfully.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   ),
 *   @OA\Response(
 *     response=422,
 *     description="Validation errors.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   )
 * )
 *
 * @OA\Post(
 *   path="/forgot-password",
 *   operationId="requestPasswordResetLink",
 *   tags={"Password Reset"},
 *   summary="Request a password reset link",
 *   @OA\RequestBody(
 *     required=true,
 *     @OA\JsonContent(ref="#/components/schemas/ForgotPasswordRequest")
 *   ),
 *   @OA\Response(
 *     response=200,
 *     description="Password reset email dispatched if the account exists.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   ),
 *   @OA\Response(
 *     response=422,
 *     description="Validation error.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   )
 * )
 * @OA\Post(
 *   path="/reset-password",
 *   operationId="resetPassword",
 *   tags={"Password Reset"},
 *   summary="Reset the user's password",
 *   @OA\RequestBody(
 *     required=true,
 *     @OA\JsonContent(ref="#/components/schemas/ResetPasswordRequest")
 *   ),
 *   @OA\Response(
 *     response=200,
 *     description="Password reset successfully.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   ),
 *   @OA\Response(
 *     response=422,
 *     description="Validation error.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   )
 * )
 *
 * @OA\Get(
 *   path="/verify-email",
 *   operationId="emailVerificationPrompt",
 *   tags={"Email Verification"},
 *   summary="Show the email verification prompt",
 *   security={{"SanctumSession": {}}},
 *   @OA\Response(
 *     response=200,
 *     description="Email verification prompt returned.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   )
 *   @OA\Response(
 *     response=401,
 *     description="Unauthenticated.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   )
 * )
 * @OA\Get(
 *   path="/verify-email/{id}/{hash}",
 *   operationId="verifyEmail",
 *   tags={"Email Verification"},
 *   summary="Verify the authenticated user's email address",
 *   security={{"SanctumSession": {}}},
 *   @OA\Parameter(
 *     name="id",
 *     in="path",
 *     required=true,
 *     description="User identifier.",
 *     @OA\Schema(type="integer", example=5)
 *   ),
 *   @OA\Parameter(
 *     name="hash",
 *     in="path",
 *     required=true,
 *     description="Email verification hash.",
 *     @OA\Schema(type="string", example="f8e4f8e4f8e4f8e4f8e4f8e4f8e4f8e4f8e4f8e4f8e4f8e4f8e4f8e4f8e4")
 *   ),
 *   @OA\Response(
 *     response=200,
 *     description="Email verified successfully.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   ),
 *   @OA\Response(
 *     response=403,
 *     description="Invalid or expired verification link.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   ),
 *   @OA\Response(
 *     response=401,
 *     description="Unauthenticated.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   )
 * )
 * @OA\Post(
 *   path="/email/verification-notification",
 *   operationId="resendVerificationEmail",
 *   tags={"Email Verification"},
 *   summary="Resend the email verification link",
 *   security={{"SanctumSession": {}}},
 *   @OA\Response(
 *     response=200,
 *     description="Verification link re-sent.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   ),
 *   @OA\Response(
 *     response=401,
 *     description="Unauthenticated.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   )
 * )
 *
 * @OA\Get(
 *   path="/settings/profile",
 *   operationId="viewProfileSettings",
 *   tags={"Settings"},
 *   summary="Show the profile settings page",
 *   security={{"SanctumSession": {}}},
 *   @OA\Response(
 *     response=200,
 *     description="Profile settings data returned.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   ),
 *   @OA\Response(
 *     response=401,
 *     description="Unauthenticated.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   )
 * )
 * @OA\Patch(
 *   path="/settings/profile",
 *   operationId="updateProfile",
 *   tags={"Settings"},
 *   summary="Update the authenticated user's profile",
 *   security={{"SanctumSession": {}}},
 *   @OA\RequestBody(
 *     required=true,
 *     @OA\JsonContent(ref="#/components/schemas/ProfileUpdateRequest")
 *   ),
 *   @OA\Response(
 *     response=200,
 *     description="Profile updated.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   ),
 *   @OA\Response(
 *     response=422,
 *     description="Validation error.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   ),
 *   @OA\Response(
 *     response=401,
 *     description="Unauthenticated.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   )
 * )
 * @OA\Delete(
 *   path="/settings/profile",
 *   operationId="deleteAccount",
 *   tags={"Settings"},
 *   summary="Delete the authenticated user's account",
 *   security={{"SanctumSession": {}}},
 *   @OA\RequestBody(
 *     required=true,
 *     @OA\JsonContent(ref="#/components/schemas/AccountDeletionRequest")
 *   ),
 *   @OA\Response(
 *     response=200,
 *     description="Account removed successfully.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   ),
 *   @OA\Response(
 *     response=422,
 *     description="Validation error (incorrect password).",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   ),
 *   @OA\Response(
 *     response=401,
 *     description="Unauthenticated.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   )
 * )
 *
 * @OA\Get(
 *   path="/settings/password",
 *   operationId="viewPasswordSettings",
 *   tags={"Settings"},
 *   summary="Show the password settings page",
 *   security={{"SanctumSession": {}}},
 *   @OA\Response(
 *     response=200,
 *     description="Password settings data returned.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   ),
 *   @OA\Response(
 *     response=401,
 *     description="Unauthenticated.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   )
 * )
 * @OA\Put(
 *   path="/settings/password",
 *   operationId="updatePassword",
 *   tags={"Settings"},
 *   summary="Update the authenticated user's password",
 *   security={{"SanctumSession": {}}},
 *   @OA\RequestBody(
 *     required=true,
 *     @OA\JsonContent(ref="#/components/schemas/PasswordUpdateRequest")
 *   ),
 *   @OA\Response(
 *     response=200,
 *     description="Password updated successfully.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   ),
 *   @OA\Response(
 *     response=422,
 *     description="Validation error.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   ),
 *   @OA\Response(
 *     response=401,
 *     description="Unauthenticated.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   )
 * )
 *
 * @OA\Get(
 *   path="/settings/appearance",
 *   operationId="viewAppearanceSettings",
 *   tags={"Settings"},
 *   summary="Show the appearance settings page",
 *   security={{"SanctumSession": {}}},
 *   @OA\Response(
 *     response=200,
 *     description="Appearance settings data returned.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   ),
 *   @OA\Response(
 *     response=401,
 *     description="Unauthenticated.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   )
 * )
 * @OA\Get(
 *   path="/settings/two-factor",
 *   operationId="viewTwoFactorSettings",
 *   tags={"Settings"},
 *   summary="Show the two-factor authentication settings page",
 *   description="Returns the two-factor settings page when two-factor authentication is enabled.",
 *   security={{"SanctumSession": {}}},
 *   @OA\Response(
 *     response=200,
 *     description="Two-factor settings data returned.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   ),
 *   @OA\Response(
  *     response=403,
  *     description="Two-factor authentication is disabled.",
  *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   ),
 *   @OA\Response(
 *     response=401,
 *     description="Unauthenticated.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   )
 * )
 *
 * @OA\Get(
 *   path="/api/appointments",
 *   operationId="listAppointments",
 *   tags={"Appointments"},
 *   summary="List appointments",
 *   description="Returns appointments visible to the authenticated user. Optional filters limit the result set.",
 *   security={{"SanctumSession": {}}},
 *   @OA\Parameter(
 *     name="user_id",
 *     in="query",
 *     required=false,
 *     description="Filter appointments by user id.",
 *     @OA\Schema(type="integer", example=5)
 *   ),
 *   @OA\Parameter(
 *     name="view",
 *     in="query",
 *     required=false,
 *     description="Sets the granularity of the period filter.",
 *     @OA\Schema(type="string", enum={"month","week","day"}, example="month")
 *   ),
 *   @OA\Parameter(
 *     name="year",
 *     in="query",
 *     required=false,
 *     description="Year portion when filtering by period.",
 *     @OA\Schema(type="integer", example=2024)
 *   ),
 *   @OA\Parameter(
 *     name="month",
 *     in="query",
 *     required=false,
 *     description="Month number (1-12). Only used when `view=month`.",
 *     @OA\Schema(type="integer", minimum=1, maximum=12, example=8)
 *   ),
 *   @OA\Parameter(
 *     name="week",
 *     in="query",
 *     required=false,
 *     description="Week number (1-53). Only used when `view=week`.",
 *     @OA\Schema(type="integer", minimum=1, maximum=53, example=31)
 *   ),
 *   @OA\Parameter(
 *     name="day",
 *     in="query",
 *     required=false,
 *     description="Specific date (YYYY-MM-DD). Only used when `view=day`.",
 *     @OA\Schema(type="string", format="date", example="2024-08-01")
 *   ),
 *   @OA\Response(
 *     response=200,
 *     description="List of appointments",
 *     @OA\JsonContent(
 *       type="array",
 *       @OA\Items(ref="#/components/schemas/Appointment")
 *     )
 *   ),
 *   @OA\Response(
 *     response=401,
 *     description="Unauthenticated.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   )
 * )
 * @OA\Post(
 *   path="/api/appointments",
 *   operationId="createAppointment",
 *   tags={"Appointments"},
 *   summary="Create an appointment",
 *   description="Creates an appointment for the given user.",
 *   security={{"SanctumSession": {}}},
 *   @OA\RequestBody(
 *     required=true,
 *     @OA\JsonContent(ref="#/components/schemas/AppointmentCreateRequest")
 *   ),
 *   @OA\Response(
 *     response=200,
 *     description="Appointment created",
 *     @OA\JsonContent(ref="#/components/schemas/Appointment")
 *   ),
 *   @OA\Response(
 *     response=422,
 *     description="Validation error",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   ),
 *   @OA\Response(
 *     response=401,
 *     description="Unauthenticated.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   )
 * )
 * @OA\Get(
 *   path="/api/appointments/{id}",
 *   operationId="getAppointment",
 *   tags={"Appointments"},
 *   summary="Get appointment details",
 *   security={{"SanctumSession": {}}},
 *   @OA\Parameter(
 *     name="id",
 *     in="path",
 *     required=true,
 *     description="Appointment identifier.",
 *     @OA\Schema(type="integer", example=1)
 *   ),
 *   @OA\Response(
 *     response=200,
 *     description="Appointment details",
 *     @OA\JsonContent(ref="#/components/schemas/Appointment")
 *   ),
 *   @OA\Response(
 *     response=404,
 *     description="Appointment not found",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   ),
 *   @OA\Response(
 *     response=401,
 *     description="Unauthenticated.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   )
 * )
 * @OA\Put(
 *   path="/api/appointments/{id}",
 *   operationId="updateAppointment",
 *   tags={"Appointments"},
 *   summary="Update an appointment",
 *   description="Updates appointment fields. Fields not supplied remain unchanged.",
 *   security={{"SanctumSession": {}}},
 *   @OA\Parameter(
 *     name="id",
 *     in="path",
 *     required=true,
 *     description="Appointment identifier.",
 *     @OA\Schema(type="integer", example=1)
 *   ),
 *   @OA\RequestBody(
 *     required=true,
 *     @OA\JsonContent(ref="#/components/schemas/AppointmentUpdateRequest")
 *   ),
 *   @OA\Response(
 *     response=200,
 *     description="Appointment updated",
 *     @OA\JsonContent(ref="#/components/schemas/Appointment")
 *   ),
 *   @OA\Response(
 *     response=422,
 *     description="Validation error",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   ),
 *   @OA\Response(
  *     response=404,
  *     description="Appointment not found",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   ),
 *   @OA\Response(
 *     response=401,
 *     description="Unauthenticated.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   )
 * )
 * @OA\Delete(
 *   path="/api/appointments/{id}",
 *   operationId="deleteAppointment",
 *   tags={"Appointments"},
 *   summary="Delete an appointment",
 *   description="Removes the appointment with the given identifier.",
 *   security={{"SanctumSession": {}}},
 *   @OA\Parameter(
 *     name="id",
 *     in="path",
 *     required=true,
 *     description="Appointment identifier.",
 *     @OA\Schema(type="integer", example=1)
 *   ),
 *   @OA\Response(
 *     response=204,
 *     description="Appointment deleted successfully"
 *   ),
 *   @OA\Response(
  *     response=404,
  *     description="Appointment not found",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   ),
 *   @OA\Response(
 *     response=401,
 *     description="Unauthenticated.",
 *     @OA\JsonContent(ref="#/components/schemas/ApiMessage")
 *   )
 * )
 */
class SwaggerDoc {}
