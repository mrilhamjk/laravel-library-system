const Pagination = ({ links, setPage }) => {
    return (
        <div className="shadow-me overflow-hidden flex flex-wrap items-center content-center">
            {links.map((l, i) => {
                const label = l.label.split(" ");
                const text =
                    label.length > 1
                        ? label[1] === "Sebelumnya"
                            ? "<"
                            : ">"
                        : label[0];
                let className = l.active
                    ? "paginationlink active"
                    : "paginationlink";
                const startIndex = 0;
                const lastIndex = links.length - 1;
                if (i === startIndex) className += " rounded-l-lg";
                if (i === lastIndex) className += " rounded-r-lg";
                const toPage = l.url && l.url.match(/[0-9]/i)[0];
                return (
                    <button
                        type="button"
                        key={i}
                        className={className}
                        onClick={() => {
                            if (toPage) setPage(toPage);
                        }}
                    >
                        {text}
                    </button>
                );
            })}
        </div>
    );
};

export default Pagination;
