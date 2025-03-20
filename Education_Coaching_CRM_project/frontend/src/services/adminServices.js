const API_URL = "https://portfolio-project-1-54a8.onrender.com/api/admin"

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
    };
};

export const getUsers = async () => {
    const res = await fetch(`${API_URL}/users`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error("Failed to fetch users");
    return await res.json();
};

export const getPayments = async () => {
    const res = await fetch(`${API_URL}/payments`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error("Failed to fetch payments");
    return await res.json();
};

export const getReports = async () => {
    const res = await fetch(`${API_URL}/reports`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error("Failed to fetch reports");
    return await res.json();
};

