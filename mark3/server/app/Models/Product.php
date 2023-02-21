<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Pedido;

class Product extends Model
{
    use HasFactory;
    function addProduct()
    {
        return "añadiendo...";
    }
    function pedido()
    {
        return $this->belongsTo(Pedido::class);
    }
}
