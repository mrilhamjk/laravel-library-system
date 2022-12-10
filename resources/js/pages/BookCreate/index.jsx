import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookStore } from "../../store";
import Alert from "../../components/Alert";
import Sidebar from "../../components/Sidebar";
import BookForm from "../../components/BookForm";

const BookCreate = () => {
    const { error, message, createBook, reset } = useBookStore();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");
    const [publicationYear, setPublicationYear] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const createBookHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("author", author);
        formData.append("publisher", publisher);
        formData.append("publication_year", publicationYear);
        formData.append("description", description);
        if (image) formData.append("image", image);
        await createBook(formData);
        setTimeout(reset, 3000);
    };

    useEffect(() => {
        if (!error && message !== "") {
            navigate("/");
        }
    }, [error, message, navigate]);

    return (
        <Sidebar pageActive="bookcreate">
            <section className="p-4 md:p-8 lg:p-12">
                {message !== "" && <Alert success={!error}>{message}</Alert>}
                <div className="w-full h-auto bg-white p-4 rounded-lg shadow-me md:p-6 lg:p-8">
                    <BookForm
                        formHandler={createBookHandler}
                        bookData={{
                            title,
                            author,
                            publisher,
                            publicationYear,
                            description,
                        }}
                        setTitle={setTitle}
                        setAuthor={setAuthor}
                        setPublisher={setPublisher}
                        setPublicationYear={setPublicationYear}
                        setDescription={setDescription}
                        setImage={setImage}
                    />
                </div>
            </section>
        </Sidebar>
    );
};

export default BookCreate;
