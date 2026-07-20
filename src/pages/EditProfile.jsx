import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronDown,
  ArrowRight,
  User,
  Calendar,
  Clock,
  MapPin,
  Map,
  Camera,
  Mail,
  Phone,
} from "lucide-react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import Bottomnav from "../component/Bottomnav";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

const SunEmblem = () => (
  <svg
    viewBox="0 0 100 100"
    className="w-12 h-12 text-white animate-spin-slow"
    fill="currentColor"
  >
    <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="6" />
    <circle cx="50" cy="50" r="15" fill="currentColor" />
    <path d="M 50 5 L 55 20 L 45 20 Z" />
    <path d="M 50 95 L 55 80 L 45 80 Z" />
    <path d="M 5 50 L 20 55 L 20 45 Z" />
    <path d="M 95 50 L 80 55 L 80 45 Z" />
    <path d="M 18 18 L 31 29 L 28 32 Z" />
    <path d="M 82 82 L 69 71 L 72 68 Z" />
    <path d="M 18 82 L 31 71 L 28 68 Z" />
    <path d="M 82 18 L 69 29 L 72 32 Z" />
  </svg>
);

const StepIndicator = ({ activeStep }) => {
  const totalSteps = 9;
  return (
    <div className="flex items-center justify-between w-full px-2 mt-4 relative">
      {/* Connecting Line */}
      <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-[2px] bg-orange-100 z-0"></div>
      
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === activeStep;
        const isCompleted = stepNum < activeStep;
        
        return (
          <div
            key={stepNum}
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold z-10 transition-all duration-300 ${
              isActive
                ? "bg-[#ff7448] text-white scale-110 shadow-md shadow-orange-500/25"
                : isCompleted
                ? "bg-orange-50 border border-[#ff7448] text-[#ff7448]"
                : "bg-white border border-gray-200 text-gray-400"
            }`}
          >
            {stepNum}
          </div>
        );
      })}
    </div>
  );
};

export default function EditProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateUserName, userName } = useAuth();

  // Check if we are in onboarding mode
  const isOnboarding = location.search.includes("mode=onboarding");

  // Onboarding Step State
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: userName.split(" ")[0] || "",
    middleName: "",
    lastName: userName.split(" ")[1] || "",
    gender: "",
    dob: "",
    tob: "",
    birthPlace: "",
    city: "",
    state: "",
    country: "",
    address: "",
  });

  // Standard Single-Page State
  const [singleName, setSingleName] = useState(userName);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    } else {
      navigate(-1);
    }
  };

  const handleContinue = () => {
    if (step === 1) {
      if (!formData.firstName.trim()) {
        alert("Please enter first name");
        return;
      }
      if (!formData.lastName.trim()) {
        alert("Please enter last name");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.gender || formData.gender === "Select Gender") {
        alert("Please select gender");
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!formData.dob) {
        alert("Please enter date of birth");
        return;
      }
      setStep(4);
    } else if (step === 4) {
      if (!formData.tob) {
        alert("Please enter time of birth");
        return;
      }
      setStep(5);
    } else if (step === 5) {
      if (!formData.birthPlace.trim()) {
        alert("Please enter your place of birth");
        return;
      }
      setStep(6);
    } else if (step === 6) {
      if (!formData.city.trim()) {
        alert("Please enter city");
        return;
      }
      setStep(7);
    } else if (step === 7) {
      if (!formData.state.trim()) {
        alert("Please enter state");
        return;
      }
      setStep(8);
    } else if (step === 8) {
      if (!formData.country.trim()) {
        alert("Please enter country");
        return;
      }
      setStep(9);
    } else if (step === 9) {
      if (!formData.address.trim()) {
        alert("Please enter address");
        return;
      }
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      updateUserName(fullName);
      alert("Profile completed successfully!");
      navigate(location.state?.from || "/home");
    }
  };

  const handleSingleSave = () => {
    if (!singleName.trim()) {
      alert("Please enter your name");
      return;
    }
    updateUserName(singleName.trim());
    alert("Profile saved successfully!");
    navigate("/profile");
  };

  // Step progress percentage calculations
  const progress = Math.round((step / 9) * 100);

  if (isOnboarding) {
    // -------------------------------------------------------------
    // ONBOARDING VIEW (9-Step Flow)
    // -------------------------------------------------------------
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="w-full max-w-[430px] min-h-screen bg-white relative shadow-xl flex flex-col justify-between overflow-x-hidden">
          
          {/* Top Header Background Gradient */}
          <div className="bg-gradient-to-b from-[#ffcfb4] via-[#ffe2d6] to-white pt-8 pb-14 px-5 relative flex flex-col">
            {/* Back Button */}
            <div className="flex items-center w-full z-10">
              <button
                onClick={handleBack}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform text-gray-700 cursor-pointer"
              >
                <ChevronLeft size={24} />
              </button>
            </div>
          </div>

          {/* Form Card (Overlap) */}
          <div className="bg-white rounded-t-[40px] px-6 pb-28 -mt-8 flex-1 relative flex flex-col">
            {/* Protruding Emblem */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-white rounded-full border-[6px] border-white shadow-lg flex items-center justify-center z-10">
            <img
              src={logo}
              alt="Logo"
              className="w-18 h-18 object-contain"
            />
          </div>

            {/* Heading */}
            <div className="text-center mt-16">
              <h1 className="text-2xl font-bold text-[#421d18] tracking-tight">
                Complete Your Profile
              </h1>
              <p className="text-gray-500 text-[13px] mt-2 px-6 leading-relaxed">
                We just need a few details to personalize your experience
              </p>
              {/* Step Indicators 1-9 */}
              <StepIndicator activeStep={step} />
            </div>

            {/* Step Inputs */}
            <div className="mt-8 flex-1 flex flex-col justify-center">
              
              {step === 1 && (
                <div className="space-y-6 animate-fade-in w-full">
                  <h2 className="text-xl font-bold text-[#421d18] text-center mb-4">What's your full name?</h2>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">First Name *</label>
                    <div className="relative flex items-center">
                      <User size={20} className="text-[#ff7448] absolute left-4" />
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        placeholder="Enter first name"
                        className="w-full pl-12 pr-4 py-4 border border-orange-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-base shadow-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Middle Name (Optional)</label>
                    <div className="relative flex items-center">
                      <User size={20} className="text-[#ff7448] absolute left-4" />
                      <input
                        type="text"
                        value={formData.middleName}
                        onChange={(e) => handleChange("middleName", e.target.value)}
                        placeholder="Enter middle name"
                        className="w-full pl-12 pr-4 py-4 border border-orange-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-base shadow-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Last Name *</label>
                    <div className="relative flex items-center">
                      <User size={20} className="text-[#ff7448] absolute left-4" />
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        placeholder="Enter last name"
                        className="w-full pl-12 pr-4 py-4 border border-orange-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-base shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-fade-in w-full">
                  <h2 className="text-xl font-bold text-[#421d18] text-center mb-4">Select your gender</h2>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Gender *</label>
                    <div className="relative flex items-center">
                      <User size={20} className="text-[#ff7448] absolute left-4 pointer-events-none z-10" />
                      <select
                        value={formData.gender}
                        onChange={(e) => handleChange("gender", e.target.value)}
                        className="w-full pl-12 pr-4 py-4 border border-orange-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-base shadow-sm appearance-none bg-white cursor-pointer"
                      >
                        <option>Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 animate-fade-in w-full flex flex-col items-center">
                  <div className="w-24 h-24 bg-orange-50 rounded-full border-4 border-orange-100 flex items-center justify-center shadow-inner mb-4">
                    <Calendar size={44} className="text-[#ff7448]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#421d18] text-center mb-4">What's your date of birth?</h2>
                  <div className="w-full">
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={formData.dob}
                        onChange={(e) => handleChange("dob", e.target.value)}
                        placeholder="DD / MM / YYYY"
                        className="w-full px-5 py-4 border border-orange-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-base shadow-sm pr-12 cursor-pointer"
                      />
                      <Calendar size={20} className="text-[#ff7448] absolute right-4 pointer-events-none" />
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6 animate-fade-in w-full flex flex-col items-center">
                  <div className="w-24 h-24 bg-orange-50 rounded-full border-4 border-orange-100 flex items-center justify-center shadow-inner mb-4">
                    <Clock size={44} className="text-[#ff7448]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#421d18] text-center mb-4">What's your time of birth?</h2>
                  <div className="w-full">
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={formData.tob}
                        onChange={(e) => handleChange("tob", e.target.value)}
                        placeholder="10:30 AM"
                        className="w-full px-5 py-4 border border-orange-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-base shadow-sm pr-16 cursor-pointer"
                      />
                      <div className="absolute right-4 flex items-center gap-1 text-[#ff7448] pointer-events-none">
                        <Clock size={20} />
                        <ChevronDown size={18} className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6 animate-fade-in w-full flex flex-col items-center">
                  <div className="w-24 h-24 bg-orange-50 rounded-full border-4 border-orange-100 flex items-center justify-center shadow-inner mb-4">
                    <MapPin size={44} className="text-[#ff7448]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#421d18] text-center mb-4">What's your place of birth?</h2>
                  <div className="w-full">
                    <div className="relative flex items-center">
                      <MapPin size={20} className="text-[#ff7448] absolute left-4" />
                      <input
                        type="text"
                        value={formData.birthPlace}
                        onChange={(e) => handleChange("birthPlace", e.target.value)}
                        placeholder="Enter your birth place"
                        className="w-full pl-12 pr-4 py-4 border border-orange-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-base shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 6 && (
                <div className="space-y-6 animate-fade-in w-full">
                  <h2 className="text-xl font-bold text-[#421d18] text-center mb-4">What's your current city?</h2>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">City *</label>
                    <div className="relative flex items-center">
                      <MapPin size={20} className="text-[#ff7448] absolute left-4" />
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        placeholder="Enter city"
                        className="w-full pl-12 pr-4 py-4 border border-orange-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-base shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 7 && (
                <div className="space-y-6 animate-fade-in w-full">
                  <h2 className="text-xl font-bold text-[#421d18] text-center mb-4">What state do you live in?</h2>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">State *</label>
                    <div className="relative flex items-center">
                      <Map size={20} className="text-[#ff7448] absolute left-4" />
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleChange("state", e.target.value)}
                        placeholder="Enter state"
                        className="w-full pl-12 pr-4 py-4 border border-orange-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-base shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 8 && (
                <div className="space-y-6 animate-fade-in w-full">
                  <h2 className="text-xl font-bold text-[#421d18] text-center mb-4">What is your country?</h2>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Country *</label>
                    <div className="relative flex items-center">
                      <MapPin size={20} className="text-[#ff7448] absolute left-4" />
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => handleChange("country", e.target.value)}
                        placeholder="Enter country"
                        className="w-full pl-12 pr-4 py-4 border border-orange-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-base shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 9 && (
                <div className="space-y-6 animate-fade-in w-full">
                  <h2 className="text-xl font-bold text-[#421d18] text-center mb-4">Enter your full address</h2>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Full Address *</label>
                    <div className="relative flex items-start">
                      <MapPin size={20} className="text-[#ff7448] absolute left-4 top-4" />
                      <textarea
                        rows="4"
                        value={formData.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        placeholder="Enter your full address"
                        className="w-full pl-12 pr-4 py-4 border border-orange-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-base shadow-sm resize-none"
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Progress Tracker bar */}
            <div className="flex items-center justify-between gap-4 mt-8 px-1">
              <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#ff7448] h-full rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-[#ff7448] font-bold text-sm">{progress}%</span>
            </div>

            {/* Continue button */}
            <button
              onClick={handleContinue}
              className="w-full mt-6 bg-gradient-to-r from-orange-400 to-[#ff7448] text-white py-4 rounded-2xl text-lg font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-[0.99] transition-all cursor-pointer"
            >
              {step === 9 ? "Complete Profile" : "Continue"}
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Bottom Nav */}
          <Bottomnav />
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(4px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.25s ease-out forwards;
          }
          .animate-spin-slow {
            animation: spin 8s linear infinite;
          }
        `}</style>
      </div>
    );
  }

  // -------------------------------------------------------------
  // STANDARD EDIT PROFILE VIEW (Single-Page Form Layout)
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-[#FAFAFA] relative shadow-xl">

        {/* Scroll Area */}
        <div className="overflow-y-auto pb-28">

          {/* Header */}
          <div className="relative bg-orange-400 rounded-b-[35px] px-5 pt-8 pb-20">
            <button
              onClick={() => navigate(-1)}
              className="absolute top-5 left-5 bg-white/30 p-2 rounded-full text-white cursor-pointer"
            >
              <FiArrowLeft size={22} />
            </button>

            <h1 className="text-center text-2xl font-bold text-white">
              Edit Profile
            </h1>
          </div>

          {/* Profile Image */}
          <div className="-mt-14 flex justify-center">
            <div className="relative">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="profile"
                className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <button className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full text-white shadow-md cursor-pointer">
                <Camera size={18} />
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="px-5 mt-8 space-y-4">

            {/* Full Name */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 w-5 h-5" />
              <input
                type="text"
                value={singleName}
                onChange={(e) => setSingleName(e.target.value)}
                placeholder="Full Name"
                className="w-full pl-12 pr-4 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 w-5 h-5" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Mobile */}
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Mobile Number"
                className="w-full pl-12 pr-4 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* DOB */}
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 w-5 h-5" />
              <input
                type="date"
                className="w-full pl-12 pr-4 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Time */}
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 w-5 h-5" />
              <input
                type="time"
                className="w-full pl-12 pr-4 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* City */}
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 w-5 h-5" />
              <input
                type="text"
                placeholder="City"
                className="w-full pl-12 pr-4 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            
            {/* State */}
            <div className="relative">
              <Map className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 w-5 h-5" />
              <input
                type="text"
                placeholder="State"
                className="w-full pl-12 pr-4 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Country */}
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Country"
                className="w-full pl-12 pr-4 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Gender */}
            <div className="relative">
              <select className="w-full px-4 py-4 border rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white">
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
            </div>

            {/* Address */}
            <div className="relative">
              <MapPin className="absolute left-4 top-6 text-orange-500 w-5 h-5" />
              <textarea
                rows="3"
                placeholder="Address"
                className="w-full pl-12 pr-4 py-4 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
              ></textarea>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSingleSave}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl text-lg font-semibold shadow-lg transition cursor-pointer"
            >
              Save Changes
            </button>

          </div>
        </div>

        {/* Bottom Navigation */}
        <Bottomnav />

      </div>
    </div>
  );
}