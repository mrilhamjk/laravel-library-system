import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthStore, useBookStore, useOrderStore } from "../../store";
import Sidebar from "../../components/Sidebar";
import Loading from "../../components/Loading";

const BookDetail = () => {
    const { bookId } = useParams();
    const [loading, setLoading] = useState(true);
    const {
        books,
        error: booksErr,
        message: booksMsg,
        deleteBook,
        reset: booksReset,
    } = useBookStore();
    const {
        error: ordersErr,
        message: ordersMsg,
        createOrder,
        reset: ordersReset,
    } = useOrderStore();
    const [book, setBook] = useState(null);
    const { userLogin } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        const bookDetail = books.data.find((b) => {
            return b.id == bookId;
        });
        if (bookDetail) {
            setBook(bookDetail);
            setLoading(false);
        } else navigate("/");
    }, [books.data, bookId, setBook, setLoading, navigate]);

    useEffect(() => {
        if (!booksErr && booksMsg !== "") {
            navigate("/");
        }
    }, [booksErr, booksMsg, navigate]);

    useEffect(() => {
        if (!ordersErr && ordersMsg !== "") {
            navigate("/");
        }
    }, [ordersErr, ordersMsg, navigate]);

    const orderHandler = async (id) => {
        if (confirm("Yakin ingin meminjam buku ini?")) {
            const formData = new FormData();
            formData.append("user_id", userLogin.id);
            formData.append("book_id", id);
            await createOrder(formData);
            setTimeout(ordersReset, 3000);
        }
    };

    const deleteHandler = async (bookId) => {
        if (confirm("Yakin ingin menghapus buku ini?")) {
            await deleteBook(bookId);
            setTimeout(booksReset, 3000);
        }
    };

    if (loading) return <Loading />;

    return (
        <Sidebar pageActive="booklists">
            <section className="p-4 md:p-8 lg:p-12">
                <div className="w-full h-auto bg-white p-4 rounded-lg shadow-me md:p-6 lg:p-8 lg:grid lg:grid-cols-2 lg:gap-8">
                    <img
                        className="w-full h-60 rounded-lg object-cover object-center mb-2 md:h-72 md:mb-4 lg:h-96 lg:mb-0"
                        src={`/storage/${book.image}`}
                        alt="Book Title"
                    />
                    <div className="w-full h-auto">
                        <h2 className="text-2xl text-slate-900 uppercase font-semibold mb-2 md:text-4xl">
                            {book.title}
                        </h2>
                        <h4 className="text-lg text-slate-700 font-medium mb-2">
                            Tahun Terbit :<br />
                            {book.publication_year}
                        </h4>
                        <h4 className="text-lg text-slate-700 font-medium mb-2">
                            Penerbit :<br />
                            {book.publisher}
                        </h4>
                        <h4 className="text-lg text-slate-700 font-medium mb-2">
                            Pengarang :<br />
                            {book.author}
                        </h4>
                        <p className="text-xl text-slate-800 font-medium mb-2">
                            Deskripsi :<br />
                            {book.description}
                        </p>
                        <div className="w-full h-auto grid gap-2 grid-cols-2 lg:max-w-xs">
                            <button
                                type="button"
                                className="button"
                                onClick={() => orderHandler(book.id)}
                            >
                                Pinjam
                            </button>
                            <Link className="button" to="/">
                                Kembali
                            </Link>
                            {userLogin.role === "admin" ? (
                                <>
                                    <Link
                                        className="button"
                                        to={`/books/update/${book.id}`}
                                    >
                                        Ubah
                                    </Link>
                                    <button
                                        type="button"
                                        className="button"
                                        onClick={() => deleteHandler(book.id)}
                                    >
                                        Hapus
                                    </button>
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            </section>
        </Sidebar>
    );
};

export default BookDetail;
