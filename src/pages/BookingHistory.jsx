import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function BookingHistory() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex justify-center">
      <div className="w-full max-w-md min-h-screen bg-white">

        {/* Header */}
        <div className="bg-orange-500 text-white flex items-center gap-4 px-4 py-5">
          <FiArrowLeft
            className="text-2xl cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-3xl font-medium">Puja Booking</h1>
        </div>

        {/* Card */}
        <div className="p-5">
          <div className="bg-white border border-orange-300 rounded-2xl overflow-hidden">

            {/* Image */}
            <img
              src="https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600"
              alt="Ganesh Pooja"
              className="w-full h-56 object-cover"
            />

            {/* Bottom */}
            <div className="flex justify-between items-center p-4">

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Ganesh Pooja
                </h2>

                <p className="text-2xl font-bold mt-1">
                  ₹ 1200
                </p>
              </div>

              <button className="w-34 h-10 border border-orange-400 rounded-2xl text-orange-400 font-semibold text-lg hover:bg-orange-50 transition">
                Call Now
              </button>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default BookingHistory;