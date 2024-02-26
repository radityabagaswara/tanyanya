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
        Schema::create('donations', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('amount');
            $table->bigInteger('price');
            $table->text('message')->nullable();
            $table->text('answer')->nullable();
            $table->boolean('is_anon')->default(true);
            $table->enum('transaction_status', ['capture', 'settlement', 'pending', 'deny', 'cancel', 'expire', 'failure', 'refund', 'partial_refund', 'authorize'])->default('pending');
            $table->string('transaction_time')->nullable();
            $table->string('transaction_id', 255)->nullable();
            $table->string('payment_id', 255)->nullable();
            $table->string('snap_token', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donations');
    }
};
