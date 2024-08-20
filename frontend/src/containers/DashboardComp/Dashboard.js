import { Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../services/LocalStorageService.js';
import { useGetLoggedUserQuery } from '../../services/userAuthApi.js';
import { useEffect, useState } from 'react';
import { setUserInfo } from '../../features/userSlice.js';
import Navbar from '../../components/Navbar/Navbar.js';
import FrameComponent from './FrameComponent.js';
import MentorList from './MentorList.js';
import RealtorInformation from './RealtorInformation.js';
import Box from "./Box.js";
import {ContextAPI} from "../../Context/ContextAPI.js"
import { useContext } from 'react';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { access_token } = getToken();
  const { data, isSuccess, isLoading, error } = useGetLoggedUserQuery(access_token);
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

  // User data initial state
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    nic: ""
  });

  // Store User Data in Local State
  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        email: data.email,
        name: data.name,
        nic: data.nic
      });
    }
  }, [data, isSuccess]);

  // Store User Data in Redux Store
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setUserInfo({
        email: data.email,
        name: data.name,
        nic: data.nic
      }));
    }
  }, [data, isSuccess, dispatch]);

  return (
    <>
      <Navbar />
      <div className="w-full px-10 relative rounded-xl bg-color-gray-10 flex flex-col items-start justify-start pt-5 pb-0 box-border gap-[24px] leading-[normal] tracking-[normal]">
        <Box name={userData.name} email={userData.email} nic={userData.nic} />
        <Container />
        <FrameComponent rentListings={rentCurrentListings} saleListings={saleCurrentListings} />
        <section className="self-stretch flex flex-col items-center justify-start gap-[20px] max-w-full text-left text-base text-color-gray-100 font-inter">
          <div className="self-stretch flex flex-row items-center justify-between [row-gap:20px] max-w-full gap-[0px] mq1425:flex-wrap">
            <h1 className="m-0 w-[1401px] relative text-inherit capitalize font-medium font-inherit flex items-center max-w-full">
              Houses information
            </h1>
          </div>
          <MentorList />
          <RealtorInformation />
        </section>
      </div>
    </>
  );
};

export default Dashboard;
