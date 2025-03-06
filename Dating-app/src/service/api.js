const BASE_URL = "https://randomuser.me/api/"


export const fetchuser = async(count=1000) => {
    try{
    const response = await fetch(`${BASE_URL}?results=${count}`)
    if(!response){
        throw new Error("Failed to fetch user")
    }
    const data = await response.json();
    return data.results
    } catch(error){
        console.log("Error fetching users",error)
        return [];
    }
}
