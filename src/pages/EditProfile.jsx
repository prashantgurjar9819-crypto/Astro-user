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
  const totalSteps = 8;
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
    firstName: (userName && userName !== "Ravi Sharma") ? (userName.split(" ")[0] || "") : "",
    middleName: "",
    lastName: (userName && userName !== "Ravi Sharma") ? (userName.split(" ")[1] || "") : "",
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
  const [singleName, setSingleName] = useState(userName === "Ravi Sharma" ? "" : userName);
  const [isUpdating, setIsUpdating] = useState(false);

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

  const handleContinue = async () => {
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
      
      setIsUpdating(true);
      try {
        const token = localStorage.getItem("authToken");
        const phoneVal = localStorage.getItem("phone");

        const response = await fetch("https://kalpjoytish-backend.onrender.com/api/user/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {})
          },
          body: (() => {
            let formattedDob = "";
            if (formData.dob) {
              const parts = formData.dob.split(" / ");
              if (parts.length === 3) {
                formattedDob = `${parts[2]}-${parts[1]}-${parts[0]}`;
              } else {
                formattedDob = formData.dob;
              }
            }
            const cleanPhone = phoneVal ? phoneVal.replace(/\D/g, "") : Math.random().toString(36).substring(7);
            const userEmail = `${cleanPhone}@kalpjoytish.com`;
            return JSON.stringify({
              firstname: formData.firstName,
              middlename: formData.middleName,
              lastname: formData.lastName,
              gender: formData.gender,
              dateofbirth: formattedDob,
              timeofbirth: formData.tob,
              placeofbirth: formData.birthPlace,
              city: formData.city,
              state: formData.state,
              country: formData.country,
              address: formData.address,
              phone: phoneVal,
              email: userEmail
            });
          })()
        });

        const data = await response.json();

        if (response.ok && data.success) {
          const fullName = `${formData.firstName} ${formData.lastName}`.trim();
          updateUserName(fullName);
          localStorage.setItem("dob", formData.dob || "");
          
          if (data.data) {
            localStorage.setItem("user", JSON.stringify(data.data));
          }
          
          alert("Profile completed successfully!");
          navigate(location.state?.from || "/home");
        } else {
          alert(data.message || `Failed to create profile: ${response.statusText}`);
        }
      } catch (err) {
        console.error("Profile Create Error:", err);
        alert(`Profile creation failed: ${err.message}`);
      } finally {
        setIsUpdating(false);
      }
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

  // Parse "HH:MM AM/PM"
  const parseTob = (tobStr) => {
    if (!tobStr) return { hour: "", minute: "", ampm: "AM" };
    const parts = tobStr.split(" ");
    const timePart = parts[0] || "";
    const ampmPart = parts[1] || "AM";
    const [h, m] = timePart.split(":");
    return {
      hour: h || "",
      minute: m || "",
      ampm: ampmPart || "AM",
    };
  };

  const updateTob = (newHour, newMinute, newAmpm) => {
    let h = newHour.replace(/\D/g, "");
    if (h.length === 2) {
      const hrs = parseInt(h, 10);
      if (hrs > 12) h = "12";
      if (hrs === 0) h = "12";
    }
    
    let m = newMinute.replace(/\D/g, "");
    if (m.length === 2) {
      const mins = parseInt(m, 10);
      if (mins > 59) m = "59";
    }

    if (h || m) {
      handleChange("tob", `${h}:${m} ${newAmpm}`);
    } else {
      handleChange("tob", "");
    }
  };

  const handleHourBlur = () => {
    const { hour, minute, ampm } = parseTob(formData.tob);
    if (!hour) return;
    let h = hour.replace(/\D/g, "");
    const hrs = parseInt(h, 10);
    if (hrs > 12) h = "12";
    if (hrs === 0) h = "12";
    const paddedH = String(hrs).padStart(2, "0");
    handleChange("tob", `${paddedH}:${minute} ${ampm}`);
  };

  const handleMinuteBlur = () => {
    const { hour, minute, ampm } = parseTob(formData.tob);
    if (!minute) return;
    let m = minute.replace(/\D/g, "");
    const mins = parseInt(m, 10);
    if (mins > 59) m = "59";
    const paddedM = String(mins).padStart(2, "0");
    handleChange("tob", `${hour}:${paddedM} ${ampm}`);
  };

  // Step progress percentage calculations
  const progress = Math.round((step / 8) * 100);

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
                        onChange={(e) => {
                          const value = e.target.value;
                          const clean = value.replace(/\D/g, "");
                          let formatted = "";
                          if (clean.length > 0) {
                            formatted += clean.substring(0, 2);
                          }
                          if (clean.length > 2) {
                            formatted += " / " + clean.substring(2, 4);
                          }
                          if (clean.length > 4) {
                            let yearVal = clean.substring(4, 8);
                            if (yearVal.length === 4) {
                              const currentYear = new Date().getFullYear();
                              if (parseInt(yearVal, 10) > currentYear) {
                                yearVal = currentYear.toString();
                              }
                            }
                            formatted += " / " + yearVal;
                          }
                          handleChange("dob", formatted);
                        }}
                        placeholder="DD / MM / YYYY"
                        maxLength={14}
                        className="w-full px-5 py-4 border border-orange-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-base shadow-sm pr-12"
                      />
                      <div className="absolute right-4 w-6 h-6 flex items-center justify-center cursor-pointer">
                        <Calendar size={20} className="text-[#ff7448]" />
                        <input
                          type="date"
                          max={`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={(e) => {
                            const val = e.target.value;
                            if (!val) return;
                            const [year, month, day] = val.split("-");
                            handleChange("dob", `${day} / ${month} / ${year}`);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (() => {
                const { hour, minute, ampm } = parseTob(formData.tob);
                return (
                  <div className="space-y-6 animate-fade-in w-full flex flex-col items-center">
                    <div className="w-24 h-24 bg-orange-50 rounded-full border-4 border-orange-100 flex items-center justify-center shadow-inner mb-4">
                      <Clock size={44} className="text-[#ff7448]" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#421d18] text-center mb-4">What's your time of birth?</h2>
                    
                    <div className="flex items-center justify-between gap-4 w-full max-w-sm">
                      {/* Hour Input Box */}
                      <div className="flex flex-col items-center flex-1">
                        <input
                          type="text"
                          placeholder="HH"
                          value={hour}
                          maxLength={2}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            let hrsVal = val;
                            if (val.length === 2) {
                              const hrs = parseInt(val, 10);
                              if (hrs > 12) hrsVal = "12";
                              if (hrs === 0) hrsVal = "12";
                            }
                            updateTob(hrsVal, minute, ampm);
                          }}
                          onBlur={handleHourBlur}
                          className="w-full text-center py-4 border border-orange-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg font-bold shadow-sm"
                        />
                        <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-wider">Hour</span>
                      </div>

                      {/* Colon Separator */}
                      <span className="text-3xl font-extrabold text-gray-300 pb-5">:</span>

                      {/* Minute Input Box */}
                      <div className="flex flex-col items-center flex-1">
                        <input
                          type="text"
                          placeholder="MM"
                          value={minute}
                          maxLength={2}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            let minsVal = val;
                            if (val.length === 2) {
                              const mins = parseInt(val, 10);
                              if (mins > 59) minsVal = "59";
                            }
                            updateTob(hour, minsVal, ampm);
                          }}
                          onBlur={handleMinuteBlur}
                          className="w-full text-center py-4 border border-orange-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg font-bold shadow-sm"
                        />
                        <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-wider">Minute</span>
                      </div>

                      {/* AM / PM Toggle buttons */}
                      <div className="flex flex-col items-center ml-2">
                        <div className="flex bg-gray-100 p-1.5 rounded-2xl border border-orange-50/50">
                          <button
                            type="button"
                            onClick={() => updateTob(hour, minute, "AM")}
                            className={`px-3.5 py-3 rounded-xl font-bold transition-all text-xs cursor-pointer ${
                              ampm === "AM"
                                ? "bg-[#ff7448] text-white shadow-md shadow-orange-500/25"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                          >
                            AM
                          </button>
                          <button
                            type="button"
                            onClick={() => updateTob(hour, minute, "PM")}
                            className={`px-3.5 py-3 rounded-xl font-bold transition-all text-xs cursor-pointer ${
                              ampm === "PM"
                                ? "bg-[#ff7448] text-white shadow-md shadow-orange-500/25"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                          >
                            PM
                          </button>
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-wider">Period</span>
                      </div>
                    </div>
                  </div>
                );
              })()}

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
              disabled={isUpdating}
              className={`w-full mt-6 bg-gradient-to-r from-orange-400 to-[#ff7448] text-white py-4 rounded-2xl text-lg font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-[0.99] transition-all cursor-pointer ${isUpdating ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {isUpdating ? "Completing Profile..." : (step === 8 ? "Complete Profile" : "Continue")}
              <ArrowRight size={20} />
            </button>
          </div>
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