import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AiContext } from "../context/AiContext";
import ProfilePage from "./ProfilePage";
import { GoArrowRight } from "react-icons/go";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { LuSun } from "react-icons/lu";
import { IoMoon } from "react-icons/io5";

const Navbar: React.FC = () => {
  const {
    updatesInfo,
    showProfile,
    setShowProfile,
    onHandleTheme,
    toggleTheme,
    isAuthenticated,
    logout,
    imageCredits
  } = useContext(AiContext);

  const navigate = useNavigate();

  const toggleProfile = (): void => {
    setShowProfile((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-between py-4 px-7 border-b border-b-gray-300/30 relative dark:border-0">
      <h1 className="text-3xl text-gray-500/90 dark:text-white">Else ai.</h1>

      <div className="flex items-center gap-5">
        {/* Theme Toggle */}
        <button
          onClick={onHandleTheme}
          className="p-1.5 dark:text-white dark:bg-slate-700 bg-gray-200 cursor-pointer rounded-full"
        >
          {toggleTheme === "" ? <IoMoon size={25} /> : <LuSun size={25} />}
        </button>

        {/* Future updates */}
        <div
          onClick={updatesInfo}
          className="hidden md:flex items-center space-x-2 border border-blue-500/30 rounded-full bg-blue-500/20 p-1 text-sm text-blue-600 cursor-pointer"
        >
          <div className="flex items-center space-x-1 bg-blue-500 text-white rounded-2xl px-3 py-1">
            <p>Future Updates</p>
            <GoArrowRight size={20} />
          </div>
        </div>

        {/* AUTH SECTION */}
        {!isAuthenticated ? (
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
          >
            Login
          </button>
        ) : (
          <>
            <img
              onClick={toggleProfile}
              src={assets.user_icon}
              alt="user-icon"
              className="rounded-full h-10 w-10 cursor-pointer"
            />

            {showProfile && (
              <div className="absolute z-[9999] top-16 right-5 w-full max-w-[250px] rounded-2xl border border-gray-200 bg-white overflow-hidden">
                <img
                  src={assets.mountains}
                  alt="mountains"
                  className="w-full h-32 object-cover"
                />

                {/* Profile content */}
                <ProfilePage />

        

                {/* Logout */}
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="w-full py-2 text-red-600 bg-red-100 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
