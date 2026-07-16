import React from "react";
import {
  Camera,
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  MapPin,
  Map,
  ChevronDown,
} from "lucide-react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Bottomnav from "../component/Bottomnav";


export default function EditProfile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-[#FAFAFA] relative shadow-xl">

        {/* Scroll Area */}
        <div className="overflow-y-auto pb-28">

          {/* Header */}
          <div className="relative bg-orange-400 rounded-b-[35px] px-5 pt-8 pb-20">

            <button
              onClick={() => navigate(-1)}
              className="absolute top-5 left-5 bg-white/30 p-2 rounded-full text-white"
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

              <button className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full text-white shadow-md">
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
              <select className="w-full px-4 py-4 border rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400">
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
  onClick={() => navigate("/profile")}
  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl text-lg font-semibold shadow-lg transition"
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