import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import ImgBook1 from "../../images/book1.jpg";

const BookDetail = () => {
    const { bookId } = useParams();
    const [user] = useState({ role: "admin" });

    return (
        <Sidebar pageActive="booklists">
            <section className="p-4 md:p-8 lg:p-12">
                <div className="w-full h-auto bg-white p-4 rounded-lg shadow-me md:p-6 lg:p-8 lg:grid lg:grid-cols-2 lg:gap-8">
                    <img
                        className="w-full h-60 rounded-lg object-cover object-center mb-2 md:h-72 md:mb-4 lg:h-96 lg:mb-0"
                        src={ImgBook1}
                        alt="Book Title"
                    />
                    <div className="w-full h-auto">
                        <h2 className="text-2xl text-slate-900 uppercase font-semibold mb-2 md:text-4xl">
                            Cara mencintai alam dengan baik dan benar
                        </h2>
                        <h4 className="text-lg text-slate-700 font-medium mb-2">
                            Tahun Terbit :<br />
                            2022
                        </h4>
                        <h4 className="text-lg text-slate-700 font-medium mb-2">
                            Penerbit :<br />
                            Gramedia Pustaka Pelita
                        </h4>
                        <h4 className="text-lg text-slate-700 font-medium mb-2">
                            Pengarang :<br />
                            Gramedia Pustaka Pelita
                        </h4>
                        <p className="text-xl text-slate-800 font-medium mb-2">
                            Deskripsi :<br />
                            Alam adalah hal yang sangat penting dalam kehidupan.
                            Mau bagaimanapun kita harus menjaga alam dengan baik
                            dan benar. Tapi untuk menjaga alam kita harus tau
                            bagaimana caranya. Ini adalah buku agar kamu dapat
                            mencintai alam dengan baik dan benar
                        </p>
                        <div className="w-full h-auto grid gap-2 grid-cols-2 lg:max-w-xs">
                            <button type="button" className="button">
                                Pinjam
                            </button>
                            <Link className="button" to="/">
                                Kembali
                            </Link>
                            {user.role === "admin" ? (
                                <>
                                    <Link
                                        className="button"
                                        to="/books/update/1"
                                    >
                                        Ubah
                                    </Link>
                                    <button type="button" className="button">
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
