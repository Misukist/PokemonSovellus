import { useState, useRef, useEffect } from "react";
import Phantasmal from "../assets/Phantasmal.png";
import Mega from "../assets/Mega.png";
import Scarlet from "../assets/Scarlet.png";
import { Link } from "react-router-dom";


export function DropdownExpansion() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // sulkee kun klikataan ulos
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Dropdown-painike */}
      <button
        id="dropdown-button-expansion"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex overflow-hidden text-md font-bold text-white sm:hover:border-indigo-400 hover:text-red-800 hover:bg-gray-300 sm:hover:bg-transparent rounded-lg p-1"
      >
        Expansions
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-5 h-5 mt-0.5 mr-1 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown-valikko */}
      <div
        id="dropdown-menu-expansion"
        className={`absolute left-0 min-w-max flex-nowrap mt-8 rounded-md shadow-lg bg-black/60 backdrop-blur-3xl ring-1 ring-black ring-opacity-5 space-y-1 transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen
            ? "max-h-[1000px] opacity-100 pointer-events-auto"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <p className="flex gap-1 px-4 py-2 text-white rounded-md font-light">
          Recent Expansions
        </p>

        <Link
          to="/phantasmal"
          onClick={() => setIsOpen(false)}
          className="flex items-center whitespace-nowrap gap-3 px-4 py-2 text-white hover:text-red-900 cursor-pointer rounded-md"
        >
          <img
            src={Phantasmal}
            alt="Phantasmal"
            className="w-[200px] h-20 object-contain bg-black border-2"
          />
          Pokémon TCG: Phantasmal Flames
        </Link>

        <Link
          to="/mega"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 px-4 py-2 text-white hover:text-red-900 cursor-pointer rounded-md"
        >
          <img
            src={Mega}
            alt="Mega"
            className="w-[207px] h-12 object-contain bg-black border-2"
          />
          Pokémon TCG: Mega Evolution
        </Link>

        <Link
          to="/scarlet"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 px-4 py-2 text-white hover:text-red-900 cursor-pointer rounded-md"
        >
          <img
            src={Scarlet}
            alt="Scarlet"
            className="w-[200px] h-20 object-contain bg-black border-2"
          />
          Pokémon TCG: Scarlet & Violet – Black Bolt and White Flare
        </Link>

        <hr className="relative border-t-4 border-red-900" />
      </div>
    </div>
  );
}
