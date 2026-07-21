import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useAuth } from "../context/AuthContext";

function Otp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser } = useAuth();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    // If value has multiple characters (e.g. mobile autofill or paste)
    if (value.length > 1) {
      const digits = value.replace(/\D/g, "").slice(0, 6).split("");
      if (digits.length > 0) {
        const newOtp = [...otp];
        digits.forEach((d, i) => {
          if (index + i < 6) {
            newOtp[index + i] = d;
          }
        });
        setOtp(newOtp);
        const nextIdx = Math.min(index + digits.length, 5);
        inputRefs.current[nextIdx]?.focus();
      }
      return;
    }

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

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pastedData) {
      const newOtp = ["", "", "", "", "", ""];
      pastedData.split("").forEach((char, i) => {
        newOtp[i] = char;
      });
      setOtp(newOtp);
      const nextIdx = Math.min(pastedData.length, 5);
      inputRefs.current[nextIdx]?.focus();
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      alert("Please enter a 6-digit OTP");
      return;
    }

    if (!window.confirmationResult) {
      alert("OTP Session Expired or Invalid. Please go back and request a new OTP.");
      navigate("/");
      return;
    }

    setLoading(true);
    try {
      await window.confirmationResult.confirm(enteredOtp);
      loginUser();
      alert("OTP Verified Successfully! Welcome.");
      navigate("/editprofile?mode=onboarding", { state: { from: location.state?.from } });
    } catch (error) {
      console.error("Firebase OTP Verification Error:", error);
      alert(`Invalid OTP or Verification Failed: ${error.code || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    const phone = localStorage.getItem("phone");
    if (!phone) {
      alert("Phone number not found. Redirecting to login.");
      navigate("/");
      return;
    }

    setLoading(true);
    try {
      if (window.recaptchaVerifier) {
        try { window.recaptchaVerifier.clear(); } catch (e) {}
        window.recaptchaVerifier = null;
      }
      const oldOtpContainer = document.getElementById("dynamic-recaptcha-container-otp");
      if (oldOtpContainer) {
        oldOtpContainer.remove();
      }

      const recaptchaContainer = document.createElement("div");
      recaptchaContainer.id = "dynamic-recaptcha-container-otp";
      document.body.appendChild(recaptchaContainer);

      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        recaptchaContainer,
        {
          size: "invisible",
        }
      );

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        "+91" + phone,
        window.recaptchaVerifier
      );

      window.confirmationResult = confirmationResult;
      setTimer(30);
      alert("OTP Resent Successfully");
    } catch (error) {
      console.error("Resend OTP Error:", error);
      alert(`Failed to resend OTP (${error.code || "Error"}): ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#ff8253] flex flex-col justify-end overflow-hidden">
      <div className="bg-white rounded-t-[35px] h-[85vh] px-6 py-8 overflow-y-auto">

        {/* Back */}
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
          Enter the OTP sent to
        </p>

        <p className="text-center font-semibold text-[#ff7448] mt-1">
          +91 {localStorage.getItem("phone") || "XXXXXXXXXX"}
        </p>

        {/* OTP Boxes */}
        <div className="flex justify-center gap-3 mt-10" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={digit}
              onChange={(e) =>
                handleChange(e.target.value, index)
              }
              onKeyDown={(e) =>
                handleKeyDown(e, index)
              }
              className="w-12 h-14 border-2 border-gray-300 rounded-xl text-center text-2xl font-bold focus:outline-none focus:border-[#ff7448]"
            />
          ))}
        </div>

        {/* Verify */}
        <button
          onClick={handleVerify}
          disabled={loading}
          className={`w-full mt-10 bg-[#ff7448] text-[#ffffff] py-4 rounded-xl text-lg font-semibold transition-opacity ${
            loading ? "opacity-60 cursor-not-allowed" : "hover:bg-[#ff6230]"
          }`}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Timer */}
        <div className="text-center mt-6">
          <p className="text-gray-500">
            Didn't receive OTP?
          </p>

          {timer > 0 ? (
            <p className="mt-2">
              Resend in{" "}
              <span className="font-semibold text-[#ff7448]">
                {timer}s
              </span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              disabled={loading}
              className="text-[#ff7448] font-semibold mt-2 disabled:opacity-50"
            >
              Resend OTP
            </button>
          )}
        </div>

        {/* Invisible reCAPTCHA container for Resend */}
        <div id="recaptcha-container-otp"></div>

      </div>
    </div>
  );
}

export default Otp;