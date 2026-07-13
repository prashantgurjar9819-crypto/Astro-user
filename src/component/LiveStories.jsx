const astrologers = [
  {
    id: 1,
    name: "Rahul",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Priya",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Vikram",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 4,
    name: "Neha",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
  },
  {
    id: 5,
    name: "Aman",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
  },
];

export default function LiveStories() {
  return (
    <div className="overflow-x-auto px-4 py-4">
      <div className="flex gap-4 min-w-max">
        {astrologers.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-full border-4 bg-[#ff8253] object-cover"
              />

              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-[#ff8253] px-2 py-[2px] text-[9px] text-white">
                LIVE
              </span>
            </div>

            <p className="mt-2 text-xs font-medium">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}