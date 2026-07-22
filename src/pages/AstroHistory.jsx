import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import HistoryCard from "../component/HistoryCard";

const history = [
  {
    id: 1,
    name: "Astro Raj",
    type: "Chat Session",
    mode: "chat",
    date: "20 Feb 2026",
    duration: "12 min",
    price: "₹15 / min",
    total: "₹180",
    status: "Completed",
  },
  {
    id: 2,
    name: "Astro Neha",
    type: "Call Session",
    mode: "call",
    date: "18 Feb 2026",
    duration: "8 min",
    price: "₹25 / min",
    total: "₹200",
    status: "Completed",
  },
  {
    id: 3,
    name: "Astro Vikram",
    type: "Call Session",
    mode: "call",
    date: "15 Feb 2026",
    duration: "5 min",
    price: "₹30 / min",
    total: "₹150",
    status: "Cancelled",
  },
];

export default function AstroHistory() {
  const navigate = useNavigate();

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
              Astro History
            </h1>
            <p className="text-orange-100 text-sm mt-1">
              Your past consultations and calls
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="p-4 space-y-4">
          {history.map((item) => (
            <HistoryCard key={item.id} item={item} />
          ))}
        </div>

      </div>
    </div>
  );
}