import { useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import BookForm from "../../components/BookForm";

const BookUpdate = () => {
    const { bookId } = useParams();
    const [bookData, setBookData] = useState({
        id: { value: bookId, message: null },
        title: {
            value: "Cara mencintai alam dengan baik dan benar",
            message: null,
        },
        author: { value: "Ilham Jaya Kusuma", message: null },
        publisher: { value: "MrIlhamJK Pustaka", message: null },
        publicationYear: { value: "2022", message: null },
        description: {
            value: "Ini adalah deskripsi dari buku cara mencintai alam dengan baik dan benar. Mencintai alam sangatlah penting, oleh karena itu baca panduannya di buku ini.",
            message: null,
        },
        image: { value: null, message: null },
    });

    const formHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", bookData.title.value);
        formData.append("author", bookData.author.value);
        formData.append("publisher", bookData.publisher.value);
        formData.append("publicationYear", bookData.publicationYear.value);
        formData.append("description", bookData.description.value);
        formData.append("image", bookData.image.value);
        console.info(bookData);
    };

    const setTitle = (value) => {
        const title = { value };
        setBookData({ ...bookData, title });
    };
    const setAuthor = (value) => {
        const author = { value };
        setBookData({ ...bookData, author });
    };
    const setPublisher = (value) => {
        const publisher = { value };
        setBookData({ ...bookData, publisher });
    };
    const setPublicationYear = (value) => {
        const publicationYear = { value };
        setBookData({ ...bookData, publicationYear });
    };
    const setDescription = (value) => {
        const description = { value };
        setBookData({ ...bookData, description });
    };
    const setImage = (value) => {
        const image = { value };
        setBookData({ ...bookData, image });
    };

    return (
        <Sidebar pageActive="booklists">
            <section className="p-4 md:p-8 lg:p-12">
                <div className="w-full h-auto bg-white p-4 rounded-lg shadow-me md:p-6 lg:p-8">
                    <BookForm
                        formHandler={formHandler}
                        bookData={bookData}
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
