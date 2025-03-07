import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutUserMutation } from "../../features/api/authApi";
import { toast } from "react-toastify";
import { userLoggedOut } from "../../features/auth/authSlice";
import { authApi } from "../../features/api/authApi"; // Import authApi to reset cache

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated } = useSelector((store) => store.auth);
  const [logoutUser, { data: logoutData, isError: logoutIsError, isSuccess: logoutIsSuccess }] =
    useLogoutUserMutation();

  const logoutHandler = async () => {
    try {
      await logoutUser();
      dispatch(userLoggedOut()); // Clear Redux state
      dispatch(authApi.util.resetApiState()); // Reset API cache

      localStorage.removeItem("auth"); // Ensure user session is removed from local storage
      sessionStorage.clear(); // Clear session storage if used

      toast.success("User logged out successfully");

      setTimeout(() => {
        navigate("/login"); // Redirect to login page
      }, 500);
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed, try again!");
    }
  };

  useEffect(() => {
    if (logoutIsSuccess) {
      toast.success(logoutData?.message || "User logged out successfully");
    }
    if (logoutIsError) {
      toast.error(logoutIsError?.message || "Logout failed!");
    }
  }, [logoutData, logoutIsError, logoutIsSuccess]);

  return (
    <nav className="navbar">
      <div className="logo">Task Manager</div>
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/">
          <li>
            <a>Home</a>
          </li>
        </Link>
        <Link to="/tasks">
          <li>
            <a>Tasks</a>
          </li>
        </Link>
        {isAuthenticated ? (
          <>
            <li>
              <a>{user?.username}</a>
            </li>
            <li onClick={logoutHandler}>
              <a>Logout</a>
            </li>
          </>
        ) : (
          <Link to="/login">
            <li>
              <a>Login/Signup</a>
            </li>
          </Link>
        )}
      </ul>
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
    </nav>
  );
};

export default Navbar;

