import { CheckCircle, Star, Phone, Video } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function AstrologerCard() {
  const { isLoggedIn, triggerLoginModal } = useAuth();

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4 flex items-start justify-between gap-3 w-full">

      {/* Left */}
      <div className="flex gap-3 flex-1 min-w-0">

        {/* Image */}
        <div className="relative flex-shrink-0">
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[9px] px-2 py-0.5 rounded-full whitespace-nowrap">
            Top Rated
          </span>

          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-orange-500">
            <img
              src="https://i.pravatar.cc/200?img=12"
              alt="Astrologer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">

          <div className="flex items-center gap-1">
            <h2 className="font-semibold text-base truncate">
              Sumit Kumar
            </h2>

            <CheckCircle
              size={16}
              className="text-green-500 fill-green-500"
            />
          </div>

          <p className="text-xs text-gray-500">
            Love, Career,
          </p>

          <p className="text-xs text-gray-500">
            Marriage
          </p>

          <p className="text-xs text-gray-400 mt-1">
            Exp : 5 Years
          </p>

          <div className="flex items-center justify-between mt-2">

            <div className="flex items-center gap-1">
              <Star
                size={14}
                className="fill-yellow-400 text-yellow-400"
              />
              <span className="text-sm font-semibold">
                4.9
              </span>
            </div>

            <span className="text-sm font-bold text-orange-500">
              ₹30/min
            </span>

          </div>

        </div>

      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2 flex-shrink-0">

        <button
          onClick={() => {
            if (!isLoggedIn) {
              triggerLoginModal("Call", "/call");
            }
          }}
          className="w-24 h-10 rounded-full border border-green-500 text-green-600 text-xs font-medium flex items-center justify-center gap-1 hover:bg-green-50 cursor-pointer"
        >
          <Phone size={14} />
          Audio
        </button>

        <button
          onClick={() => {
            if (!isLoggedIn) {
              triggerLoginModal("Video Call", "/call");
            }
          }}
          className="w-24 h-10 rounded-full border border-green-500 text-green-600 text-xs font-medium flex items-center justify-center gap-1 hover:bg-green-50 cursor-pointer"
        >
          <Video size={14} />
          Video
        </button>

      </div>

    </div>
  );
}

export default AstrologerCard;