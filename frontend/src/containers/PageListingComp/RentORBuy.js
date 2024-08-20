import RentORBuy2 from "./RentORBuy2";
import PropTypes from "prop-types";

const RentORBuy = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch flex flex-col items-start justify-start gap-[48px] max-w-full text-left text-17xl  font-body-large-400 mq750:gap-[24px] ${className}`}
    >
      <div className="self-stretch text-black-default relative leading-[44px] font- font-medium mq450:text-3xl mq450:leading-[26px] mq1050:text-10xl mq1050:leading-[35px]">
        Discover Estate Experiences
      </div>
      <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[24px] max-w-full text-29xl text-color-gray-10">
        <RentORBuy2 onYourSale="on your Sale" text="Sale"  link="/sale" />
        <RentORBuy2 onYourSale="from Rent" text="Rent" propBackgroundImage="url('/rentImage.jpg')" link="/rent" />
      </div>
    </section>
  );
};

RentORBuy.propTypes = {
  className: PropTypes.string,
};

export default RentORBuy;
