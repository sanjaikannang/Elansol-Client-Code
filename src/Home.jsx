import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchUsers();
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://sanjaikannang-elansol-server-code.onrender.com/user/get-all-user",
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        const data = response.data;
        const formattedUsers = data.map((user) => ({
          ...user,
          dateOfBirth: new Date(user.dateOfBirth).toISOString().split("T")[0],
        }));
        setUsers(formattedUsers);
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-white-800 p-4 text-grey flex justify-between items-center">
        <div className="text-xl text-grey font-semibold"></div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogout}
            className="text-white bg-blue-500 font-medium px-3 py-1 rounded-3xl"
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="container mx-auto mt-8">
        <h1 className="text-2xl font-semibold mb-4 ">User Details</h1>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Date of Birth</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.dateOfBirth}</td>
                <td className="border px-4 py-2">Active</td>
                <td className="border px-4 py-2">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <br />
      <br />
    </>
  );
};

export default Home;
