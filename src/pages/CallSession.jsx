import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { PhoneOff, Mic, MicOff, Volume2, VolumeX, Video, VideoOff } from "lucide-react";

export default function CallSession() {
  const { name } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const callType = searchParams.get("type") || "audio"; // "audio" or "video"

  const astrologer = location.state?.astrologer || {
    name: name || "Astrologer",
    image: "https://i.pravatar.cc/200?img=12",
  };

  const [callStatus, setCallStatus] = useState("Connecting...");
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [localStream, setLocalStream] = useState(null);

  const localVideoRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    // Phase 1: Connecting...
    const t1 = setTimeout(() => {
      setCallStatus("Ringing...");
    }, 1500);

    // Phase 2: Call Accepted (after 4.5 seconds total)
    const t2 = setTimeout(() => {
      setCallStatus("Connected");
      // Start call duration timer
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }, 4500);

    // If video call, start local camera stream
    if (callType === "video") {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setLocalStream(stream);
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.warn("Camera access denied or unavailable", err);
        });
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (timerRef.current) clearInterval(timerRef.current);
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [callType]);

  const handleEndCall = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    navigate(-1);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = isMuted;
      });
    }
  };

  const toggleVideo = () => {
    setIsVideoMuted(!isVideoMuted);
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = isVideoMuted;
      });
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-[#111322] flex justify-center text-white">
      {/* Mobile container */}
      <div className="w-full max-w-[430px] h-screen relative flex flex-col justify-between p-6 overflow-hidden">
        
        {/* Top bar info */}
        <div className="text-center mt-12 z-20">
          <p className="text-orange-400 text-xs font-bold tracking-widest uppercase">
            {callType === "video" ? "Simulated Video Call" : "Simulated Audio Call"}
          </p>
          <h2 className="text-2xl font-extrabold mt-2 tracking-tight">
            {astrologer.name}
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            {callStatus === "Connected" ? formatTime(seconds) : callStatus}
          </p>
        </div>

        {/* Video Mode: Fullscreen stream + local inset */}
        {callType === "video" ? (
          <div className="absolute inset-0 z-0">
            {/* Simulated Astrologer Feed */}
            {isVideoMuted ? (
              <div className="w-full h-full bg-[#1A1D2E] flex flex-col items-center justify-center">
                <img
                  src={astrologer.image}
                  alt={astrologer.name}
                  className="w-28 h-28 rounded-full border-4 border-orange-500/20 object-cover"
                />
                <p className="text-gray-400 text-xs mt-3">Video Paused</p>
              </div>
            ) : (
              <div className="w-full h-full relative bg-[#1c1e30]">
                {/* Simulated remote user view */}
                <img
                  src={astrologer.image}
                  alt={astrologer.name}
                  className="w-full h-full object-cover opacity-85 filter blur-[2px]"
                />
                {/* Local camera inset */}
                <div className="absolute top-28 right-6 w-28 h-40 bg-black rounded-2xl overflow-hidden border border-white/20 shadow-2xl z-10">
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover scale-x-[-1]"
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Audio Mode: Centered avatar with pulsing concentric waves */
          <div className="flex-1 flex flex-col items-center justify-center z-10 my-auto">
            <div className="relative flex items-center justify-center">
              {/* Concentric ripples */}
              <div className="absolute w-48 h-48 rounded-full bg-orange-500/5 animate-ping"></div>
              <div className="absolute w-36 h-36 rounded-full bg-orange-500/10 animate-pulse"></div>
              
              <div className="w-28 h-28 rounded-full border-4 border-orange-500 overflow-hidden shadow-2xl">
                <img
                  src={astrologer.image}
                  alt={astrologer.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* Floating Call Controls (Bottom) */}
        <div className="w-full flex flex-col items-center gap-6 mb-12 z-20">
          
          {/* Main action buttons grid */}
          <div className="flex items-center justify-center gap-6 bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/10 shadow-2xl">
            {/* Mute button */}
            <button
              onClick={toggleMute}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                isMuted ? "bg-red-500/80 text-white" : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
            </button>

            {/* Video toggle button (for video calls) */}
            {callType === "video" && (
              <button
                onClick={toggleVideo}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isVideoMuted ? "bg-red-500/80 text-white" : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {isVideoMuted ? <VideoOff size={20} /> : <Video size={20} />}
              </button>
            )}

            {/* Speaker button (for audio calls) */}
            {callType === "audio" && (
              <button
                onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isSpeakerOn ? "bg-orange-500 text-white" : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {isSpeakerOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>
            )}

            {/* End Call Button */}
            <button
              onClick={handleEndCall}
              className="w-14 h-14 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white shadow-lg shadow-red-600/30 active:scale-95 transition-all cursor-pointer"
            >
              <PhoneOff size={24} />
            </button>
          </div>
          
        </div>

      </div>
    </div>
  );
}
