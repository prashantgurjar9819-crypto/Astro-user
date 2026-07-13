import { Search, Mic } from "lucide-react";

function SearchBar() {
  return (
    <div className="px-4">

      <div className="flex items-center bg-[#FFF1EA] rounded-full px-4 h-14">

        <Search className="text-gray-400" size={22} />

        <input
          type="text"
          placeholder='Search for "Astrologer"'
          className="flex-1 bg-transparent outline-none px-3 text-lg"
        />

        <Mic className="text-orange-500" size={24} />

      </div>

    </div>
  );    
}

export default SearchBar;