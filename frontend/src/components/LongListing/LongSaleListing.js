import ShopCards from "../../containers/PageListingComp/ShopCards";
import Help from "../../containers/PageListingComp/Help";
import Card from "../ExtraComp/Card";
import { ContextAPI } from "../../Context/ContextAPI";
import { useContext } from "react";

const LongSaleListing = () => {
  const {saleListings, currentPage, listingsPerPage, } = useContext(ContextAPI);

  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const listings = saleListings.slice(indexOfFirstListing, indexOfLastListing);

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
          The Most Sale Listing
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

export default LongSaleListing;
