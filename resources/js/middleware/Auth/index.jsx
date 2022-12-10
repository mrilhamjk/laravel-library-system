import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store";
import Loading from "../../components/Loading";

const Auth = ({ children, admin = false }) => {
    const [authLoading, setAuthLoading] = useState(true);
    const { userLogin } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (userLogin) {
            if (admin) {
                if (userLogin.role != "admin") {
                    navigate("/");
                } else setAuthLoading(false);
            } else setAuthLoading(false);
        } else navigate("/login");
    }, [userLogin, navigate, setAuthLoading]);

    if (authLoading) return <Loading />;
    else return children;
};

export default Auth;
