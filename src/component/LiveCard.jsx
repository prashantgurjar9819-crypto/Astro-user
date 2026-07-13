import { Eye } from "lucide-react";

export default function LiveCard({ item }) {
  return (
    <div className="relative w-full h-64 rounded-3xl overflow-hidden shadow-lg">
      {/* Background */}
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* LIVE Badge */}
      <div className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
        LIVE
      </div>

      {/* Viewers */}
      <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
        <Eye size={14} />
        {item.views}
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h2 className="text-white text-2xl font-bold">
          {item.name}
        </h2>

        <p className="text-white/90 text-sm mt-1">
          {item.speciality}
        </p>

        <button className="mt-4 w-full rounded-xl bg-orange-500 py-3 text-white font-semibold hover:bg-orange-600 transition">
          Join Now
        </button>
      </div>
    </div>
  );
}