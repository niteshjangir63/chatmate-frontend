import { API } from "./axios";

export const login = async (formData) => {

    return API.post("/login", formData);
}
export const signup = async (formData) => {

    return API.post("/signup", formData);
}
export const itsMe = async (formData) => {

    return API.post("/auth/me");
}

