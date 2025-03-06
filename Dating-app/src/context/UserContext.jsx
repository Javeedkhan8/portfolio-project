import { createContext, useEffect, useState } from "react"

 export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [user,setUser] = useState(null);

    useEffect(() => {
        const storeduser = JSON.parse(localStorage.getItem("user"));
        if(storeduser) setUser(storeduser)
    },[])

    const login = (email) => {
        const userData = {email}
        localStorage.setItem("user",JSON.stringify(userData));
        setUser(userData)
    }

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    }

    return (
        <UserContext.Provider value={{user,setUser,login,logout}}>
            {children}
        </UserContext.Provider>
    )
}