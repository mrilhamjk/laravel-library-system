import create from "zustand";
import axios from "axios";

const API_URL = "/api";

export const useAuthStore = create((set, get) => ({
    userLogin: null,
    formData: null,
    error: false,
    message: "",
    resetAuth: () => set(() => ({ userLogin: null })),
    reset: () => set(() => ({ error: false, message: "" })),
    login: async (formData) => {
        try {
            const result = await axios.post(`${API_URL}/login`, formData, {
                headers: { Accept: "application/json" },
            });
            localStorage.setItem("X-Auth-Token", result.data.token);
            set(() => ({ message: "Login berhasil." }));
        } catch (err) {
            set(() => ({
                error: true,
                formData: {
                    username: formData.get("username") ?? "",
                    password: "",
                },
                message:
                    err?.response?.data?.message?.replace(
                        /( \(and [0-9] more error(s?)\))/gi,
                        ""
                    ) ?? "Login gagal.",
            }));
        }
    },
    logout: async () => {
        try {
            const token = localStorage.getItem("X-Auth-Token");
            if (!token) throw new Error("Unauthenticated");
            const result = await axios.post(`${API_URL}/logout`, undefined, {
                headers: {
                    authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });
            localStorage.removeItem("X-Auth-Token");
            set(() => ({ message: "Logout berhasil." }));
        } catch (err) {
            localStorage.removeItem("X-Auth-Token");
            if (get().userLogin) set(() => ({ userLogin: null }));
        }
    },
    refresh: async () => {
        try {
            const token = localStorage.getItem("X-Auth-Token");
            if (!token) throw new Error("Unauthenticated");
            const result = await axios.get(`${API_URL}/refresh`, {
                headers: {
                    authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });
            localStorage.setItem("X-Auth-Token", result.data.token);
        } catch (err) {
            localStorage.removeItem("X-Auth-Token");
            if (get().userLogin) set(() => ({ userLogin: null }));
        }
    },
    setUserLogin: async () => {
        try {
            const token = localStorage.getItem("X-Auth-Token");
            if (!token) throw new Error("Unauthenticated");
            const result = await axios.get(`${API_URL}/me`, {
                headers: {
                    authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });
            set(() => ({ userLogin: result.data.user }));
        } catch (err) {
            localStorage.removeItem("X-Auth-Token");
            if (get().userLogin) set(() => ({ userLogin: null }));
        }
    },
}));
