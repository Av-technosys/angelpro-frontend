import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "./Home";
import Feature from "./Features";
import Footer from "./Footer";
import Header from "./Header";
import Testimonials from "./Testimonials";
import Pricing from "./Pricing";
import Contactus from "./Contactus";
import Sell from "./Sell";
import { getItem, KEY_ACCESS_TOKEN } from "../utils/localStorageManager";
import AdminPanel from "./AdminPanel";
import { axiosClient } from "../utils/axiosClient";
import { getUserData } from "../redux/slices/appConfigSlice";

function Landingpage() {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const user = useSelector((state) => state.appConfigReducer.userData);
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  // console.log(user);
  // console.log(user);
  useEffect(() => {
    const token = getItem(KEY_ACCESS_TOKEN);
    if (token) {
      setIsLoggedIn(true);
      try {
        if (user?.phone == "918766492553") {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
  }, []);

  return (
    <>
      <Header />
      {/* <ExchangePage /> */}
      {/* <SellForm /> */}
      {isLoggedIn ? <Sell /> : <Home />}
      {isAdmin ? <AdminPanel /> : null}
      <Pricing />
      <Testimonials />
      <Feature />
      <Contactus />
      <Footer />
    </>
  );
}

export default Landingpage;
