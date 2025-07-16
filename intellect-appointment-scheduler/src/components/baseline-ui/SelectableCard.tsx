import React from 'react';

interface SelectableCardProps {
  labelTop: string;
  labelBottom?: string; // If present → it's a date
  isSelected: boolean;
  onClick: () => void;
}

const SelectableCard: React.FC<SelectableCardProps> = ({
  labelTop,
  labelBottom,
  isSelected,
  onClick,
}) => {
  const baseStyle = `transition-all rounded-lg border text-[12px] text-center shadow-sm`;

  const selectedStyle = `bg-[#e7e7e7] text-black font-semibold border-gray-400`;
  const defaultStyle = `bg-white text-gray-800 border-gray-300 hover:border-gray-400 hover:bg-gray-100`;

  const classes = `${baseStyle} ${isSelected ? selectedStyle : defaultStyle}`;

  const isDate = !!labelBottom;

  return isDate ? (
    <button
      onClick={onClick}
      className={`${classes} px-4 py-4 min-w-[60px] flex flex-col items-center`}
    >
      <span className="text-sm mb-1">{labelTop}</span>
      <span className="text-xs mt-1">{labelBottom}</span>
    </button>
  ) : (
    <button
      onClick={onClick}
      className={`${classes} px-2 py-2 min-w-[80px]`}
    >
      {labelTop}
    </button>
  );
};

export default SelectableCard;
