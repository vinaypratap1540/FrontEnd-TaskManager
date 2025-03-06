import React, { useEffect, useState } from "react";
import "./login.css"
import { useLoginUserMutation, useRegisterUserMutation } from "../../features/api/authApi.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [registerUser,{data:registerData,error:registerError,isSuccess:registerIsSuccess}] = useRegisterUserMutation();
  const [loginUser,{data:loginData,error:loginError,isSuccess:loginIsSuccess}] = useLoginUserMutation();
  const navigate = useNavigate()
  let inputData;
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(isLogin===true){
      inputData = {email,password}
      try {
        await loginUser(inputData)
      } catch (error) {
        console.log("Register Error ",error)
      }
    }
    else{
      inputData = {username,email,password}
      try {
        await registerUser(inputData)
      } catch (error) {
        console.log("Login Error ",error)
      }
    }
  }
  useEffect(()=>{
   if(registerIsSuccess && registerData){
     toast.success(registerData.message || "Registration Successfully");
     navigate("/")
   }
   if(loginIsSuccess && loginData){
    toast.success(loginData.message || "Login Successfully");
    navigate("/")
   }
   if(registerError){
    toast.error(registerError?.data?.message || "Registration Failed !!! Please try again")
   }
   if(loginError){
    toast.error(loginError?.data?.message || "Login Failed !!! Please try again")
   }
},[registerIsSuccess,registerData,registerError,loginData,loginIsSuccess,loginError])
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form>
          {!isLogin && <input onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="Username" required />}
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" required />
          <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" required />
          <button onClick={handleSubmit} type="button">{isLogin ? "Login" : "Sign Up"}</button>
        </form>
        <p onClick={() => setIsLogin(!isLogin)} className="toggle-link">
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default Login;
