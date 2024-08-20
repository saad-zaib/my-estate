import PropTypes from "prop-types";
import { useState } from "react";

function Card({ className = "", iconPath, label }) {
  const [showLabel, setShowLabel] = useState(false);

  const handleToggle = () => setShowLabel(!showLabel);

  return (
    <div
      onClick={handleToggle}
      className={`transform transition-all duration-300 hover:scale-105 hover:shadow-[0px_20px_50px_rgba(8,_15,_52,_0.1)] flex-1 shadow-[0px_14px_42px_rgba(8,_15,_52,_0.06)] rounded-xl bg-color-gray-10 flex flex-row items-center justify-center py-3 px-5 box-border gap-[17px] max-w-full text-left text-xs text-color-gray-80 font-inter mq825:w-[calc(100%_-_40px)] ${className}`}
    >
      {!showLabel && (
        <div className="h-10 w-10 rounded-31xl bg-blueviolet flex flex-row items-center justify-center p-3 box-border">
          <svg className="h-4 w-4 relative" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d={iconPath} />
          </svg>
        </div>
      )}
      {showLabel && (
        <div className="w-[165px] flex flex-col items-start justify-start gap-[8px]">
          <span className="relative font-semibold text-color-gray-100 whitespace-nowrap">{label}</span>
        </div>
      )}
    </div>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  iconPath: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Card;
