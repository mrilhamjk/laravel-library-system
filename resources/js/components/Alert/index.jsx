const Alert = ({ children, success, className = "" }) => {
    if (className === "") {
        if (success) className = "alert success";
        else className = "alert failed";
    } else {
        if (success) className += " alert success";
        else className += " alert failed";
    }

    return (
        <div id="alert" className={className}>
            {children}
        </div>
    );
};

export default Alert;
