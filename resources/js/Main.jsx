import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
    useLoadingStore,
    useAuthStore,
    useBookStore,
    useOrderStore,
    useBorrowerStore,
    useUserStore,
} from "./store";

const BookCreate = React.lazy(() => import("./pages/BookCreate"));
const BookDetail = React.lazy(() => import("./pages/BookDetail"));
const BookLists = React.lazy(() => import("./pages/BookLists"));
const BookUpdate = React.lazy(() => import("./pages/BookUpdate"));
const BorrowerLists = React.lazy(() => import("./pages/BorrowerLists"));
const OrderLists = React.lazy(() => import("./pages/OrderLists"));
const UserCreate = React.lazy(() => import("./pages/UserCreate"));
const UserLists = React.lazy(() => import("./pages/UserLists"));
const UserProfile = React.lazy(() => import("./pages/UserProfile"));
const UserUpdate = React.lazy(() => import("./pages/UserUpdate"));
const Login = React.lazy(() => import("./pages/Login"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Loading = React.lazy(() => import("./components/Loading"));
const Auth = React.lazy(() => import("./middleware/Auth"));
const Guest = React.lazy(() => import("./middleware/Guest"));

const Main = () => {
    const { loading, setLoading } = useLoadingStore();
    const { setUserLogin } = useAuthStore();
    const { getAllBooks } = useBookStore();
    const { getAllOrders } = useOrderStore();
    const { getAllBorrowers } = useBorrowerStore();
    const { getAllUsers } = useUserStore();

    useEffect(() => {
        const setUpAll = async () => {
            setLoading(true);
            await setUserLogin();
            await getAllBooks();
            await getAllOrders();
            await getAllBorrowers();
            await getAllUsers();
            setLoading(false);
        };

        setUpAll();
    }, []);

    if (loading) return <Loading />;

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Auth>
                            <BookLists />
                        </Auth>
                    }
                />
                <Route
                    path="books/create"
                    element={
                        <Auth admin={true}>
                            <BookCreate />
                        </Auth>
                    }
                />
                <Route
                    path="books/update/:bookId"
                    element={
                        <Auth admin={true}>
                            <BookUpdate />
                        </Auth>
                    }
                />
                <Route
                    path="books/detail/:bookId"
                    element={
                        <Auth>
                            <BookDetail />
                        </Auth>
                    }
                />
                <Route
                    path="orders"
                    element={
                        <Auth admin={true}>
                            <OrderLists />
                        </Auth>
                    }
                />
                <Route
                    path="borrowers"
                    element={
                        <Auth admin={true}>
                            <BorrowerLists />
                        </Auth>
                    }
                />
                <Route
                    path="users"
                    element={
                        <Auth admin={true}>
                            <UserLists />
                        </Auth>
                    }
                />
                <Route
                    path="users/profile"
                    element={
                        <Auth>
                            <UserProfile />
                        </Auth>
                    }
                />
                <Route
                    path="users/create"
                    element={
                        <Auth admin={true}>
                            <UserCreate />
                        </Auth>
                    }
                />
                <Route
                    path="users/update/:userId"
                    element={
                        <Auth admin={true}>
                            <UserUpdate />
                        </Auth>
                    }
                />
                <Route
                    path="login"
                    element={
                        <Guest>
                            <Login />
                        </Guest>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Main;
