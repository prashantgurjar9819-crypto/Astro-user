import { useState } from "react";
import {
  FiArrowLeft,
  FiPhone,
  FiMail,
  FiMessageSquare,
  FiChevronRight,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function HelpSupport() {
  const navigate = useNavigate();

  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      title: "How wallet deduction works?",
      answer:
        "Wallet balance is deducted according to the consultation duration and the astrologer's per minute charges.",
    },
    {
      title: "How can I recharge my wallet?",
      answer:
        "Go to Wallet → Recharge Wallet, choose an amount and complete the payment using UPI, Card or Net Banking.",
    },
    {
      title: "Can I get refund?",
      answer:
        "Yes. If the consultation is disconnected because of technical issues, the unused amount will be refunded automatically.",
    },
    {
      title: "How do I contact support?",
      answer:
        "You can contact us via Call, Email or Live Chat. Our support team is available 24×7.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex justify-center">
      <div className="w-full max-w-md">

        {/* Header */}

        <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-b-[35px] shadow-lg px-5 pt-12 pb-8 relative">

          <button
            onClick={() => navigate(-1)}
            className="absolute left-5 top-12 text-white"
          >
            <FiArrowLeft size={24} />
          </button>

          <div className="text-center">

            <h1 className="text-3xl font-bold text-white">
              Help & Support
            </h1>

            <p className="text-orange-100 mt-2">
              We're always here to help you
            </p>

          </div>

        </div>

        {/* Help Banner */}

        <div className="mx-4 -mt-6 bg-white rounded-3xl shadow-lg p-5 flex items-center gap-4">

          <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">

            <FiMessageSquare
              size={30}
              className="text-orange-500"
            />

          </div>

          <div>

            <h2 className="text-xl font-bold">
              Need Immediate Help?
            </h2>

            <p className="text-gray-500 mt-1 text-sm">
              Our support team is available 24×7.
            </p>

          </div>

        </div>

        {/* Contact Section */}

        <div className="px-4 mt-6">

          <h2 className="text-2xl font-bold mb-4">
            Contact Us
          </h2>

          <ContactCard
            icon={<FiPhone />}
            title="Call Support"
            sub="+91 9876543210"
            color="bg-green-100 text-green-600"
          />

          <ContactCard
            icon={<FiMail />}
            title="Email Support"
            sub="support@astroapp.com"
            color="bg-blue-100 text-blue-600"
          />

          <ContactCard
            icon={<FiMessageSquare />}
            title="Live Chat"
            sub="Start chatting with our support team"
            color="bg-orange-100 text-orange-500"
          />

          <h2 className="text-2xl font-bold mt-8 mb-4">
            Frequently Asked Questions
          </h2>

          {faqs.map((faq, index) => (
            <Faq
              key={index}
              title={faq.title}
              answer={faq.answer}
              open={openFaq === index}
              onClick={() =>
                setOpenFaq(openFaq === index ? null : index)
              }
            />
          ))}

        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-4px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.2s ease-out forwards;
          }
        `}</style>

      </div>
    </div>
  );
}

function ContactCard({ icon, title, sub, color }) {
  return (
    <div className="bg-white rounded-3xl border border-orange-100 p-5 flex items-center justify-between shadow-sm mb-4 hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${color}`}>
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-[#1d2340] text-lg">
            {title}
          </h3>
          <p className="text-gray-500 text-sm mt-0.5">
            {sub}
          </p>
        </div>
      </div>
      <FiChevronRight className="text-xl text-gray-400" />
    </div>
  );
}

function Faq({ title, answer, open, onClick }) {
  return (
    <div className="bg-white rounded-3xl border border-orange-100 shadow-sm mb-4 overflow-hidden transition-all duration-300">
      <button
        onClick={onClick}
        className="w-full p-5 flex justify-between items-center text-left font-semibold text-gray-800 text-[16px] cursor-pointer hover:bg-orange-50/20 transition-colors"
      >
        <span>{title}</span>
        {open ? (
          <FiChevronUp className="text-orange-500 text-xl" />
        ) : (
          <FiChevronDown className="text-gray-400 text-xl" />
        )}
      </button>
      
      {open && (
        <div className="px-5 pb-5 text-gray-500 text-sm leading-relaxed border-t border-orange-50/40 pt-3 animate-fade-in">
          {answer}
        </div>
      )}
    </div>
  );
}

export default HelpSupport;