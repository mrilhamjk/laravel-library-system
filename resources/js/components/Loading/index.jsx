import ImgLogo from "../../images/Loading.svg";

const Loading = ({ loading = true }) => {
    return (
        <section className={loading ? "loading" : "loading hide"}>
            <div className="w-24 h-24 border-4 border-blue-600 rounded-full p-2 animate-spin-slow">
                <img className="w-full h-auto" src={ImgLogo} alt="Loading" />
            </div>
        </section>
    );
};

export default Loading;
