import create from "zustand";
import axios from "axios";

const API_URL = "/api/orders";

export const useOrderStore = create((set, get) => ({
    orders: null,
    error: false,
    message: "",
    resetOrders: () => set(() => ({ orders: null })),
    reset: () => set(() => ({ error: false, message: "" })),
    getAllOrders: async (page = null, keyword = null, params = {}) => {
        try {
            const token = localStorage.getItem("X-Auth-Token");
            if (!token) throw new Error("Unauthorized");
            if (page) params.page = page;
            if (keyword) params.keyword = keyword;
            const result = await axios.get(API_URL, {
                headers: {
                    authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
                params,
            });
            set(() => ({ orders: result.data.orders }));
        } catch (err) {
            if (get().orders) set(() => ({ orders: null }));
        }
    },
    createOrder: async (formData) => {
        try {
            const token = localStorage.getItem("X-Auth-Token");
            if (!token) throw new Error("Unauthorized");
            const result = await axios.post(API_URL, formData, {
                headers: {
                    authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });
            set(() => ({
                orders: result.data.orders,
                message: "Berhasil meminjam buku.",
            }));
        } catch (err) {
            set(() => ({
                error: true,
                message:
                    err?.response?.data?.message?.replace(
                        /( \(and [0-9] more error(s?)\))/gi,
                        ""
                    ) ?? "Gagal meminjam buku.",
            }));
        }
    },
    deleteOrder: async (orderId) => {
        try {
            const token = localStorage.getItem("X-Auth-Token");
            if (!token) throw new Error("Unauthorized");
            const result = await axios.delete(`${API_URL}/${orderId}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });
            set(() => ({
                orders: result.data.orders,
                message: "Berhasil menolak peminjam buku.",
            }));
        } catch (err) {
            set(() => ({
                error: true,
                message:
                    err?.response?.data?.message?.replace(
                        /( \(and [0-9] more error(s?)\))/gi,
                        ""
                    ) ?? "Gagal menolak peminjam buku.",
            }));
        }
    },
}));
