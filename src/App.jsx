import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import Login from "./components/login";
import Register from "./components/register";
import Navbar from "./components/navBar";
import Profile from "./components/profilePage";

function App() {
  const [user, setUser] = useState(null);
  const [userName,setUserName] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser); 
      setUserName(parsedUser.username);
    }
}, []);

  return (
    <Router>
      <Navbar user={user} userName={userName} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser}/>} />
        <Route path="/profile" element={<Profile setUser={setUser}/>} />

      </Routes>
    </Router>
  );
}

export default App;
