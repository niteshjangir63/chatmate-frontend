import { API } from "./axios";

export const login = async (formData) => {

    return API.post("/login", formData);
}
export const signup = async (formData) => {

    return API.post("/signup", formData);
}
export const verify = async () => {

    return API.get("/auth/verify");
}
export const logout = async () => {

    return API.post("/logout");
}


