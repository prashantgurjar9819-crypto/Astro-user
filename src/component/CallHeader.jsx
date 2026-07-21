import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CallHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4 px-5 pt-10 pb-5">
      <button
        onClick={() => navigate("/home")}
        className="cursor-pointer"
      >
        <ArrowLeft size={30} />
      </button>

      <h1 className="text-4xl font-medium">
        Call
      </h1>
    </div>
  );
}

export default CallHeader;