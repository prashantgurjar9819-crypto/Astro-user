import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const bookingsList = [
  {
    id: 1,
    title: "Ganesh Puja",
    price: "₹1,200",
    date: "24 Feb 2026",
    time: "11:00 AM",
    priest: "Astro Sumit",
    status: "Scheduled",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600",
  },
  {
    id: 2,
    title: "Maha Mrityunjaya Jaap",
    price: "₹5,100",
    date: "18 Feb 2026",
    time: "08:00 AM",
    priest: "Astro Vikram",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1608976328321-260332f70416?w=600",
  },
  {
    id: 3,
    title: "Satyanarayan Katha",
    price: "₹2,500",
    date: "10 Feb 2026",
    time: "04:30 PM",
    priest: "Astro Raj",
    status: "Cancelled",
    image: "https://images.unsplash.com/photo-1545128485-c400e7702796?w=600",
  }
];

function BookingHistory() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex justify-center">
      <div className="w-full max-w-md min-h-screen bg-white shadow-xl relative overflow-hidden flex flex-col justify-between">

        {/* Scrollable Content */}
        <div className="overflow-y-auto h-screen pb-10">

          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-b-[35px] shadow-lg px-5 pt-12 pb-8 relative">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-5 top-12 text-white cursor-pointer hover:opacity-80 transition-opacity"
            >
              <FiArrowLeft size={24} />
            </button>

            <div className="text-center">
              <h1 className="text-3xl font-bold text-white">
                Puja Bookings
              </h1>
              <p className="text-orange-100 text-sm mt-1">
                Manage your booked puja ceremonies
              </p>
            </div>
          </div>

          {/* Cards */}
          <div className="p-5 space-y-6">
            {bookingsList.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-md hover:scale-[1.01] transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-xl font-bold text-[#1d2340]">
                      {item.title}
                    </h2>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.status === "Scheduled"
                        ? "bg-blue-100 text-blue-700"
                        : item.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="text-xs text-gray-500 space-y-1.5">
                    <p className="flex items-center gap-1.5">
                      <span>📅</span> Date: <span className="font-semibold text-gray-700">{item.date} at {item.time}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <span>📿</span> Priest: <span className="font-semibold text-gray-700">{item.priest}</span>
                    </p>
                  </div>

                  <div className="border-t border-dashed border-gray-200 my-4"></div>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Amount Paid</p>
                      <p className="text-xl font-extrabold text-orange-500 mt-0.5">
                        {item.price}
                      </p>
                    </div>

                    {item.status === "Scheduled" ? (
                      <button className="px-5 py-2.5 rounded-full bg-[#EBF7EE] text-[#2EA248] hover:bg-[#d8eedc] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-sm">
                        Join Puja
                      </button>
                    ) : item.status === "Completed" ? (
                      <button className="px-5 py-2.5 rounded-full bg-gray-100 text-gray-500 text-xs font-bold flex items-center gap-1.5 cursor-not-allowed">
                        Completed
                      </button>
                    ) : (
                      <button className="px-5 py-2.5 rounded-full bg-red-50 text-red-500 text-xs font-bold flex items-center gap-1.5 cursor-not-allowed">
                        Cancelled
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}

export default BookingHistory;