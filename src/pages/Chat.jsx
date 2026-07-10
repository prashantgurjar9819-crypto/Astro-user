import { ArrowLeft, Search, Mic } from "lucide-react";
 

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
  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#fafafa]">

      {/* Header */}

      <div className="flex items-center gap-4 px-4 py-5 bg-white sticky top-0">
        <ArrowLeft size={24} />
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

      <div className="space-y-4 px-4 pb-5">
        {astrologers.map((item, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-md p-4">
            <div className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h2 className="font-bold text-[#1d2340]">{item.name}</h2>
                <p className="text-sm text-gray-500">{item.skill}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-lg font-bold text-orange-500">{item.price}</span>
              <span className="text-sm text-gray-500">{item.exp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}