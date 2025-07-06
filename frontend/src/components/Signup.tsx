import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useNavigate } from "react-router";
import BASE_URL from "../constant";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailId, setEmailId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

const handleSignup = async () => {
  try {
    const resp = await axios.post(
      `${BASE_URL}/signup`,
      { username, emailId, password },
      { withCredentials: true }
    );

    if (resp?.data?.success) {
      console.log(resp?.data?.data);
      
      dispatch(addUser(resp?.data?.data));
      toast.success(resp?.data?.message || "Signup successful!");
      navigate("/login");
      
    }
  } catch (error: any) {
  console.error("Signup Error:", error);

  const raw = error?.response?.data;

  const message =
    typeof raw === "string"
      ? raw
      : typeof raw?.message === "string"
      ? raw.message
      : "Something went wrong";

  toast.error(message);
}

};
  return (
    <div className="flex justify-center align-center my-10">
      <ToastContainer />
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title text-center mx-auto">Signup</h2>

          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Full Name/Username</legend>
              <input
                type="text"
                className="input"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </fieldset>
          </div>

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
            <button className="btn btn-primary" onClick={handleSignup}>
              Signup
            </button>
          </div>
        </div>
           <button className="btn btn-primary" onClick={() => navigate("/login")}>
            Already have an account? Login
            </button>
      </div>
    </div>
  );
};

export default Signup;
