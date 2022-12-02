<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $users = User::latest()->filter([
            'keyword' => $request->keyword
        ])->paginate(10);
        $users->withPath('/');
        $message = 'Berhasil mengambil daftar pengguna';
        return response(['message' => $message, 'users' => $users]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $formFields = $request->validate([
            'name' => 'required|max:255',
            'role' => ['required', Rule::in(['admin', 'user']), 'max:255'],
            'username' => 'required|alpha_dash|max:255|unique:users,username',
            'password' => ['required', Password::min(8)],
            'identity' => 'required|max:255',
        ]);
        $formFields['password'] = bcrypt($formFields['password']);
        $user = User::create($formFields);
        $users = User::latest()->paginate(10);
        $users->withPath('/');
        $message = 'Berhasil menambahkan pengguna';

        return response([
            'message' => $message,
            'user' => $user,
            'users' => $users,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if (!$user = User::with('borrowers.book')->find($id)) {
            $message = 'Pengguna tidak ditemukan';
            return response(['message' => $message], 404);
        }
        $message = 'Berhasil mengambil pengguna';

        return response([
            'message' => $message,
            'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if (!$user = User::find($id)) {
            $message = 'Pengguna tidak ditemukan';
            return response(['message' => $message], 404);
        }
        $validationRules = [
            'name' => 'required|max:255',
            'role' => ['required', Rule::in(['admin', 'user']), 'max:255'],
            'password' => ['required', Password::min(8)],
            'identity' => 'required|max:255',
        ];
        if ($user->username !== $request->username) {
            $validationRules['username'] = 'required|alpha_dash|max:255|unique:users,username';
        } else $validationRules['username'] = 'required|alpha_dash|max:255';
        $formFields = $request->validate($validationRules);
        $formFields['password'] = bcrypt($formFields['password']);
        $user->update($formFields);
        $users = User::latest()->paginate(10);
        $users->withPath('/');
        $message = 'Berhasil mengubah pengguna';

        return response([
            'message' => $message,
            'user' => $user,
            'users' => $users,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (!$user = User::find($id)) {
            $message = 'Pengguna tidak ditemukan';
            return response(['message' => $message], 404);
        }
        $user->delete();
        $users = User::latest()->paginate(10);
        $users->withPath('/');
        $message = 'Berhasil menghapus pengguna';

        return response([
            'message' => $message,
            'users' => $users,
        ]);
    }
}
