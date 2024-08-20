import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./containers/HomeComp/Home.js";
import Layouts from "./hocs/Layouts.js";
import About from "./containers/AboutComp/About.js";
import Questions from "./containers/Questions.js";
import NotFound from "./components/ExtraComp/NotFound.js";
import { useSelector } from "react-redux";
import LoginReg from "./containers/auth/LoginReg.js";
import { Navigate } from "react-router-dom";
import SendPasswordResetEmail from "./containers/auth/SendPasswordResetEmail.js";
import ResetPassword from "./containers/auth/ResetPassword.js";
import Dashboard from "./containers/DashboardComp/Dashboard.js";
import { Provider } from "react-redux";
import Test from "./Test.js";
import ListCard from "./containers/PageListingComp/ListCard.js";
import LongRentListing from "./components/LongListing/LongRentListing.js";
import LongSaleListing from "./components/LongListing/LongSaleListing.js";
import DetailPortfolio from "./containers/ListingDetailComp/DetailPortfolio.js";
import ChatPage from "./containers/Messages/ChatPage.js";
import ListingDetail from "./containers/ListingDetailComp/ListingDetail.js";
import LongAreaListing from "./components/LongListing/LongAreaListing.js";
import Team from "./components/ExtraComp/Team.js";
import Gallery from "./components/ExtraComp/Gallery.js";
function App() {
  const { access_token } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layouts />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/realtor" element={<Team />} />
          <Route path="/collection" element={<Gallery />} />
          <Route path="/test" element={<Test />} />
          <Route path="/contact" element={<Questions />} />
          <Route path="/listings" element={<ListCard />} />
          <Route path="/rent" element={<LongRentListing />} />
          <Route path="/sale" element={<LongSaleListing />} />
          <Route path="/area/:cityName" element={<LongAreaListing />} />
          <Route path="/chat/:ids" element={<ChatPage />} />
          <Route path="/chat" element={<ChatPage />} />
    

          <Route
            path="/listings/:slug"
            element={!access_token ? <LoginReg /> : <DetailPortfolio />}
          />
          <Route path="/not-found" element={<NotFound />} />
          <Route
            path="/login"
            element={!access_token ? <LoginReg /> : <Navigate to="/dashboard" />}
          />
          <Route path="/sendpasswordresetemail" element={<SendPasswordResetEmail />} />
          <Route path="/api/user/reset/:id/:token" element={<ResetPassword />} />
        </Route>
        <Route
          path="/dashboard"
          element={access_token ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
