<?php

namespace Database\Seeders;

use App\Models\Region;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Http;

class RegionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch regions from PSGC API
        $response = Http::get('https://psgc.gitlab.io/api/regions/');
        
        if ($response->successful()) {
            $regions = $response->json();
            
            foreach ($regions as $region) {
                Region::updateOrCreate(
                    ['region_code' => $region['code']],
                    [
                        'psgc_code' => $region['code'],
                        'region_name' => $region['name'],
                        'region_code' => $region['code'],
                    ]
                );
            }
        }
    }
}
