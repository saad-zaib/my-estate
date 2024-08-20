import PropTypes from "prop-types";
import { FaExclamationTriangle } from "react-icons/fa";
const Card = ({
  title,
  is_promotion,
  realtor_name,
  realtor_photo,
  photo_main,
  className = "",
}) => {
  // Render the component only if is_promotion is true
  if (!is_promotion) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-red-100 border border-red-300 rounded-lg shadow-md">
        <FaExclamationTriangle className="text-red-500 text-4xl mb-4" />
        <p className="text-lg font-semibold text-gray-700">
          Nothing to promote till now, No Ads available
        </p>
      </div>
    );
  }

  return (
    <div
      className={`shadow-[0px_14px_42px_rgba(8,_15,_52,_0.06)] transform transition-transform duration-300 hover:scale-105 rounded-xl bg-color-gray-10 flex flex-col items-start justify-center p-3 box-border relative gap-[10px] max-w-full text-left text-5xs text-color-gray-100 font-inter mq825:w-[calc(100%_-_40px)] ${className}`}
    >
      <img
        className="self-stretch h-[113px] relative rounded-xl max-w-full overflow-hidden shrink-0 object-cover"
        loading="lazy"
        alt=""
        src={photo_main}
      />
      <div className="rounded-lg bg-blueviolet flex flex-row items-center justify-center py-[2.5px] px-3 text-purple">
        <div className="relative uppercase inline-block min-w-[19px]">
          Promoted
        </div>
      </div>
      <h2 className="m-0 self-stretch relative text-sm capitalize font-medium font-inherit">
        <p className="m-0">{title}</p>
      </h2>
      <div className="w-56 h-1.5 relative hidden z-[3]">
        <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] hidden">
          <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-31xl bg-gainsboro" />
          <div className="absolute h-full w-[51.07%] top-[0%] right-[48.93%] bottom-[0%] left-[0%] rounded-31xl bg-purple" />
        </div>
      </div>
      <div className="self-stretch rounded-t-none rounded-b-xl flex flex-row items-center justify-start gap-[8px] max-w-full text-3xs mq450:flex-wrap">
        <img
          className="h-6 w-6 relative object-cover"
          alt=""
          src={realtor_photo}
        />
        <div className="flex-1 bg-color-gray-10 flex flex-col items-start justify-start gap-[4px] min-w-[268px] max-w-full">
          <div className="self-stretch relative capitalize font-medium">
            {realtor_name}
          </div>
          <div className="self-stretch relative text-5xs capitalize">
            Realtor
          </div>
        </div>
      </div>
      <div className="w-5 h-5 !m-[0] absolute top-[22px] right-[22px] rounded-31xl bg-lightgray hidden flex-row items-center justify-center p-1.5 box-border z-[5]">
        <img className="h-2 w-2 relative" alt="" src="/vuesaxlinearheart.svg" />
      </div>
    </div>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  is_promotion: PropTypes.bool.isRequired,
  realtor_name: PropTypes.string.isRequired,
  realtor_photo: PropTypes.string.isRequired,
  photo_main: PropTypes.string.isRequired,
};

export default Card;
