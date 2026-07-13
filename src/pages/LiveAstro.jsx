import { FaEye } from "react-icons/fa";
import Bottomnav from "../component/Bottomnav";

const astrologers = [
  {
    name: "Rahul",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Rahul",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
  },
  {
    name: "Rahul",
    image: "https://randomuser.me/api/portraits/men/34.jpg",
  },
  {
    name: "Rahul",
    image: "https://randomuser.me/api/portraits/men/35.jpg",
  },
];

const cards = [
  {
    name: "Pandit Rahul",
    speciality: "Vedic Astrology",
    viewers: 245,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
  },
  {
    name: "Pandit Rahul",
    speciality: "Vedic Astrology",
    viewers: 245,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
  },
];

function LiveAstro() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen pb-24">

        {/* Header */}
        <div className="bg-orange-500 text-white px-5 py-6">
          <h1 className="text-3xl font-light">Live Astrologers</h1>
        </div>

        {/* Top Live Users */}
        <div className="flex gap-4 overflow-x-auto p-4">
          {astrologers.map((item, index) => (
            <div key={index} className="text-center flex-shrink-0">
              <div className="relative">
                <img
                  src={item.image}
                  alt=""
                  className="w-16 h-16 rounded-full border-4 border-orange-500"
                />

                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] px-2 rounded-full">
                  LIVE
                </span>
              </div>

              <p className="mt-2">{item.name}</p>
            </div>
          ))}
        </div>

        {/* Live Cards */}
        <div className="px-4 space-y-5">
          {cards.map((item, index) => (
            <div
              key={index}
              className="relative rounded-3xl overflow-hidden h-64"
            >
              <img
                src={item.image}
                alt=""
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/30"></div>

              <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full flex items-center gap-2">
                <FaEye />
                {item.viewers}
              </div>

              <div className="absolute bottom-5 left-5 flex items-center gap-3">
                <img
                  src={item.image}
                  alt=""
                  className="w-12 h-12 rounded-full border-2 border-white"
                />

                <div className="text-white">
                  <h2 className="font-bold text-2xl">{item.name}</h2>
                  <p>{item.speciality}</p>
                </div>
              </div>

              <button className="absolute bottom-5 right-5 bg-orange-500 text-white px-7 py-3 rounded-full text-xl font-semibold">
                Join
              </button>
            </div>
          ))}
        </div>

        <Bottomnav />
      </div>
    </div>
  );
}

export default LiveAstro;