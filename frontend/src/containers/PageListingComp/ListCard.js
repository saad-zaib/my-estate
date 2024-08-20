import rectangle from "../../assets/rectangle.png";
import RentORBuy from "./RentORBuy";
import ShopCards from "./ShopCards";
import Help from "./Help";
import Card from "../../components/ExtraComp/Card";
import { ContextAPI } from "../../Context/ContextAPI";
import { useContext } from "react";



const ListCard = () => {
  const {
    saleListings = [],  // Ensure default value is an empty array
    rentListings = [],  // Ensure default value is an empty array and fix the typo
    currentPage = 1,
    listingsPerPage = 10,
  } = useContext(ContextAPI);

  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const salelistings = saleListings.slice(indexOfFirstListing, indexOfLastListing);
  const rentlistings = rentListings.slice(indexOfFirstListing, indexOfLastListing);

  console.log("Sale Listings: ", salelistings);
  console.log("Rent Listings: ", rentlistings);

  const renderCards = (listings) => {
    return listings.map((listing, index) => (
      <div key={`card-${index}`} className="col-span-1">
        <Card {...listing} />
      </div>
    ));
  };

  const firstRowListings = saleListings.slice(0, 25);
  const secondRowListings = rentListings.slice(0, 25);

  return (
    <div className="w-full relative bg-gray-white flex flex-col items-center justify-start py-24 px-20 box-border gap-[96px] leading-[normal] tracking-[normal]">
      <RentORBuy />
      <section className="self-stretch flex flex-col items-start justify-start gap-[48px] text-left text-17xl  font-body-large-400">
        <div className="self-stretch text-black-default relative leading-[44px] font-medium">
          The Most Popular Listing
        </div>
        <div className="self-stretch flex flex-col flex-wrap items-center">
          <div className="self-stretch flex flex-row items-center flex-wrap justify-center mt-5 row-auto gap-9">
            {renderCards(firstRowListings)}
            {renderCards(secondRowListings)}
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

export default ListCard;