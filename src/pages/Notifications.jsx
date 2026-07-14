import { FiArrowLeft, FiMessageCircle, FiPhone, FiTag } from "react-icons/fi";
import { IoNotifications } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Notifications() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F5F5F5] min-h-screen flex justify-center">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="bg-white h-16 flex items-center justify-center relative border-b">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-4 text-2xl"
          >
            <FiArrowLeft />
          </button>

          <h1 className="text-2xl font-semibold">
            Notifications
          </h1>

          <IoNotifications className="absolute right-4 text-2xl text-red-500" />
        </div>

        <div className="p-4 space-y-4">

          <NotificationCard
            icon={<FiMessageCircle />}
            title="Chat Started"
            desc="Your chat session has started."
            time="2 min ago"
            color="bg-blue-100"
          />

          <NotificationCard
            icon={<FiPhone />}
            title="Call Completed"
            desc="₹200 deducted for 8 min call."
            time="1 hour ago"
            color="bg-orange-100"
          />

          <NotificationCard
            icon={<FiTag />}
            title="Special Offer 🎉"
            desc="Get 20% extra talktime on recharge."
            time="Yesterday"
            color="bg-purple-100"
          />

        </div>

      </div>
    </div>
  );
}

function NotificationCard({ icon, title, desc, time, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center text-xl`}>
        {icon}
      </div>

      <div className="flex-1">
        <h2 className="font-bold">{title}</h2>
        <p className="text-gray-500">{desc}</p>
        <p className="text-gray-400 text-sm mt-1">{time}</p>
      </div>
    </div>
  );
}

export default Notifications;