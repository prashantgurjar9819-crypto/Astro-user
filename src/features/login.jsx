import { useState } from "react";
import { Phone } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";



function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobile, setMobile] = useState("");

  const handleMobileChange = (e) => {
    const val = e.target.value;
    // Only allow numbers and limit to 10 digits
    if (/^\d*$/.test(val) && val.length <= 10) {
      setMobile(val);
    }
  };

  const handleContinue = () => {
    if (mobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }
    navigate("/otp", { state: { from: location.state?.from } });
  };

  return (
    <div className="h-screen bg-[#ff8253] flex flex-col justify-end overflow-hidden">
      {/* White Card */}
      <div className="bg-white rounded-t-[35px] h-[85vh] w-full px-6 py-8 overflow-y-auto relative">
        {/* Skip Button */}
        <button
          onClick={() => navigate("/home")}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-base font-medium transition-colors"
        >
          Skip
        </button>

        {/* Logo */}
        <div className="flex justify-center mt-4">
          <img
            src={logo}
            alt="Logo"
            className="w-24 h-24 object-contain"
          />
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mt-6">
          Welcome Back 👋
        </h1>

        <p className="text-center text-gray-500 mt-2 text-sm md:text-base">
          Login to continue your astrology journey
        </p>

        {/* Mobile Input */}
        <div className="flex justify-center mt-8">
          <div className="w-full max-w-md flex items-center bg-gray-100 rounded-xl px-4 py-4">
            <Phone size={20} className="text-gray-600" />

            <input
              type="text"
              value={mobile}
              onChange={handleMobileChange}
              placeholder="Enter Mobile Number"
              className="ml-3 w-full bg-transparent outline-none text-base"
            />
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            className="w-full max-w-md mt-5 bg-[#ff7448] text-white py-4 rounded-xl text-lg font-semibold hover:bg-[#ff6230] transition cursor-pointer"
          >
            Continue
          </button>
        </div>

        {/* Google Button */}
        <div className="flex justify-center">
          <button className="w-full max-w-md mt-5 border border-gray-300 py-4 rounded-xl flex justify-center items-center gap-2 text-[#5f82f5]">
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;