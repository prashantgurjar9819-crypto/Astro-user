import React from "react";
import { ArrowLeft, Plus, FileText, Tag, ChevronRight, Phone, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Bottomnav from "../component/Bottomnav";
import walletIllustration from "../assets/wallet_illustration.png";

const defaultTransactions = [
  {
    id: 1,
    title: "Added Money",
    date: "17 Jul 2025, 10:30 AM",
    amount: "+ ₹500.00",
    amountClass: "text-[#22C55E]",
    status: "Success",
    statusClass: "text-[#22C55E]",
    iconBg: "bg-green-50 text-green-500",
    iconType: "plus"
  },
  {
    id: 2,
    title: "Call with Vikram",
    date: "17 Jul 2025, 09:15 AM",
    amount: "- ₹30.00",
    amountClass: "text-gray-800",
    status: "Completed",
    statusClass: "text-gray-400",
    iconBg: "bg-pink-50 text-pink-500",
    iconType: "phone"
  },
  {
    id: 3,
    title: "Chat with Sumit",
    date: "16 Jul 2025, 08:45 PM",
    amount: "- ₹20.00",
    amountClass: "text-gray-800",
    status: "Completed",
    statusClass: "text-gray-400",
    iconBg: "bg-pink-50 text-pink-500",
    iconType: "message"
  },
  {
    id: 4,
    title: "Added Money",
    date: "15 Jul 2025, 06:20 PM",
    amount: "+ ₹200.00",
    amountClass: "text-[#22C55E]",
    status: "Success",
    statusClass: "text-[#22C55E]",
    iconBg: "bg-green-50 text-green-500",
    iconType: "plus"
  }
];

const renderIcon = (type) => {
  switch (type) {
    case "plus":
      return <Plus size={16} strokeWidth={3} />;
    case "phone":
      return <Phone size={16} fill="currentColor" className="text-pink-500" />;
    case "message":
      return <MessageCircle size={16} fill="currentColor" className="text-pink-500" />;
    default:
      return null;
  }
};

export default function Wallet() {
  const navigate = useNavigate();

  const [balance] = React.useState(() => {
    const saved = localStorage.getItem("wallet_balance");
    if (saved === null) {
      localStorage.setItem("wallet_balance", "550.00");
      return 550.00;
    }
    return parseFloat(saved);
  });

  const [txList] = React.useState(() => {
    const saved = localStorage.getItem("wallet_transactions");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    localStorage.setItem("wallet_transactions", JSON.stringify(defaultTransactions));
    return defaultTransactions;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-[#FAFAFA] relative shadow-xl flex flex-col justify-between">
        
        {/* Scrollable Content */}
        <div className="overflow-y-auto pb-28">
          
          {/* Header */}
          <div className="bg-white border-b border-gray-100 flex items-center px-4 py-4 sticky top-0 z-10">
            <button 
              onClick={() => navigate(-1)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer mr-3"
            >
              <ArrowLeft size={24} className="text-gray-700" />
            </button>
            <div>
              <h1 className="text-lg font-extrabold text-[#1d2340]">My Wallet</h1>
              <p className="text-[11px] text-gray-400 font-medium">Manage your balance and transactions</p>
            </div>
          </div>

          <div className="px-4 py-4 space-y-5">
            
            {/* Wallet Balance Card */}
            <div className="bg-gradient-to-br from-[#FFF2EC] to-[#FFE5D8] rounded-[28px] p-6 shadow-sm border border-[#FFF2EC] flex items-center justify-between relative overflow-hidden">
              <div className="space-y-3.5 z-10">
                <span className="text-xs font-bold text-gray-500 tracking-wide uppercase">Available Balance</span>
                <div className="text-3xl font-extrabold text-[#1d2340]">₹{balance.toFixed(2)}</div>
                
                <div className="inline-flex items-center gap-1.5 bg-white/70 backdrop-blur-sm border border-orange-200 px-3.5 py-1.5 rounded-full shadow-sm text-xs font-bold text-[#FF6F3D]">
                  <span className="w-1.5 h-1.5 bg-[#FF6F3D] rounded-full animate-pulse"></span>
                  Astro Wallet
                </div>
              </div>
              
              <div className="w-28 h-28 flex-shrink-0 z-10">
                <img 
                  src={walletIllustration} 
                  alt="Wallet Illustration" 
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Decorative Blur BG */}
              <div className="absolute right-0 top-0 w-32 h-32 bg-orange-300/10 rounded-full blur-2xl pointer-events-none"></div>
            </div>

            {/* Quick Actions Row */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100/50 flex justify-between items-center gap-2">
              <button 
                onClick={() => navigate("/deposit")}
                className="flex flex-col items-center gap-2 flex-1 group cursor-pointer"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#FFF2EC] group-hover:bg-[#FFE5D8] transition-colors flex items-center justify-center text-[#FF6F3D]">
                  <Plus size={18} strokeWidth={2.5} />
                </div>
                <span className="text-[10px] font-bold text-gray-600 text-center leading-tight whitespace-pre-line">
                  Add Money
                </span>
              </button>
              

              <button className="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
                <div className="w-11 h-11 rounded-2xl bg-[#FFF2EC] group-hover:bg-[#FFE5D8] transition-colors flex items-center justify-center text-[#FF6F3D]">
                  <FileText size={18} strokeWidth={2.5} />
                </div>
                <span className="text-[10px] font-bold text-gray-600 text-center leading-tight whitespace-pre-line">
                  Transaction{"\n"}History
                </span>
              </button>
              
              <button className="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
                <div className="w-11 h-11 rounded-2xl bg-[#FFF2EC] group-hover:bg-[#FFE5D8] transition-colors flex items-center justify-center text-[#FF6F3D]">
                  <Tag size={18} strokeWidth={2.5} />
                </div>
                <span className="text-[10px] font-bold text-gray-600 text-center leading-tight whitespace-pre-line">
                  Offers &{"\n"}Coupons
                </span>
              </button>
            </div>

            {/* Recent Transactions */}
            <div className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <h2 className="font-bold text-gray-800 text-[15px]">Recent Transactions</h2>
                <button className="text-[#FF6F3D] font-bold text-xs flex items-center gap-0.5 hover:underline cursor-pointer">
                  View All <ChevronRight size={14} strokeWidth={2.5} />
                </button>
              </div>
              
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100/50 p-4 divide-y divide-gray-100">
                {txList.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center ${tx.iconBg}`}>
                        {renderIcon(tx.iconType)}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-sm leading-tight">{tx.title}</h3>
                        <p className="text-[10px] text-gray-400 mt-1 font-medium">{tx.date}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`font-bold text-sm ${tx.amountClass}`}>{tx.amount}</div>
                      <div className={`text-[10px] font-bold mt-1 ${tx.statusClass}`}>{tx.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Navigation */}
        <Bottomnav />

      </div>
    </div>
  );
}
