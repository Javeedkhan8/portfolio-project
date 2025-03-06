const API_URL = "https://randomuser.me/api/"

export const getUsers = async (results = 500) => {
    const response = await fetch(`${API_URL}?results=${results}`);
    const data = await response.json();
    return data.results
}

export const getUsersById = async (uuid) => {
    const response = await fetch(`${API_URL}?uuid${uuid}`)
    const data = await response.json();
    return data.results[0]
}