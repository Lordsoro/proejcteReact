<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    function list()
    {
        return Product::all();
    }
    public function show($id)
    {
        return Product::findOrFail($id);
    }
}
