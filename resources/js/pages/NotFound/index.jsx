import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <section className="w-full h-screen bg-slate-300 flex justify-center items-center">
            <div className="text-center text-slate-900">
                <h2 className="text-9xl font-semibold">404</h2>
                <h5 className="text-xl font-medium">Halaman Tidak Ditemukan</h5>
                <Link className="text-xl text-blue-600 underline" to="/">
                    Kembali Ke Halaman Utama
                </Link>
            </div>
        </section>
    );
};

export default NotFound;
