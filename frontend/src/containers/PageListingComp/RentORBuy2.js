import { useMemo } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";


const RentORBuy2 = ({className = "", onYourSale, text, propBackgroundImage, link}) => {

  const navigate = useNavigate();

  const Image = useMemo(() => {
    return {
      backgroundImage: propBackgroundImage,
    };
  }, [propBackgroundImage]);

  const handleClick = () => {
    navigate(link);
  };




  return (
    <div
      className={`flex-1 rounded-lg overflow-hidden flex flex-col items-start justify-start pt-20 pb-[356px] pr-5 pl-20 box-border gap-[24px] bg-[url('/public/BuyImage.jpg')] bg-cover bg-no-repeat bg-[top] min-w-[471px] max-w-full text-left text-29xl text-color-gray-10 font-body-large-400 mq750:pl-10 mq750:pt-[52px] mq750:pb-[231px] mq750:box-border mq750:min-w-full ${className}`}
      style={Image}
    >
      <div className="w-[468px] relative text-gray-black leading-[56px] font-medium flex items-center max-w-full mq450:text-10xl mq450:leading-[34px] mq1050:text-19xl mq1050:leading-[45px]">
        <span className="w-full">
        </span>
      </div>
      <div className="flex flex-row items-start w-full justify-start text-base text-gray-7001">
        <div onClick={handleClick}  className="shadow-[0px_1px_2px_rgba(31,_41,_55,_0.08)] rounded-lg i hover:text-gray-white bg-color-gray-10 hover:bg-color-gray-90 flex flex-row items-end justify-center py-4 px-6 gap-[8px]">
          <img
            className="h-5 w-5 relative overflow-hidden shrink-0 hidden"
            alt=""
            src="/icon.svg"
          />
          <div className="relative  leading-[150%]  font-medium inline-block min-w-[33px]">
            {text}
          </div>
          <img
            className="h-5 w-5 relative overflow-hidden shrink-0 hidden"
            alt=""
            src="/icon4.svg"
          />
        </div>
      </div>
    </div>
  );
};

RentORBuy2.propTypes = {
  className: PropTypes.string,
  onYourSale: PropTypes.string,
  text: PropTypes.string,
  /** Style props */
  propBackgroundImage: PropTypes.any,
};

export default RentORBuy2;
