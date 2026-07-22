import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LiveStories from "../component/LiveStories";
import LiveCard from "../component/LiveCard";
import Bottomnav from "../component/Bottomnav";

const liveData = [
  {
    id: 1,
    name: "Astro Raj",
    speciality: "Love & Relationship Expert",
    views: "2.5K",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800",
  },
  {
    id: 2,
    name: "Astro Neha",
    speciality: "Career & Marriage",
    views: "1.8K",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
  },
  {
    id: 3,
    name: "Astro Vikram",
    speciality: "Kundli Specialist",
    views: "3.2K",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800",
  },
];

export default function LiveAstro() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-[#F5F6FB] relative shadow-xl">

        {/* Scrollable Content */}
        <div className="overflow-y-auto pb-28">

          {/* Header */}
          <div className="bg-[#F57C38] text-white rounded-b-[30px] px-5 pt-10 pb-6 sticky top-0 z-20">

            <div className="flex items-center">
              <button onClick={() => navigate(-1)} className="mr-3">
                <ArrowLeft size={26} />
              </button>

              <h1 className="text-2xl font-bold">
                Live Astrologers
              </h1>
            </div>

            <p className="text-sm mt-2 opacity-90">
              Join live sessions with expert astrologers
            </p>

          </div>

          {/* Set to true to enable Live Astro pages, currently disabled for Coming Soon */}
          {false ? (
            <>
              <LiveStories />
              <div className="px-4 mt-2 space-y-5">
                {liveData.map((item) => (
                  <LiveCard key={item.id} item={item} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 px-6 text-center animate-fade-in">
              <div className="w-24 h-24 bg-orange-50 rounded-full border-4 border-orange-100 flex items-center justify-center shadow-inner mb-6">
                <span className="text-4xl">🎥</span>
              </div>
              <h2 className="text-2xl font-extrabold text-[#421d18] tracking-tight">Live Astro Coming Soon</h2>
              <p className="text-gray-500 text-sm mt-3 max-w-[280px] leading-relaxed">
                Our expert astrologers will be live here very soon. You will be able to join live sessions and chat directly!
              </p>
              <button 
                onClick={() => navigate("/home")}
                className="mt-8 bg-gradient-to-r from-orange-400 to-[#F57C38] text-white px-8 py-3 rounded-full font-bold shadow-md shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
              >
                Go Back to Home
              </button>
            </div>
          )}

        </div>

        {/* Bottom Navigation */}
        <Bottomnav />

      </div>
    </div>
  );
}