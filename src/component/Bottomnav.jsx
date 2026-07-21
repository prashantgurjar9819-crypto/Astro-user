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

export default Bottomnav;