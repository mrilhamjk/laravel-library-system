<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\BorrowerController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::apiResource('books', BookController::class);
Route::controller(OrderController::class)
    ->group(function () {
        Route::get('orders', 'index');
        Route::post('orders', 'store');
    });
Route::controller(BorrowerController::class)
    ->group(function () {
        Route::get('borrowers', 'index');
        Route::post('borrowers', 'store');
    });
Route::group(['middleware' => 'api'], function () {
    Route::controller(AuthController::class)
        ->group(function () {
            Route::post('login', 'login');
            Route::post('logout', 'logout');
            Route::get('refresh', 'refresh');
            Route::get('me', 'me');
        });
});
