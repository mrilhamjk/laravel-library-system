import { useEffect } from "react";
import { useAuthStore } from "../../store";
import Sidebar from "../../components/Sidebar";

const UserProfile = () => {
    const { userLogin, setUserLogin } = useAuthStore();

    useEffect(() => {
        setUserLogin();
    }, []);

    return (
        <Sidebar pageActive="userprofile">
            <section className="p-4 md:p-8 lg:p-12">
                <div className="w-full h-auto bg-white mb-4 p-4 rounded-lg shadow-me md:mb-6 md:p-6 md:flex lg:p-8">
                    <div className="w-full h-auto">
                        <h2 className="text-3xl text-slate-700 uppercase font-semibold mb-2">
                            NAMA LENGKAP
                        </h2>
                        <p className="text-lg text-slate-700 mb-4 md:mb-8">
                            {userLogin.name}
                        </p>
                        <h2 className="text-3xl text-slate-700 uppercase font-semibold mb-2">
                            NAMA PENGGUNA
                        </h2>
                        <p className="text-lg text-slate-700 mb-4">
                            {userLogin.username}
                        </p>
                    </div>
                    <div className="w-full h-auto">
                        <h2 className="text-3xl text-slate-700 uppercase font-semibold mb-2">
                            IDENTITAS DIRI
                        </h2>
                        <ul className="list-disc pl-6 text-lg text-slate-700">
                            {userLogin.identity
                                .replace(/,\s*$/, "")
                                .split(",")
                                .map((ui, index) => {
                                    return <li key={index}>{ui}</li>;
                                })}
                        </ul>
                    </div>
                </div>
                <div className="w-full h-auto bg-white rounded-lg shadow-me overflow-auto">
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
                            </tr>
                        </thead>
                        <tbody>
                            {userLogin.borrowers.length === 0 && (
                                <tr className="bg-white border border-slate-400">
                                    <td
                                        className="text-center text-slate-900 text-xl font-medium py-2 px-4"
                                        colSpan={3}
                                    >
                                        Pinjaman Kosong
                                    </td>
                                </tr>
                            )}
                            {userLogin.borrowers.map((b, i) => {
                                return (
                                    <tr
                                        key={i}
                                        className="bg-white border border-slate-400"
                                    >
                                        <td className="text-slate-700 text-xl font-medium py-2 px-4">
                                            {userLogin.name}
                                        </td>
                                        <td className="text-slate-700 text-xl font-medium py-2 px-4">
                                            {b.book.title}
                                        </td>
                                        <td className="text-slate-700 text-xl font-medium py-2 px-4">
                                            {new Date(
                                                b.created_at
                                            ).toLocaleDateString()}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
        </Sidebar>
    );
};

export default UserProfile;
