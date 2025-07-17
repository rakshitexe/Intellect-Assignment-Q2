import { format } from "date-fns";
import React, { useRef, useState, useEffect } from "react";
import SelectableCard from "./SelectableCard";

interface Props {
  dates: string[];                 // Array of date strings (ISO format)
  selectedDate: string;           // Currently selected date
  onSelectDate: (date: string) => void; // Callback to handle selection
}

const DateSelector: React.FC<Props> = ({
  dates,
  selectedDate,
  onSelectDate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check whether scroll buttons should be enabled or disabled
  const updateScrollButtons = () => {
    const container = containerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft + container.clientWidth < container.scrollWidth
      );
    }
  };

  // Scroll left by 100px
  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -100, behavior: "smooth" });
  };

  // Scroll right by 100px
  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: 100, behavior: "smooth" });
  };

  // Set up scroll and resize observers on initial mount
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    updateScrollButtons(); // Initial check

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

  // Also update on window resize or change in dates list
  useEffect(() => {
    updateScrollButtons();
    window.addEventListener("resize", updateScrollButtons);
    return () => window.removeEventListener("resize", updateScrollButtons);
  }, [dates]);

  return (
    <div className="mb-3">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Pick a date</h2>

      {/* If no dates are available, show a message */}
      {dates.length === 0 ? (
        <div className="text-gray-500 text-sm text-center">
          No available dates
        </div>
      ) : (
        <div className="flex items-center justify-center relative">
          {/* Left Scroll Button */}
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`w-10 h-10 bg-[#ebeae8] rounded-full flex items-center justify-center shadow-md mr-2 shrink-0
              ${!canScrollLeft ? "opacity-40 cursor-not-allowed" : ""}
            `}
          >
            {/* Left Arrow Icon */}
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

          {/* Scrollable Date List */}
          <div
            ref={containerRef}
            className="flex overflow-x-auto gap-2 px-1 py-2 max-w-[80%] scroll-smooth custom-scrollbar"
          >
            {dates.map((date) => {
              const d = new Date(date);
              const day = format(d, "dd");    // Numeric day
              const dayName = format(d, "EEE"); // Abbreviated day name (e.g. Mon)

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

          {/* Right Scroll Button */}
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`w-10 h-10 bg-[#ebeae8] rounded-full flex items-center justify-center shadow-md ml-2 shrink-0
              ${!canScrollRight ? "opacity-40 cursor-not-allowed" : ""}
            `}
          >
            {/* Right Arrow Icon */}
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
      )}
    </div>
  );
};

export default DateSelector;
