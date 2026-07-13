import {
  FiClock,
  FiBell,
  FiHelpCircle,
  FiLogOut,
  FiChevronRight,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Time from "../component/Time";

function Profile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-md min-h-screen bg-gray-100 pb-24">

        {/* Header */}
        <div className="bg-orange-400 rounded-b-[35px] px-5 pt-8 pb-8 text-center">

          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto border-4 border-white object-cover"
          />

          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-4">
            Ravi Sharma
          </h1>

          <p className="text-white/80 text-sm sm:text-base">
            ravi@gmail.com
          </p>

          {/* Progress Circle */}
          <div className="w-28 h-28 border-8 border-white/30 rounded-full flex items-center justify-center mx-auto mt-6">
            <span className="text-white text-3xl font-bold">
              0%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2.5 bg-white/30 rounded-full mt-6">
            <div className="w-0 h-full bg-white rounded-full"></div>
          </div>

          <button className="mt-6 bg-white text-orange-500 px-8 py-3 rounded-full font-semibold shadow-md">
            Complete Profile
          </button>

        </div>

        {/* Menu */}
        <div className="px-4 py-5 space-y-4">

          <MenuItem
            icon={<FiClock />}
            title="Booking History"
            onClick={() => navigate("/booking-history")}
          />

          <MenuItem
            icon={<FiBell />}
            title="Notifications"
            onClick={() => navigate("/notifications")}
          />

          <MenuItem
            icon={<FiHelpCircle />}
            title="Help & Support"
            onClick={() => navigate("/help-support")}
          />

          <MenuItem
            icon={<FiLogOut />}
            title="Logout"
            danger
          />

        </div>

        <Time />

      </div>
    </div>
  );
}

function MenuItem({ icon, title, danger, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition"
    >
      <div
        className={`flex items-center gap-4 ${
          danger ? "text-red-500" : ""
        }`}
      >
        <div
          className={`text-xl ${
            danger ? "text-red-500" : "text-orange-500"
          }`}
        >
          {icon}
        </div>

        <span className="text-base font-medium">
          {title}
        </span>
      </div>

      <FiChevronRight className="text-gray-400" />
    </div>
  );
}

export default Profile;