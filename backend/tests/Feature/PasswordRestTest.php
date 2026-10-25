<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class PasswordRestTest extends TestCase
{
    use RefreshDatabase;


    public function test_user_can_reset_password(): void
    {
        // Arrange: create a user with an existing password.
        $user = User::factory()->create([
            'email' => 'user@example.com',
            'password' => Hash::make('OldPassword123!'),
        ]);

        // Act: submit the password-reset request.
        $response = $this->postJson('/api/reset-password', [
            'email' => $user->email,
            'password' => 'NewPassword123!',
            'password_confirmation' => 'NewPassword123!',
        ]);

        // Assert: verify the HTTP response.
        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Password reset successful.',
            ]);

        // Reload the user from the database.
        $user->refresh();

        // Verify that the new password was saved.
        $this->assertTrue(
            Hash::check('NewPassword123!', $user->password)
        );
    }

    public function test_password_reset_fails_when_email_does_not_exist(): void
    {
        $response = $this->postJson('/api/reset-password', [
            'email' => 'unknown@example.com',
            'password' => 'NewPassword123!',
            'password_confirmation' => 'NewPassword123!',
        ]);

        $response->assertStatus(404)
            ->assertJson([
                'message' => 'User not found.',
            ]);
    }


    public function test_password_reset_fails_when_password_is_too_short(): void
    {
        $user = User::factory()->create([
            'email' => 'user@example.com',
            'password' => Hash::make('OldPassword123!'),
        ]);

        $response = $this->postJson('/api/reset-password', [
            'email' => $user->email,
            'password' => 'Short!',
            'password_confirmation' => 'Short!',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);
    }

    public function test_password_reset_fails_without_uppercase_letter(): void
    {
        $user = User::factory()->create();

        $response = $this->postJson('/api/reset-password', [
            'email' => $user->email,
            'password' => 'hello123!',
            'password_confirmation' => 'hello123!',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);
    }

    public function test_password_reset_fails_without_number(): void
    {
        $user = User::factory()->create();

        $response = $this->postJson('/api/reset-password', [
            'email' => $user->email,
            'password' => 'HelloWorld!',
            'password_confirmation' => 'HelloWorld!',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);
    }

    public function test_password_reset_fails_without_symbol(): void
    {
        $user = User::factory()->create();

        $response = $this->postJson('/api/reset-password', [
            'email' => $user->email,
            'password' => 'Hello1234',
            'password_confirmation' => 'Hello1234',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);
    }
}
