<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('companies', function (Blueprint $table) {
            // Remove the old address field
            $table->dropColumn('address');
            
            // Add new address fields
            $table->string('address_line', 255)->nullable();
            $table->string('region_code', 10)->nullable();
            $table->string('province_code', 10)->nullable();
            $table->string('city_municipality_code', 10)->nullable();
            $table->string('barangay_code', 10)->nullable();
            
            // Add foreign key constraints
            $table->foreign('region_code')->references('region_code')->on('regions')->onDelete('set null');
            $table->foreign('province_code')->references('province_code')->on('provinces')->onDelete('set null');
            $table->foreign('city_municipality_code')->references('city_municipality_code')->on('cities_municipalities')->onDelete('set null');
            $table->foreign('barangay_code')->references('barangay_code')->on('barangays')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('companies', function (Blueprint $table) {
            // Drop foreign key constraints first
            $table->dropForeign(['region_code']);
            $table->dropForeign(['province_code']);
            $table->dropForeign(['city_municipality_code']);
            $table->dropForeign(['barangay_code']);
            
            // Drop new address fields
            $table->dropColumn(['address_line', 'region_code', 'province_code', 'city_municipality_code', 'barangay_code']);
            
            // Add back the old address field
            $table->string('address', 25);
        });
    }
};
