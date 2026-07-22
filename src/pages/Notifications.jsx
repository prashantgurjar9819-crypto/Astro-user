import {
  FiArrowLeft,
  FiMessageCircle,
  FiPhone,
  FiTag,
  FiGift,
} from "react-icons/fi";
import { IoNotifications } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Notifications() {
  const navigate = useNavigate();
  const { isLoggedIn, triggerLoginModal } = useAuth();

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex justify-center">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-b-[35px] shadow-md px-5 pt-12 pb-6 relative">

          <button
            onClick={() => navigate(-1)}
            className="absolute left-5 top-12 text-white text-2xl"
          >
            <FiArrowLeft />
          </button>

          <div className="text-center">
            <h1 className="text-white text-2xl font-bold">
              Notifications
            </h1>

            <p className="text-orange-100 text-sm mt-1">
              Stay updated with your activity
            </p>
          </div>

          <div className="absolute right-5 top-12">
            <div className="relative">
              <IoNotifications className="text-white text-3xl" />

              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
                4
              </span>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="p-4 space-y-4">

          <NotificationCard
            icon={<FiMessageCircle />}
            title="Chat Started"
            desc="Your consultation with Vikram has started."
            time="2 min ago"
            color="bg-blue-100 text-blue-600"
            unread
          />

          <NotificationCard
            icon={<FiPhone />}
            title="Call Completed"
            desc="₹200 deducted for your 8 minute consultation."
            time="1 hour ago"
            color="bg-orange-100 text-orange-600"
          />

          <NotificationCard
            icon={<FiGift />}
            title="Wallet Credited"
            desc="₹500 added successfully to your wallet."
            time="Yesterday"
            color="bg-green-100 text-green-600"
          />

          <div
            onClick={() => {
              if (!isLoggedIn) {
                triggerLoginModal(
                  "Recharge Wallet",
                  "/notifications"
                );
              }
            }}
            className="cursor-pointer"
          >
            <NotificationCard
              icon={<FiTag />}
              title="Special Offer 🎉"
              desc="Recharge today & get 20% extra talktime."
              time="Yesterday"
              color="bg-purple-100 text-purple-600"
              unread
            />
          </div>

        </div>
      </div>
    </div>
  );
}

function NotificationCard({
  icon,
  title,
  desc,
  time,
  color,
  unread = false,
}) {
  return (
    <div className="bg-white rounded-3xl border border-orange-100 shadow-sm hover:shadow-lg transition-all duration-300 p-4 flex gap-4">

      <div
        className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-2xl`}
      >
        {icon}
      </div>

      <div className="flex-1">

        <div className="flex justify-between items-start">

          <h2 className="font-semibold text-gray-800 text-[17px]">
            {title}
          </h2>

          <div className="flex items-center gap-2">

            {unread && (
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            )}

            <span className="text-xs text-gray-400">
              {time}
            </span>

          </div>

        </div>

        <p className="text-gray-500 mt-2 leading-6 text-sm">
          {desc}
        </p>

      </div>

    </div>
  );
}

export default Notifications;