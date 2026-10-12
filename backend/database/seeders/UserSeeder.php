<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = Role::all();

        User::factory()
            ->count(100)
            ->create()
            ->each(function (User $user) use ($roles) {
                $user->roles()->attach(
                    $roles->random()->id
                );
            });
    }
}
