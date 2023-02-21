<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\http\Controllers\UserController;
use App\http\Controllers\ProductController;
use App\http\Controllers\PedidoController;


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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//primer parametro es la ruta el segon el nom de la funció
Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);
Route::post('pedido', [PedidoController::class, 'register'])->middleware('auth');
Route::get('list', [ProductController::class, 'list']);
Route::get('list/{id}', [ProductController::class, 'show']);

Route::get('/user', function () {
    return response()->json(['user' => auth()->user()]);
});
