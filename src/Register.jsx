import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const payload = {
        name,
        email,
        dateOfBirth,
        password,
      };
      const res = await axios.post(
        `https://sanjaikannang-elansol-server-code.onrender.com/user/register`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = res.data;
      if (data.token) {
        const userData = {
          name,
          email,
        };
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("token", data.token);
        navigate("/login");
      } else {
        setError(data.message || "Error during signup. Please try again.");
      }
    } catch (error) {
      setError("Error during signup. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-4 space-y-4">
        <div className="bg-gray-50 p-6 rounded-3xl">
          <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center">
            Register
          </h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-4 border"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border"
          />
          <input
            type="date"
            placeholder="Date of Birth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="w-full p-2 mb-4 border"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border"
          />
          <button
            className="font-medium bg-blue-500 text-white py-2 w-24 rounded-full"
            onClick={handleSignup}
          >
            Register
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <br />
          <button className="text-gray-600 mt-2">
            Already have an account?{" "}
            <span
              className="text-blue-700 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login here.
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
