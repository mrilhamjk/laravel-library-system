import { useState } from "react";
import { Link } from "react-router-dom";
import {
    useLoadingStore, //
    useAuthStore, //
    useBookStore, //
    useOrderStore, //
    useBorrowerStore, //
    useUserStore, //
} from "../../store";
import NavLink from "../NavLink";
import ImgLogo from "../../images/MLiby.svg";

const Sidebar = ({ pageActive, children }) => {
    const { userLogin, logout, resetAuth, reset } = useAuthStore();
    const { resetBooks } = useBookStore();
    const { resetOrders } = useOrderStore();
    const { resetBorrowers } = useBorrowerStore();
    const { resetUsers } = useUserStore();
    const { setLoading } = useLoadingStore();
    const [navHide, setNavHide] = useState(true);
    const navLinks = [
        {
            link: "/",
            active: "booklists",
            text: "Daftar Buku",
            role: "user",
        },
        {
            link: "/books/create",
            active: "bookcreate",
            text: "Tambah Buku",
        },
        {
            link: "/orders",
            active: "orderlists",
            text: "Order Buku",
        },
        {
            link: "/borrowers",
            active: "borrowerlists",
            text: "Daftar Peminjam",
        },
        {
            link: "/users",
            active: "userlists",
            text: "Daftar Pengguna",
        },
        {
            link: "/users/create",
            active: "usercreate",
            text: "Tambah Pengguna",
        },
        {
            link: "/users/profile",
            active: "userprofile",
            text: "Profil Pengguna",
            role: "user",
        },
    ];

    const logoutHandler = async () => {
        setLoading(true);
        await logout();
        resetAuth();
        resetBooks();
        resetOrders();
        resetBorrowers();
        resetUsers();
        setTimeout(reset, 3000);
        setLoading(false);
    };

    return (
        <div className="w-full h-auto">
            <header className="w-full h-auto bg-white flex justify-between items-center shadow-me py-2 px-4 fixed top-0 left-0 z-[999] lg:justify-start">
                <Link to={"/"} className="flex justify-start items-center">
                    <img
                        className="w-10 h-10 mr-1"
                        src={ImgLogo}
                        alt="MLiby.com"
                    />
                    <span className="text-blue-600 text-2xl font-semibold">
                        MLiby.com
                    </span>
                </Link>
                <button
                    type="button"
                    className="w-8 h-8 grid gap-1 grid-cols-3 lg:hidden"
                    onClick={() => setNavHide(!navHide)}
                >
                    <div className="w-full h-full bg-slate-900"></div>
                    <div className="w-full h-full bg-slate-900"></div>
                    <div className="w-full h-full bg-slate-900"></div>
                    <div className="w-full h-full bg-slate-900"></div>
                    <div className="w-full h-full bg-slate-900"></div>
                    <div className="w-full h-full bg-slate-900"></div>
                    <div className="w-full h-full bg-slate-900"></div>
                    <div className="w-full h-full bg-slate-900"></div>
                    <div className="w-full h-full bg-slate-900"></div>
                </button>
            </header>
            <nav className={navHide ? "navside" : "navside active"}>
                {navLinks.map((n, i) => {
                    return (
                        <NavLink
                            key={i}
                            user={userLogin}
                            pageActive={pageActive}
                            active={n.active}
                            role={n.role}
                            link={n.link}
                        >
                            {n.text}
                        </NavLink>
                    );
                })}
                <button
                    type="button"
                    className="navlink"
                    onClick={logoutHandler}
                >
                    Keluar
                </button>
            </nav>
            <main className="w-full h-screen bg-slate-300 pt-14 overflow-auto absolute top-0 right-0 z-[997] lg:w-4/5">
                {children}
            </main>
        </div>
    );
};

export default Sidebar;
