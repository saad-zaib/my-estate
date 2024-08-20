import PropTypes from "prop-types";
import giftCard from "../../assets/giftcard.png"
import icon from "../../assets/icon.svg"
import icon4 from "../../assets/icon4.svg"

const ShopCards = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch flex flex-row items-center justify-start gap-[48px] max-w-full text-left text-29xl font-body-large-400 lg:flex-wrap mq750:gap-[24px] ${className}`}
    >
      <div className="flex-1 flex flex-col items-start justify-start py-5 px-0 box-border gap-[24px] min-w-[246px] max-w-full">
        <div className="self-stretch relative leading-[56px] font-medium mq450:text-10xl mq450:leading-[34px] mq1050:text-19xl mq1050:leading-[45px]">
          <p className="m-0 text-black-default">Shop our</p>
          <p className="m-0 text-black-default">gift cards</p>
        </div>
        <div className="flex flex-row items-start justify-start text-base text-color-gray-10">
          <div className="shadow-[0px_1px_2px_rgba(31,_41,_55,_0.08)] rounded-lg bg-black-default flex flex-row items-center justify-center py-4 px-6 gap-[8px]">
            <img
              className="h-5 w-5 relative overflow-hidden shrink-0 hidden"
              alt=""
              src={icon}
            />
            <div className="relative leading-[150%] font-medium inline-block min-w-[87px] whitespace-nowrap">
             Visit our Shop
            </div>
            <img
              className="h-5 w-5 relative overflow-hidden shrink-0 hidden"
              alt=""
              src={icon4}
            />
          </div>
        </div>
      </div>
      <img
        className="w-[854.2px] relative max-h-full object-cover max-w-full lg:flex-1"
        loading="lazy"
        alt=""
        src={giftCard}
      />
    </section>
  );
};

ShopCards.propTypes = {
  className: PropTypes.string,
};

export default ShopCards;
