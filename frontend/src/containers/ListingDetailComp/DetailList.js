import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import BoxComponent from "./BoxComponent";
import { useSwipeable } from "react-swipeable";
import {
  faStairs,
  faBed,
  faBath,
  faPlantWilt,
  faCar,
  faKitchenSet,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { ContextAPI } from "../../Context/ContextAPI";
import { useContext } from "react";
import { useGetLoggedUserQuery } from "../../services/userAuthApi";
import { getToken } from "../../services/LocalStorageService";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const DetailList = ({ className = "" }) => {
  const { access_token } = getToken();
  const {
    data: loggedUser,
    isSuccess,
    isLoading,
    error,
  } = useGetLoggedUserQuery(access_token);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentMedia, setCurrentMedia] = useState("");
  const [underlineWidth, setUnderlineWidth] = useState(0);
  const [activeSection, setActiveSection] = useState("description");
  const [isClicked, setIsClicked] = useState(false);
  const [data, setData] = useState({
    images: [],
    product: {},
  });
  const descriptionRef = useRef(null);
  const detailsRef = useRef(null);
  const deliveryRef = useRef(null);
  const { slug } = useParams();
  const { listing, realtor, price, fetchListingDetail, fetchRealtorData } =
    useContext(ContextAPI);
  const navigate = useNavigate(); // Add useNavigate hook


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

  useEffect(() => {
    const updatedData = {
      images: [
        { id: 1, src: listing.photo_1 },
        { id: 2, src: listing.photo_2 },
        { id: 3, src: listing.photo_3 },
        { id: 4, src: listing.photo_4 },
        { id: 5, src: listing.photo_5 },
        { id: 6, src: listing.photo_6 },
        { id: 7, src: listing.photo_7 },
      ],
      product: {
        realtor: listing.realtor,
        title: listing.title,
        price: listing.price,
        originalPrice: listing.originalPrice,
        color: listing.color,
      },
    };
    setData(updatedData);
    setCurrentMedia(updatedData.images[0]?.src);
  }, [listing]);

  useEffect(() => {
    let ref;
    switch (activeSection) {
      case "description":
        ref = descriptionRef;
        break;
      case "details":
        ref = detailsRef;
        break;
      case "delivery":
        ref = deliveryRef;
        break;
      default:
        break;
    }

    if (ref?.current) {
      setUnderlineWidth(ref.current.getBoundingClientRect().width);
    }
  }, [activeSection]);

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => {
      const newIndex = prevIndex > 0 ? prevIndex - 1 : data.images.length - 1;
      setCurrentMedia(data.images[newIndex]?.src);
      return newIndex;
    });
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => {
      const newIndex = prevIndex < data.images.length - 1 ? prevIndex + 1 : 0;
      setCurrentMedia(data.images[newIndex]?.src);
      return newIndex;
    });
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleMediaClick = (index) => {
    setCurrentImageIndex(index);
    const media = data.images[index];
    setCurrentMedia(media.src);
    if (media.type === "video") {
      // Ensure video element is focused to trigger playback
      setTimeout(() => {
        const videoElement = document.querySelector("video");
        if (videoElement) {
          videoElement.play();
        }
      }, 100);
    }
  };

  const handleChatClick = () => {
    // Navigate to ChatPage with senderId and receiverId
    navigate(`/chat/${loggedUser.id}_${listing.realtor}`);
  };

  const handleHeartClick = () => {
    setIsClicked(true);
  };

  console.log()
  return (
    <section
      className={`self-stretch flex flex-row items-start sm:justify-center py-0 pr-3.5 pl-0 box-border max-w-full text-left text-xs text-black font-montserrat ${className}`}
    >
      <div className="w-[1102px] flex flex-row items-start justify-start gap-[138px] max-w-full mq750:gap-[34px] mq450:gap-[17px] mq1100:flex-wrap mq1100:gap-[69px]">
        <div
          {...swipeHandlers}
          className="flex flex-row items-start justify-start max-w-full mq750:gap-[34px] mq450:gap-[17px] mq1100:flex-wrap mq1100:gap-[69px]"
        >
          <div className="flex flex-wrap sm:flex-row items-start gap-[16.1px] sm:hidden min-w-[355px] max-w-full max-h-[610px] mr-[20px] overflow-auto whitespace-nowrap scrollbar scrollbar-thin scrollbar-thumb scrollbar-track">
            {data.images
              .filter((media) => media.type !== "video")
              .map((media, index) => (
                <div
                  key={media.id}
                  className="relative w-[140.8px] h-[140px] cursor-pointer"
                  onClick={() => handleMediaClick(index)}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={media.src}
                    alt={`Image ${media.id}`}
                    loading="lazy"
                  />
                </div>
              ))}
          </div>

          {/* Big image or video */}
          <div className="relative flex-1">
            <img
              className="w-full max-w-[253px] min-w-[700px] sm:min-w-[300px] rounded-md min-h-[608px] object-cover"
              src={currentMedia}
              alt=""
              loading="lazy"
            />

            {/* Navigation buttons */}
            <button
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-my-color text-white p-2 rounded-r-lg"
              onClick={handlePrev}
            >
              &lt;
            </button>
            <button
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-my-color text-white p-2 rounded-l-lg"
              onClick={handleNext}
            >
              &gt;
            </button>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start gap-[56px] min-w-[418px] max-w-full mq750:min-w-full mq450:gap-[28px] mq1100:flex-1">
          <div className="flex flex-col items-start justify-start gap-[22px] mq450:gap-[16px]">
            <div className="flex flex-col items-start justify-start gap-[2px] text-darkslategray-200">
              <div className="relative text-lg border border-b-2 border-gray-800 mt-2 tracking-[0.02em] font-vidaloka text-black z-[1] mq450:text-lgi">
                {realtor.user_name}
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-[2px] text-darkslategray-200">
              <div className="relative text-7xl border border-b-2 border-gray-800 mt-2 tracking-[0.02em] font-vidaloka text-black z-[1] mq450:text-lgi">
                {data.product.title}
              </div>
            </div>
            <div className="flex flex-row items-start justify-start gap-[15px] text-center text-xl text-gray1-300">
              <div className="flex flex-col items-start justify-start pt-[3px] px-0 pb-0 text-xs text-gray1-100">
                <div className="relative [text-decoration:line-through] tracking-[0.02em] leading-[24px] font-semibold inline-block min-w-[52px] z-[1]">
                  {data.product.originalPrice}
                </div>
              </div>
              <div className="relative tracking-[0.02em] leading-[24px] font-semibold inline-block min-w-[85px] z-[1] mq450:text-base mq450:leading-[19px]">
                {data.product.price}
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-[4px]">
              <div className="relative tracking-[0.02em] inline-block min-w-[117px] z-[1]">
                Color: {data.product.color}
              </div>
              <div
                style={{ backgroundColor: data.product.colorHex }}
                className="w-5 h-5 relative rounded-[50%] box-border z-[1] border-[0px] border-solid border-darkslategray-200"
              />
            </div>
            <div className="w-[258px] flex flex-row items-start justify-start gap-[12px] text-5xl font-vidaloka">
              <div className="flex-1 flex flex-col items-start justify-start gap-[12px]">
                <BoxComponent count="1+" showXS icon={faBed} />
                <BoxComponent count="1+" showXS icon={faPlantWilt} />

                <BoxComponent
                  count={`${listing.floor}+`}
                  showXS
                  icon={faStairs}
                  propPosition="unset"
                  propTop="unset"
                  propLeft="unset"
                  propWidth="unset"
                  propHeight="unset"
                />
              </div>

              <div className="flex flex-col items-start justify-start gap-[12px]">
                <BoxComponent
                  count={`${listing.kitchen}+`}
                  icon={faKitchenSet}
                  showXS
                  propPosition="unset"
                  propTop="unset"
                  propLeft="unset"
                  propWidth="unset"
                  propHeight="unset"
                />
                <BoxComponent
                  count={`${listing.bathrooms}+`}
                  showXS
                  icon={faBath}
                  propPosition="unset"
                  propTop="unset"
                  propLeft="unset"
                  propWidth="unset"
                  propHeight="unset"
                />
                <BoxComponent
                  count={`${listing.garage}+`}
                  showXS
                  icon={faCar}
                  propPosition="unset"
                  propTop="unset"
                  propLeft="unset"
                  propWidth="unset"
                  propHeight="unset"
                />
              </div>
            </div>
          </div>
          <div className="w-[327px] flex flex-col items-start justify-start gap-[14px] max-w-full text-darkslategray-200 font-vidaloka">
            <div className="self-stretch flex flex-row items-start justify-between gap-[20px] mq450:flex-wrap">
              <div
                ref={descriptionRef}
                className={`relative flex flex-col items-start justify-start gap-[2px] cursor-pointer ${
                  activeSection === "description" ? "text-my-color" : ""
                }`}
                onClick={() => handleSectionClick("description")}
              >
                <div className="relative tracking-[0.02em] inline-block min-w-[79px] z-[1]">
                  DESCRIPTION
                </div>
                <div
                  className={`absolute bottom-0 left-0 h-0.5 border-t-[2px] border-solid transition-all duration-300 ${
                    activeSection === "description"
                      ? "border-my-color"
                      : "border-transparent"
                  }`}
                  style={{
                    width:
                      activeSection === "description"
                        ? `${underlineWidth}px`
                        : "0",
                  }}
                />
              </div>
              <div
                ref={detailsRef}
                className={`relative tracking-[0.02em] inline-block min-w-[49px] cursor-pointer ${
                  activeSection === "details" ? "text-my-color" : ""
                }`}
                onClick={() => handleSectionClick("details")}
              >
                ADDRESS
                <div
                  className={`absolute bottom-0 left-0 h-0.5 border-t-[2px] border-solid transition-all duration-300 ${
                    activeSection === "details"
                      ? "border-my-color"
                      : "border-transparent"
                  }`}
                  style={{
                    width:
                      activeSection === "details" ? `${underlineWidth}px` : "0",
                  }}
                />
              </div>
              <div
                ref={deliveryRef}
                className={`relative tracking-[0.02em] inline-block min-w-[127px] cursor-pointer ${
                  activeSection === "delivery" ? "text-my-color" : ""
                }`}
                onClick={() => handleSectionClick("delivery")}
              >
                ABOUT THE REALTOR
                <div
                  className={`absolute bottom-0 left-0 h-0.5 border-t-[2px] border-solid transition-all duration-300 ${
                    activeSection === "delivery"
                      ? "border-my-color"
                      : "border-transparent"
                  }`}
                  style={{
                    width:
                      activeSection === "delivery"
                        ? `${underlineWidth}px`
                        : "0",
                  }}
                />
              </div>
            </div>
            <div className="w-[316px] relative tracking-[0.02em] font-montserrat inline-block z-[1]">
              {activeSection === "description" && <p>{listing.description}</p>}
              {activeSection === "details" && <p>{listing.address}</p>}
              {activeSection === "delivery" && <p>{listing.realtor_name}, {listing.realtor_phone}, {realtor.description}</p>}
            </div>
          </div>
          <div className="w-[396px] flex flex-row items-start justify-start gap-[24px] max-w-full text-gray-white font-body-large-400 mq450:flex-wrap">
            <div
              onClick={handleChatClick}
              className="flex-1 rounded-11xl bg-my-color hover:bg-my-color-hover flex flex-row items-start justify-center py-[19px] pr-5 pl-[21px] box-border gap-[11px] min-w-[80px] whitespace-nowrap z-[1]"
            >
              <img
                className="h-4 w-3.5 relative min-h-[16px]"
                alt=""
                src="/group1.svg"
              />
              <div className="relative tracking-[0.02em] font-semibold inline-block min-w-[66px]">
                CHAT
              </div>
            </div>
            <div
              className={`h-[54px] w-[54px] rounded-11xl flex flex-row items-center justify-center p-2 box-border z-[1] ${
                isClicked
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-my-color hover:bg-my-color-hover"
              }`}
              onClick={handleHeartClick}
            >
              <FaHeart className="h-5 w-5 relative overflow-hidden shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

DetailList.propTypes = {
  className: PropTypes.string,
};

export default DetailList;
