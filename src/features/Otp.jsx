import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

function Otp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser } = useAuth();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      alert("Please enter 6 digit OTP");
      return;
    }

    // API call yaha hogi
    loginUser();

    navigate("/editprofile?mode=onboarding", { state: { from: location.state?.from } });
  };

  const handleResend = () => {
    setTimer(30);

    // Resend OTP API yaha call kar sakte ho
    alert("OTP Resent Successfully");
  };

  return (
    <div className="h-screen bg-[#ff8253] flex flex-col justify-end overflow-hidden">
      <div className="bg-white rounded-t-[35px] h-[85vh] px-6 py-8 overflow-y-auto">
        
        {/* Back Button */}
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>

        {/* Logo */}
        <div className="flex justify-center mt-3">
          <img
            src={logo}
            alt="logo"
            className="w-24 h-24 object-contain"
          />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mt-6">
          OTP Verification
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Enter the 6-digit OTP sent to
        </p>

        <p className="text-center font-semibold text-[#ff7448] mt-1">
          +91 9876543210
        </p>

        {/* OTP Boxes */}
        <div className="flex justify-center gap-3 mt-10">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={digit}
              onChange={(e) =>
                handleChange(e.target.value, index)
              }
              onKeyDown={(e) =>
                handleKeyDown(e, index)
              }
              maxLength={1}
              className="w-12 h-14 border-2 border-gray-300 rounded-xl text-center text-2xl font-bold focus:outline-none focus:border-[#ff7448]"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          className="w-full mt-10 bg-[#ff7448] text-white py-4 rounded-xl text-lg font-semibold hover:bg-[#ff6230] transition"
        >
          Verify OTP
        </button>

        {/* Resend OTP */}
        <div className="text-center mt-6">
          <p className="text-gray-500">
            Didn't receive OTP?
          </p>

          {timer > 0 ? (
            <p className="text-gray-600 mt-2">
              Resend in{" "}
              <span className="font-semibold text-[#ff7448]">
                {timer}s
              </span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-[#ff7448] font-semibold mt-2"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Otp;