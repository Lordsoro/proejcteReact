<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Product;

class Pedido extends Model
{
    use HasFactory;
    protected $table = 'pedido';
    protected $fillable = [
        'id', 'user_id', 'product_id', 'quantity', 'size', 'total'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function product()
    {
        return $this->hasMany(Product::class);
    }
}
