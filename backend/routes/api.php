<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\DiaryController;
use App\Http\Controllers\ProfileController;

Route::middleware(['auth:sanctum'])->group(function() {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::resource('diaries', DiaryController::class);
    Route::get('profile', [ProfileController::class, 'show']);
    Route::put('profile', [ProfileController::class, 'update']);
    Route::put('profile/password', [ProfileController::class, 'changePassword']);
});
