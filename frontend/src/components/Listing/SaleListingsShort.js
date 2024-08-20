import React from "react";
import PropTypes from "prop-types";
import Card from "../ExtraComp/Card";
import { FaExclamationTriangle } from "react-icons/fa"; // Importing an icon

const SaleListings = ({ listings }) => {
  const renderCards = (chunk) => {
    return chunk.map((listing, index) => (
      <div key={`card-${index}`} className="col-span-1">
        <Card {...listing} />
      </div>
    ));
  };

  const firstRowListings = listings.slice(0, 4);

  return (
    <form className="m-0 self-stretch flex flex-col items-center justify-start py-[86px] px-0 gap-[39px]">
      <div className="self-stretch flex flex-col items-center justify-start gap-[40px] max-w-[95%] md:pl-[60px] md:pr-[60px] md:box-border">
        <div className="w-[688px] flex flex-col items-center justify-start gap-[24px] max-w-[95%] lg:max-w-[95%] md:self-stretch md:w-auto">
          <h1 className="m-0 self-stretch relative text-21xl leading-[48px] font-semibold font-body-large-400 text-primary-800 text-center">
            Latest Properties for Sale
          </h1>
          <div className="self-stretch relative text-xl leading-[28px] font-body-large-400 text-lightslategray text-center">
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin sodales ultrices nulla blandit volutpat.
          </div>
        </div>
        <div className="self-stretch flex flex-row flex-wrap items-center justify-center py-0 px-2.5 gap-9">
          {listings.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-6 bg-red-100 border border-red-300 rounded-lg shadow-md">
              <FaExclamationTriangle className="text-red-500 text-4xl mb-4" />
              <p className="text-lg font-semibold text-gray-700">
                No sale listings available based on your search criteria.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Please try adjusting your search or check back later.
              </p>
            </div>
          ) : (
            renderCards(firstRowListings)
          )}
        </div>
      </div>
    </form>
  );
};

SaleListings.propTypes = {
  listings: PropTypes.array.isRequired,
};

export default SaleListings;
