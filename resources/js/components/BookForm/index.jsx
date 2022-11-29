const BookForm = ({
    formHandler,
    bookData,
    setTitle,
    setAuthor,
    setPublisher,
    setPublicationYear,
    setDescription,
    setImage,
}) => {
    return (
        <form
            onSubmit={formHandler}
            className="w-full h-auto lg:grid lg:grid-cols-2 lg:gap-4"
        >
            <div className="mb-4 lg:mb-0">
                <input
                    type="text"
                    value={bookData.title.value}
                    className="forminput"
                    onChange={(i) => setTitle(i.target.value)}
                    placeholder="Masukkan Judul.."
                />
            </div>
            <div className="mb-4 lg:mb-0">
                <input
                    type="text"
                    value={bookData.author.value}
                    className="forminput"
                    onChange={(i) => setAuthor(i.target.value)}
                    placeholder="Masukkan Pengarang.."
                />
            </div>
            <div className="mb-4 lg:mb-0">
                <input
                    type="text"
                    value={bookData.publisher.value}
                    className="forminput"
                    onChange={(i) => setPublisher(i.target.value)}
                    placeholder="Masukkan Penerbit.."
                />
            </div>
            <div className="mb-4 lg:mb-0">
                <input
                    type="number"
                    min="1901"
                    max="2099"
                    value={bookData.publicationYear.value}
                    className="forminput"
                    onChange={(i) => setPublicationYear(i.target.value)}
                    placeholder="Masukkan Tahun Terbit.."
                />
            </div>
            <div className="mb-4 lg:mb-0 lg:col-span-2">
                <textarea
                    rows="4"
                    value={bookData.description.value}
                    className="forminput"
                    onChange={(i) => setDescription(i.target.value)}
                    placeholder="Masukkan Deskripsi.."
                />
            </div>
            <div className="mb-4 lg:mb-0 lg:col-span-2">
                <input
                    type="file"
                    className="forminput"
                    accept="image/jpeg,jpg,png"
                    onChange={(i) => setImage(i.target.files[0])}
                />
            </div>
            <div>
                <button
                    type="submit"
                    className="button normal-case lg:w-auto lg:px-8"
                >
                    Simpan
                </button>
            </div>
        </form>
    );
};

export default BookForm;
