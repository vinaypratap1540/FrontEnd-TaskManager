import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogoutUserMutation } from "../../features/api/authApi";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false);
  const {user} =useSelector(store=>store.auth)
  const [logoutUser,{data:logoutData,isError:logoutIsError,isSuccess:logoutIsSuccess}] = useLogoutUserMutation();
  const logoutHandler=async()=>{
    await logoutUser()
  }
  useEffect(()=>{
    if(logoutIsSuccess){
      toast.success(logoutData?.message || "User logged out successfully")
      navigate("/login")

      setTimeout(() => {     // Refresh page when I will do logout
        window.location.reload();
      }, 500);
    }
    if(logoutIsError){
      toast.success(logoutIsError?.message || "User logged out successfully")
    }
  },[logoutData,logoutIsError,logoutIsSuccess])
  return (
    <nav className="navbar">
      <div className="logo">Task Manager</div>
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/"><li><a>Home</a></li></Link>
        <Link to="/tasks"><li><a>Tasks</a></li></Link>
        { user ? <><li><a>{user.username}</a></li>
                  <li onClick={logoutHandler}><a>Logout</a></li></>
        : <Link to="/login"><li><a>Login/Signup</a></li></Link>}
      </ul>
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
    </nav>
  );
};

export default Navbar;
