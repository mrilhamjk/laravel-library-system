import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";

const UserLists = () => {
    const page = useSearchParams()[0].get("page") ?? 1;
    const [keyword, setKeyword] = useState("");
    const [users] = useState([
        {
            name: "Ilham Jaya Kusuma",
            username: "mrilhamjk",
            identity: "NISN 123456789, No. Absen 17",
        },
        {
            name: "Ilham Jaya Kusuma",
            username: "mrilhamjk",
            identity: "NISN 123456789, No. Absen 17",
        },
        {
            name: "Ilham Jaya Kusuma",
            username: "mrilhamjk",
            identity: "NISN 123456789, No. Absen 17",
        },
    ]);

    return (
        <Sidebar pageActive="userlists">
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
                            {users.map((u, i) => {
                                return (
                                    <tr
                                        key={i}
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
                                            <Link
                                                to={`/users/update/${i + 1}`}
                                                className="bg-emerald-600 buttonaction mr-2"
                                            >
                                                🖉
                                            </Link>
                                            <button
                                                type="button"
                                                className="bg-red-600 buttonaction px-3.5"
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
                    <Pagination data={users} page={page} basePath="/users" />
                </div>
            </section>
        </Sidebar>
    );
};

export default UserLists;
