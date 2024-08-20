import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BoxComponent = ({
  className = "",
  count,
  showXS,
  icon, 
  propPosition,
  propTop,
  propLeft,
  propWidth,
  propHeight,
}) => {
  const frameDivStyle = useMemo(() => {
    return {
      position: propPosition,
      top: propTop,
      left: propLeft,
      width: propWidth,
      height: propHeight,
    };
  }, [propPosition, propTop, propLeft, propWidth, propHeight]);

  return (
    <div
      className={`rounded-xl bg-lightgray-100 flex flex-row items-start justify-start py-2 px-6 z-[1] text-left text-5xl text-black font-vidaloka ${className}`}
      style={frameDivStyle}
    >
      {showXS && (
        <div className="relative tracking-[0.02em] inline-block min-w-[30px] mq450:text-lgi">
          {count}
          {icon && <FontAwesomeIcon icon={icon} className="text-2xl" />}
          
        </div>
      )}
    </div>
  );
};

BoxComponent.propTypes = {
  className: PropTypes.string,
  count: PropTypes.string,
  showXS: PropTypes.bool,
  icon: PropTypes.object, 
  propPosition: PropTypes.any,
  propTop: PropTypes.any,
  propLeft: PropTypes.any,
  propWidth: PropTypes.any,
  propHeight: PropTypes.any,
};

export default BoxComponent;
