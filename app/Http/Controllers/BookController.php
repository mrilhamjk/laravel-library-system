<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $books = Book::latest()->filter([
            'keyword' => $request->keyword
        ])->paginate(9);
        $books->withPath('/');
        $message = 'Berhasil mengambil daftar buku';

        return response([
            'message' => $message,
            'books' => $books,
        ]);
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
            'title' => 'required|max:255',
            'author' => 'required|max:255',
            'publisher' => 'required|max:255',
            'publication_year' => 'required|integer|between:1901,2099',
            'description' => 'required',
            'image' => 'required|image|max:2000',
        ]);
        $formFields['image'] = $request
            ->file('image')->store('uploads');
        $book = Book::create($formFields);
        $books = Book::latest()->paginate(9);
        $books->withPath('/');
        $message = 'Berhasil menambahkan buku';

        return response([
            'message' => $message,
            'book' => $book,
            'books' => $books,
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $book = Book::find($id);
        if (!$book) {
            $message = 'Buku tidak ditemukan';
            return response(['message' => $message], 404);
        }
        $message = 'Berhasil mengambil buku';

        return response([
            'message' => $message,
            'book' => $book,
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
        $book = Book::find($id);
        if (!$book) {
            $message = 'Buku tidak ditemukan';
            return response(['message' => $message], 404);
        }
        $validationRules = [
            'title' => 'required|max:255',
            'author' => 'required|max:255',
            'publisher' => 'required|max:255',
            'publication_year' => 'required|integer|between:1901,2099',
            'description' => 'required',
        ];
        if ($request->hasFile('image')) {
            $validationRules['image'] = 'required|image|max:2000';
        }
        $formFields = $request->validate($validationRules);
        if (isset($formFields['image'])) {
            $formFields['image'] = $request
                ->file('image')->store('uploads');
            Storage::delete($book->image);
        }
        $book->update($formFields);
        $books = Book::latest()->paginate(9);
        $books->withPath('/');
        $message = 'Berhasil mengubah buku';

        return response([
            'message' => $message,
            'book' => $book,
            'books' => $books,
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
        $book = Book::find($id);
        if (!$book) {
            $message = 'Buku tidak ditemukan';
            return response(['message' => $message], 404);
        }
        Storage::delete($book->image);
        $book->delete();
        $books = Book::latest()->paginate(9);
        $books->withPath('/');
        $message = 'Berhasil menghapus buku';

        return response([
            'message' => $message,
            'books' => $books,
        ]);
    }
}
