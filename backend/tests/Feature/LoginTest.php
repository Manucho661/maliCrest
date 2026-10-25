<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_user_can_log_in_with_correct_credentials(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => Hash::make('SecurePass123!'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'test@example.com',
            'password' => 'SecurePass123!',
        ]);

        $response->assertOk();

        $response->assertJsonStructure([
            'token',
        ]);

        $this->assertDatabaseHas('personal_access_tokens', [
            'tokenable_id' => $user->id,
            'tokenable_type' => $user->getMorphClass(),
        ]);
    }

    public function test_login_rejects_incorrect_password(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => Hash::make('CorrectPass123!'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'test@example.com',
            'password' => 'WrongPass123!',
        ]);

        $response->assertUnauthorized();

        $this->assertDatabaseMissing('personal_access_tokens', [
            'tokenable_id' => $user->id,
            'tokenable_type' => $user->getMorphClass(),
        ]);
    }

    public function test_login_rejects_nonexistent_email(): void
    {
        $response = $this->postJson('/api/login', [
            'email' => 'unknown@example.com',
            'password' => 'SecurePass123!',
        ]);

        $response->assertUnauthorized();
    }

    public function test_login_rejects_missing_credentials(): void
    {
        $response = $this->postJson('/api/login', []);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'email',
            'password',
        ]);
    }

    public function test_login_is_rate_limited_after_five_attempts(): void
    {
        User::factory()->create([
            'email' => 'test@example.com',
            'password' => Hash::make('CorrectPass123!'),
        ]);

        // The first five requests use incorrect passwords.
        for ($attempt = 1; $attempt <= 5; $attempt++) {
            $response = $this->postJson('/api/login', [
                'email' => 'test@example.com',
                'password' => 'WrongPass123!',
            ]);

            $response->assertUnauthorized();
        }

        // The sixth request should be blocked by throttle:5,1.
        $response = $this->postJson('/api/login', [
            'email' => 'test@example.com',
            'password' => 'WrongPass123!',
        ]);

        $response->assertStatus(429);
    }
}
