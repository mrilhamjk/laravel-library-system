import ImgLogo from "../../images/Loading.svg";

const Loading = () => {
    return (
        <section className="w-full h-screen bg-slate-300 flex justify-center items-center">
            <div className="w-24 h-24 border-4 border-blue-600 rounded-full p-2 animate-spin-slow">
                <img className="w-full h-auto" src={ImgLogo} alt="Loading" />
            </div>
        </section>
    );
};

export default Loading;
