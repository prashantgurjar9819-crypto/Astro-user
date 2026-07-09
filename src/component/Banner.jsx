
import watch from "../assets/watch.jpeg";

function banner() {
  return (
    <div className="mx-4 mt-4 bg-[#f6d6cf] rounded-[28px] overflow-hidden shadow">

      <div className="pt-5 px-5 text-center">

        <h1 className="text-[35px] font-black text-orange-600 leading-none whitespace-nowrap">
          IT'S ASTRO TIME
        </h1>

        <p className="text-orange-600 font-semibold mt-3 text-[17px]">
          ✨ Astro App Online | 5 AM – 12 AM
        </p>

        <button className="mt-4 w-full bg-gradient-to-r from-orange-600 to-orange-400 text-white font-bold py-3 rounded-full text-[17px] shadow-lg">
          GET YOUR DAILY HOROSCOPE
        </button>

      </div>

      <img
        src={watch}
        alt="banner"
        className="w-full h-[170px] object-contain mt-3"
      />

    </div>
  );
}

export default banner;