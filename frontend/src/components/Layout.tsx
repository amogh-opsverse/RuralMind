// Layout.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import React from "react";
import { Link } from "react-router-dom";
//import Navbar from './Navbar';
import "../styles/signup.css";
import "../styles/pulse.css";
import "../styles/nav.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-gray-800 bg-opacity-90 backdrop-blur-lg shadow-md z-50 border-b-2 border-gray-700">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-3xl font-bold text-white rounded py-2 px-4 bg-blue-500 bg-opacity-75 hover:bg-blue-600 transition-all">
            <Link to="/" className="flex items-center">
              Rural Reach
            </Link>
          </div>
          <div>
            <Link
              to="/about"
              className="text-lg text-gray-400 hover:text-white transition-all"
            >
              <FontAwesomeIcon icon={faInfoCircle} size="2x" />
            </Link>
          </div>
        </div>
      </nav>

      <main>{children}</main>
    </>
  );
};

export default Layout;
