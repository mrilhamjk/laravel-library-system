import { useState } from "react";
import ImgLogo from "../../images/MLiby.svg";

const Login = () => {
    const [userData, setUserData] = useState({
        username: { value: "", message: null },
        password: { value: "", message: null },
    });

    const formHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("username", userData.username.value);
        formData.append("password", userData.password.value);
        console.info(userData);
    };

    const setUsername = (value) => {
        const username = { value };
        setUserData({ ...userData, username });
    };
    const setPassword = (value) => {
        const password = { value };
        setUserData({ ...userData, password });
    };

    return (
        <main className="w-full h-screen bg-slate-300 p-4 flex justify-center items-center">
            <section className="w-full h-auto md:max-w-[500px]">
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
                    <form onSubmit={formHandler} className="w-full h-auto">
                        <div className="mb-4 md:mb-6">
                            <input
                                type="text"
                                value={userData.username.value}
                                className="forminput"
                                onChange={(i) => setUsername(i.target.value)}
                                placeholder="Masukkan Nama Pengguna.."
                            />
                        </div>
                        <div className="mb-4 md:mb-6">
                            <input
                                type="password"
                                value={userData.password.value}
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
