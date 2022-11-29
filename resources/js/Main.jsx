import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BookCreate from "./pages/BookCreate";
import BookDetail from "./pages/BookDetail";
import BookLists from "./pages/BookLists";
import BookUpdate from "./pages/BookUpdate";
import BorrowerLists from "./pages/BorrowerLists";
import OrderLists from "./pages/OrderLists";
import UserCreate from "./pages/UserCreate";
import UserLists from "./pages/UserLists";
import UserProfile from "./pages/UserProfile";
import UserUpdate from "./pages/UserUpdate";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Loading from "./components/Loading";

const Main = () => {
    const [loading] = useState(false);

    if (loading) return <Loading />;

    return (
        <RouterProvider
            router={createBrowserRouter([
                { path: "/", element: <BookLists /> },
                { path: "books/create", element: <BookCreate /> },
                { path: "books/update/:bookId", element: <BookUpdate /> },
                { path: "books/detail/:bookId", element: <BookDetail /> },
                { path: "orders", element: <OrderLists /> },
                { path: "borrowers", element: <BorrowerLists /> },
                { path: "users", element: <UserLists /> },
                { path: "users/profile", element: <UserProfile /> },
                { path: "users/create", element: <UserCreate /> },
                { path: "users/update/:userId", element: <UserUpdate /> },
                { path: "login", element: <Login /> },
                { path: "*", element: <NotFound /> },
            ])}
        />
    );
};

export default Main;
