<?php

namespace Database\Seeders;

use App\Models\Barangay;
use App\Models\Province;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Http;
use Exception;

class BarangayByProvinceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the province code from the command line or process all provinces
        $provinceCode = null;
        
        // Check if province code is provided as an option
        if (isset($_SERVER['argv'])) {
            foreach ($_SERVER['argv'] as $arg) {
                if (strpos($arg, '--provinceCode=') === 0) {
                    $provinceCode = str_replace('--provinceCode=', '', $arg);
                    break;
                }
            }
        }
        
        if ($provinceCode) {
            // Process specific province
            $this->processProvince($provinceCode);
        } else {
            // Process all provinces
            $provinces = Province::all();
            foreach ($provinces as $province) {
                echo "Processing province: " . $province->province_name . " (" . $province->province_code . ")\n";
                $this->processProvince($province->province_code);
                echo "Finished processing province: " . $province->province_name . "\n\n";
                
                // Add a delay between provinces
                sleep(5);
            }
        }
    }
    
    private function processProvince($provinceCode)
    {
        // Get the specific province
        $province = \App\Models\Province::where('province_code', $provinceCode)->first();
        
        if (!$province) {
            echo "Province with code $provinceCode not found\n";
            return;
        }
        
        echo "Processing province: " . $province->province_name . " (" . $province->province_code . ")\n";
        $page = 1;
        $perPage = 25; // Reduce to 25 to avoid timeouts
        
        do {
            // Fetch barangays for this province with pagination
            $maxRetries = 3;
            $retryCount = 0;
            $success = false;
            
            while ($retryCount < $maxRetries && !$success) {
                try {
                    echo "Fetching page $page for province " . $province->province_code . "\n";
                    $response = Http::timeout(120)->get("https://psgc.gitlab.io/api/barangays/", [
                        'provinceCode' => $province->province_code,
                        'page' => $page,
                        'per_page' => $perPage
                    ]);
                    
                    if ($response->successful()) {
                        $data = $response->json();
                        $barangays = $data;
                        
                        // If it's a paginated response, get the data array
                        if (isset($data['data'])) {
                            $barangays = $data['data'];
                        }
                        
                        echo "Processing " . count($barangays) . " barangays\n";
                        
                        $processedCount = 0;
                        $batchSize = 1000; // Process in batches of 1000
                        $batch = [];
                        
                        foreach ($barangays as $barangay) {
                            // Skip barangays without required codes
                            if (!$barangay['regionCode'] || !$barangay['provinceCode'] ||
                                ((!isset($barangay['municipalityCode']) || $barangay['municipalityCode'] === false) &&
                                 (!isset($barangay['cityCode']) || $barangay['cityCode'] === false))) {
                                continue;
                            }
                            
                            // Get the city/municipality code, prioritizing cityCode if both are present
                            $cityMunicipalityCode = null;
                            if (isset($barangay['cityCode']) && $barangay['cityCode'] !== false) {
                                $cityMunicipalityCode = $barangay['cityCode'];
                            } elseif (isset($barangay['municipalityCode']) && $barangay['municipalityCode'] !== false) {
                                $cityMunicipalityCode = $barangay['municipalityCode'];
                            }
                            
                            // Skip if we don't have a valid city/municipality code
                            if (!$cityMunicipalityCode) {
                                continue;
                            }
                            
                            $batch[] = [
                                'barangay_code' => $barangay['code'],
                                'psgc_code' => $barangay['code'],
                                'barangay_name' => $barangay['name'],
                                'region_code' => $barangay['regionCode'],
                                'province_code' => $barangay['provinceCode'],
                                'city_municipality_code' => $cityMunicipalityCode,
                            ];
                            
                            // Process batch when it reaches the batch size
                            if (count($batch) >= $batchSize) {
                                foreach ($batch as $item) {
                                    Barangay::updateOrCreate(
                                        ['barangay_code' => $item['barangay_code']],
                                        $item
                                    );
                                }
                                $processedCount += count($batch);
                                echo "Processed $processedCount barangays so far...\n";
                                $batch = []; // Reset batch
                            }
                        }
                        
                        // Process remaining items in the batch
                        if (!empty($batch)) {
                            foreach ($batch as $item) {
                                Barangay::updateOrCreate(
                                    ['barangay_code' => $item['barangay_code']],
                                    $item
                                );
                            }
                            $processedCount += count($batch);
                        }
                        
                        echo "Successfully processed $processedCount barangays\n";
                        
                        // Check if there are more pages
                        $page++;
                        $hasMorePages = isset($data['next_page_url']) && $data['next_page_url'] !== null;
                        $success = true;
                    } else {
                        echo "Request failed with status: " . $response->status() . "\n";
                        $retryCount++;
                        if ($retryCount < $maxRetries) {
                            // Wait before retrying
                            echo "Retrying in 10 seconds...\n";
                            sleep(10);
                        }
                    }
                } catch (Exception $e) {
                    echo "Exception occurred: " . $e->getMessage() . "\n";
                    $retryCount++;
                    if ($retryCount < $maxRetries) {
                        // Wait before retrying
                        echo "Retrying in 10 seconds...\n";
                        sleep(10);
                    }
                }
            }
            
            // If we've exhausted retries, break the loop
            if (!$success) {
                echo "Failed to process province " . $province->province_name . " after $maxRetries retries\n";
                break;
            }
            
            // Add a small delay to reduce server load
            echo "Waiting 2 seconds before next request...\n";
            sleep(2);
        } while ($hasMorePages ?? false);
        
        echo "Finished processing province: " . $province->province_name . "\n\n";
    }
}