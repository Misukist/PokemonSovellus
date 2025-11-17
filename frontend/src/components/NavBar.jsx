import { Link, useLocation } from "react-router-dom";
import Logo from '../assets/Logo.svg';
import { DropdownExpansion } from "../utils/dropDownExpansion";
import { DropDown } from "../utils/dropDown";



const NavBar = () => {

    const location = useLocation();
    const isCards = location.pathname === "/cards";
    const isMega = location.pathname === "/mega";
    const isScarlet = location.pathname === "/scarlet";
    const isPhantasmal = location.pathname === "/phantasmal";
    const isMyCollection = location.pathname === "/collection";




    return (
        <div
        className={`w-full py-4 px-2 top-0 z-50 shadow-xl/20 transition-all duration-300 ${
            isCards || isMega || isPhantasmal || isScarlet || isMyCollection
        ? "sticky bg-black shadow-lg "  // Etusivu
        : "fixed bg-black/60 backdrop-blur-3xl"            // Muut sivut
        }`}
        >
            <nav className="flex items-center justify-between mx-2">
                {/* Vasemmalla logo + Home */}
                <div className="flex items-center">
                    <Link to="/" className="">
                        <img src={Logo} alt="Logo" className="w-16 h-16 cursor-pointer hover:scale-110 transition"/>
                    </Link>
                    <div className="flex items-center ml-5 space-x-3">
                    <DropdownExpansion/>
                    <Link to="/cards" className="text-md font-bold text-white sm:hover:border-indigo-400 hover:text-red-800 hover:bg-gray-300 sm:hover:bg-transparent rounded-lg p-1">
                        Cards
                    </Link>
                </div>
                </div>

                {/* Oikealla muut linkit */}
                <div className="flex items-center space-x-3 ">
                    <Link to="/collection" className="hidden text-md font-bold gap-1 px-4 py-2 text-white hover:text-red-900 cursor-pointer rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.2" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                        </svg>
                        My Collection
                    </Link>
                    <Link to="/signup" className="text-md font-bold text-white sm:hover:border-indigo-400 hover:text-red-800 hover:bg-gray-300 sm:hover:bg-transparent rounded-lg p-1">
                        Sign Up
                    </Link>
                    <Link to="/signin" className="text-md font-bold text-white sm:hover:border-indigo-400 hover:text-red-800 hover:bg-gray-300 sm:hover:bg-transparent rounded-lg p-1">
                        Sign In
                    </Link>
                    <DropDown/>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
