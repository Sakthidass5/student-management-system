import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow-md">
      <div>
        <h1 className="text-lg font-bold">Student Management</h1>
        {token && role && (
          <p className="text-sm text-gray-300">Role: {role}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-3 mt-2 sm:mt-0 items-center relative">
        {!token ? (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/studentsPage" className="hover:underline">StudentsList</Link>
            <Link to="/StudentsImportExportPage" className="hover:underline">File Export</Link>

            {role === "Admin" && (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="hover:underline"
                >
                  Admin Tools ▾
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md z-10">
                    <Link
                      to="/audit-logs"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Audit Logs
                    </Link>
                    <Link
                      to="/students/add"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Add Student
                    </Link>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={handleLogout}
              className="bg-white text-gray-800 px-3 py-1 rounded hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
