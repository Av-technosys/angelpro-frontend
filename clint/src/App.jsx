import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import { Route, Router, Routes } from "react-router-dom";

import Landingpage from "./components/Landingpage";
import Login from "./components/Login";
import LoadingBar from "react-top-loading-bar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import Signup from "./components/Signup";
import DepositForm from "./components/Deposite";
import WithdrawalForm from "./components/Withdrawal";
import DepositeHistory from "./components/DepositHistory";
import WithdrawalHistory from "./components/WithdrawalHistory";
import PageInProcess from "./components/PageInProcess";
import BankAccountForm from "./components/BankAccountForm";
import AdminPanel from "./components/AdminPanel";
import SellForm from "./components/SellForm";
import TransactionProgress from "./components/TransactionProgress";
import { getUserData } from "./redux/slices/appConfigSlice";
import AdminSellUSDTPanel from "./components/AdminSellUSDTPanel";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);
  const isLoading = useSelector((state) => state.appConfigReducer.isLoading);

  const loadingRef = useRef(null);

  useEffect(() => {
    if (isLoading) {
      loadingRef.current?.continuousStart();
    } else {
      loadingRef.current?.complete();
    }
  }, [isLoading]);

  return (
    <>
      <ChakraProvider>
        <LoadingBar color="red" ref={loadingRef} />

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/deposit" element={<DepositForm />} />
          <Route path="/withdrawal" element={<WithdrawalForm />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sellusdt" element={<SellForm />} />
          <Route path="/depositHistory" element={<DepositeHistory />} />
          <Route path="/withdrawalHistory" element={<WithdrawalHistory />} />
          <Route path="/invite" element={<PageInProcess />} />
          <Route path="/addBank" element={<BankAccountForm />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/adminusdt" element={<AdminSellUSDTPanel />} />
          <Route
            path="/transactionProgress"
            element={<TransactionProgress />}
          />
        </Routes>
      </ChakraProvider>
    </>
  );
}

export default App;
