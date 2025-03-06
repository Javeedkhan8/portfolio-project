import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Navbar from "./layout/Navbar";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Matches from "./pages/Matches";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { LikedProvider } from "./context/LikedContext";
import Liked from "./pages/Liked";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";
import Introduction from "./pages/Introduction";



function App() {

  const [user,setUser] = useState(null);

  useEffect(() => {
    const storeduser = JSON.parse(localStorage.getItem("user"));
    if(storeduser) setUser(storeduser)
   },[])
 

  return (
    <LikedProvider>
    <UserProvider value={{user,setUser}}>
      <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path = "/" element={<Introduction/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path ="/matches" element={<Matches/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/liked" element={<Liked/>}/>
        <Route path="/chat/:id" element = {<Chat/>}/>
      </Routes>
      </Router>
    </UserProvider>
    </LikedProvider>
  )
}

export default App
