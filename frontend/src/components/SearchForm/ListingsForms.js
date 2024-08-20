import React, { useState } from "react";
import axios from "axios";
import { Menu, Button, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";
import "./ListingsForm.css";

function ListingsForms({ setRentListings, setSaleListings }) {
  const [formData, setFormData] = useState({
    sale_type: "For Sale",
    price: "$0+",
    bedrooms: "0+",
    bathrooms: "0+",
    sqrft: "1000+",
    days: "1",
  });

  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const performSearch = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const url =
      formData.sale_type === "For Sale"
        ? `${process.env.REACT_APP_API_URL}api/listings/sale/search/`
        : `${process.env.REACT_APP_API_URL}api/listings/rent/search/`;

    try {
      const response = await axios.post(url, formData, config);
      return response.data;
    } catch (error) {
      console.error("Search request failed:", error);
      throw error;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const results = await performSearch(formData);

      if (formData.sale_type === "For Rent") {
        setRentListings(results.length > 0 ? results : []);
      } else {
        setSaleListings(results.length > 0 ? results : []);
      }
    } catch (error) {
      console.error("Failed to fetch listings:", error);
    } finally {
      setLoading(false);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div>
      <section className="self-stretch flex flex-col z-0 items-center justify-start py-[98px] px-[30px] bg-[url('/public/hero-section@3x.png')] bg-cover bg-no-repeat bg-[top] text-center text-33xl text-gray-white font-body-regular-400">
        <div className="self-stretch flex flex-col items-center justify-center gap-[62px] max-w-[95%]">
          <div className="self-stretch flex flex-col items-center justify-start gap-[24px] md:max-w-full">
            <div className="relative inline-block">
              <h1 className="m-0 mt-12 font-julius text-inherit text-white leading-[72px] font-semibold font-headfont">
                {"Home".split("").map((letter, index) => (
                  <span
                    key={index}
                    className="hover:animate-home playful-animation relative inline-block"
                  >
                    {letter}
                    <span className="inline-block w-2"> </span>
                  </span>
                ))}
              </h1>
            </div>
            <div className="self-stretch relative text-2xl font-julius leading-[28px] font-body-large-700 text-white group">
              <span className="relative inline-block">
                The house you looked at today and wanted to think about until
                tomorrow may be the same house someone looked at yesterday and
                will buy today.
                <span className="absolute left-0 rounded bottom-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-in-out"></span>
              </span>
            </div>
          </div>
          <form
            onSubmit={onSubmit}
            className="m-0 self-stretch flex flex-col items-center justify-start gap-[17px]"
          >
            <div className="flex flex-row sm:flex-col items-start justify-start gap-[10px]">
              <a href="#" className="button type--B">
                <div className="button__line"></div>
                <div className="button__line"></div>
                <span className="button__text">RENT</span>
                <div className="button__drow1"></div>
                <div className="button__drow2"></div>
              </a>
              <a href="#" className="button type--B">
                <div className="button__line"></div>
                <div className="button__line"></div>
                <span className="button__text">SALE</span>
                <div className="button__drow1"></div>
                <div className="button__drow2"></div>
              </a>
            </div>
            <div className="self-stretch mt-12 flex flex-row flex-wrap items-start justify-center">
              <nav className="m-0 w-[1400px] rounded-lg bg-gray-white flex flex-row items-center justify-between py-8 px-[70px] box-border max-w-[1400px] md:w-[300px] md:flex-col md:gap-[20px] md:items-start md:justify-start md:ml-[auto] md:mr-[auto]">
                <div className="w-[155px] flex flex-col items-start justify-start gap-[16px]">
                  <div className="relative w-[150px] text-base leading-[24px] capitalize font-semibold font-body-large-50 text-primary-700 text-center">
                    Sale Type
                  </div>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      colorScheme="teal"
                      className="text-base"
                      width="177px"
                      height="24px"
                    >
                      {formData.sale_type}
                    </MenuButton>
                    <MenuList zIndex="10">
                      <MenuItem
                        width="132px"
                        height="24px"
                        className="bg-gray-800 text-base hover:bg-slate-600"
                        onClick={() =>
                          setFormData({ ...formData, sale_type: "For Sale" })
                        }
                      >
                        For Sale
                      </MenuItem>
                      <MenuItem
                        width="132px"
                        height="24px"
                        className="bg-gray-800 text-base hover:bg-slate-600"
                        onClick={() =>
                          setFormData({ ...formData, sale_type: "For Rent" })
                        }
                      >
                        For Rent
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </div>
                <div className="w-[155px] flex flex-col items-start justify-start gap-[16px]">
                  <div className="relative w-[150px] text-base leading-[24px] capitalize font-semibold font-body-large-400 text-primary-700 text-center">
                    Area
                  </div>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      colorScheme="teal"
                      width="177px"
                      height="24px"
                      className="text-base"
                    >
                      {formData.sqrft}
                    </MenuButton>
                    <MenuList zIndex="10">
                      <MenuItem
                        width="132px"
                        height="24px"
                        className="bg-gray-800 text-base hover:bg-slate-600"
                        onClick={() =>
                          setFormData({ ...formData, sqrft: "1000+" })
                        }
                      >
                        1000+
                      </MenuItem>
                      <MenuItem
                        width="132px"
                        height="24px"
                        className="bg-gray-800 text-base hover:bg-slate-600"
                        onClick={() =>
                          setFormData({ ...formData, sqrft: "1200+" })
                        }
                      >
                        1200+
                      </MenuItem>
                      <MenuItem
                        width="132px"
                        height="24px"
                        className="bg-gray-800 text-base hover:bg-slate-600"
                        onClick={() =>
                          setFormData({ ...formData, sqrft: "1500+" })
                        }
                      >
                        1500+
                      </MenuItem>
                      <MenuItem
                        width="132px"
                        height="24px"
                        className="bg-gray-800 text-base hover:bg-slate-600"
                        onClick={() =>
                          setFormData({ ...formData, sqrft: "2000+" })
                        }
                      >
                        2000+
                      </MenuItem>
                      <MenuItem
                        width="132px"
                        height="24px"
                        className="bg-gray-800 text-base hover:bg-slate-600"
                        onClick={() =>
                          setFormData({ ...formData, sqrft: "Any" })
                        }
                      >
                        Any
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </div>
                <div className="w-[155px] flex flex-col items-start justify-start gap-[16px]">
                  <div className="relative w-[150px] text-base leading-[24px] capitalize font-semibold font-body-large-400 text-primary-700 text-center">
                    Days Listed
                  </div>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      colorScheme="teal"
                      width="177px"
                      height="24px"
                      className="text-base"
                    >
                      {formData.days}
                    </MenuButton>
                    <MenuList zIndex="10">
                      <MenuItem
                        width="132px"
                        height="24px"
                        className="bg-gray-800 text-base hover:bg-slate-600"
                        onClick={() => setFormData({ ...formData, days: "1" })}
                      >
                        1{" "}
                      </MenuItem>
                      <MenuItem
                        width="132px"
                        height="24px"
                        className="bg-gray-800 text-base hover:bg-slate-600"
                        onClick={() => setFormData({ ...formData, days: "3" })}
                      >
                        3
                      </MenuItem>
                      <MenuItem
                        width="132px"
                        height="24px"
                        className="bg-gray-800 text-base hover:bg-slate-600"
                        onClick={() => setFormData({ ...formData, days: "7" })}
                      >
                        7
                      </MenuItem>
                      <MenuItem
                        width="132px"
                        height="24px"
                        className="bg-gray-800 text-base hover:bg-slate-600"
                        onClick={() =>
                          setFormData({ ...formData, days: "12+" })
                        }
                      >
                        12+
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </div>
                <div className="w-[155px] flex flex-col items-start justify-start gap-[16px]">
                  <div className="relative w-[150px] text-base leading-[24px] capitalize font-semibold font-body-large-400 text-primary-700 text-center">
                    Bedrooms
                  </div>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      colorScheme="teal"
                      width="177px"
                      height="24px"
                      className="text-base"
                    >
                      {formData.bedrooms}
                    </MenuButton>
                    <MenuList zIndex="10">
                      <MenuItem
                        width="132px"
                        height="24px"
                        className="bg-gray-800 text-base hover:bg-slate-600"
                        onClick={() =>
                          setFormData({ ...formData, bedrooms: "1+" })
                        }
                      >
                        1+
                      </MenuItem>
                      <MenuItem
                        width="132px"
                        height="24px"
                        className="bg-gray-800 text-base hover:bg-slate-600"
                        onClick={() =>
                          setFormData({ ...formData, bedrooms: "2+" })
                        }
                      >
                        2+
                      </MenuItem>
                      <MenuItem
                        width="132px"
                        height="24px"
                        className="bg-gray-800 text-base hover:bg-slate-600"
                        onClick={() =>
                          setFormData({ ...formData, bedrooms: "3+" })
                        }
                      >
                        3+
                      </MenuItem>
                      <MenuItem
                        width="132px"
                        height="24px"
                        className="bg-gray-800 text-base hover:bg-slate-600"
                        onClick={() =>
                          setFormData({ ...formData, bedrooms: "4+" })
                        }
                      >
                        4+
                      </MenuItem>
                      <MenuItem
                        width="132px"
                        height="24px"
                        className="bg-gray-800 text-base hover:bg-slate-600"
                        onClick={() =>
                          setFormData({ ...formData, bedrooms: "5+" })
                        }
                      >
                        5+
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </div>
                <div className="w-[155px] flex flex-col items-start justify-start gap-[16px]">
                  <div className="relative w-[150px] text-base leading-[24px] capitalize font-semibold font-body-large-400 text-primary-700 text-center">
                    Price
                  </div>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      colorScheme="teal"
                      width="177px"
                      height="24px"
                      className="text-base"
                    >
                      {formData.price}
                    </MenuButton>
                    <MenuList zIndex="10">
                      <MenuItem
                        width="132px"
                        height="24px"
                        className="bg-gray-800 text-base hover:bg-slate-600"
                        onClick={() =>
                          setFormData({ ...formData, price: "$200,000+" })
                        }
                      >
                        $200,000+
                      </MenuItem>
                      <MenuItem
                        width="132px"
                        height="24px"
                        className="bg-gray-800 text-base hover:bg-slate-600"
                        onClick={() =>
                          setFormData({ ...formData, price: "$400,000+" })
                        }
                      >
                        $400,000+
                      </MenuItem>
                      <MenuItem
                        width="132px"
                        height="24px"
                        className="bg-gray-800 text-base hover:bg-slate-600"
                        onClick={() =>
                          setFormData({ ...formData, price: "$600,000+" })
                        }
                      >
                        $600,000+
                      </MenuItem>
                      <MenuItem
                        width="132px"
                        height="24px"
                        className="bg-gray-800 text-base hover:bg-slate-600"
                        onClick={() =>
                          setFormData({ ...formData, price: "$800,000+" })
                        }
                      >
                        $800,000+
                      </MenuItem>
                      <MenuItem
                        width="132px"
                        height="24px"
                        className="bg-gray-800 text-base hover:bg-slate-600"
                        onClick={() =>
                          setFormData({ ...formData, price: "$1,000,000+" })
                        }
                      >
                        $1,000,000+
                      </MenuItem>
                      <MenuItem
                        width="132px"
                        height="24px"
                        className="bg-gray-800 text-base hover:bg-slate-600"
                        onClick={() =>
                          setFormData({ ...formData, price: "$1,200,000+" })
                        }
                      >
                        $1,200,000+
                      </MenuItem>
                      <MenuItem
                        width="132px"
                        height="24px"
                        className="bg-gray-800 text-base hover:bg-slate-600"
                        onClick={() =>
                          setFormData({ ...formData, price: "$1,500,000+" })
                        }
                      >
                        $1,500,000+
                      </MenuItem>
                      <MenuItem
                        width="132px"
                        height="24px"
                        className="bg-gray-800 text-base hover:bg-slate-600"
                        onClick={() =>
                          setFormData({ ...formData, price: "Any" })
                        }
                      >
                        Any
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </div>
                <button
                  type="submit"
                  className={`mt-6 px-6 py-3 text-lg text-white bg-stone-500 rounded-md ${
                    loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-stone-600"
                  }`}
                  disabled={loading}
                >
                  {loading ? "Searching..." : "Search"}
                </button>
              </nav>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

ListingsForms.propTypes = {
  setListings: PropTypes.func.isRequired,
};

export default ListingsForms;
