import { Link } from "react-router-dom";

const Pagination = ({ data, page, basePath }) => {
    return (
        <div className="shadow-me overflow-hidden flex flex-wrap items-center content-center">
            <Link className="paginationlink rounded-l-lg" to={basePath}>
                {"<"}
            </Link>
            {data.map((b, i) => {
                return (
                    <Link
                        key={i}
                        className={
                            page == ++i
                                ? "paginationlink active"
                                : "paginationlink"
                        }
                        to={`${basePath}?page=${i}`}
                    >
                        {i}
                    </Link>
                );
            })}
            <Link className="paginationlink rounded-r-lg" to={basePath}>
                {">"}
            </Link>
        </div>
    );
};

export default Pagination;
