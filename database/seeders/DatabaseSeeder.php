<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RegionSeeder::class,
            ProvinceSeeder::class,
            CityMunicipalitySeeder::class,
            BarangaySeeder::class,
        ]);

        User::factory(10)->create();

        User::factory()->create([
            'username' => 'testuser',
            'password' => bcrypt('password'),
            'fullname' => 'Test User',
            'f_name' => 'Test',
            'l_name' => 'User',
            'phone_no' => '1234567890',
        ]);
    }
}
