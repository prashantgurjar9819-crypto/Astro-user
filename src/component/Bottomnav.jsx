<<<<<<< HEAD
import { MdLiveTv } from "react-icons/md";
import {
  FaHome,
  FaComments,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

function Bottomnav() {
  const navigate = useNavigate();
  const location = useLocation();

  const active = (path) =>
    location.pathname === path
      ? "text-orange-500"
      : "text-gray-400";

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-[430px] px-5">
      <div className="bg-white rounded-full shadow-xl h-[72px] flex items-center justify-around">

        {/* Home */}
        <button
          onClick={() => navigate("/home")}
          className={`flex flex-col items-center ${active("/home")}`}
        >
          <FaHome size={24} />
          <span className="text-[12px] mt-1 font-medium">
            Home
          </span>
        </button>

        {/* Chat */}
        <button
          onClick={() => navigate("/chat")}
          className={`flex flex-col items-center ${active("/chat")}`}
        >
          <FaComments size={22} />
          <span className="text-[12px] mt-1 font-medium">
            Chat
          </span>
        </button>

        {/* Live Astro */}
        <button
          onClick={() => navigate("/live-astro")}
          className={`flex flex-col items-center ${active("/live-astro")}`}
        >
          <MdLiveTv size={23} />
          <span className="text-[10px] mt-1 font-semibold">
            LIVE ASTRO
          </span>
        </button>

        {/* Call */}
        <button
          onClick={() => navigate("/call")}
          className={`flex flex-col items-center ${active("/call")}`}
        >
          <FaPhoneAlt size={22} />
          <span className="text-[12px] mt-1 font-medium">
            Call
          </span>
        </button>

        {/* Profile */}
        <button
          onClick={() => navigate("/profile")}
          className={`flex flex-col items-center ${active("/profile")}`}
        >
          <FaUser size={22} />
          <span className="text-[12px] mt-1 font-medium">
            Profile
          </span>
        </button>

      </div>
    </div>
  );
}

=======
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaComments,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";
import { useAuth } from "../context/AuthContext";

function Bottomnav() {
  const { isLoggedIn, triggerLoginModal } = useAuth();

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-3 pb-2 z-50">
      <div className="bg-white h-[82px] rounded-full shadow-2xl flex justify-around items-center">

        <NavLink
          to="/home"
          className={({ isActive }) =>
            `flex flex-col items-center flex-1 ${
              isActive ? "text-orange-500" : "text-[#8E90A6]"
            }`
          }
        >
          <FaHome size={22} />
          <span className="text-[11px] mt-1">Home</span>
        </NavLink>

        <NavLink
          to="/chat"
          className={({ isActive }) =>
            `flex flex-col items-center flex-1 ${
              isActive ? "text-orange-500" : "text-[#8E90A6]"
            }`
          }
        >
          <FaComments size={22} />
          <span className="text-[11px] mt-1">Chat</span>
        </NavLink>

        <NavLink
          to="/liveastro"
          className={({ isActive }) =>
            `flex flex-col items-center flex-1 ${
              isActive ? "text-orange-500" : "text-[#8E90A6]"
            }`
          }
        >
          <MdLiveTv size={22} />
          <span className="text-[10px] mt-1">LIVE ASTRO</span>
        </NavLink>

        <NavLink
          to="/call"
          className={({ isActive }) =>
            `flex flex-col items-center flex-1 ${
              isActive ? "text-orange-500" : "text-[#8E90A6]"
            }`
          }
        >
          <FaPhoneAlt size={22} />
          <span className="text-[11px] mt-1">Call</span>
        </NavLink>

        {isLoggedIn ? (
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex flex-col items-center flex-1 ${
                isActive ? "text-orange-500" : "text-[#8E90A6]"
              }`
            }
          >
            <FaUser size={22} />
            <span className="text-[11px] mt-1">Profile</span>
          </NavLink>
        ) : (
          <button
            onClick={() => triggerLoginModal("Profile", "/profile")}
            className="flex flex-col items-center flex-1 text-[#8E90A6] cursor-pointer"
          >
            <FaUser size={22} />
            <span className="text-[11px] mt-1">Profile</span>
          </button>
        )}

      </div>
    </div>
  );
}

>>>>>>> 7fffa17f50f402cfd03c147092ef277e7c909a45
export default Bottomnav;