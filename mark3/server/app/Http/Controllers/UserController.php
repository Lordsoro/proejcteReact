<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;
//importar el modelo
use App\Models\User;
//per a cifrar contraseñes
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    function register(Request $req)
    {
        $user = new User;
        $user->user = $req->input('user');
        $user->email = $req->input('email');
        $user->password = Hash::make($req->input('password'));
        $user->country = $req->input('country');
        $validator = Validator::make(
            ['email' => $user->email],
            ['email' => 'unique:users,email']
        );

        if ($validator->fails()) {
            return response()->json(['success' => false, 'error' => 'El email ya esta en uso, tiene Cuenta? haz login']);
        } else {
            $user->save();
            return response()->json(['success' => true, $user]);
        }
    }
    public function login(Request $request)
    {
        $credenciales = $request->only('email', 'password');
        if (Auth::attempt($credenciales)) {
            $user = Auth::user();
            $name = $user->user;
            $id = $user->id;
            return response()->json(['success' => true, 'name' => $name, 'id' => $id]);
        } else {
            return response()->json(['success' => false, 'error' => 'Credenciales no validas']);
        }
    }
}
