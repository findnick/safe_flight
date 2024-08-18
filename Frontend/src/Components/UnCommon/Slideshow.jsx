import React, { useRef, useState } from "react";

const Slideshow = ({ items }) => {
  const slideshowRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollLeft = () => {
    const newPosition = Math.max(scrollPosition - 200, 0);
    setScrollPosition(newPosition);
    slideshowRef.current.scrollTo({ left: newPosition, behavior: "smooth" });
  };

  const scrollRight = () => {
    const maxScroll =
      slideshowRef.current.scrollWidth - slideshowRef.current.clientWidth;
    const newPosition = Math.min(scrollPosition + 200, maxScroll);
    setScrollPosition(newPosition);
    slideshowRef.current.scrollTo({ left: newPosition, behavior: "smooth" });
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={slideshowRef}
        className="flex transition-transform duration-300 ease-in-out w-full"
        style={{
          overflowX: "hidden",
          scrollBehavior: "smooth",
        }}
      >
        {items.map((item, index) => (
          <div key={index} className="flex-shrink-0 w-64 m-2">
            {item}
          </div>
        ))}
      </div>
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2"
        onClick={scrollLeft}
      >
        &lt;
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2"
        onClick={scrollRight}
      >
        &gt;
      </button>
    </div>
  );
};

export default Slideshow;
