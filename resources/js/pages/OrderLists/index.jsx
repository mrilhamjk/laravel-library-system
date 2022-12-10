import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useBorrowerStore, useOrderStore } from "../../store";
import Alert from "../../components/Alert";
import Sidebar from "../../components/Sidebar";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";

const OrderLists = () => {
    const [page, setPage] = useState(null);
    const [pageValue] = useDebounce(page, 200);
    const [keyword, setKeyword] = useState("");
    const [keywordValue] = useDebounce(keyword, 800);
    const {
        error: orderErr,
        message: orderMsg,
        orders,
        getAllOrders,
        deleteOrder,
        reset: orderReset,
    } = useOrderStore();
    const {
        error: borrowerErr,
        message: borrowerMsg,
        createBorrower,
        reset: borrowerReset,
    } = useBorrowerStore();

    useEffect(() => {
        getAllOrders(pageValue, keywordValue);
    }, [pageValue]);

    useEffect(() => {
        if (pageValue !== 1) setPage(1);
        else getAllOrders(null, keywordValue);
    }, [keywordValue]);

    const acceptBorrower = async (id) => {
        if (confirm("Yakin ingin menerima peminjam ini?")) {
            const formData = new FormData();
            formData.append("order_id", id);
            await createBorrower(formData);
            await getAllOrders(null, keywordValue);
            setTimeout(borrowerReset, 3000);
        }
    };

    const rejectBorrower = async (id) => {
        if (confirm("Yakin ingin menolak peminjam ini?")) {
            await deleteOrder(id);
            await getAllOrders(null, keywordValue);
            setTimeout(orderReset, 3000);
        }
    };

    return (
        <Sidebar pageActive="orderlists">
            <section className="p-4 md:p-8 lg:p-12">
                {orderMsg !== "" ? (
                    <Alert success={!orderErr}>{orderMsg}</Alert>
                ) : null}
                {borrowerMsg !== "" ? (
                    <Alert success={!borrowerErr}>{borrowerMsg}</Alert>
                ) : null}
                <div className="w-full h-auto mb-4 md:mb-6">
                    <Search
                        keyword={keyword}
                        setKeyword={setKeyword}
                        placeholder="Masukkan Kata Kunci.."
                    />
                </div>
                <div className="w-full h-auto bg-white mb-4 rounded-lg shadow-me overflow-auto md:mb-6">
                    <table className="w-full h-auto border border-slate-400 rounded-lg">
                        <thead>
                            <tr className="bg-blue-600 border border-slate-400">
                                <th className="text-left text-white text-xl font-medium py-2 px-4">
                                    Nama Peminjam
                                </th>
                                <th className="text-left text-white text-xl font-medium py-2 px-4">
                                    Judul Buku
                                </th>
                                <th className="text-left text-white text-xl font-medium py-2 px-4">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.data.length === 0 && (
                                <tr className="bg-white border border-slate-400">
                                    <td
                                        className="text-center text-slate-900 text-xl font-medium py-2 px-4"
                                        colSpan={3}
                                    >
                                        Order Kosong
                                    </td>
                                </tr>
                            )}
                            {orders.data.map((o) => {
                                return (
                                    <tr
                                        key={o.id}
                                        className="bg-white border border-slate-400"
                                    >
                                        <td className="text-slate-700 text-xl font-medium py-2 px-4">
                                            {o.user.name}
                                        </td>
                                        <td className="text-slate-700 text-xl font-medium py-2 px-4">
                                            {o.book.title}
                                        </td>
                                        <td className="py-2 px-4">
                                            <button
                                                type="button"
                                                className="bg-emerald-600 buttonaction mr-2"
                                                onClick={() => {
                                                    acceptBorrower(o.id);
                                                }}
                                            >
                                                ✓
                                            </button>
                                            <button
                                                type="button"
                                                className="bg-red-600 buttonaction"
                                                onClick={() => {
                                                    rejectBorrower(o.id);
                                                }}
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="w-full h-auto flex justify-center">
                    {orders.links.length > 3 && (
                        <Pagination links={orders.links} setPage={setPage} />
                    )}
                </div>
            </section>
        </Sidebar>
    );
};

export default OrderLists;
