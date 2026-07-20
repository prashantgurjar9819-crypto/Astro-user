import React, { useState, useEffect } from "react";
import { ArrowLeft, CreditCard, Landmark, Wallet as WalletIcon, Lock, ShieldCheck, ArrowRightLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Bottomnav from "../component/Bottomnav";
import walletIllustration from "../assets/wallet_illustration.png";

const quickAmounts = [500, 1000, 2000, 5000, 10000];

const paymentMethods = [
  {
    id: "upi",
    title: "UPI",
    description: "Pay using any UPI app",
    iconBg: "bg-purple-50 text-purple-600",
    icon: <ArrowRightLeft size={18} />
  },
  {
    id: "card",
    title: "Debit / Credit Card",
    description: "Visa, MasterCard, Rupay",
    iconBg: "bg-blue-50 text-blue-600",
    icon: <CreditCard size={18} />
  },
  {
    id: "netbanking",
    title: "Net Banking",
    description: "All major banks supported",
    iconBg: "bg-indigo-50 text-indigo-600",
    icon: <Landmark size={18} />
  },
  {
    id: "wallet",
    title: "Wallets",
    description: "Pay using Amazon Pay, Paytm etc.",
    iconBg: "bg-gray-100 text-gray-600",
    icon: <WalletIcon size={18} />
  }
];

export default function Deposit() {
  const navigate = useNavigate();

  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem("wallet_balance");
    return saved ? parseFloat(saved) : 550.00;
  });

  const [inputAmount, setInputAmount] = useState("1000");
  const [selectedMethod, setSelectedMethod] = useState("upi");

  const handleQuickAmountClick = (amount) => {
    setInputAmount(amount.toString());
  };

  const handleDeposit = () => {
    const amt = parseFloat(inputAmount);
    if (isNaN(amt) || amt <= 0) {
      alert("Please enter a valid amount to deposit.");
      return;
    }

    // 1. Calculate and save new balance
    const newBalance = balance + amt;
    localStorage.setItem("wallet_balance", newBalance.toFixed(2));

    // 2. Add to transaction list in localStorage
    const savedTx = localStorage.getItem("wallet_transactions");
    let currentTxs = [];
    if (savedTx) {
      try {
        currentTxs = JSON.parse(savedTx);
      } catch (e) {
        console.error(e);
      }
    }

    const formattedDate = new Date().toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    }).replace(",", "");

    const newTx = {
      id: Date.now(),
      title: "Added Money",
      date: formattedDate,
      amount: `+ ₹${amt.toFixed(2)}`,
      amountClass: "text-[#22C55E]",
      status: "Success",
      statusClass: "text-[#22C55E]",
      iconBg: "bg-green-50 text-green-500",
      iconType: "plus"
    };

    const updatedTxs = [newTx, ...currentTxs];
    localStorage.setItem("wallet_transactions", JSON.stringify(updatedTxs));

    // 3. Redirect back to wallet
    navigate("/wallet");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-[#FAFAFA] relative shadow-xl flex flex-col justify-between">
        
        {/* Scrollable Content */}
        <div className="overflow-y-auto pb-28">
          
          {/* Header */}
          <div className="bg-white border-b border-gray-100 flex items-center justify-between px-4 py-4 sticky top-0 z-10">
            <div className="flex items-center">
              <button 
                onClick={() => navigate(-1)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer mr-3"
              >
                <ArrowLeft size={24} className="text-gray-700" />
              </button>
              <h1 className="text-lg font-extrabold text-[#1d2340]">Deposit</h1>
            </div>
            
            <div className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-full shadow-sm text-xs font-bold text-[#FF6F3D]">
              <span className="w-1.5 h-1.5 bg-[#FF6F3D] rounded-full animate-pulse"></span>
              Astro Wallet
            </div>
          </div>

          <div className="px-4 py-4 space-y-5">
            
            {/* Balance Card */}
            <div className="bg-gradient-to-br from-[#FFF2EC] to-[#FFE5D8] rounded-[28px] p-6 shadow-sm border border-[#FFF2EC] flex items-center justify-between relative overflow-hidden">
              <div className="space-y-2 z-10">
                <span className="text-xs font-bold text-gray-500 tracking-wide uppercase">Current Balance</span>
                <div className="text-3xl font-extrabold text-[#1d2340]">₹{balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</div>
              </div>
              
              <div className="w-24 h-24 flex-shrink-0 z-10">
                <img 
                  src={walletIllustration} 
                  alt="Wallet" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Quick Amount Section */}
            <div className="space-y-2.5">
              <h2 className="font-bold text-gray-800 text-[14px] px-1">Quick Amount</h2>
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {quickAmounts.map((amount) => {
                  const isSelected = inputAmount === amount.toString();
                  return (
                    <button
                      key={amount}
                      onClick={() => handleQuickAmountClick(amount)}
                      className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex-shrink-0 ${
                        isSelected
                          ? "border-[#FF6F3D] bg-[#FFF2EC] text-[#FF6F3D] shadow-sm"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      ₹{amount.toLocaleString("en-IN")}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Enter Amount Section */}
            <div className="space-y-2.5">
              <h2 className="font-bold text-gray-800 text-[14px] px-1">Enter Amount</h2>
              <div className="relative bg-white rounded-2xl shadow-sm border border-gray-200/60 p-4 flex items-center">
                <span className="text-lg font-bold text-gray-500 mr-2">₹</span>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={inputAmount}
                  onChange={(e) => setInputAmount(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-base font-bold text-gray-800 placeholder-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-2.5">
              <h2 className="font-bold text-gray-800 text-[14px] px-1">Select Payment Method</h2>
              
              <div className="space-y-3">
                {paymentMethods.map((method) => {
                  const isSelected = selectedMethod === method.id;
                  return (
                    <div
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer flex items-center justify-between shadow-sm ${
                        isSelected ? "border-[#FF6F3D]" : "border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center ${method.iconBg}`}>
                          {method.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 text-sm leading-tight">{method.title}</h3>
                          <p className="text-[10px] text-gray-400 mt-1 font-medium">{method.description}</p>
                        </div>
                      </div>
                      
                      {/* Radio button */}
                      <div className="flex items-center">
                        {isSelected ? (
                          <div className="w-5 h-5 rounded-full border-2 border-[#FF6F3D] flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FF6F3D]"></div>
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Secure Payment Info */}
            <div className="bg-gray-100/70 border border-gray-200/20 rounded-2xl p-3.5 flex items-center gap-2.5 justify-center">
              <ShieldCheck size={18} className="text-gray-500" />
              <span className="text-[10px] font-bold text-gray-500">Your payments are secure and encrypted</span>
            </div>

            {/* Action Proceed Button */}
            <button
              onClick={handleDeposit}
              className="w-full bg-[#FF6F3D] hover:bg-[#e05e30] py-4 rounded-2xl text-white font-extrabold text-sm shadow-md shadow-orange-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock size={16} strokeWidth={2.5} />
              Proceed to Deposit
            </button>

          </div>
        </div>

        {/* Bottom Navigation */}
        <Bottomnav />

      </div>
    </div>
  );
}
