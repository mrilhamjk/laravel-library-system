import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useBorrowerStore } from "../../store";
import Alert from "../../components/Alert";
import Sidebar from "../../components/Sidebar";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";

const BorrowerLists = () => {
    const [page, setPage] = useState(null);
    const [pageValue] = useDebounce(page, 200);
    const [keyword, setKeyword] = useState("");
    const [keywordValue] = useDebounce(keyword, 800);
    const {
        error,
        message,
        borrowers,
        getAllBorrowers,
        deleteBorrower,
        reset,
    } = useBorrowerStore();

    useEffect(() => {
        getAllBorrowers(pageValue, keywordValue);
    }, [pageValue]);

    useEffect(() => {
        if (pageValue !== 1) setPage(1);
        else getAllBorrowers(null, keywordValue);
    }, [keywordValue]);

    const confirmBorrower = async (id) => {
        if (confirm("Yakin ingin mengonfirmasi peminjam ini?")) {
            await deleteBorrower(id);
            await getAllBorrowers(null, keywordValue);
            setTimeout(reset, 3000);
        }
    };

    return (
        <Sidebar pageActive="borrowerlists">
            <section className="p-4 md:p-8 lg:p-12">
                {message !== "" ? (
                    <Alert success={!error}>{message}</Alert>
                ) : null}
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
                                    Tanggal Pinjam
                                </th>
                                <th className="text-left text-white text-xl font-medium py-2 px-4">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {borrowers.data.length === 0 && (
                                <tr className="bg-white border border-slate-400">
                                    <td
                                        className="text-center text-slate-900 text-xl font-medium py-2 px-4"
                                        colSpan={4}
                                    >
                                        Peminjam Kosong
                                    </td>
                                </tr>
                            )}
                            {borrowers.data.map((b) => {
                                return (
                                    <tr
                                        key={b.id}
                                        className="bg-white border border-slate-400"
                                    >
                                        <td className="text-slate-700 text-xl font-medium py-2 px-4">
                                            {b.user.name}
                                        </td>
                                        <td className="text-slate-700 text-xl font-medium py-2 px-4">
                                            {b.book.title}
                                        </td>
                                        <td className="text-slate-700 text-xl font-medium py-2 px-4">
                                            {new Date(
                                                b.created_at
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="py-2 px-4">
                                            <button
                                                type="button"
                                                className="bg-emerald-600 buttonaction"
                                                onClick={() => {
                                                    confirmBorrower(b.id);
                                                }}
                                            >
                                                <span className="mr-2">✓</span>
                                                <span className="font-medium">
                                                    Konfirmasi
                                                </span>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="w-full h-auto flex justify-center">
                    {borrowers.links.length > 3 && (
                        <Pagination links={borrowers.links} setPage={setPage} />
                    )}
                </div>
            </section>
        </Sidebar>
    );
};

export default BorrowerLists;
