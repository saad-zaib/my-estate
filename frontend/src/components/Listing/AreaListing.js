import React, { useContext } from 'react';
import { ContextAPI } from '../../Context/ContextAPI';
import LongAreaListing from '../LongListing/LongAreaListing';
import { useNavigate } from 'react-router-dom';
const AreaListing = () => {
  const { properties, setSelectedCity, selectedCity } = useContext(ContextAPI);
  const navigate = useNavigate()


  const handleCityClick = (city) => {
    setSelectedCity(city);
    navigate(`/area/${city}`)
    console.log("City selected:", city);
  };

 

  return (
    <div className="self-stretch flex-1 flex flex-col items-center justify-start py-[53px] px-[50px] gap-[45px] text-center text-21xl text-primary-800 font-body-large-400">
      <div className="self-stretch flex flex-col items-center justify-start py-0 px-[30px] gap-[24px] md:self-stretch md:w-auto">
        <h1 className="m-0 self-stretch relative text-inherit leading-[48px] font-semibold font-inherit">
          Properties by Area
        </h1>
        <div className="self-stretch relative text-xl leading-[28px] text-lightslategray">
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia curae; Proin sodales ultrices nulla blandit volutpat.
        </div>
      </div>
      <div className="self-stretch flex-1 flex flex-row flex-wrap items-start justify-center py-0 px-2.5 box-border max-w-[95%] text-left text-5xl text-gray-white">
        <div className="self-stretch w-[1300px] flex flex-col items-center justify-start gap-[24px] max-w-[1300px]">
          <div className="self-stretch flex flex-row items-start -lg justify-center gap-[26px] lg:flex-row md:flex-col">
            {properties.slice(0, 3).map((property, index) => (
              <a
                key={index}
                onClick={() => handleCityClick(property.name)}
                className="[text-decoration:none] hover:opacity-80 hover:rounded flex-1 rounded-lg h-[241px] flex flex-row items-start justify-start relative bg-cover bg-no-repeat bg-[top] text-[inherit] md:flex-[unset] md:self-stretch"
                style={{ backgroundImage: `url(${property.image})` }}
              >
                <div className="!m-[0] absolute top-[16px] left-[16px] flex flex-col items-start justify-start gap-[11px] z-[0]">
                  <h3 className="m-0 relative text-inherit leading-[32px] font-semibold font-inherit">
                    {property.name}
                  </h3>
                  <div className="relative text-base leading-[24px] text-center">
                    {property.listings} listings
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="self-stretch flex flex-row items-start justify-center gap-[24px] lg:flex-row md:flex-col">
            {properties.slice(3).map((property, index) => (
              <a
                key={index}
                onClick={() => handleCityClick(property.name)}
                className="[text-decoration:none] flex-1 hover:opacity-80 hover:rounded rounded-lg h-[241px] flex flex-row items-start justify-start relative bg-cover bg-no-repeat bg-[top] text-[inherit] md:flex-[unset] md:self-stretch"
                style={{ backgroundImage: `url(${property.image})` }}
              >
                <div className="!m-[0] absolute top-[16px] left-[16px] flex flex-col items-start justify-start gap-[11px] z-[0]">
                  <h3 className="m-0 relative text-inherit leading-[32px] font-semibold font-inherit">
                    {property.name}
                  </h3>
                  <div className="relative text-base leading-[24px] text-center">
                    {property.listings} listings
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaListing;
