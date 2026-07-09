import React from 'react';
import { Camera, User, Calendar, Clock, Building2, Map, Globe, ChevronDown } from 'lucide-react';

export default function AstroProfile() {
  return (
    <div className="min-h-screen bg-[#fd8754] flex items-center justify-center p-4 antialiased font-sans">
      {/* Outer Mobile-like Container */}
      <div className="w-full max-w-[412px] bg-[#fea27e] rounded-[40px] p-6 shadow-2xl min-h-[820px] flex flex-col justify-between border border-white/10">
        
        <div>
          {/* Top Avatar Upload */}
          <div className="flex justify-center mt-8 mb-6">
            <button className="w-24 h-24 bg-[#ffb79b] rounded-full flex items-center justify-center shadow-inner hover:bg-[#ffbe9e] transition-colors focus:outline-none group">
              <Camera className="text-white w-7 h-7 opacity-90 group-hover:scale-105 transition-transform" />
            </button>
          </div>

          {/* Heading */}
          <h1 className="text-white text-2xl font-bold text-center tracking-wide flex items-center justify-center gap-1.5 mb-5">
            Complete Astro Profile <span className="text-[20px]">✨</span>
          </h1>

          {/* Divider Line */}
          <div className="h-[1.5px] bg-white/20 w-[92%] mx-auto mb-7" />

          {/* Form Fields Stack */}
          <div className="space-y-4 px-2">
            
            {/* Input Fields */}
            <div className="relative flex items-center">
              <User className="absolute left-5 text-white/90 w-[22px] h-[22px]" />
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full bg-[#ffb092] text-white placeholder-white/70 pl-14 pr-5 py-[18px] rounded-2xl text-[16px] font-medium focus:outline-none tracking-wide"
              />
            </div>

            <div className="relative flex items-center">
              <Calendar className="absolute left-5 text-white/90 w-[22px] h-[22px]" />
              <input 
                type="text" 
                placeholder="Date of Birth" 
                className="w-full bg-[#ffb092] text-white placeholder-white/70 pl-14 pr-5 py-[18px] rounded-2xl text-[16px] font-medium focus:outline-none tracking-wide"
              />
            </div>

            <div className="relative flex items-center">
              <Clock className="absolute left-5 text-white/90 w-[22px] h-[22px]" />
              <input 
                type="text" 
                placeholder="Time of Birth" 
                className="w-full bg-[#ffb092] text-white placeholder-white/70 pl-14 pr-5 py-[18px] rounded-2xl text-[16px] font-medium focus:outline-none tracking-wide"
              />
            </div>

            <div className="relative flex items-center">
              <Building2 className="absolute left-5 text-white/90 w-[22px] h-[22px]" />
              <input 
                type="text" 
                placeholder="City" 
                className="w-full bg-[#ffb092] text-white placeholder-white/70 pl-14 pr-5 py-[18px] rounded-2xl text-[16px] font-medium focus:outline-none tracking-wide"
              />
            </div>

            <div className="relative flex items-center">
              <Map className="absolute left-5 text-white/90 w-[22px] h-[22px]" />
              <input 
                type="text" 
                placeholder="State" 
                className="w-full bg-[#ffb092] text-white placeholder-white/70 pl-14 pr-5 py-[18px] rounded-2xl text-[16px] font-medium focus:outline-none tracking-wide"
              />
            </div>

            <div className="relative flex items-center">
              <Globe className="absolute left-5 text-white/90 w-[22px] h-[22px]" />
              <input 
                type="text" 
                placeholder="Country" 
                className="w-full bg-[#ffb092] text-white placeholder-white/70 pl-14 pr-5 py-[18px] rounded-2xl text-[16px] font-medium focus:outline-none tracking-wide"
              />
            </div>

            {/* Dropdown Selects */}
            <div className="relative flex items-center cursor-pointer group">
              <select className="w-full bg-[#ffb092] text-white pl-5 pr-12 py-[18px] rounded-2xl text-[16px] font-medium appearance-none focus:outline-none cursor-pointer tracking-wide">
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
              <ChevronDown className="absolute right-5 text-white/80 w-5 h-5 pointer-events-none group-hover:translate-y-[1px] transition-transform" />
            </div>

            <div className="relative flex items-center cursor-pointer group">
              <select className="w-full bg-[#ffb092] text-white pl-5 pr-12 py-[18px] rounded-2xl text-[16px] font-medium appearance-none focus:outline-none cursor-pointer tracking-wide">
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="other">Other</option>
              </select>
              <ChevronDown className="absolute right-5 text-white/80 w-5 h-5 pointer-events-none group-hover:translate-y-[1px] transition-transform" />
            </div>

          </div>
        </div>

        {/* Bottom Navigation Home Bar (Optional, matches image footer spacing) */}
        <div className="w-full flex justify-center mb-2 mt-6">
          {/* <div className="w-32 h-1 bg-black/20 rounded-full" /> */}
        <button className="w-[120px] py-3 bg-[#ffb092] text-white rounded-xl">
  Save Changes
</button>
        </div>

      </div>
    </div>
  );
}