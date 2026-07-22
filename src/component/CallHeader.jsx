import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CallHeader() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-b-[35px] shadow-lg px-5 pt-12 pb-8 relative">
      <button
        onClick={() => navigate("/home")}
        className="absolute left-5 top-12 text-white cursor-pointer hover:opacity-80 transition-opacity"
      >
        <ArrowLeft size={26} />
      </button>
      
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">
          Audio & Video Calls
        </h1>
        <p className="text-orange-100 text-sm mt-1">
          Consult with expert astrologers instantly
        </p>
      </div>
    </div>
  );
}

export default CallHeader;