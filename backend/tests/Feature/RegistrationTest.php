<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class RegistrationTest extends TestCase
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
    public function test_user_can_register_with_valid_data(): void
    {
        $role = Role::firstOrCreate([
            'name' => 'tenant',
        ]);

        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'country_code' => "+254",
            'phone_number' => '712345678',
            'password' => 'SecurePass123!',
            'password_confirmation' => 'SecurePass123!',
            'roles' => [$role->id],
        ]);

        $response->assertCreated();

        $this->assertDatabaseHas('users', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'phone_number' => '712345678',
            'country_code' => "+254",
        ]);

        $user = User::where(
            'email',
            'test@example.com'
        )->firstOrFail();

        $this->assertTrue(
            Hash::check('SecurePass123!', $user->password)
        );

        $this->assertTrue(
            $user->roles()->where('roles.id', $role->id)->exists()
        );
    }

    public function test_registration_rejects_duplicate_email(): void
    {
        User::factory()->create([
            'email' => 'existing@example.com',
        ]);

        $role = Role::firstOrCreate([
            'name' => 'tenant',
        ]);

        $response = $this->postJson('/api/register', [
            'name' => 'Another User',
            'email' => 'existing@example.com',
            'country_code' => "+254",
            'phone_number' => '712345678',
            'password' => 'SecurePass123!',
            'password_confirmation' => 'SecurePass123!',
            'roles' => [$role->id],
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors(['email']);

        $this->assertDatabaseCount('users', 1);
    }

    public function test_registration_rejects_missing_required_fields(): void
    {
        $response = $this->postJson('/api/register', []);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'name',
            'email',
            'password',
            'roles',
        ]);
    }

    public function test_registration_rejects_password_confirmation_mismatch(): void
    {
        $role = Role::firstOrCreate([
            'name' => 'tenant',
        ]);

        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'country_code' => "+254",
            'phone_number' => '712345678',
            'password' => 'SecurePass123!',
            'password_confirmation' => 'DifferentPass123!',
            'roles' => [$role->id],
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'password',
        ]);

        $this->assertDatabaseMissing('users', [
            'email' => 'test@example.com',
        ]);
    }

    public function test_registration_rejects_nonexistent_role_ids(): void
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'SecurePass123!',
            'password_confirmation' => 'SecurePass123!',
            'roles' => [999999],
        ]);

        $response->assertUnprocessable();

        $this->assertDatabaseMissing('users', [
            'email' => 'test@example.com',
        ]);
    }


    public function test_registration_is_rate_limited_after_five_attempts(): void
    {
        $role = Role::firstOrCreate([
            'name' => 'tenant',
        ]);

        $registrationData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'country_code' => "+254",
            'phone_number' => '712345678',
            'password' => 'SecurePass123!',
            'password_confirmation' => 'SecurePass123!',
            'roles' => [$role->id],
        ];

        // The first five requests should pass the rate limiter.
        // They may still fail validation or succeed at registration.
        for ($attempt = 1; $attempt <= 5; $attempt++) {
            $response = $this->postJson(
                '/api/register',
                $registrationData
            );

            $this->assertNotSame(
                429,
                $response->status(),
                "Registration attempt {$attempt} was unexpectedly rate-limited."
            );
        }

        // The sixth request should be blocked.
        $response = $this->postJson(
            '/api/register',
            $registrationData
        );

        $response->assertStatus(429);
    }
}
