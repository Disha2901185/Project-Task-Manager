import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const dispatch = useDispatch();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const resp = await axios.post(`http://localhost:3001/login`, {
        emailId,
        password,
      });
console.log(resp?.data);

      if (resp?.data?.success) {
        localStorage.setItem("token", resp?.data?.token);
        localStorage.setItem("user", (resp?.data?.data && JSON.stringify(resp?.data?.data)) || "");
        dispatch(addUser(resp?.data?.data));
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error:any) {
      console.log(
        error
      );
      const message =
  typeof error.response?.data === "string"
    ? error.response.data
    : error.response?.data?.message || "Something went wrong";

toast.error(message);
  
    }
  };

  return (
    <div className="flex justify-center align-center my-10">
      <ToastContainer />
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title text-center mx-auto">Login</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email Id</legend>
              <input
                type="text"
                className="input"
                placeholder="Email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
            If not have any account? <Link to="/signup" className="btn btn-secondary">
              Register
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
