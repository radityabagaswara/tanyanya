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
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->string('header', 255)->nullable();
            $table->string('username', 45);
            $table->text('bio')->nullable();
            $table->bigInteger('price_per_unit')->default(1000);
            $table->boolean("is_accepting_dono")->default(false);
            $table->boolean("allow_anon_dono")->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pages');
    }
};
