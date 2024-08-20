import PropTypes from "prop-types";
import sergio from "../../assets/sergio.png";

const MentorList = ({ className = "" }) => {
  return (
    <div
      className={`self-stretch shadow-[0px_14px_42px_rgba(8,_15,_52,_0.06)] rounded-t-xl rounded-b-none bg-color-gray-10 flex flex-col items-center justify-start pt-5 px-6 pb-[119.5px] box-border gap-[24px] max-w-full text-left text-3xs text-color-gray-100 font-inter ${className}`}
    >
      <div className="self-stretch sm:hidden md:hidden flex flex-row flex-wrap items-center justify-start gap-[56px] max-w-full text-center text-5xs text-color-gray-90 mq825:gap-[28px] sm:flex-col sm:gap-[16px]">
        <div className="flex-1 relative uppercase font-semibold text-left inline-block min-w-[365px] max-w-full mq450:min-w-full sm:text-center sm:min-w-0">
          {`house rented & bought`}
        </div>
        <div className="relative uppercase font-semibold inline-block min-w-[20px] sm:text-center">
          City
        </div>
        <div className="flex-1 relative uppercase font-semibold inline-block min-w-[365px] max-w-full mq450:min-w-full sm:text-center sm:min-w-0">
          Bio TITLE
        </div>
      </div>
      <div className=" mt-4 transform transition-transform hover:scale-105 duration-300 hover:shadow-[0px_20px_50px_rgba(8,_15,_52,_0.1)] shadow-[0px_20px_50px_rgba(8,_15,_52,_0.1)] self-stretch flex flex-row items-center justify-start gap-[56px] max-w-full lg:flex-wrap mq825:gap-[28px] sm:flex-col sm:gap-[16px]">
        <div className="flex-1 flex flex-row items-center justify-center gap-[8px] min-w-[340px] max-w-full text-sm lg:flex-1 mq450:min-w-full mq825:flex-wrap sm:flex-col sm:min-w-0">
          <svg className="h-4 w-4 relative object-cover" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M240.1 4.2c9.8-5.6 21.9-5.6 31.8 0l171.8 98.1L448 104l0 .9 47.9 27.4c12.6 7.2 18.8 22 15.1 36s-16.4 23.8-30.9 23.8H32c-14.5 0-27.2-9.8-30.9-23.8s2.5-28.8 15.1-36L64 104.9V104l4.4-1.6L240.1 4.2zM64 224h64V416h40V224h64V416h48V224h64V416h40V224h64V420.3c.6 .3 1.2 .7 1.8 1.1l48 32c11.7 7.8 17 22.4 12.9 35.9S494.1 512 480 512H32c-14.1 0-26.5-9.2-30.6-22.7s1.1-28.1 12.9-35.9l48-32c.6-.4 1.2-.7 1.8-1.1V224z" />
          </svg>
          <div className="flex-1 flex flex-col items-start justify-start gap-[4px] min-w-[319px] max-w-full sm:min-w-0">
            <h2 className="m-0 self-stretch relative text-inherit capitalize font-medium font-inherit">
              Classic Victorian
            </h2>
            <div className="w-[195.5px] relative text-2xs capitalize text-color-gray-80 hidden" />
          </div>
        </div>
        <div className="rounded-lg bg-blueviolet flex flex-row items-center justify-center py-[1.5px] px-3 text-purple sm:w-1/2">
          <div className="relative uppercase inline-block min-w-[55px] sm:min-w-0 sm:text-center">
            Islamabad
          </div>
        </div>
        <h3 className="m-0 flex-1 relative text-xs capitalize font-normal font-inherit text-center inline-block min-w-[340px] max-w-full lg:flex-1 mq450:min-w-full sm:min-w-0">
          Fall in love with this classic Victorian home
        </h3>
        
      </div>
      <div className="transform transition-transform hover:scale-105 duration-300 hover:shadow-[0px_20px_50px_rgba(8,_15,_52,_0.1)] shadow-[0px_20px_50px_rgba(8,_15,_52,_0.1)] self-stretch flex flex-row items-center justify-start gap-[56px] max-w-full lg:flex-wrap mq825:gap-[28px] sm:flex-col sm:gap-[16px]">
        <div className="mt-4 flex-1 flex flex-row items-center justify-center gap-[8px] min-w-[340px] max-w-full text-sm lg:flex-1 mq450:min-w-full mq825:flex-wrap sm:flex-col sm:min-w-0">
          <svg className="h-4 w-4 relative object-cover" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M240.1 4.2c9.8-5.6 21.9-5.6 31.8 0l171.8 98.1L448 104l0 .9 47.9 27.4c12.6 7.2 18.8 22 15.1 36s-16.4 23.8-30.9 23.8H32c-14.5 0-27.2-9.8-30.9-23.8s2.5-28.8 15.1-36L64 104.9V104l4.4-1.6L240.1 4.2zM64 224h64V416h40V224h64V416h48V224h64V416h40V224h64V420.3c.6 .3 1.2 .7 1.8 1.1l48 32c11.7 7.8 17 22.4 12.9 35.9S494.1 512 480 512H32c-14.1 0-26.5-9.2-30.6-22.7s1.1-28.1 12.9-35.9l48-32c.6-.4 1.2-.7 1.8-1.1V224z" />
          </svg>
          <div className="flex-1 flex flex-col items-start justify-start gap-[4px] min-w-[319px] max-w-full sm:min-w-0">
            <h2 className="m-0 self-stretch relative text-inherit capitalize font-medium font-inherit">
              Waterfront villa
            </h2>
            <div className="w-[195.5px] relative text-2xs capitalize text-color-gray-80 hidden" />
          </div>
        </div>
        <div className="rounded-lg bg-blueviolet flex flex-row items-center justify-center py-[1.5px] px-3 text-purple sm:w-1/2">
          <div className="relative uppercase inline-block min-w-[55px] sm:min-w-0 sm:text-center">
            Islamabad
          </div>
        </div>
        <h3 className="m-0 flex-1 relative text-xs capitalize font-normal font-inherit text-center inline-block min-w-[340px] max-w-full lg:flex-1 mq450:min-w-full sm:min-w-0">
          Indulge in luxury with this waterfront villa
        </h3>
       
      </div>
    </div>
  );
};

MentorList.propTypes = {
  className: PropTypes.string,
};

export default MentorList;
