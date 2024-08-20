import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const Help = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch rounded-lg overflow-hidden flex flex-col items-start justify-between py-20 pr-5 pl-20 box-border bg-[url('/public/helpImage.png')] bg-cover bg-no-repeat bg-[top] min-h-[640px] max-w-full text-left text-77xl text-color-gray-10 font-body-large-400 mq750:pl-10 mq750:pt-[52px] mq750:pb-[52px] mq750:box-border ${className}`}
    >
      <h1 className="m-0 relative text-inherit leading-[96px] font-medium font-inherit inline-block max-w-full mq450:text-10xl mq450:leading-[38px] mq1050:text-29xl mq1050:leading-[58px]">
        <p className="m-0">Questions</p>
        <p className="m-0">about</p>
        <p className="m-0">houses?</p>
      </h1>
      <div className="flex flex-row items-start justify-start text-base text-gray-7001">
        <div className="shadow-[0px_1px_2px_rgba(31,_41,_55,_0.08)] rounded-lg bg-color-gray-10 flex flex-row items-center justify-center py-4 px-6 gap-[8px]">
          <img
            className="h-5 w-5 relative overflow-hidden shrink-0 hidden"
            alt=""
            src="/icon.svg"
          />
          <Link to="/contact">
          <div className="relative leading-[150%] text-color-gray-100 font-medium whitespace-pre-wrap inline-block min-w-[101px]">
            Ask For Help
          </div>
          </Link>
          <img
            className="h-5 w-5 relative overflow-hidden shrink-0 hidden"
            alt=""
            src="/icon4.svg"
          />
        </div>
      </div>
    </section>
  );
};

Help.propTypes = {
  className: PropTypes.string,
};

export default Help;
