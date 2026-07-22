import { Search, Mic } from "lucide-react";

function SearchBar() {
  return (
    <div className="px-5">
      <div className="flex items-center bg-white border border-orange-100 rounded-full px-4 h-14 shadow-sm focus-within:ring-2 focus-within:ring-orange-400 transition-all">
        <Search className="text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search for astrologers..."
          className="flex-1 bg-transparent outline-none px-3 text-base text-gray-700 placeholder-gray-400"
        />
        <Mic className="text-[#ff7448] cursor-pointer hover:scale-105 transition-transform" size={20} />
      </div>
    </div>
  );    
}

export default SearchBar;