<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         User::factory(10)->create();

        User::factory()->create([
            'username' => 'testuser',
            'password' => bcrypt('password'),
            'fullname' => 'Test User',
            'f_name' => 'Test',
            'l_name' => 'User',
            'phone_no' => '1234567890',
            'b_date' => '2000-01-01',
        ]);
    }
}
