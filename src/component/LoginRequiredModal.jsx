import React from "react";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginRequiredModal() {
  const { showModal, pendingRedirect, closeLoginModal } = useAuth();
  const navigate = useNavigate();

  if (!showModal) return null;

  const handleLoginClick = () => {
    closeLoginModal();
    navigate("/login", { state: { from: pendingRedirect } });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/60 backdrop-blur-sm transition-all duration-300">
      {/* Click outside to close */}
      <div className="absolute inset-0 cursor-default" onClick={closeLoginModal}></div>

      {/* Bottom Sheet Modal Container */}
      <div className="relative bg-white w-full max-w-[430px] rounded-t-[32px] p-6 pb-10 shadow-2xl animate-slide-up flex flex-col items-center">
        {/* Drag/Indicator Bar */}
        <div className="w-12 h-1 bg-gray-200 rounded-full mb-6"></div>

        {/* Lock Icon Wrapper */}
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-[#ff7448]">
          <Lock size={30} className="stroke-[2.5]" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Login Required
        </h2>

        {/* Message */}
        <p className="text-gray-500 text-center text-[15px] px-4 mb-8 leading-relaxed">
          Please login or sign up to continue.
        </p>

        {/* Action Buttons */}
        <div className="w-full space-y-3 px-2">
          <button
            onClick={handleLoginClick}
            className="w-full bg-[#ff7448] text-white py-4 rounded-2xl text-base font-bold shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all hover:bg-[#ff6230] cursor-pointer"
          >
            Login / Sign Up
          </button>

          <button
            onClick={closeLoginModal}
            className="w-full bg-gray-50 text-gray-700 py-4 rounded-2xl text-base font-bold border border-gray-200 active:scale-[0.98] transition-all hover:bg-gray-100 cursor-pointer"
          >
            Continue Browsing
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
