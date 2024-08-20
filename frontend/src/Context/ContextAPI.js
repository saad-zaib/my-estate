import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../services/LocalStorageService';
import img1 from "../assets/card-1@3x.png"
import img2 from "../assets/card-2@3x.png"
import img3 from "../assets/card-3@3x.png"
import img4 from "../assets/card-4@3x.png"
import img5 from "../assets/card-5@3x.png"


export const ContextAPI = createContext();

export const ContextProvider = ({ children }) => {
    const [rentListings, setRentListings] = useState([]);
    const [saleListings, setSaleListings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [listingsPerPage, setListingsPerPage] = useState(100);
    const [active, setActive] = useState(1);
    const [listing, setListing] = useState({});
    const [realtor, setRealtor] = useState({});
    const [price, setPrice] = useState(0);
    const [properties, setProperties] = useState([
        { name: "Islamabad", listings: 0, image: img1 },
        { name: "Lahore", listings: 0, image: img2 },
        { name: "Karachi", listings: 0, image: img3 },
        { name: "Peshawar", listings: 0, image: img4 },
        { name: "Kohat", listings: 0, image: img5 },
    ]);

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const [selectedCity, setSelectedCity] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [rentResponse, saleResponse] = await Promise.all([
                    axios.get("http://localhost:8000/api/listings/rent/"),
                    axios.get("http://localhost:8000/api/listings/sale/"),
                ]);

                if (rentResponse.data && rentResponse.data.results) {
                    setRentListings(rentResponse.data.results);
                }

                if (saleResponse.data && saleResponse.data.results) {
                    setSaleListings(saleResponse.data.results);
                }

                const combinedListings = [...rentResponse.data.results, ...saleResponse.data.results];
                const cityCounts = combinedListings.reduce((acc, listing) => {
                    const city = listing.city;
                    if (city) {
                        acc[city] = (acc[city] || 0) + 1;
                    }
                    return acc;
                }, {});

                setProperties(properties.map(property => ({
                    ...property,
                    listings: cityCounts[property.name] || 0,
                })));
                
            } catch (err) {
                console.error("An error occurred while fetching data:", err);
            }
        };
        fetchData();
    }, []);

    const filteredRentListings = selectedCity
        ? rentListings.filter(listing => listing.city === selectedCity)
        : rentListings;

    const filteredSaleListings = selectedCity
        ? saleListings.filter(listing => listing.city === selectedCity)
        : saleListings;

    const fetchListingDetail = async (slug) => {
        const { access_token } = getToken();
        const config = {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}api/listings/${slug}`, config);
            setListing(res.data);
            setPrice(numberWithCommas(res.data.price));
        } catch (err) {
            console.error("Error fetching listing:", err);
        }
    };

    const fetchRealtorData = async (realtorId) => {
        const { access_token } = getToken();
        const config = {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        };
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}api/realtors/${realtorId}`, config);
            if (response.data) {
                setRealtor(response.data); // Directly setting the realtor data
                console.log(response.data); // Check the console for the correct data
            }
        } catch (error) {
            console.error("Error fetching realtor:", error);
        }
    };
    

    const visitPage = (page) => {
        setCurrentPage(page);
        setActive(page);
    };

    const previous_number = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
            setActive(currentPage - 1);
        }
    };

    const next_number = () => {
        if (currentPage !== Math.ceil(rentListings.length / listingsPerPage)) {
            setCurrentPage(currentPage + 1);
            setActive(currentPage + 1);
        }
    };

    return (
        <ContextAPI.Provider
            value={{
                rentListings: filteredRentListings,
                properties,
                saleListings: filteredSaleListings,
                setSelectedCity,
                currentPage,
                listingsPerPage,
                active,
                visitPage,
                previous_number,
                next_number,
                listing,
                setListing,
                realtor,
                setRealtor,
                price,
                fetchListingDetail,
                setActive,
                fetchRealtorData,
                setRentListings,
                setSaleListings
            }}
        >
            {children}
        </ContextAPI.Provider>
    );
};