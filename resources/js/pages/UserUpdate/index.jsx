import { useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import UserForm from "../../components/UserForm";

const UserUpdate = () => {
    const { userId } = useParams();
    const [userData, setUserData] = useState({
        id: { value: userId, message: null },
        name: { value: "Ilham Jaya Kusuma", message: null },
        role: { value: "admin", message: null },
        username: { value: "mrilhamjk", message: null },
        password: { value: "", message: null },
        identity: { value: "NISN 123456789, No. Absen 17", message: null },
    });

    const formHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", userData.name.value);
        formData.append("role", userData.role.value);
        formData.append("username", userData.username.value);
        formData.append("password", userData.password.value);
        formData.append("identity", userData.identity.value);
        console.info(userData);
    };

    const setName = (value) => {
        const name = { value };
        setUserData({ ...userData, name });
    };
    const setRole = (value) => {
        const role = { value };
        setUserData({ ...userData, role });
    };
    const setUsername = (value) => {
        const username = { value };
        setUserData({ ...userData, username });
    };
    const setPassword = (value) => {
        const password = { value };
        setUserData({ ...userData, password });
    };
    const setIdentity = (value) => {
        const identity = { value };
        setUserData({ ...userData, identity });
    };

    return (
        <Sidebar pageActive="userlists">
            <section className="p-4 md:p-8 lg:p-12">
                <div className="w-full h-auto bg-white p-4 rounded-lg shadow-me md:p-6 lg:p-8">
                    <UserForm
                        formHandler={formHandler}
                        userData={userData}
                        setName={setName}
                        setRole={setRole}
                        setUsername={setUsername}
                        setPassword={setPassword}
                        setIdentity={setIdentity}
                    />
                </div>
            </section>
        </Sidebar>
    );
};

export default UserUpdate;
