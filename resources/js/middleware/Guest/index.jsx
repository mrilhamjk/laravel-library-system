import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store";
import Loading from "../../components/Loading";

const Guest = ({ children }) => {
    const [guestLoading, setGuestLoading] = useState(true);
    const { userLogin } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (userLogin) navigate("/");
        else setGuestLoading(false);
    }, [userLogin, navigate, setGuestLoading]);

    if (guestLoading) return <Loading />;
    else return children;
};

export default Guest;
