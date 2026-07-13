import { MdLiveTv } from "react-icons/md";
import {
  FaHome,
  FaComments,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Bottomnav() {
  const navigate = useNavigate();

  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[320px] h-[60px] bg-white rounded-full shadow-xl px-5 flex justify-between items-center z-50">

      {/* Home */}
      <div
        onClick={() => navigate("/home")}
        className="flex flex-col items-center text-orange-500 cursor-pointer"
      >
        <FaHome size={25} />
        <span className="text-[8px] font-semibold mt-[1px]">
          Home
        </span>
      </div>

      {/* Chat */}
      <div
        onClick={() => navigate("/chat")}
        className="flex flex-col items-center text-gray-500 cursor-pointer"
      >
        <FaComments size={25} />
        <span className="text-[8px] mt-[1px]">
          Chat
        </span>
      </div>

      {/* LIVE ASTRO */}
      <div
        onClick={() => navigate("/live-astro")}
        className="flex flex-col items-center text-gray-500 cursor-pointer"
      >
        <MdLiveTv size={25} />
        <span className="text-[7px] mt-[1px] font-semibold">
          LIVE ASTRO
        </span>
      </div>

      {/* Call */}
      <div
        onClick={() => navigate("/call")}
        className="flex flex-col items-center text-gray-500 cursor-pointer"
      >
        <FaPhoneAlt size={25} />
        <span className="text-[8px] mt-[1px]">
          Call
        </span>
      </div>

      {/* Profile */}
      <div
        onClick={() => navigate("/profile")}
        className="flex flex-col items-center text-orange-500 cursor-pointer"
      >
        <FaUser size={25} />
        <span className="text-[8px] font-semibold mt-[1px]">
          Profile
        </span>
      </div>

    </div>
  );
}

export default Bottomnav;