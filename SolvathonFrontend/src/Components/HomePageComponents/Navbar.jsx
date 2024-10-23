// Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-primary-dark text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Content Compass</div>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>
      <div className={`md:flex space-x-4 ${isOpen ? "block" : "hidden"} md:block`}>
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/report" className="hover:underline">Report</Link>
        <Link to="/add-article" className="hover:underline">Add Article</Link>
        <Link to="/analyze" className="hover:underline">Analyze</Link>
      </div>
    </nav>
  );
};

export default Navbar;
