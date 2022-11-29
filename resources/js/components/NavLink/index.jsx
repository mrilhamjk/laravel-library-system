import { Link } from "react-router-dom";

const NavLink = ({ user, pageActive, active, link, role, children }) => {
    if (user.role === "admin") {
        if (pageActive === active) {
            return (
                <Link className="navlink active" to={link}>
                    {children}
                </Link>
            );
        } else {
            return (
                <Link className="navlink" to={link}>
                    {children}
                </Link>
            );
        }
    }

    if (role === "user") {
        if (pageActive === active) {
            return (
                <Link className="navlink active" to={link}>
                    {children}
                </Link>
            );
        } else {
            return (
                <Link className="navlink" to={link}>
                    {children}
                </Link>
            );
        }
    }
};

export default NavLink;
