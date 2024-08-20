import React, { useContext } from 'react';
import { ContextAPI } from '../../Context/ContextAPI';
import { useParams } from 'react-router-dom';
import ShopCards from "../../containers/PageListingComp/ShopCards";
import Help from "../../containers/PageListingComp/Help";
import Card from "../ExtraComp/Card";
import { useEffect } from 'react';


const LongAreaListing = () => {
  const { cityName } = useParams();
  const { rentListings, saleListings, currentPage, listingsPerPage } = useContext(ContextAPI);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter listings based on the cityName from the route
  const filteredRentListings = rentListings.filter(listing => listing.city === cityName);
  const filteredSaleListings = saleListings.filter(listing => listing.city === cityName);

  // Combine both rent and sale listings
  const combinedListings = [...filteredRentListings, ...filteredSaleListings];

  // Pagination logic
  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const listings = combinedListings.slice(indexOfFirstListing, indexOfLastListing);

  const renderCards = (chunk) => {
    return chunk.map((listing, index) => (
      <div key={`card-${index}`} className="col-span-1">
        <Card {...listing} />
      </div>
    ));
  };

  const firstRowListings = listings.slice(0, 100);

  return (
    <div className="w-full relative bg-gray-white flex flex-col items-center justify-start py-24 px-20 box-border gap-[96px] leading-[normal] tracking-[normal]">
      <section className="self-stretch flex flex-col items-start justify-start gap-[48px] text-left text-17xl text-black font-body-large-400">
        <div className="self-stretch relative leading-[44px] font-medium">
          Listings in {cityName}
        </div>
        <div className="self-stretch flex flex-col flex-wrap items-center">
          <div className="self-stretch flex flex-row items-center flex-wrap justify-center mt-5 row-auto gap-9">
            {renderCards(firstRowListings)}
          </div>
          <button className="cursor-pointer [border:none] mt-9 py-3 px-6 bg-my-color hover:bg-primary-800 rounded flex flex-row items-start justify-start">
            <div className="relative text-base leading-[24px] font-medium font-body-large-400 text-gray-white text-center">
              Load more listings
            </div>
          </button>
        </div>
      </section>
      <ShopCards />
      <Help />
    </div>
  );
};

export default LongAreaListing;
