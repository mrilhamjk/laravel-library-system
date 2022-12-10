import { useEffect, useState } from "react";
import {
    useLoadingStore, //
    useAuthStore, //
    useBookStore, //
    useOrderStore, //
    useBorrowerStore,
    useUserStore, //
} from "../../store";
import Alert from "../../components/Alert";
import ImgLogo from "../../images/MLiby.svg";

const Login = () => {
    const {
        error, //
        message,
        formData,
        login,
        setUserLogin,
        reset,
    } = useAuthStore();
    const { getAllBooks } = useBookStore();
    const { getAllOrders } = useOrderStore();
    const { getAllBorrowers } = useBorrowerStore();
    const { getAllUsers } = useUserStore();
    const { setLoading } = useLoadingStore();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        setLoading(true);
        await login(formData);
        await setUserLogin();
        await getAllBooks();
        await getAllOrders();
        await getAllBorrowers();
        await getAllUsers();
        setTimeout(reset, 3000);
        setLoading(false);
    };

    useEffect(() => {
        if (formData) {
            setUsername(formData.username);
            setPassword(formData.password);
        }
    }, [formData, setUsername, setPassword]);

    return (
        <main className="w-full h-screen bg-slate-300 p-4 flex justify-center items-center">
            <section className="w-full h-auto md:max-w-[500px]">
                {message !== "" && <Alert success={!error}>{message}</Alert>}
                <div className="w-full h-auto bg-white p-4 rounded-lg shadow-me md:p-6 lg:p-8">
                    <div className="flex justify-center items-center mb-4 mx-auto md:mb-6">
                        <img
                            className="w-10 h-10 mr-1"
                            src={ImgLogo}
                            alt="MLiby.com"
                        />
                        <span className="text-blue-600 text-2xl font-semibold">
                            MLiby.com
                        </span>
                    </div>
                    <form onSubmit={loginHandler} className="w-full h-auto">
                        <div className="mb-4 md:mb-6">
                            <input
                                type="text"
                                value={username}
                                className="forminput"
                                onChange={(i) => setUsername(i.target.value)}
                                placeholder="Masukkan Nama Pengguna.."
                            />
                        </div>
                        <div className="mb-4 md:mb-6">
                            <input
                                type="password"
                                value={password}
                                className="forminput"
                                onChange={(i) => setPassword(i.target.value)}
                                placeholder="Masukkan Kata Sandi.."
                            />
                        </div>
                        <button type="submit" className="button normal-case">
                            Login
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default Login;
