import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { useAuthStore, useBookStore, useOrderStore } from "../../store";
import Alert from "../../components/Alert";
import Sidebar from "../../components/Sidebar";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";

const BookLists = () => {
    const [page, setPage] = useState(null);
    const [pageValue] = useDebounce(page, 200);
    const [keyword, setKeyword] = useState("");
    const [keywordValue] = useDebounce(keyword, 800);
    const {
        error: authErr, //
        message: authMsg,
        userLogin,
    } = useAuthStore();
    const {
        error: booksErr,
        message: booksMsg,
        books,
        getAllBooks,
    } = useBookStore();
    const {
        error: ordersErr,
        message: ordersMsg,
        createOrder,
        reset,
    } = useOrderStore();

    const orderHandler = async (id) => {
        if (confirm("Yakin ingin meminjam buku ini?")) {
            const formData = new FormData();
            formData.append("user_id", userLogin.id);
            formData.append("book_id", id);
            await createOrder(formData);
            setTimeout(reset, 3000);
        }
    };

    useEffect(() => {
        getAllBooks(pageValue, keywordValue);
    }, [pageValue]);

    useEffect(() => {
        if (pageValue !== 1) setPage(1);
        else getAllBooks(null, keywordValue);
    }, [keywordValue]);

    return (
        <Sidebar pageActive="booklists">
            <section className="p-4 md:p-8 lg:p-12">
                {authMsg !== "" ? (
                    <Alert success={!authErr}>{authMsg}</Alert>
                ) : null}
                {booksMsg !== "" ? (
                    <Alert success={!booksErr}>{booksMsg}</Alert>
                ) : null}
                {ordersMsg !== "" ? (
                    <Alert success={!ordersErr}>{ordersMsg}</Alert>
                ) : null}
                <div className="w-full h-auto mb-4 md:mb-6">
                    <Search
                        keyword={keyword}
                        setKeyword={setKeyword}
                        placeholder="Masukkan Kata Kunci.."
                    />
                </div>
                <div className="w-full h-auto grid gap-4 grid-cols-1 mb-4 md:gap-6 md:grid-cols-2 md:mb-6 lg:grid-cols-3">
                    {books.data.length === 0 && (
                        <div className="w-full h-auto col-span-1 md:col-span-2 lg:col-span-3">
                            <h2 className="text-2xl text-center text-slate-900 font-medium">
                                Buku Kosong
                            </h2>
                        </div>
                    )}
                    {books.data.map((b) => {
                        return (
                            <div
                                key={b.id}
                                className="w-full h-auto bg-white p-4 rounded-lg shadow-me"
                            >
                                <img
                                    className="w-full h-60 rounded-lg object-cover object-center mb-2"
                                    src={`/storage/${b.image}`}
                                    alt="Book Title"
                                />
                                <h2 className="w-full h-7 break-words text-center text-xl text-slate-900 font-medium overflow-auto mb-2">
                                    {b.title}
                                </h2>
                                <div className="w-full h-auto grid gap-2 grid-cols-2">
                                    <button
                                        type="button"
                                        className="button"
                                        onClick={() => orderHandler(b.id)}
                                    >
                                        Pinjam
                                    </button>
                                    <Link
                                        className="button"
                                        to={`/books/detail/${b.id}`}
                                    >
                                        Detail
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="w-full h-auto flex justify-center">
                    {books.links.length > 3 && (
                        <Pagination links={books.links} setPage={setPage} />
                    )}
                </div>
            </section>
        </Sidebar>
    );
};

export default BookLists;
