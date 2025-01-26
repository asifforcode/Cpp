import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference for the dropdown menu

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside the dropdown
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
        {/* Dropdown and Logo Wrapper */}
        <div className="flex items-center w-full justify-between">
          <div className="flex-grow flex justify-center">
            <Link to='/home'>
              <img
                src="https://www.speakx.ai/_next/image?url=https%3A%2F%2Fimage.ivykids.in%2Fasset%2Fhome%2Fmain-logo%403x.png&w=1920&q=75"
                alt="SpeakX Logo"
                className="h-10 cursor-pointer" // Adjust height as needed
              />
            </Link>
          </div>

          <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center w-32 text-xl px-4 py-2 text-sm font-medium text-teal-600 bg-white border border-teal-300 rounded-md hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Tags
              <svg className="-mr-1 ml-2 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <Link to='/mcqpage' className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-100 transition duration-200">MCQ</Link>
                  <Link to='/read_alongpage' className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-100 transition duration-200">READ ALONG</Link>
                  <Link to='/content_onlypage' className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-100 transition duration-200">CONTENT ONLY</Link>
                  <Link to='/anagrampage' className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-100 transition duration-200">ANAGRAM</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;