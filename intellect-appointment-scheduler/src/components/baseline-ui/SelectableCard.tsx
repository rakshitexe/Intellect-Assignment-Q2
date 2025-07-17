import React from 'react';

interface SelectableCardProps {
  labelTop: string;              // Main label (top text)
  labelBottom?: string;          // Optional bottom label (if present, treated as date card)
  isSelected: boolean;           // Whether the card is selected
  onClick: () => void;           // Click handler
}

const SelectableCard: React.FC<SelectableCardProps> = ({
  labelTop,
  labelBottom,
  isSelected,
  onClick,
}) => {
  // Common styles for all cards
  const baseStyle = `transition-all rounded-lg border text-[12px] text-center shadow-sm`;

  // Style for selected vs default states
  const selectedStyle = `bg-[#e7e7e7] text-black font-semibold border-gray-400`;
  const defaultStyle = `bg-white text-gray-800 border-gray-300 hover:border-gray-400 hover:bg-gray-100`;

  // Combine final className
  const classes = `${baseStyle} ${isSelected ? selectedStyle : defaultStyle}`;

  // Determine if this card represents a date (has bottom label)
  const isDate = !!labelBottom;

  return isDate ? (
    // Date card layout with two labels: top and bottom
    <button
      data-testid={isDate ? `date-${labelTop}-${labelBottom}` : `slot-${labelTop}`}
      onClick={onClick}
      className={`${classes} px-4 py-4 min-w-[60px] flex flex-col items-center`}
    >
      <span className="text-sm mb-1">{labelTop}</span>
      <span className="text-xs mt-1">{labelBottom}</span>
    </button>
  ) : (
    // Time slot card layout with only one label
    <button
      onClick={onClick}
      className={`${classes} px-2 py-2 min-w-[80px]`}
    >
      {labelTop}
    </button>
  );
};

export default SelectableCard;
