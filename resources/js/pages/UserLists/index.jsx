import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { useAuthStore, useUserStore } from "../../store";
import Alert from "../../components/Alert";
import Sidebar from "../../components/Sidebar";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";

const UserLists = () => {
    const [page, setPage] = useState(null);
    const [pageValue] = useDebounce(page, 200);
    const [keyword, setKeyword] = useState("");
    const [keywordValue] = useDebounce(keyword, 800);
    const { userLogin } = useAuthStore();
    const {
        users, //
        error,
        message,
        getAllUsers,
        deleteUser,
        reset,
    } = useUserStore();

    useEffect(() => {
        getAllUsers(pageValue, keywordValue);
    }, [pageValue]);

    useEffect(() => {
        if (pageValue !== 1) setPage(1);
        else getAllUsers(null, keywordValue);
    }, [keywordValue]);

    const delUser = async (id) => {
        if (confirm("Yakin ingin menghapus pengguna ini?")) {
            if (id == userLogin.id) {
                return alert("Tidak bisa menghapus pengguna yang login.");
            }
            await deleteUser(id);
            setTimeout(reset, 3000);
        }
    };

    return (
        <Sidebar pageActive="userlists">
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
                                    Nama Lengkap
                                </th>
                                <th className="text-left text-white text-xl font-medium py-2 px-4">
                                    Nama Pengguna
                                </th>
                                <th className="text-left text-white text-xl font-medium py-2 px-4">
                                    Identitas
                                </th>
                                <th className="text-left text-white text-xl font-medium py-2 px-4">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.length === 0 && (
                                <tr className="bg-white border border-slate-400">
                                    <td
                                        className="text-center text-slate-900 text-xl font-medium py-2 px-4"
                                        colSpan={4}
                                    >
                                        Pengguna Kosong
                                    </td>
                                </tr>
                            )}
                            {users.data.map((u) => {
                                return (
                                    <tr
                                        key={u.id}
                                        className="bg-white border border-slate-400"
                                    >
                                        <td className="text-slate-700 text-xl font-medium py-2 px-4">
                                            {u.name}
                                        </td>
                                        <td className="text-slate-700 text-xl font-medium py-2 px-4">
                                            {u.username}
                                        </td>
                                        <td className="text-slate-700 text-xl font-medium py-2 px-4">
                                            {u.identity}
                                        </td>
                                        <td className="py-2 px-4 flex flex-wrap">
                                            {u.id == userLogin.id ? (
                                                <button
                                                    type="button"
                                                    className="bg-emerald-600 buttonaction mr-2"
                                                    onClick={() => {
                                                        alert(
                                                            "Tidak bisa mengubah pengguna yang login."
                                                        );
                                                    }}
                                                >
                                                    🖉
                                                </button>
                                            ) : (
                                                <Link
                                                    to={`/users/update/${u.id}`}
                                                    className="bg-emerald-600 buttonaction mr-2"
                                                >
                                                    🖉
                                                </Link>
                                            )}
                                            <button
                                                type="button"
                                                className="bg-red-600 buttonaction px-3.5"
                                                onClick={() => delUser(u.id)}
                                            >
                                                ⌫
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="w-full h-auto flex justify-center">
                    {users.links.length > 3 && (
                        <Pagination links={users.links} setPage={setPage} />
                    )}
                </div>
            </section>
        </Sidebar>
    );
};

export default UserLists;
