import { getToken } from "../../services/LocalStorageService";
import Logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isSlowmoActive, setIsSlowmoActive] = useState(false);
  const navigate = useNavigate()

  const toggleBurger = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  const toggleSlowmo = () => {
    setIsSlowmoActive(!isSlowmoActive);
  };

  const closeBurger = () => {
    setIsBurgerOpen(false);
  };

  useEffect(() => {
    setIsBurgerOpen(false);
  }, [0]);

  const { access_token } = getToken();

  const handleHome = () => {
    navigate("/")
  }

  return (
    <header
      className={`self-stretch h-[98px]  flex flex-row items-center justify-center  px-20 box-border sticky w-full top-[0] [background:white] z-[2] text-center text-5xl  font-body-large-400 lg:pl-10 lg:pr-10 lg:box-border md:pl-6 md:pr-6 md:box-border`} style={{backgroundColor:"#fff"}}
      id="header"
    >
      <div className="flex-1 flex flex-row items-center justify-between">
        <div
          className="flex flex-row items-center justify-center gap-[8px]"
          onClick={handleHome}
        >
          <img className="w-full relative h-11" alt="Logo" src={Logo} />
        </div>
        <div className="flex flex-row items-center justify-end gap-[36px] text-sm text-primary-900 sm:flex">
          <div className="flex flex-row items-start justify-start gap-[30px] sm:hidden">
            <Link to="/">
            <button className="w-32  tracking-wide text-gray-800 font-bold font-julius rounded border-b-2 border-stone-500 hover:border-stone-600 hover:bg-stone-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center transition-all duration-700 ease-in-out">
              <span className="mx-auto">HOME</span>
            </button>
            </Link>
            <Link to="/collection">
              <button className="w-32 tracking-wide text-gray-800 font-bold font-julius rounded border-b-2
               border-stone-500 hover:border-stone-600 hover:bg-stone-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center transition-all duration-700 ease-in-out"
               >
                <span className="mx-auto">COLLECTION</span>
              </button>
            </Link>
            <Link to="/chat">
              <button className="w-32 e tracking-wide text-gray-800 font-bold font-julius rounded border-b-2 border-stone-500 hover:border-stone-600 hover:bg-stone-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center transition-all duration-700 ease-in-out">
                <span className="mx-auto">CHAT</span>
              </button>
            </Link>
            <Link to="/realtor">
              <button className="w-32  tracking-wide text-gray-800 font-bold font-julius rounded border-b-2 border-stone-500 hover:border-stone-600 hover:bg-stone-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center transition-all duration-700 ease-in-out">
                <span className="mx-auto">REALTORS</span>
              </button>
            </Link>

            <Link to="/listings">
              <button className="w-32  tracking-wide text-gray-800 font-bold font-julius rounded border-b-2 border-stone-500 hover:border-stone-600 hover:bg-stone-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center transition-all duration-700 ease-in-out">
                <span className="mx-auto">LISTINGS</span>
              </button>
            </Link>
            
            <Link to="/about">
              <button className="w-32  tracking-wide text-gray-800 font-bold font-julius rounded border-b-2 border-stone-500 hover:border-stone-600 hover:bg-stone-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center transition-all duration-700 ease-in-out">
                <span className="mx-auto">ABOUT US</span>
              </button>
            </Link>

            {access_token ? (
              <Link to="/dashboard">
                <button className="w-32  tracking-wide text-gray-800 font-bold font-julius rounded border-b-2 border-stone-500 hover:border-stone-600 hover:bg-stone-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center transition-all duration-700 ease-in-out">
                  <span className="mx-auto">DASHBOARD</span>
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="w-32  tracking-wide text-gray-800 font-bold font-julius rounded border-b-2 border-stone-500 hover:border-stone-600 hover:bg-stone-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center transition-all duration-700 ease-in-out">
                  <span className="mx-auto">REGISTER</span>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={toggleBurger}
        className="cursor-pointer border-none p-0 bg-transparent text-white hidden lg:hidden mx-auto sm:flex"
      >
        <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M3 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1H3.5a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1H3.5a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1H3.5a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </button>

      {/* Mobile Navigation menu */}
      <nav
        className={`fixed inset-0 mx-auto w-full bg-gray-100 items-center justify-center transform transition-transform ${
          isBurgerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={closeBurger}
            className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M14.293 5.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414L10 8.586l4.293-4.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center space-y-8 mt-32">
          <Link to="/">
            <button className="w-32 bg-white tracking-wide text-gray-800 font-bold font-julius rounded border-b-2 border-stone-500 hover:border-stone-600 hover:bg-stone-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center transition-all duration-700 ease-in-out">
              HOME
            </button>
          </Link>
          <Link to="/services">
            <button className="w-32 bg-white tracking-wide text-gray-800 font-bold font-julius rounded border-b-2 border-stone-500 hover:border-stone-600 hover:bg-stone-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center transition-all duration-700 ease-in-out">
              GALLERY
            </button>
          </Link>
          <Link to="/listings">
            <button className="w-32 bg-white tracking-wide text-gray-800 font-bold font-julius rounded border-b-2 border-stone-500 hover:border-stone-600 hover:bg-stone-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center transition-all duration-700 ease-in-out">
              LISTINGS
            </button>
          </Link>
          <Link to="/realtors">
            <button className="w-32 bg-white tracking-wide text-gray-800 font-bold font-julius rounded border-b-2 border-stone-500 hover:border-stone-600 hover:bg-stone-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center transition-all duration-700 ease-in-out">
              REALTORS
            </button>
          </Link>
          <Link to="/about-us">
            <button className="w-32 bg-white tracking-wide text-gray-800 font-bold font-julius rounded border-b-2 border-stone-500 hover:border-stone-600 hover:bg-stone-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center transition-all duration-700 ease-in-out">
              ABOUT US
            </button>
          </Link>

          {access_token ? (
            <Link to="/dashboard">
            <button
              className="w-32 bg-white tracking-wide text-gray-800 font-bold font-julius rounded border-b-2 border-stone-500 hover:border-stone-600 hover:bg-stone-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center transition-all duration-700 ease-in-out"
            >
              DASHBOARD
            </button>
            </Link>
          ) : (
           <Link to="/login">
            <button
              className="w-32 bg-white tracking-wide text-gray-800 font-bold font-julius rounded border-b-2 border-stone-500 hover:border-stone-600 hover:bg-stone-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center transition-all duration-700 ease-in-out"
            >
              REGISTER
            </button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
