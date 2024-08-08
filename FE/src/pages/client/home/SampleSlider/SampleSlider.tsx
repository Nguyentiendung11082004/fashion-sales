import { Is1, Is2, Is3, Is4, Is5, Is6 } from "@/components/icons";
import Is7 from "@/assets/images/is7.jpg"
import Is8 from "@/assets/images/is8.jpg"
import HomeIcon5 from "@/components/icons/homeWebsite/HomeIcon5";
import HomeIcon6 from "@/components/icons/homeWebsite/HomeIcon6";
import { useRef, useState } from "react";

const slides = [Is1, Is2, Is3, Is4, Is5, Is6, Is7, Is8];

const Slideshow = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scrollRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Tăng tốc độ cuộn
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollLeftHandler = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRightHandler = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="mt-28">
      <div className="custom-heading">
        <div className="flex-auto items-center mx-auto">
          <div className="mx-4 text-2xl font-bold text-gray-900">
            @ THEO DÕI CHÚNG TÔI TRÊN INSTAGRAM
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden mt-10">
        <button
          className="z-10 absolute left-1 top-[46%] w-10 h-10 border-2 border-[#878787] hover:bg-[#000] hover:border-hidden group/icon rounded-full"
          onClick={scrollLeftHandler}
        >
          <HomeIcon5 />
        </button>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto  scrollbar-hide"
          style={{ scrollbarWidth: "none" }} // Hide scrollbar for Firefox and IE/Edge
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <style>
            {`.scrollbar-hide::-webkit-scrollbar {display: none; // Hide scrollbar for Chrome, Safari, and Opera}`}
          </style>
          {slides.map((slide, index) => (
            <img
              key={index}
              className="transition-all ease-in-out duration-500 hover:scale-110 w-64"
              src={slide}
              alt={`Slide ${index + 1}`}
            />
          ))}
        </div>
        <button
          className="absolute right-1 top-[46%] w-10 h-10 border-2 border-[#878787] hover:bg-[#000] hover:border-hidden group/icon rounded-full"
          onClick={scrollRightHandler}
        >
          <HomeIcon6 />
        </button>
      </div>
    </div>
  );
};

export default Slideshow;
