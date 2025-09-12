<?php

namespace Database\Seeders;

use App\Models\Province;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Http;

class ProvinceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch provinces from PSGC API
        $response = Http::get('https://psgc.gitlab.io/api/provinces/');
        
        if ($response->successful()) {
            $provinces = $response->json();
            
            foreach ($provinces as $province) {
                Province::updateOrCreate(
                    ['province_code' => $province['code']],
                    [
                        'psgc_code' => $province['code'],
                        'province_name' => $province['name'],
                        'region_code' => $province['regionCode'],
                        'province_code' => $province['code'],
                    ]
                );
            }
        }
    }
}
