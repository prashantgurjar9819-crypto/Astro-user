import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft, MoreVertical, Send, CheckCheck, Plus, Calendar } from "lucide-react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CakeIcon = () => (
  <svg className="w-6 h-6 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
    <path d="M4 16h16" />
    <path d="M12 9V5" />
    <path d="M12 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
  </svg>
);

const formatDobToLong = (dobStr) => {
  if (!dobStr) return "14 Aug 2001";
  const parts = dobStr.replace(/\s+/g, "").split("/");
  if (parts.length < 3) return dobStr;
  const day = parseInt(parts[0], 10);
  const monthIdx = parseInt(parts[1], 10) - 1;
  const year = parts[2];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  if (isNaN(day) || isNaN(monthIdx) || monthIdx < 0 || monthIdx > 11) return dobStr;
  return `${day} ${months[monthIdx]} ${year}`;
};

export default function ChatSession() {
  const navigate = useNavigate();
  const { name } = useParams();
  const location = useLocation();
  const { isLoggedIn, triggerLoginModal } = useAuth();
  
  const astrologer = location.state?.astrologer || {
    name: name || "Vikram",
    price: "₹15/min",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  };

  const [messages, setMessages] = useState([]);
  const [showDobModal, setShowDobModal] = useState(true);
  const [tempDob, setTempDob] = useState(() => {
    return localStorage.getItem("dob") || "14/08/2001";
  });

  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleConfirmDob = () => {
    if (!isLoggedIn) {
      triggerLoginModal("Chat Session", `/chat-session/${astrologer.name}`);
      return;
    }
    setShowDobModal(false);
    
    const formattedDob = formatDobToLong(tempDob);
    
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMsg = {
      id: Date.now(),
      sender: "user",
      text: `🎂 My Date of Birth is ${formattedDob}`,
      time: formattedTime,
      status: "read",
    };

    setMessages([newMsg]);

    // Simulate dummy automated response after 1.5 seconds
    setTimeout(() => {
      const responseTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const responseMsg = {
        id: Date.now() + 1,
        sender: "astrologer",
        text: `Hello! I have received your Date of Birth (${formattedDob}). Let me look into your chart. How can I help you today?`,
        time: responseTime,
      };
      setMessages((prev) => [...prev, responseMsg]);
    }, 1500);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    if (!isLoggedIn) {
      triggerLoginModal("Chat Session", `/chat-session/${astrologer.name}`);
      return;
    }

    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMsg = {
      id: messages.length + 1,
      sender: "user",
      text: inputMessage,
      time: formattedTime,
      status: "read",
    };

    setMessages([...messages, newMsg]);
    setInputMessage("");

    // Simulate dummy automated response after 1.5 seconds
    setTimeout(() => {
      const responseTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const responseMsg = {
        id: messages.length + 2,
        sender: "astrologer",
        text: "I am analyzing your details. Please wait a moment while I check your planetary alignments...",
        time: responseTime,
      };
      setMessages((prev) => [...prev, responseMsg]);
    }, 1500);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!isLoggedIn) {
      triggerLoginModal("Chat Session", `/chat-session/${astrologer.name}`);
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file only.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const newMsg = {
        id: Date.now(),
        sender: "user",
        image: event.target.result,
        time: formattedTime,
        status: "read",
      };

      setMessages((prev) => [...prev, newMsg]);

      // Simulate dummy automated response after 1.5 seconds
      setTimeout(() => {
        const responseTime = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        const responseMsg = {
          id: Date.now() + 1,
          sender: "astrologer",
          text: "I have received your image. Please wait a moment while I analyze it...",
          time: responseTime,
        };
        setMessages((prev) => [...prev, responseMsg]);
      }, 1500);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[430px] h-screen bg-[#FAFAFA] relative shadow-xl flex flex-col justify-between">
        
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-100 flex items-center justify-between px-4 py-3 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate("/chat")}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <ArrowLeft size={24} className="text-gray-700" />
            </button>
            
            <div className="relative">
              <img
                src={astrologer.image}
                alt={astrologer.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>

            <div>
              <h2 className="font-bold text-[#1d2340] text-base leading-tight">
                {astrologer.name}
              </h2>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                <span className="text-xs text-gray-500">Online</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-[#FF6F3D] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
              {astrologer.price}
            </span>
            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
              <MoreVertical size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[#FAFAFA]">
          {/* Today Separator */}
          {messages.length > 0 && (
            <div className="flex justify-center my-4">
              <span className="bg-gray-200/60 text-gray-600 text-xs px-4 py-1 rounded-full font-medium">
                Today
              </span>
            </div>
          )}

          {messages.map((msg) => {
            const isAstrologer = msg.sender === "astrologer";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  isAstrologer ? "mr-auto" : "ml-auto flex-row-reverse"
                }`}
              >
                {isAstrologer && (
                  <img
                    src={astrologer.image}
                    alt={astrologer.name}
                    className="w-8 h-8 rounded-full object-cover mt-1 self-start flex-shrink-0"
                  />
                )}
                
                <div
                  className={`p-3 rounded-2xl shadow-sm relative ${
                    isAstrologer
                      ? "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                      : "bg-[#FFF2EC] text-gray-800 rounded-tr-none"
                  }`}
                >
                  {msg.image ? (
                    <img
                      src={msg.image}
                      alt="Uploaded image"
                      className="max-w-[200px] max-h-[200px] rounded-lg object-cover mb-1"
                    />
                  ) : (
                    <p className="text-[14px] leading-relaxed whitespace-pre-line">
                      {msg.text}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[10px] text-gray-400">
                      {msg.time}
                    </span>
                    {!isAstrologer && msg.status === "read" && (
                      <CheckCheck size={14} className="text-[#FF6F3D]" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form 
          onSubmit={handleSendMessage}
          className="p-4 bg-[#FAFAFA] border-t border-gray-100 flex items-center sticky bottom-0"
        >
          <div className="flex-1 bg-white rounded-full shadow-md border border-gray-200/60 p-1.5 pl-2 pr-2 flex items-center">
            <label
              htmlFor="image-upload"
              className="w-9 h-9 rounded-full bg-[#FFF2EC] hover:bg-[#ffe5d9] flex items-center justify-center text-[#FF6F3D] cursor-pointer active:scale-95 transition-all flex-shrink-0"
            >
              <Plus size={18} strokeWidth={2.5} />
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            <input
              type="text"
              placeholder="Type a message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 outline-none text-sm bg-transparent placeholder-gray-400 ml-3"
            />
            <button
              type="submit"
              className="ml-2 w-9 h-9 rounded-full bg-[#FF6F3D] hover:bg-[#e05e30] flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all shadow-md shadow-orange-500/20"
            >
              <Send size={16} className="fill-white translate-x-[1px]" />
            </button>
          </div>
        </form>

        {/* DOB Confirmation Modal Overlay */}
        {showDobModal && (() => {
          const formattedDob = formatDobToLong(tempDob);
          return (
            <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px] z-30 flex items-center justify-center p-6">
              <div className="bg-white rounded-[32px] w-full max-w-[340px] p-6 text-center shadow-2xl animate-fade-in flex flex-col items-center">
                {/* Emblem header */}
                <div className="w-20 h-20 bg-orange-50 rounded-full border-4 border-orange-100/50 flex items-center justify-center shadow-inner mt-2">
                  <Calendar size={36} className="text-[#FF6F3D]" />
                </div>

                <h3 className="text-xl font-bold text-[#1d2340] mt-5 leading-tight">
                  Confirm Your<br />Date of Birth
                </h3>

                <p className="text-gray-500 text-[13px] mt-2.5 px-2 leading-relaxed">
                  Please confirm your Date of Birth before starting your conversation.
                </p>

                {/* DOB Display Card */}
                <div className="w-full bg-[#FFF2EC] border border-[#ffe0d1] rounded-2xl py-3.5 px-4 flex items-center justify-center gap-2 mt-5 relative cursor-pointer hover:bg-[#ffe0d1] transition-colors">
                  <CakeIcon />
                  <span className="text-[#1d2340] font-bold text-lg leading-none">
                    {formattedDob}
                  </span>
                  <input
                    type="date"
                    max={`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onClick={(e) => e.target.showPicker && e.target.showPicker()}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (!val) return;
                      const [year, month, day] = val.split("-");
                      const newDob = `${day}/${month}/${year}`;
                      setTempDob(newDob);
                      localStorage.setItem("dob", newDob);
                    }}
                  />
                </div>

                <p className="text-[11px] text-gray-400 mt-4 leading-normal">
                  You won't be able to change this<br />during this chat session.
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3 w-full mt-6 mb-2">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="flex-1 py-3 border border-gray-200 hover:bg-gray-50 rounded-xl font-bold text-gray-500 text-sm active:scale-95 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmDob}
                    className="flex-1 py-3 bg-[#FF6F3D] hover:bg-[#e05e30] rounded-xl font-bold text-white text-sm shadow-md shadow-orange-500/15 active:scale-95 transition-all cursor-pointer"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in {
            animation: fadeIn 0.2s ease-out forwards;
          }
        `}</style>

      </div>
    </div>
  );
}
