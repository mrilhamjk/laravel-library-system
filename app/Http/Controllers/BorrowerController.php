<?php

namespace App\Http\Controllers;

use App\Models\Borrower;
use App\Models\Order;
use Illuminate\Http\Request;

class BorrowerController extends Controller
{
    public function index(Request $request)
    {
        $filters = ['keyword' => $request->keyword];
        $borrowers = Borrower::latest()->filter($filters)
            ->with(['user', 'book'])->paginate(10);
        $borrowers->withPath('/borrowers');
        $message = 'Berhasil mengambil daftar peminjam';

        return response([
            'message' => $message,
            'borrowers' => $borrowers,
        ]);
    }

    public function store(Request $request)
    {
        $formFields = $request->validate([
            'order_id' => 'required',
        ]);

        if (!$order = Order::find($formFields['order_id'])) {
            return response(['message' => 'Order tidak ditemukan'], 404);
        }
        $order->delete();
        $borrower = Borrower::create([
            'user_id' => $order->user_id,
            'book_id' => $order->book_id,
        ]);
        $borrowers = Borrower::latest()
            ->with(['user', 'book'])
            ->paginate(10);
        $borrowers->withPath('/bor$borrowers');
        $message = 'Berhasil menambah peminjam buku';

        return response([
            'message' => $message,
            'borrower' => $borrower,
            'borrowers' => $borrowers,
        ], 201);
    }

    public function destroy($id)
    {
        if (!$borrower = Borrower::find($id)) {
            return response([
                'message' => 'Peminjam tidak ditemukan'
            ], 404);
        }

        $borrower->delete();
        $borrowers = Borrower::latest()
            ->with(['user', 'book'])
            ->paginate(10);
        $borrowers->withPath('/borrowers');
        $message = 'Berhasil mengonfirmasi peminjam buku';

        return response([
            'message' => $message,
            'borrowers' => $borrowers,
        ], 200);
    }
}
