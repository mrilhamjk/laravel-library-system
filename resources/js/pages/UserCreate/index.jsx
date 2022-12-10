import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store";
import Alert from "../../components/Alert";
import Sidebar from "../../components/Sidebar";
import UserForm from "../../components/UserForm";

const UserCreate = () => {
    const { error, message, createUser, reset } = useUserStore();
    const [name, setName] = useState("");
    const [role, setRole] = useState("user");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [identity, setIdentity] = useState("");
    const navigate = useNavigate();

    const createUserHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("role", role);
        formData.append("username", username);
        formData.append("password", password);
        formData.append("identity", identity);
        await createUser(formData);
        setTimeout(reset, 3000);
        setPassword("");
    };

    useEffect(() => {
        if (!error && message !== "") {
            navigate("/users");
        }
    }, [error, message, navigate]);

    return (
        <Sidebar pageActive="usercreate">
            <section className="p-4 md:p-8 lg:p-12">
                {message !== "" && <Alert success={!error}>{message}</Alert>}
                <div className="w-full h-auto bg-white p-4 rounded-lg shadow-me md:p-6 lg:p-8">
                    <UserForm
                        formHandler={createUserHandler}
                        userData={{
                            name,
                            role,
                            username,
                            password,
                            identity,
                        }}
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

export default UserCreate;
