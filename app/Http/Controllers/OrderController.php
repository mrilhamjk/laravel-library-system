<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $filters = ['keyword' => $request->keyword];
        $orders = Order::latest()->filter($filters)
            ->with(['user', 'book'])->paginate(10);
        $orders->withPath('/orders');
        $message = 'Berhasil mengambil daftar order';

        return response([
            'message' => $message,
            'orders' => $orders,
        ]);
    }

    public function store(Request $request)
    {
        $formFields = $request->validate([
            'user_id' => 'required',
            'book_id' => 'required',
        ]);

        if (!$user = User::find($formFields['user_id'])) {
            return response(['message' => 'Pengguna tidak ditemukan'], 404);
        }
        if (!$book = Book::find($formFields['book_id'])) {
            return response(['message' => 'Buku tidak ditemukan'], 404);
        }

        $order = Order::create([
            'user_id' => $user->id,
            'book_id' => $book->id,
        ]);
        $orders = Order::latest()
            ->with(['user', 'book'])
            ->paginate(10);
        $orders->withPath('/orders');
        $message = 'Berhasil menambah order buku';

        return response([
            'message' => $message,
            'order' => $order,
            'orders' => $orders,
        ], 201);
    }

    public function destroy($id)
    {
        if (!$order = Order::find($id)) {
            return response([
                'message' => 'Buku tidak ditemukan'
            ], 404);
        }

        $order->delete();
        $orders = Order::latest()
            ->with(['user', 'book'])
            ->paginate(10);
        $orders->withPath('/orders');
        $message = 'Berhasil menghapus order buku';

        return response([
            'message' => $message,
            'orders' => $orders,
        ], 200);
    }
}
