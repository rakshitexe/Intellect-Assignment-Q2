import { format } from "date-fns";
import React, { useRef, useState, useEffect } from "react";
import SelectableCard from "./baseline-ui/SelectableCard"; // Adjust path as needed
interface Props {
  dates: string[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const DateSelector: React.FC<Props> = ({
  dates,
  selectedDate,
  onSelectDate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const container = containerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft + container.clientWidth < container.scrollWidth
      );
    }
  };

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -100, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: 100, behavior: "smooth" });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    updateScrollButtons();

    container.addEventListener("scroll", updateScrollButtons);

    const resizeObserver = new ResizeObserver(() => {
      updateScrollButtons();
    });

    resizeObserver.observe(container);

    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
      resizeObserver.disconnect();
    };
  }, []);

  // Optional: also update on window resize (as a fallback)
  useEffect(() => {
    updateScrollButtons();
    window.addEventListener("resize", updateScrollButtons);
    return () => window.removeEventListener("resize", updateScrollButtons);
  }, [dates]);

  return (
    <div className=" mb-3">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Pick a date</h2>

      <div className="flex items-center justify-center relative">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          className={`w-10 h-10 bg-[#ebeae8] rounded-full flex items-center justify-center shadow-md mr-2 shrink-0
            ${!canScrollLeft ? "opacity-40 cursor-not-allowed" : ""}
          `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 48 48"
            width="20"
            height="20"
          >
            <path
              fill="#000000"
              d="M13.7 22.5H40v3H13.7l12.4 12.4L24 40 8 24l16-16 2.1 2.1L13.7 22.5Z"
              strokeWidth="1"
            ></path>
          </svg>
        </button>

        {/* Scrollable Dates */}
        <div
          ref={containerRef}
          className="flex overflow-x-auto gap-2 px-1 py-2 max-w-[80%] scroll-smooth custom-scrollbar"
        >
          {dates.map((date) => {
            const d = new Date(date);
            const day = format(d, "dd");
            const dayName = format(d, "EEE");

            return (
              <SelectableCard
                key={date}
                labelTop={day}
                labelBottom={dayName}
                isSelected={selectedDate === date}
                onClick={() => onSelectDate(date)}
              />
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          disabled={!canScrollRight}
          className={`w-10 h-10 bg-[#ebeae8] rounded-full flex items-center justify-center shadow-md ml-2 shrink-0
            ${!canScrollRight ? "opacity-40 cursor-not-allowed" : ""}
          `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 48 48"
            width="20"
            height="20"
          >
            <path
              fill="#000000"
              d="M34.3 25.5H8v-3h26.3L21.9 10.1 24 8l16 16 -16 16 -2.1 -2.1 12.4 -12.4Z"
              strokeWidth="1"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DateSelector;