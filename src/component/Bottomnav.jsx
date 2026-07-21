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
import { MdLiveTv } from "react-icons/md";
import {
  FaHome,
  FaComments,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";

function Bottomnav() {
  const navClass = ({ isActive }) =>
    `flex flex-col items-center ${
      isActive ? "text-orange-500" : "text-gray-500"
    }`;

  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[320px] h-[60px] bg-white rounded-full shadow-xl px-5 flex justify-between items-center z-[9999]">

      {/* Home */}
      <NavLink to="/home" className={navClass}>
        <FaHome size={25} />
        <span className="text-[8px] font-semibold mt-[1px]">
          Home
        </span>
      </NavLink>

      {/* Chat */}
      <NavLink to="/chat" className={navClass}>
        <FaComments size={25} />
        <span className="text-[8px] mt-[1px]">
          Chat
        </span>
      </NavLink>

      {/* Live Astro */}
      <NavLink to="/liveastro" className={navClass}>
        <MdLiveTv size={25} />
        <span className="text-[7px] mt-[1px] font-semibold">
          LIVE ASTRO
        </span>
      </NavLink>

      {/* Call */}
      <NavLink to="/call" className={navClass}>
        <FaPhoneAlt size={25} />
        <span className="text-[8px] mt-[1px]">
          Call
        </span>
      </NavLink>

      {/* Profile */}
      <NavLink to="/profile" className={navClass}>
        <FaUser size={25} />
        <span className="text-[8px] mt-[1px]">
          Profile
        </span>
      </NavLink>

    </div>
  );
}

>>>>>>> 7fffa17f50f402cfd03c147092ef277e7c909a45
export default Bottomnav;