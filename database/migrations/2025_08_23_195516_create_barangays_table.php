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
        Schema::create('barangays', function (Blueprint $table) {
            $table->id();
            $table->string('psgc_code', 10)->unique();
            $table->string('barangay_name', 100);
            $table->string('region_code', 10);
            $table->foreign('region_code')->references('region_code')->on('regions');
            $table->string('province_code', 10);
            $table->foreign('province_code')->references('province_code')->on('provinces');
            $table->string('city_municipality_code', 10);
            $table->foreign('city_municipality_code')->references('city_municipality_code')->on('cities_municipalities');
            $table->string('barangay_code', 10)->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('barangays');
    }
};
