import {
  MessageCircle,
  Phone,
  CalendarDays,
  Clock3,
  IndianRupee,
} from "lucide-react";

export default function HistoryCard({ item }) {
  const isCompleted = item.status === "Completed";

  return (
    <div className="bg-white rounded-[26px] border border-gray-100 shadow-[0_8px_24px_rgba(0,0,0,0.08)] p-5 transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]">

      {/* Top */}
      <div className="flex justify-between items-start">

        <div className="flex items-center gap-4">

          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
              item.mode === "chat"
                ? "bg-blue-100 text-blue-600"
                : "bg-orange-100 text-orange-600"
            }`}
          >
            {item.mode === "chat" ? (
              <MessageCircle size={24} />
            ) : (
              <Phone size={24} />
            )}
          </div>

          <div>
            <h2 className="text-[22px] font-bold text-gray-800">
              {item.name}
            </h2>

            <p
              className={`mt-1 text-sm font-medium ${
                item.mode === "chat"
                  ? "text-blue-600"
                  : "text-orange-600"
              }`}
            >
              {item.type}
            </p>
          </div>

        </div>

        <span
          className={`px-4 py-1 rounded-full text-xs font-semibold ${
            isCompleted
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {item.status}
        </span>

      </div>

      {/* Date & Duration */}

      <div className="flex gap-6 mt-6 text-gray-500 text-sm">

        <div className="flex items-center gap-2">
          <CalendarDays size={17} />
          {item.date}
        </div>

        <div className="flex items-center gap-2">
          <Clock3 size={17} />
          {item.duration}
        </div>

      </div>

      {/* Divider */}

      <div className="border-t border-dashed border-gray-200 my-5"></div>

      {/* Bottom */}

      <div className="flex justify-between items-end">

        <div>

          <p className="text-gray-400 text-xs uppercase tracking-wide">
            Price
          </p>

          <p className="text-xl font-semibold text-gray-700 mt-1">
            {item.price}
          </p>

        </div>

        <div className="text-right">

          <p className="text-gray-400 text-xs uppercase tracking-wide">
            Total Paid
          </p>

          <div className="flex items-center justify-end gap-1 mt-1">

            <IndianRupee
              size={20}
              className="text-orange-500"
            />

            <span className="text-3xl font-bold text-orange-500">
              {item.total.replace("₹", "")}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}