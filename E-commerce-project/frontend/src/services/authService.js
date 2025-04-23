import API from "./api";

export const login = async (userData) => {
    const {data} = await API.post("/users/login",userData);
    if (data.token) {
        localStorage.setItem("token", data.token);
    }
    return data
}

export const register = async (userData) => {
    const {data} = await API.post("users/register",userData);
    return data
}

export const getUserProfile = async () => {
    const { data } = await API.get("/users/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    return data;
};
