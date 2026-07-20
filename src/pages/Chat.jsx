import { ArrowLeft, Search, Mic, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Bottomnav from "../component/Bottomnav";
import { useAuth } from "../context/AuthContext";

const astrologers = [
  {
    name: "Vikram",
    skill: "Love, Career",
    exp: "0-2 Years",
    rating: "4.9",
    price: "₹15/min",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Sumit",
    skill: "Love, Career",
    exp: "5 Years",
    rating: "4.9",
    price: "₹20/min",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Rahul",
    skill: "Love, Career",
    exp: "3 Years",
    rating: "4.8",
    price: "₹18/min",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Neha",
    skill: "Love, Career",
    exp: "6 Years",
    rating: "5.0",
    price: "₹25/min",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

export default function Chat() {
  const navigate = useNavigate();
  const { isLoggedIn, triggerLoginModal } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-[#FAFAFA] relative shadow-xl">

        {/* Scrollable Content */}
        <div className="overflow-y-auto pb-28">

          {/* Header */}
          <div className="flex items-center gap-4 px-4 py-5 bg-white sticky top-0 z-10">
            <ArrowLeft
              size={24}
              className="cursor-pointer"
              onClick={() => navigate("/home")}
            />

            <h1 className="text-3xl font-medium">Chat</h1>
          </div>

          {/* Search */}
          <div className="px-4 py-3">
            <div className="bg-[#FFF2EC] rounded-full flex items-center px-4 py-3">
              <Search className="text-gray-400" size={20} />
              <input
                placeholder='Search for "Astrologer"'
                className="flex-1 bg-transparent outline-none ml-3"
              />
              <Mic className="text-orange-500" />
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-4 px-4">
            {astrologers.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  if (!isLoggedIn) {
                    triggerLoginModal("Chat", `/chat-session/${item.name}`);
                  } else {
                    navigate(`/chat-session/${item.name}`, { state: { astrologer: item } });
                  }
                }}
                className="bg-white rounded-2xl shadow-md p-4 cursor-pointer active:scale-[0.99] transition-transform"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />

                    <div>
                      <h2 className="font-bold text-[#1d2340] text-lg">
                        {item.name}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {item.skill}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isLoggedIn) {
                        triggerLoginModal("Chat", `/chat-session/${item.name}`);
                      } else {
                        navigate(`/chat-session/${item.name}`, { state: { astrologer: item } });
                      }
                    }}
                    className="bg-[#FFF2EC] text-[#FF6F3D] text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 hover:bg-[#FFE5D8] transition-colors cursor-pointer border border-[#FFF2EC]"
                  >
                    <MessageCircle size={14} className="fill-[#FF6F3D] text-[#FF6F3D]" />
                    Chat
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-bold text-orange-500">
                    {item.price}
                  </span>

                  <span className="text-sm text-gray-500">
                    {item.exp}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Navigation */}
        <Bottomnav />

      </div>
    </div>
  );
}