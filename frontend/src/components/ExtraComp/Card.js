import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import car1 from "../../assets/car@2x.png";
import bathtub from "../../assets/bathtub@2x.png";
import arrowsOut from "../../assets/arrowsout@2x.png";
import Bed from "../../assets/bed.png";
import { FaPhone } from "react-icons/fa";
function Card({
  title,
  garage,
  price,
  bedrooms,
  bathrooms,
  realtor_name,
  realtor_photo,
  sqrft,
  photo_main,
  slug,
  phone,
  className = "",
}) {
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  console.log("Realtor Name: ", realtor_name);
  return (
    <Link className="no-underline" to={`/listings/${slug}`}>
      <div
        className={`h-[467px] flex-1 rounded-3xs bg-gray-white box-border flex flex-col items-start justify-start px-[13px] gap-[23px] min-w-[355px] max-w-[400px] text-left text-mini-5 text-gray-700 font-body-large-400 border-[1px] border-solid border-whitesmoke hover:bg-gainsboro hover:cursor-pointer sm:w-[100%!important] sm:mb-5 ${className}`}
      >
        <img
          className="self-stretch relative rounded-3xs max-w-full overflow-hidden h-[200px] shrink-0 object-cover"
          alt=""
          src={photo_main}
        />
        <div className="self-stretch flex flex-row items-start justify-start p-2.5">
          <div className="flex-1 relative leading-[20.32px] font-medium">
            {title}
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start p-2.5 text-sm-6 text-primary-500">
          <div className="relative leading-[18.98px] font-semibold">
            ${numberWithCommas(price)}
          </div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start py-0 px-2.5 gap-[17px] text-2xs-8 text-gray-500">
          <div className="flex flex-row items-center justify-start gap-[4.4px]">
            <img
              className="w-[17.4px] relative h-[17.4px] object-cover"
              alt=""
              src={car1}
            />
            <div className="relative leading-[16.27px] font-medium">
              {garage}
            </div>
          </div>
          <div className="flex flex-row items-center justify-start gap-[4.4px]">
            <img
              className="w-[17.4px] relative h-[17.4px] object-cover"
              alt=""
              src={bathtub}
            />
            <div className="relative leading-[16.27px] font-medium">
              {bathrooms}
            </div>
          </div>
          <div className="flex flex-row items-center justify-start gap-[4.4px]">
            <img
              className="w-[17.4px] relative h-[17.4px] object-cover"
              alt=""
              src={Bed}
            />
            <div className="relative leading-[16.27px] font-medium">
              {bedrooms}
            </div>
          </div>
          <div className="flex flex-row items-center justify-start gap-[4.4px]">
            <img
              className="w-[17.4px] relative h-[17.4px] object-cover"
              alt=""
              src={arrowsOut}
            />
            <div className="relative leading-[16.27px] font-medium">
              {sqrft}
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-center justify-between text-center text-xs-6">
          <div className="flex flex-row mt-4 items-center justify-start gap-[5.8px]">
            <img
              className="w-[35.6px] relative rounded-[50%] h-[35.6px] object-cover"
              alt=""
              src={realtor_photo}
            />
            <div className="relative leading-[17.42px] text-base font-medium">
              {realtor_name}
            </div>
          </div>
          <div className="relative right-0 mt-4 mr-4">
            <button className="inline-flex items-center text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-full text-center px-3 py-2 shadow-lg focus:outline-none focus-visible:ring-2">
              <svg
                class="w-3 h-3 fill-current text-indigo-300 flex-shrink-0 mr-2"
                viewBox="0 0 12 12"
              >
                <path d="M11.866.146a.5.5 0 0 0-.437-.139c-.26.044-6.393 1.1-8.2 2.913a4.145 4.145 0 0 0-.617 5.062L.305 10.293a1 1 0 1 0 1.414 1.414L7.426 6l-2 3.923c.242.048.487.074.733.077a4.122 4.122 0 0 0 2.933-1.215c1.81-1.809 2.87-7.94 2.913-8.2a.5.5 0 0 0-.139-.439Z" />
              </svg>
              <span>Open</span>
            </button>
          </div>
          <div className="hidden sm:flex flex-row items-start justify-start gap-[8.7px]">
            <a
              href={`tel:${phone}`}
              className="rounded-[1.45px] flex flex-row items-start justify-start p-[2.9px]"
            >
              <FaPhone className="w-[25px] mt-3 relative h-[29px] text-indigo-500" />
            </a>
          </div>
        </div>
      </div>
    </Link>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  garage: PropTypes.number.isRequired,
  bedrooms: PropTypes.number.isRequired,
  bathrooms: PropTypes.number.isRequired,
  sqrft: PropTypes.number.isRequired,
  photo_main: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Card;
