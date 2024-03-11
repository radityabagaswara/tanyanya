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
        Schema::create('targets', function (Blueprint $table) {
            $table->id();
            $table->string('name', 45);
            $table->string('description', 255)->nullable();
            $table->bigInteger('taget_ammount');
            $table->bigInteger('current_ammount')->default(0);
            $table->foreignId('pages_id')->constrained('pages');
            $table->boolean('is_active')->default(true);
            $table->boolean('is_achived')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('targets');
    }
};
