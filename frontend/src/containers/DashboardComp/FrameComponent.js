import Card from "./Card.js";
import PropTypes from "prop-types";
import arrowRight from "../../assets/arrowRight.svg";
import arrowLeft from "../../assets/arrowLeft.svg";
import { FaExclamationTriangle } from "react-icons/fa";
import { useState,useRef } from "react";

const FrameComponent = ({ rentListings, saleListings }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);
  const renderCards = (chunk) => {
    return chunk.map((listing, index) => (
      <div key={`card-${index}`} className="col-span-1">
        <Card {...listing} />
      </div>
    ));
  };

  const listings = [...rentListings, ...saleListings];
  const firstRowListings = listings.slice(0, 4);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -containerRef.current.offsetWidth / 2,
        behavior: 'smooth',
      });
      setScrollPosition(scrollPosition - containerRef.current.offsetWidth / 2);
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: containerRef.current.offsetWidth / 2,
        behavior: 'smooth',
      });
      setScrollPosition(scrollPosition + containerRef.current.offsetWidth / 2);
    }
  };
  return (
    <section className="self-stretch flex flex-col items-center justify-start gap-[20px] max-w-full text-left text-base text-color-gray-100 font-inter">
      <div className="self-stretch flex flex-row items-center justify-between [row-gap:20px] max-w-full gap-[0px] mq1425:flex-wrap">
        <h1 className="m-0 text-indigo-400 w-[1380px] relative text-inherit capitalize font-medium font-inherit flex items-center max-w-full">
          Add Section
        </h1>
        <div className="flex flex-row items-center justify-end gap-[12px]">
          <div onClick={scrollLeft} className="h-6 w-6 sm:hidden md:hidden rounded-31xl box-border flex flex-row items-center justify-center py-1.5 px-[5px] border-[1px] border-solid border-color-gray-60">
            <img
              className="h-3 w-3 relative"
              loading="lazy"a
              alt=""
              src={arrowLeft}
            />
          </div>
          <div onClick={scrollRight} className="h-6 w-6 rounded-31xl sm:hidden md:hidden box-border flex flex-row items-center justify-center py-1.5 px-[5px] border-[1px] border-solid border-color-gray-60">
            <img
              className="h-3 w-3 relative"
              loading="lazy"
              alt=""
              src={arrowRight}
            />
          </div>
        </div>
      </div>
      <div ref={containerRef}  className="self-stretch grid flex-row items-center justify-center gap-[18px] max-w-full grid-cols-[repeat(3,_minmax(351px,_1fr))] text-5xs lg:justify-center lg:grid-cols-[repeat(2,_minmax(351px,_608px))] mq825:grid-cols-[minmax(351px,_1fr)]">
      {listings.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-6 bg-red-100 border border-red-300 rounded-lg shadow-md">
              <FaExclamationTriangle className="text-red-500 text-4xl mb-4" />
              <p className="text-lg font-semibold text-gray-700">
                  Nothing to promote till now, No Ads available
              </p>
            </div>
          ) : (
            renderCards(firstRowListings)
          )}
      </div>
    </section>
  );
};

FrameComponent.propTypes = {
  rentListings: PropTypes.arrayOf(PropTypes.shape({
    productImage: PropTypes.string,
    userImage: PropTypes.string,
  })),
  saleListings: PropTypes.arrayOf(PropTypes.shape({
    productImage: PropTypes.string,
    userImage: PropTypes.string,
  })),
};

FrameComponent.defaultProps = {
  rentListings: [],
  saleListings: [],
};

export default FrameComponent;
