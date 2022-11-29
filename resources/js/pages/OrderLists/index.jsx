import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";

const OrderLists = () => {
    const page = useSearchParams()[0].get("page") ?? 1;
    const [keyword, setKeyword] = useState("");
    const [orders] = useState([
        { name: "Ilham Jaya Kusuma", book_title: "Cara mencintai alam" },
        { name: "Ilham Jaya Kusuma", book_title: "Cara mencintai alam" },
        { name: "Ilham Jaya Kusuma", book_title: "Cara mencintai alam" },
    ]);

    return (
        <Sidebar pageActive="orderlists">
            <section className="p-4 md:p-8 lg:p-12">
                <div className="w-full h-auto mb-4 md:mb-6">
                    <Search
                        keyword={keyword}
                        setKeyword={setKeyword}
                        placeholder="Masukkan Kata Kunci.."
                    />
                </div>
                <div className="w-full h-auto bg-white mb-4 rounded-lg shadow-me overflow-auto md:mb-6">
                    <table className="w-full h-auto border border-slate-400 rounded-lg">
                        <thead>
                            <tr className="bg-blue-600 border border-slate-400">
                                <th className="text-left text-white text-xl font-medium py-2 px-4">
                                    Nama Peminjam
                                </th>
                                <th className="text-left text-white text-xl font-medium py-2 px-4">
                                    Judul Buku
                                </th>
                                <th className="text-left text-white text-xl font-medium py-2 px-4">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((o, i) => {
                                return (
                                    <tr
                                        key={i}
                                        className="bg-white border border-slate-400"
                                    >
                                        <td className="text-slate-700 text-xl font-medium py-2 px-4">
                                            {o.name}
                                        </td>
                                        <td className="text-slate-700 text-xl font-medium py-2 px-4">
                                            {o.book_title}
                                        </td>
                                        <td className="py-2 px-4">
                                            <button
                                                type="button"
                                                className="bg-emerald-600 buttonaction mr-2"
                                            >
                                                ✓
                                            </button>
                                            <button
                                                type="button"
                                                className="bg-red-600 buttonaction"
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="w-full h-auto flex justify-center">
                    <Pagination data={orders} page={page} basePath="/orders" />
                </div>
            </section>
        </Sidebar>
    );
};

export default OrderLists;
