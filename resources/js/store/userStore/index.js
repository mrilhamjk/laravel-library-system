import create from "zustand";
import axios from "axios";

const API_URL = "/api/users";

export const useUserStore = create((set, get) => ({
    users: null,
    error: false,
    message: "",
    resetUsers: () => set(() => ({ users: null })),
    reset: () => set(() => ({ error: false, message: "" })),
    getAllUsers: async (page = null, keyword = null, params = {}) => {
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
            set(() => ({ users: result.data.users }));
        } catch (err) {
            if (get().users) set(() => ({ users: null }));
        }
    },
    createUser: async (formData) => {
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
                users: result.data.users,
                message: "Berhasil menambahkan pengguna.",
            }));
        } catch (err) {
            set(() => ({
                error: true,
                message:
                    err?.response?.data?.message?.replace(
                        /( \(and [0-9] more error(s?)\))/gi,
                        ""
                    ) ?? "Gagal menambahkan pengguna.",
            }));
        }
    },
    updateUser: async (formData, userId) => {
        try {
            const token = localStorage.getItem("X-Auth-Token");
            if (!token) throw new Error("Unauthorized");
            const result = await axios.post(
                `${API_URL}/${userId}?_method=PUT`,
                formData,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );
            set(() => ({
                users: result.data.users,
                message: "Berhasil mengubah pengguna.",
            }));
        } catch (err) {
            set(() => ({
                error: true,
                message:
                    err?.response?.data?.message?.replace(
                        /( \(and [0-9] more error(s?)\))/gi,
                        ""
                    ) ?? "Gagal mengubah pengguna.",
            }));
        }
    },
    deleteUser: async (userId) => {
        try {
            const token = localStorage.getItem("X-Auth-Token");
            if (!token) throw new Error("Unauthorized");
            const result = await axios.delete(`${API_URL}/${userId}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });
            set(() => ({
                users: result.data.users,
                message: "Berhasil menghapus pengguna.",
            }));
        } catch (err) {
            set(() => ({
                error: true,
                message:
                    err?.response?.data?.message?.replace(
                        /( \(and [0-9] more error(s?)\))/gi,
                        ""
                    ) ?? "Gagal menghapus pengguna.",
            }));
        }
    },
}));
