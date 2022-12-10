import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBookStore } from "../../store";
import Alert from "../../components/Alert";
import Sidebar from "../../components/Sidebar";
import BookForm from "../../components/BookForm";
import Loading from "../../components/Loading";

const BookUpdate = () => {
    const { bookId } = useParams();
    const [loading, setLoading] = useState(true);
    const { books, error, message, updateBook, reset } = useBookStore();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");
    const [publicationYear, setPublicationYear] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const bookUpdate = books.data.find((b) => {
            return b.id == bookId;
        });
        if (bookUpdate) {
            setTitle(bookUpdate.title);
            setAuthor(bookUpdate.author);
            setPublisher(bookUpdate.publisher);
            setPublicationYear(bookUpdate.publication_year);
            setDescription(bookUpdate.description);
            setLoading(false);
        } else navigate("/");
    }, [
        books.data,
        bookId,
        setTitle,
        setAuthor,
        setPublisher,
        setPublicationYear,
        setDescription,
        setLoading,
        navigate,
    ]);

    useEffect(() => {
        if (!error && message !== "") {
            navigate("/");
        }
    }, [error, message, navigate]);

    const updateBookHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("author", author);
        formData.append("publisher", publisher);
        formData.append("publication_year", publicationYear);
        formData.append("description", description);
        if (image) formData.append("image", image);
        await updateBook(formData, +bookId);
        setTimeout(reset, 3000);
    };

    if (loading) return <Loading />;

    return (
        <Sidebar pageActive="booklists">
            <section className="p-4 md:p-8 lg:p-12">
                {message !== "" && <Alert success={!error}>{message}</Alert>}
                <div className="w-full h-auto bg-white p-4 rounded-lg shadow-me md:p-6 lg:p-8">
                    <BookForm
                        formHandler={updateBookHandler}
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

export default BookUpdate;
