import { FaBell, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f8c9c1] rounded-b-[28px] px-5 pt-5 pb-5">
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">
          <img
            src="https://randomuser.me/api/portraits/women/65.jpg"
            alt="profile"
            className="w-14 h-14 rounded-full object-cover border-2 border-white"
          />

          <div>
            <h2 className="text-[18px] font-bold text-[#222] leading-none">
              Ravi Sharma
            </h2>

            <p className="text-gray-700 text-[13px] mt-1">
              Welcome!
            </p>
          </div>
        </div>

        <div className="flex gap-2">

          {/* Notification Icon */}
          <div
            onClick={() => navigate("/notifications")}
            className="w-9 h-9 bg-white rounded-full shadow flex items-center justify-center cursor-pointer hover:bg-orange-100"
          >
            <FaBell size={18} />
          </div>

          {/* Message Icon */}
          <div className="w-9 h-9 bg-white rounded-full shadow flex items-center justify-center cursor-pointer">
            <FaEnvelope size={18} />
          </div>

        </div>

      </div>
    </div>
  );
}

export default Header;