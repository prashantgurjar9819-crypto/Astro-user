import {
  Calendar,
  Clock3,
  MessageCircle,
  Phone,
} from "lucide-react";

export default function HistoryCard({ item }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-5">

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-2xl font-bold text-[#1D2340]">
            {item.name}
          </h2>

          <div
            className={`flex items-center gap-2 mt-3 text-lg font-medium ${
              item.mode === "chat"
                ? "text-blue-500"
                : "text-orange-500"
            }`}
          >
            {item.mode === "chat" ? (
              <MessageCircle size={20} />
            ) : (
              <Phone size={18} />
            )}

            {item.type}
          </div>

        </div>

        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold ${
            item.status === "Completed"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-500"
          }`}
        >
          {item.status}
        </span>

      </div>

      <div className="flex items-center gap-5 mt-5 text-gray-400 text-base">

        <div className="flex items-center gap-2">
          <Calendar size={18} />
          {item.date}
        </div>

        <div className="flex items-center gap-2">
          <Clock3 size={18} />
          {item.duration}
        </div>

      </div>

      <div className="flex justify-between items-end mt-6">

        <span className="text-gray-400 text-xl">
          {item.price}
        </span>

        <span className="text-3xl font-bold text-[#1D2340]">
          Total: {item.total}
        </span>

      </div>

    </div>
  );
}