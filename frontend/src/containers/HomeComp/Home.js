import React from "react";
import { HelmetProvider } from "react-helmet-async";
import ListingsForms from "../../components/SearchForm/ListingsForms";
import RentListings from "../../components/Listing/RentListingShort";
import SaleListings from "../../components/Listing/SaleListingsShort";
import AreaListing from "../../components/Listing/AreaListing";
import Questions from "../Questions";
import Footer from "../Footer";
import { ContextAPI } from "../../Context/ContextAPI";
import { useContext } from "react";

const Home = () => {
  const {
    rentListings,
    saleListings,
    currentPage,
    listingsPerPage,
    active,
    visitPage,
    previous_number,
    next_number,
    setRentListings,
    setSaleListings,
    setActive,
  } = useContext(ContextAPI);

  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const rentCurrentListings = rentListings.slice(
    indexOfFirstListing,
    indexOfLastListing
  );
  const saleCurrentListings = saleListings.slice(
    indexOfFirstListing,
    indexOfLastListing
  );
  const areaCurrentListings = rentListings.slice(indexOfFirstListing, indexOfLastListing);

  return (
    <HelmetProvider>
      <main className="home">
        <section>
          <ListingsForms
            setRentListings={setRentListings}
            setSaleListings={setSaleListings}
          />
        </section>
        <section>
          <RentListings listings={rentCurrentListings} />
        </section>
        <section>
          <SaleListings listings={saleCurrentListings} />
        </section>
        <section>
          <AreaListing listings={areaCurrentListings} />
        </section>
        <section>
          <Questions />
        </section>
        <section>
          <Footer />
        </section>
        
      </main>
    </HelmetProvider>
  );
};

export default Home;
