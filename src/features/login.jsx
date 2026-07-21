import { Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";

import { auth } from "../firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

function Login() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const resetRecaptcha = () => {
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (err) {
        console.error("Recaptcha clear error:", err);
      }
      window.recaptchaVerifier = null;
    }
    const container = document.getElementById("recaptcha-container");
    if (container) {
      container.innerHTML = "";
    }
  };

  const sendOTP = async () => {
    if (phone.length !== 10) {
      alert("Please enter a valid 10 digit mobile number");
      return;
    }

    setLoading(true);

    try {
      resetRecaptcha();

      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "normal",
          callback: (response) => {
            console.log("reCAPTCHA resolved");
          },
        }
      );

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        "+91" + phone,
        window.recaptchaVerifier
      );

      window.confirmationResult = confirmationResult;
      localStorage.setItem("phone", phone);

      alert("OTP Sent Successfully");
      navigate("/otp");
    } catch (error) {
      console.error("Firebase Error:", error);
      resetRecaptcha();

      let msg = error.message;
      if (error.code === "auth/invalid-app-credential") {
        msg = "Firebase Auth domain not authorized or app credentials invalid. Please check Firebase Console.";
      } else if (error.code === "auth/captcha-check-failed") {
        msg = "reCAPTCHA check failed. Please try again.";
      } else if (error.code === "auth/too-many-requests") {
        msg = "Too many requests / SMS limit reached for this number. Try test numbers or wait a few minutes.";
      } else if (error.code === "auth/quota-exceeded") {
        msg = "Firebase Daily Free SMS Quota (10 SMS/day) has been exceeded! Add your number to Test Phone Numbers in Firebase Console.";
      } else if (error.code === "auth/invalid-phone-number") {
        msg = "Invalid phone number format.";
      }

      alert(`Error (${error.code || "UNKNOWN"}):\n${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#ff8253] flex flex-col justify-end overflow-hidden">
      <div className="bg-white rounded-t-[35px] h-[85vh] w-full px-6 py-8 overflow-y-auto">

        {/* Logo */}
        <div className="flex justify-center mt-4">
          <img
            src={logo}
            alt="Logo"
            className="w-24 h-24 object-contain"
          />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mt-6">
          Welcome Back 👋
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Login to continue your astrology journey
        </p>

        {/* Mobile Input */}
        <div className="flex justify-center mt-8">
          <div className="w-full max-w-md flex items-center bg-gray-100 rounded-xl px-4 py-4">
            <Phone size={20} className="text-gray-600" />

            <input
              type="tel"
              placeholder="Enter Mobile Number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              className="ml-3 w-full bg-transparent outline-none text-base"
            />
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <button
            onClick={sendOTP}
            disabled={loading}
            className={`w-full max-w-md mt-5 bg-[#ff7448] text-white py-4 rounded-xl text-lg font-semibold transition-opacity ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:bg-[#ff6230]"
            }`}
          >
            {loading ? "Sending OTP..." : "Continue"}
          </button>
        </div>

        {/* Google Button */}
        <div className="flex justify-center">
          <button className="w-full max-w-md mt-5 border border-gray-300 py-4 rounded-xl text-[#5f82f5]">
            Continue with Google
          </button>
        </div>

        {/* reCAPTCHA Checkbox Container */}
        <div id="recaptcha-container" className="flex justify-center mt-4"></div>

      </div>
    </div>
  );
}

export default Login;