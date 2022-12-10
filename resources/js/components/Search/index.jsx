const Search = ({ setKeyword, placeholder }) => {
    return (
        <input
            type="text"
            className="w-full h-auto text-xl text-slate-700 font-medium placeholder:text-slate-400 placeholder:font-normal py-3 px-4 rounded-lg outline-none shadow-me"
            onChange={(i) => setKeyword(i.target.value)}
            placeholder={placeholder}
        />
    );
};

export default Search;
