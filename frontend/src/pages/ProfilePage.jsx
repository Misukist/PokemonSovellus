import Masterball from "../assets/Masterball.png"
import Blank from "../assets/BlankProfile.png"
import { Link } from "react-router-dom";

const ProfilePage = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-linear-to-br from-neutral-900 to-neutral-950">
        <div className="flex flex-col items-center justify-center w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto shadow-xl rounded-2xl bg-neutral-900">
        
            {/* Taustakuva */}
            <div className="w-full h-23  md:h-36 lg:h-40 overflow-hidden rounded-t-2xl">
                <img
                    src={Masterball}
                    alt="Tausta"
                    className="w-full h-full object-cover object-top"
                />
            </div>

            {/* Profiilikuva */}
            <div className="mx-auto border-4 border-neutral-900 rounded-full overflow-hidden
                w-26 h-26 sm:w-28 sm:h-28 md:w-34 md:h-34 lg:w-36 lg:h-36
                relative -mt-16 sm:-mt-18 md:-mt-20">
            <img
                className="w-full h-full object-cover object-center"
                alt="Profile picture"
                src={Blank}
            />
            </div>

            {/* Profiilikuva */}
            <div className="flex flex-col justify-center items-center">
                <h2 className="font-semibold text-white text text-2xl">
                    Username
                </h2>
                <p className="font-light text-gray-300 text-sm">
                    Joined: 06/11/2025
                </p>
            </div>
            <div className="flex justify-center items-center border-t mt-8 pt-2 pb-4 mx-2 border-gray-300 w-2/3 ">
                <Link to="/collection" className="flex gap-1 px-4 py-2 text-white hover:text-red-900 cursor-pointer rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                    My Collection
                </Link>
            </div>
        </div>
    </div>
  );
};

export default ProfilePage;
