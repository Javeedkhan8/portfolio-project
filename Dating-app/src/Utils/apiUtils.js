const API_URL = "https://randomuser.me/api/"

export const fetchUsers = async (results = 500) => {
    try {
    const response = await fetch(`${API_URL}?results=${results}`)
    const data = response.json();
    return data.results
    } catch(error){
        console.error("Error fetching user",error)
        return [];
    }
}