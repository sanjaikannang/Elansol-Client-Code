import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    const payload = {
      email,
      password,
    };

    try {
      const res = await axios.post(
        `https://sanjaikannang-elansol-server-code.onrender.com/user/login`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = res.data;
      if (res.status === 200) {
        localStorage.setItem("token", data.token);

        if (data.result && data.result._i) {
          localStorage.setItem("userId", data.result._id);
          navigate("/home");
        } else {
          setError("User information is missing or invalid!");
        }
      } else {
        setError("Invalid credentials. Please check your email and password!");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-4 space-y-4">
        <div className="bg-gray-50 p-6 rounded-3xl">
          <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center ">
            Login
          </h2>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border "
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border "
          />
          <button
            className="font-medium bg-blue-500 text-white py-2 w-20 rounded-full"
            onClick={handleLogin}
          >
            Login
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <p className="text-gray-600 mt-2">
            Don't have an account?{" "}
            <button onClick={() => navigate("/")} className="text-blue-700">
              Signup here.
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
