<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use App\Models\Pedido;
use App\Models\User;
use App\Models\Product;
use Illuminate\Http\Request;

class PedidoController extends Controller
{
    function register(Request $req)
    {
        $pedido = new Pedido;
        $pedido->user_id = $req->input('user_id');
        $pedido->product_id = $req->input('product_id');
        $pedido->quantity = $req->input('quantity');
        $pedido->size = $req->input('size');

        $product = Product::find($req->input('product_id'));
        $pedido->total = $product->price * $pedido->quantity;
        Log::info($req->header('Content-Type'));
        $pedido->save();
    }
}
