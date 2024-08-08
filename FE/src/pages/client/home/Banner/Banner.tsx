import { useState, useEffect, useRef } from "react";
import slide1 from "@/assets/images/slider1.png";
import slide2 from "@/assets/images/slider2.png";
import slide3 from "@/assets/images/slider3.png"; 


const slides = [
  { id: 1, bgImage: slide1, title: "MÙA HÈ 2024", subtitle1: "Bộ sưu tập", subtitle2: " thời trang mới" },
  {
    id: 2,
    bgImage: slide2,
    
  },
  {
    id: 3,
    bgImage: slide3,
    title: "Miễn phí vận chuyển", subtitle1: "Ưu đãi đặc biệt", subtitle2: "mùa hè năm nay"
  },

];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft =
        sliderRef.current.clientWidth * currentIndex;
    }
  }, [currentIndex]);

  return (
    <div className="relative">
      <div className="hd-slider-wrapper relative mx-auto">
        <div
          ref={sliderRef}
          className="hd-slider flex overflow-x-hidden scroll-smooth transition-transform duration-500"
        >
          {slides.map((slide) => (
            <section
              key={slide.id}
              className="hd-silder-item relative bg-no-repeat bg-cover object-cover flex-[1_0_100%] snap-start bg-center text-white min-h-[250px] sm:min-h-[350px] lg:min-h-[500px] xl:min-h-[720px] md:min-h-[420px] flex py-10 lg:items-center lg:py-0 mb-10"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            >
              <div className="container ">
                <p className="text-[#222222] text-lg sm:text-2xl lg:text-3xl md:text-2xl font-medium tracking-wider leading-tight animate-text-move">
                  {slide.title}
                </p>
                <h1 className="text-black text-xl sm:text-3xl lg:text-6xl md:text-4xl font-bold mb-4 mt-2 animate-text-move">
                  {slide.subtitle1}
                </h1>
                <h1 className="text-black text-xl sm:text-3xl lg:text-6xl md:text-4xl font-bold mb-4 mt-2 animate-text-move">
                  {slide.subtitle2}
                </h1>
                <button className="animate-text-move custom-btn bg-[#00BADB] text-[#fff] w-[120px] sm:w-[150px] xl:w-[150px] lg:w-[150px] h-[35px] sm:h-[48px] xl:h-[48px] lg:h-[48px] font-bold text-sm sm:text-lg xl:text-lg lg:text-lg relative z-10 transition ease-in-out duration-300 before:w-full before:h-full before:top-0 before:left-0 before:absolute before:bg-[#000] before:z-[-1] before:transition-[height] before:ease-in before:duration-200 before:content-['']">Khám Phá Ngay</button>
              </div>
            </section>
          ))}
        </div>
        <button
          className="absolute left-1 sm:left-1 top-[40%] sm:top-[40%] lg:top-[40%] xl:top-1/2 flex items-center justify-center"
          onClick={prevSlide}
        >
          {/* <HomeIcon5 /> */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-gray-500 hover:text-black">
            <path fill-rule="evenodd" d="M10.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L12.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z" clip-rule="evenodd" />
            <path fill-rule="evenodd" d="M4.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L6.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z" clip-rule="evenodd" />
          </svg>

        </button>
        <button
          className="absolute right-1 sm:right-1 top-[40%] sm:top-[40%] lg:top-[40%] xl:top-1/2 flex items-center justify-center"
          onClick={nextSlide}
        >
          {/* <HomeIcon6 /> */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-gray-500 hover:text-black">
            <path fill-rule="evenodd" d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
            <path fill-rule="evenodd" d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
          </svg>

        </button>
        <div className="absolute bottom-4 top-[80%] sm:top-[83%] lg:top-[87%] left-1/2 transform -translate-x-1/2 flex justify-center">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3.5 h-3 mx-2 rounded-full ${
                currentIndex === index ? "bg-gray-800" : "bg-gray-400"
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
