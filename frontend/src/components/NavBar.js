import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faComment,
  faNewspaper,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      dispatch(logout());
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-neutral-800 text-sm py-3 text-white">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center justify-between">
          <a
            className="flex-none text-xl font-semibold focus:outline-none focus:opacity-80"
            href="/home"
            aria-label="Brand"
          >
            <span className="inline-flex items-center gap-x-2 text-xl font-semibold">
              <img
                className="w-8 h-8 mr-2 filter invert"
                src="https://static.vecteezy.com/system/resources/previews/015/072/932/original/chat-news-icon-outline-studio-camera-vector.jpg"
                alt="logo"
              />
              ChatNews
            </span>
          </a>
          <div className="sm:hidden">
            <button
              type="button"
              className="relative flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-neutral-800 text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="hs-navbar-example"
              aria-label="Toggle navigation"
            >
              <svg
                className={`hs-collapse-open:hidden shrink-0 size-4`}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
              <svg
                className={`hs-collapse-open:block hidden shrink-0 size-4 ${
                  isMenuOpen ? "block" : "hidden"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>
        </div>
        <div
          id="hs-navbar-example"
          className={`overflow-hidden transition-all duration-300 basis-full grow sm:block ${
            isMenuOpen ? "block" : "hidden"
          }`}
          aria-labelledby="hs-navbar-example-collapse"
        >
          <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
            <a
              className="flex items-center gap-x-2 font-medium hover:text-blue-400 focus:outline-none"
              href="/profile"
              aria-current="page"
            >
              <FontAwesomeIcon icon={faUser} />
              Profile
            </a>
            <a
              className="flex items-center gap-x-2 font-medium hover:text-blue-400 focus:outline-none"
              href="/chat"
            >
              <FontAwesomeIcon icon={faComment} />
              Chat
            </a>
            <a
              className="flex items-center gap-x-2 font-medium hover:text-blue-400 focus:outline-none"
              href="/news"
            >
              <FontAwesomeIcon icon={faNewspaper} />
              News
            </a>
            <button
              className="flex items-center gap-x-2 font-medium text-red-500 hover:text-red-400 focus:outline-none"
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
