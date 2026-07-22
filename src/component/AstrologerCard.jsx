import React, { useState } from "react";
import { CheckCircle, Star, Phone, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AstrologerCard({ item }) {
  const { isLoggedIn, triggerLoginModal } = useAuth();
  const navigate = useNavigate();

  const data = item || {
    name: "Sumit Kumar",
    skills: "Love, Career, Marriage",
    experience: "5 Years",
    rating: "4.9",
    price: "₹30/min",
    image: "https://i.pravatar.cc/200?img=12",
    tag: "Top Rated"
  };

  const [isFollowed, setIsFollowed] = useState(() => {
    try {
      const list = JSON.parse(localStorage.getItem("followedAstrologers")) || [];
      return list.includes(data.name);
    } catch {
      return false;
    }
  });

  const handleToggleFollow = (e) => {
    e.stopPropagation();
    try {
      const list = JSON.parse(localStorage.getItem("followedAstrologers")) || [];
      let updated;
      if (list.includes(data.name)) {
        updated = list.filter((n) => n !== data.name);
        setIsFollowed(false);
      } else {
        updated = [...list, data.name];
        setIsFollowed(true);
      }
      localStorage.setItem("followedAstrologers", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-gray-100 p-4.5 flex items-center justify-between gap-3 w-full hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:scale-[1.01] transition-all duration-300">

      {/* Left Details */}
      <div className="flex gap-3.5 flex-1 min-w-0">

        {/* Image */}
        <div className="relative flex-shrink-0">
          {data.tag && (
            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#ff7448] text-white text-[8px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap uppercase tracking-wider shadow-sm">
              {data.tag}
            </span>
          )}

          <div className="w-18 h-18 rounded-2xl overflow-hidden border border-orange-100 shadow-inner">
            <img
              src={data.image}
              alt={data.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">

          <div className="flex items-center gap-1.5 flex-wrap">
            <h2 className="font-bold text-[#1d2340] text-base leading-tight truncate">
              {data.name}
            </h2>
            <CheckCircle
              size={14}
              className="text-[#2EA248] fill-[#EBF7EE] flex-shrink-0"
            />
            <button
              onClick={handleToggleFollow}
              className={`text-[9px] font-bold px-2 py-0.5 rounded-md transition-all uppercase tracking-wider cursor-pointer active:scale-95 ${
                isFollowed
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {isFollowed ? "Following" : "+ Follow"}
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-1 leading-normal truncate">
            {data.skills}
          </p>

          <p className="text-[10px] font-bold text-gray-400 mt-0.5 uppercase tracking-wider">
            Exp: {data.experience}
          </p>

          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-0.5">
              <Star
                size={13}
                className="fill-yellow-400 text-yellow-400"
              />
              <span className="text-xs font-bold text-gray-700">
                {data.rating}
              </span>
            </div>

            <span className="text-xs font-bold text-[#ff7448]">
              {data.price}
            </span>
          </div>

        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 flex-shrink-0">

        <button
          onClick={() => {
            if (!isLoggedIn) {
              triggerLoginModal("Audio Call", "/call");
            } else {
              navigate(`/call-session/${data.name}?type=audio`, { state: { astrologer: data } });
            }
          }}
          className="w-[96px] py-2.5 rounded-full bg-[#EBF7EE] text-[#2EA248] hover:bg-[#d8eedc] text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
        >
          <Phone size={13} className="fill-current" />
          Audio
        </button>

        <button
          onClick={() => {
            if (!isLoggedIn) {
              triggerLoginModal("Video Call", "/call");
            } else {
              navigate(`/call-session/${data.name}?type=video`, { state: { astrologer: data } });
            }
          }}
          className="w-[96px] py-2.5 rounded-full bg-[#FFF2EC] text-[#FF6F3D] hover:bg-[#ffe5d9] text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
        >
          <Video size={13} className="fill-current" />
          Video
        </button>

      </div>

    </div>
  );
}

export default AstrologerCard;