import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore, useUserStore } from "../../store";
import Alert from "../../components/Alert";
import Sidebar from "../../components/Sidebar";
import UserForm from "../../components/UserForm";
import Loading from "../../components/Loading";

const UserUpdate = () => {
    const { userId } = useParams();
    const [loading, setLoading] = useState(true);
    const { userLogin } = useAuthStore();
    const { users, error, message, updateUser, reset } = useUserStore();
    const [name, setName] = useState("");
    const [role, setRole] = useState("user");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [identity, setIdentity] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (userId != userLogin.id) {
            const userUpdate = users.data.find((b) => {
                return b.id == userId;
            });
            if (userUpdate) {
                setName(userUpdate.name);
                setRole(userUpdate.role);
                setUsername(userUpdate.username);
                setIdentity(userUpdate.identity);
                setLoading(false);
            } else navigate("/users");
        } else navigate("/users");
    }, [
        users.data,
        userId,
        setName,
        setRole,
        setUsername,
        setIdentity,
        setLoading,
        navigate,
    ]);

    useEffect(() => {
        if (!error && message !== "") {
            navigate("/users");
        }
    }, [error, message, navigate]);

    const updateUserHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("role", role);
        formData.append("username", username);
        formData.append("password", password);
        formData.append("identity", identity);
        await updateUser(formData, +userId);
        setTimeout(reset, 3000);
    };

    if (loading) return <Loading />;

    return (
        <Sidebar pageActive="userlists">
            <section className="p-4 md:p-8 lg:p-12">
                {message !== "" && <Alert success={!error}>{message}</Alert>}
                <div className="w-full h-auto bg-white p-4 rounded-lg shadow-me md:p-6 lg:p-8">
                    <UserForm
                        formHandler={updateUserHandler}
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

export default UserUpdate;
