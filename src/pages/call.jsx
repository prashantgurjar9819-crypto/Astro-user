import CallHeader from "../component/CallHeader";
import CallSearchBar from "../component/CallSearchBar";
import CategoryTabs from "../component/CategoryTabs";
import AstrologerCard from "../component/AstrologerCard";
import Bottomnav from "../component/Bottomnav";

const astrologersList = [
  {
    id: 1,
    name: "Astro Sumit",
    skills: "Love, Career, Marriage",
    experience: "5 Years",
    rating: "4.9",
    price: "₹30/min",
    image: "https://i.pravatar.cc/200?img=12",
    tag: "Top Rated"
  },
  {
    id: 2,
    name: "Astro Rakesh",
    skills: "Kundli, Vastu, Marriage",
    experience: "8 Years",
    rating: "4.8",
    price: "₹25/min",
    image: "https://i.pravatar.cc/200?img=33",
    tag: "Trending"
  },
  {
    id: 3,
    name: "Astro Pooja",
    skills: "Numerology, Love, Career",
    experience: "6 Years",
    rating: "4.9",
    price: "₹35/min",
    image: "https://i.pravatar.cc/200?img=47",
    tag: "Popular"
  },
  {
    id: 4,
    name: "Astro Amit",
    skills: "Vedic Astrology, Financial",
    experience: "10 Years",
    rating: "5.0",
    price: "₹40/min",
    image: "https://i.pravatar.cc/200?img=68",
    tag: "Top Rated"
  },
  {
    id: 5,
    name: "Astro Sneha",
    skills: "Palmistry, Relationship",
    experience: "4 Years",
    rating: "4.7",
    price: "₹20/min",
    image: "https://i.pravatar.cc/200?img=49",
    tag: "New"
  }
];

function Call() {
  return (
    <div className="min-h-screen bg-[#F7F7F7] flex justify-center">

      {/* Mobile Container */}
      <div className="w-full max-w-[430px] bg-white min-h-screen shadow-xl relative overflow-hidden flex flex-col justify-between">

        {/* Scrollable Area */}
        <div className="overflow-y-auto h-screen pb-28">

          {/* Header */}
          <CallHeader />

          {/* Search */}
          <div className="mt-5">
            <CallSearchBar />
          </div>

          {/* Categories */}
          <div className="mt-5">
            <CategoryTabs />
          </div>

          {/* Astrologers */}
          <div className="px-5 mt-6 space-y-4">
            {astrologersList.map((astro) => (
              <AstrologerCard key={astro.id} item={astro} />
            ))}
          </div>

        </div>

        {/* Bottom Navigation */}
        <Bottomnav />

      </div>

    </div>
  );
}

export default Call;