import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import watch from "../assets/watch.jpeg";

const banners = [
  {
    image: watch,
    title: "IT'S ASTRO TIME",
    subtitle: "✨ Astro App Online | 5 AM – 12 AM",
    button: "GET YOUR DAILY HOROSCOPE",
  },
  {
    image: watch,
    title: "DAILY HOROSCOPE",
    subtitle: "🔮 Get Your Daily Prediction",
    button: "CHECK NOW",
  },
  {
    image: watch,
    title: "TALK TO ASTROLOGER",
    subtitle: "⭐ Chat With Expert Astrologers",
    button: "BOOK NOW",
  },
];

function Banner() {
  return (
    <div className="mx-4 mt-4 rounded-[28px] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop={true}
      >
        {banners.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-[#f6d6cf] rounded-[28px] overflow-hidden shadow">
              <div className="pt-5 px-5 text-center">
                <h1 className="text-[35px] font-black bg-[#ff8253] leading-none whitespace-nowrap">
                  {item.title}
                </h1>

                <p className="text-[#ff8253] font-semibold mt-3 text-[17px]">
                  {item.subtitle}
                </p>

                <button className="mt-4 w-full bg-gradient-to-r from-[#ff8253] to-[#ff8253] text-white font-bold py-3 rounded-full text-[17px] shadow-lg">
                  {item.button}
                </button>
              </div>

              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[170px] object-contain mt-3"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banner;