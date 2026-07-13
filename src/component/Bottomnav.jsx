import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaComments,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";

function Bottomnav() {
  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[320px] h-[60px] bg-white rounded-full shadow-xl px-5 flex justify-between items-center z-[9999]">

      {/* Home */}
      <NavLink
        to="/home"
        className={({ isActive }) =>
          `flex flex-col items-center ${
            isActive ? "text-orange-500" : "text-gray-500"
          }`
        }
      >
        <FaHome size={25} />
        <span className="text-[8px] font-semibold mt-[1px]">
          Home
        </span>
      </NavLink>

      {/* Chat */}
      <NavLink
        to="/chat"
        className={({ isActive }) =>
          `flex flex-col items-center ${
            isActive ? "text-orange-500" : "text-gray-500"
          }`
        }
      >
        <FaComments size={25} />
        <span className="text-[8px] mt-[1px]">
          Chat
        </span>
      </NavLink>

      {/* Live Astro */}
      <NavLink
        to="/liveastro"
        className={({ isActive }) =>
          `flex flex-col items-center ${
            isActive ? "text-orange-500" : "text-gray-500"
          }`
        }
      >
        <MdLiveTv size={25} />
        <span className="text-[7px] mt-[1px]">
          LIVE ASTRO
        </span>
      </NavLink>

      {/* Call */}
      <NavLink
        to="/call"
        className={({ isActive }) =>
          `flex flex-col items-center ${
            isActive ? "text-orange-500" : "text-gray-500"
          }`
        }
      >
        <FaPhoneAlt size={25} />
        <span className="text-[8px] mt-[1px]">
          Call
        </span>
      </NavLink>

      {/* Profile */}
<NavLink
  to="/profile"
  className={({ isActive }) =>
    `flex flex-col items-center ${
      isActive ? "text-orange-500" : "text-gray-500"
    }`
  }
>
  <FaUser size={25} />
  <span className="text-[8px] mt-[1px]">
    Profile
  </span>
</NavLink>

    </div>
  );
}

export default Bottomnav;