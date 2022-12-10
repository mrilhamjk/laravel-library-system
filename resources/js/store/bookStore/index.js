import create from "zustand";
import axios from "axios";

const API_URL = "/api/books";

export const useBookStore = create((set, get) => ({
    books: null,
    error: false,
    message: "",
    resetBooks: () => set(() => ({ books: null })),
    reset: () => set(() => ({ error: false, message: "" })),
    getAllBooks: async (page = null, keyword = null, params = {}) => {
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
            set(() => ({ books: result.data.books }));
        } catch (err) {
            if (get().books) set(() => ({ books: null }));
        }
    },
    createBook: async (formData) => {
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
                books: result.data.books,
                message: "Berhasil menambahkan buku.",
            }));
        } catch (err) {
            set(() => ({
                error: true,
                message:
                    err?.response?.data?.message?.replace(
                        /( \(and [0-9] more error(s?)\))/gi,
                        ""
                    ) ?? "Gagal menambahkan buku.",
            }));
        }
    },
    updateBook: async (formData, bookId) => {
        try {
            const token = localStorage.getItem("X-Auth-Token");
            if (!token) throw new Error("Unauthorized");
            const result = await axios.post(
                `${API_URL}/${bookId}?_method=PUT`,
                formData,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );
            set(() => ({
                books: result.data.books,
                message: "Berhasil mengubah buku.",
            }));
        } catch (err) {
            set(() => ({
                error: true,
                message:
                    err?.response?.data?.message?.replace(
                        /( \(and [0-9] more error(s?)\))/gi,
                        ""
                    ) ?? "Gagal mengubah buku.",
            }));
        }
    },
    deleteBook: async (bookId) => {
        try {
            const token = localStorage.getItem("X-Auth-Token");
            if (!token) throw new Error("Unauthorized");
            const result = await axios.delete(`${API_URL}/${bookId}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });
            set(() => ({
                books: result.data.books,
                message: "Berhasil menghapus buku.",
            }));
        } catch (err) {
            set(() => ({
                error: true,
                message:
                    err?.response?.data?.message?.replace(
                        /( \(and [0-9] more error(s?)\))/gi,
                        ""
                    ) ?? "Gagal menghapus buku.",
            }));
        }
    },
}));
