import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("token", "");
    navigate("/signin");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="text-xl font-bold">
          Dashboard
        </Link>

        <div className="space-x-4">
          {token ? (
            <>
              <Link to="/addproduct" className="hover:underline">
                Add Product
              </Link>
              <Link to="/allProduct" className="hover:underline">
                Product List
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-4 py-1 rounded-md hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="hover:underline">
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
