import create from "zustand";
import axios from "axios";

const API_URL = "/api/borrowers";

export const useBorrowerStore = create((set, get) => ({
    borrowers: null,
    error: false,
    message: "",
    resetBorrowers: () => set(() => ({ borrowers: null })),
    reset: () => set(() => ({ error: false, message: "" })),
    getAllBorrowers: async (page = null, keyword = null, params = {}) => {
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
            set(() => ({ borrowers: result.data.borrowers }));
        } catch (err) {
            if (get().borrowers) set(() => ({ borrowers: null }));
        }
    },
    createBorrower: async (formData) => {
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
                borrowers: result.data.borrowers,
                message: "Berhasil menerima peminjam buku.",
            }));
        } catch (err) {
            set(() => ({
                error: true,
                message:
                    err?.response?.data?.message?.replace(
                        /( \(and [0-9] more error(s?)\))/gi,
                        ""
                    ) ?? "Gagal menerima peminjam buku.",
            }));
        }
    },
    deleteBorrower: async (borrowerId) => {
        try {
            const token = localStorage.getItem("X-Auth-Token");
            if (!token) throw new Error("Unauthorized");
            const result = await axios.delete(`${API_URL}/${borrowerId}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });
            set(() => ({
                borrowers: result.data.borrowers,
                message: "Berhasil mengonfirmasi peminjam buku.",
            }));
        } catch (err) {
            set(() => ({
                error: true,
                message:
                    err?.response?.data?.message?.replace(
                        /( \(and [0-9] more error(s?)\))/gi,
                        ""
                    ) ?? "Gagal mengonfirmasi peminjam buku.",
            }));
        }
    },
}));
