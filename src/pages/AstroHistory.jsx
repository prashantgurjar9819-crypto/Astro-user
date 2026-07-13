import { ArrowLeft } from "lucide-react";
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
    <div className="min-h-screen bg-[#F5F6FB] flex justify-center">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="sticky top-0 bg-white h-16 flex items-center justify-center shadow-sm relative">

          <button
            onClick={() => navigate(-1)}
            className="absolute left-4 p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ArrowLeft size={24} />
          </button>

          <h1 className="text-2xl font-semibold">
            Astro History
          </h1>

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