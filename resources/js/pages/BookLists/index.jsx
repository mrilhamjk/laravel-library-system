import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";
import ImgBook1 from "../../images/book1.jpg";
import ImgBook2 from "../../images/book2.jpg";
import ImgBook3 from "../../images/book3.jpg";

const BookLists = () => {
    const page = useSearchParams()[0].get("page") ?? 1;
    const [keyword, setKeyword] = useState("");
    const [books] = useState([
        { img: ImgBook1 },
        { img: ImgBook2 },
        { img: ImgBook3 },
    ]);

    return (
        <Sidebar pageActive="booklists">
            <section className="p-4 md:p-8 lg:p-12">
                <div className="w-full h-auto mb-4 md:mb-6">
                    <Search
                        keyword={keyword}
                        setKeyword={setKeyword}
                        placeholder="Masukkan Kata Kunci.."
                    />
                </div>
                <div className="w-full h-auto grid gap-4 grid-cols-1 mb-4 md:gap-6 md:grid-cols-2 md:mb-6 lg:grid-cols-3">
                    {books.map((b, i) => {
                        return (
                            <div
                                key={i}
                                className="w-full h-auto bg-white p-4 rounded-lg shadow-me"
                            >
                                <img
                                    className="w-full h-60 rounded-lg object-cover object-center mb-2"
                                    src={b.img}
                                    alt="Book Title"
                                />
                                <h2 className="w-full h-7 break-words text-center text-xl text-slate-900 font-medium overflow-auto mb-2">
                                    Cara mencintai alam dengan baik dan benar
                                </h2>
                                <div className="w-full h-auto grid gap-2 grid-cols-2">
                                    <button type="button" className="button">
                                        Pinjam
                                    </button>
                                    <Link
                                        className="button"
                                        to={`/books/detail/${i + 1}`}
                                    >
                                        Detail
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="w-full h-auto flex justify-center">
                    <Pagination data={books} page={page} basePath="/" />
                </div>
            </section>
        </Sidebar>
    );
};

export default BookLists;
