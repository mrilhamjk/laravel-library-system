const Alert = ({ children, success }) => {
    const hideAlert = () => {
        const alert = document.getElementById("alert");
        if (alert) alert.remove();
    };

    return (
        <div id="alert" className={success ? "alert success" : "alert failed"}>
            <span>{children}</span>
            <button type="button" onClick={hideAlert}>
                X
            </button>
        </div>
    );
};

export default Alert;
