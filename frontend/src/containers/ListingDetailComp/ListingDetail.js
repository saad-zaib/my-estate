import React, { useEffect, useContext } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ContextAPI } from "../../Context/ContextAPI";
import { useGetLoggedUserQuery } from "../../services/userAuthApi";
import { getToken } from "../../services/LocalStorageService";

const ListingDetail = (props) => {
  const { slug } = useParams();
  const [access_token]=getToken()
  const { listing, realtor, price, fetchListingDetail, fetchRealtorData } =
    useContext(ContextAPI);
  const { data: loggedUser, isSuccess, isLoading, error } = useGetLoggedUserQuery(access_token);

  console.log("Lisitng: ",listing)
  console.log("Logged User:",loggedUser.id)

  useEffect(() => {
    if (slug) {
      fetchListingDetail(slug);
    }
  }, [slug]);

  useEffect(() => {
    if (listing.realtor) {
      fetchRealtorData(listing.realtor);
    }
  }, [listing.realtor]);

  const displayInteriorImages = () => {
    let images = [];

    images.push(
      <div key={1} className="row">
        <div className="col-1-of-3">
          {listing.photo_1 ? (
            <div className="listingdetail__display">
              <img
                className="listingdetail__display__image"
                src={listing.photo_1}
                alt=""
              />
            </div>
          ) : null}
        </div>
        <div className="col-1-of-3">
          {listing.photo_2 ? (
            <div className="listingdetail__display">
              <img
                className="listingdetail__display__image"
                src={listing.photo_2}
                alt=""
              />
            </div>
          ) : null}
        </div>
        <div className="col-1-of-3">
          {listing.photo_3 ? (
            <div className="listingdetail__display">
              <img
                className="listingdetail__display__image"
                src={listing.photo_3}
                alt=""
              />
            </div>
          ) : null}
        </div>
      </div>
    );
    return images;
  };

  return (
    <HelmetProvider>
      <div className="listingdetail">
        <Helmet>
          <title>
            Realest Estate - Listing |{" "}
            {listing.title ? listing.title : "Loading..."}
          </title>
          <meta name="description" content="Listing detail" />
        </Helmet>

        <div className="listingdetail__header">
          <h1 className="listingdetail__title">{listing.title}</h1>
          <p className="listingdetail__location">
            {listing.city}, {listing.state}, {listing.zipcode}
          </p>
        </div>
        <div className="row">
          <div className="listingdetail__breadcrumb">
            <Link className="listingdetail__breadcrumb__link" to="/">
              Home
            </Link>{" "}
            / {listing.title}
          </div>
        </div>
        <div className="row">
          <div className="col-3-of-4">
            <div className="listingdetail__display">
              <img
                className="listingdetail__display__image"
                src={listing.photo_main}
                alt=""
              />
            </div>
          </div>
          <div className="col-1-of-4">
            {realtor ? (
              <>
                <div className="listingdetail__display">
                  <img
                    className="listingdetail__display__image"
                    src={realtor.photo}
                    alt=""
                  />
                </div>
                <h3 className="listingdetail__realtor">{realtor.name}</h3>
                <p className="listingdetail__contact">{realtor.phone}</p>
                <p className="listingdetail__contact">{realtor.email}</p>
                <p className="listingdetail__about">{realtor.description}</p>
              </>
            ) : (
              <p>Loading realtor data...</p>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-1-of-2">
            <ul className="listingdetail__list">
              <li className="listingdetail__list__item">
                Home Type: {listing.home_type}
              </li>
              <li className="listingdetail__list__item">Price: ${price}</li>
              <li className="listingdetail__list__item">
                Bedrooms: {listing.bedrooms}
              </li>
              <li className="listingdetail__list__item">
                Bathrooms: {listing.bathrooms}
              </li>
              <li className="listingdetail__list__item">
                Square Feet: {listing.sqft}
              </li>
            </ul>
          </div>
          <div className="col-1-of-2">
            <ul className="listingdetail__list">
              <li className="listingdetail__list__item">
                Sale Type: {listing.sale_type}
              </li>
              <li className="listingdetail__list__item">
                Address: {listing.address}
              </li>
              <li className="listingdetail__list__item">
                City: {listing.city}
              </li>
              <li className="listingdetail__list__item">
                State: {listing.state}
              </li>
              <li className="listingdetail__list__item">
                Zipcode: {listing.zipcode}
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <p className="listingdetail__description">{listing.description}</p>
        </div>
        {displayInteriorImages()}
      </div>
    </HelmetProvider>
  );
};

export default ListingDetail;
