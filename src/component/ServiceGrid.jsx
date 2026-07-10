import { useNavigate } from "react-router-dom";

const services = [
  {
    title: "Chat",
    sub: "With Astrology Experts",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    path: "/chat",
  },
  {
    title: "Call",
    sub: "1:1 Personal Guidance",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    path: "/call",
  },
  {
    title: "Astro Info",
    sub: "Astrology Readings",
    img: "https://randomuser.me/api/portraits/men/64.jpg",
    path: "/astro-info",
  },
  {
    title: "Pooja",
    sub: "Personalised Pooja",
    img: "https://randomuser.me/api/portraits/women/25.jpg",
    path: "/pooja",
  },
];

export default function ServiceGrid() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3 px-4 mt-3 mb-16">
      {services.map((item, index) => (
        <div
          key={index}
          onClick={() => handleNavigation(item.path)}
          className="relative h-[90px] rounded-2xl bg-white shadow-md p-3 cursor-pointer active:scale-95 transition-transform"
        >
          {/* Offer Badge */}
          <span className="absolute top-2 right-2 rounded-full bg-orange-500 px-2 py-[2px] text-[8px] font-semibold text-white">
            50% OFF
          </span>

          {/* Title */}
          <h2 className="text-sm font-bold text-[#1d2340]">
            {item.title}
          </h2>

          {/* Subtitle */}
          <p className="mt-1 w-[80px] text-[10px] leading-3 text-gray-400">
            {item.sub}
          </p>

          {/* Image */}
          <img
            src={item.img}
            alt={item.title}
            className="absolute bottom-2 right-3 h-11 w-11 rounded-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}