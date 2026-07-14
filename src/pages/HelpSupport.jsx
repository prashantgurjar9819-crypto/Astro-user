import { FiArrowLeft, FiPhone, FiMail, FiMessageSquare, FiChevronRight, FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function HelpSupport() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex justify-center">
      <div className="w-full max-w-md bg-[#F5F5F5] min-h-screen">

        {/* Header */}
        <div className="bg-white h-16 flex items-center justify-center relative border-b">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-4 text-2xl"
          >
            <FiArrowLeft />
          </button>

          <h1 className="text-3xl font-medium">
            Help & Support
          </h1>
        </div>

        {/* Help Banner */}
        <div className="m-5 bg-gradient-to-r from-orange-500 to-orange-300 rounded-3xl p-5 text-white flex items-center gap-4">

          <div className="bg-white/20 p-3 rounded-full">
            <FiMessageSquare size={24} />
          </div>

          <div>
            <h2 className="text-xl font-bold">
              Need Immediate Help?
            </h2>

            <p className="text-sm">
              Our team is here for you 24/7.
            </p>
          </div>

        </div>

        {/* Contact */}
        <div className="px-5">

          <h2 className="text-3xl font-bold mb-2">
            Contact Us
          </h2>

          <ContactCard
            icon={<FiPhone />}
            title="Call Support"
            sub="+91 9876543210"
            color="bg-green-100 text-green-500"
          />

          <ContactCard
            icon={<FiMail />}
            title="Email Support"
            sub="support@astroapp.com"
            color="bg-blue-100 text-blue-500"
          />

          <ContactCard
            icon={<FiMessageSquare />}
            title="Live Chat"
            sub="Start chat with support team"
            color="bg-yellow-100 text-yellow-500"
          />

          <h2 className="text-2xl font-bold mt-8 mb-4">
            Frequently Asked Questions
          </h2>

          <Faq title="How wallet deduction works?" />
          <Faq title="How can I recharge my wallet?" />
          <Faq title="Can I get refund?" />

        </div>

      </div>
    </div>
  );
}

function ContactCard({ icon, title, sub, color }) {
  return (
    <div className="bg-white rounded-3xl p-5 flex items-center justify-between shadow mb-4">

      <div className="flex items-center gap-4">

        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${color}`}>
          {icon}
        </div>

        <div>
          <h3 className="font-bold text-xl">
            {title}
          </h3>

          <p className="text-gray-500">
            {sub}
          </p>
        </div>

      </div>

      <FiChevronRight className="text-2xl text-gray-400" />
    </div>
  );
}

function Faq({ title }) {
  return (
    <div className="bg-white rounded-2xl p-5 flex justify-between items-center mb-4 shadow">

      <span className="text-lg">
        {title}
      </span>

      <FiChevronDown className="text-xl" />

    </div>
  );
}

export default HelpSupport;