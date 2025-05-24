import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { withdrawalHistory } from "../redux/slices/appConfigSlice";
import ic from "../assets/icon.svg";
import currency from "../assets/currency.svg";
import erc from "../assets/erc20.svg";
import trc from "../assets/trc20.svg";

function WithdrawalHistory() {
  const dispatch = useDispatch();
  const [withdrawalResponse, setWithdrawalResponse] = useState(null);

  useEffect(() => {
    const fetchWithdrawalHistory = async () => {
      try {
        const resultAction = await dispatch(withdrawalHistory());
        if (withdrawalHistory.fulfilled.match(resultAction)) {
          setWithdrawalResponse(resultAction.payload);
        }
      } catch (error) {
        console.error("Error fetching withdrawal history:", error);
      }
    };
    fetchWithdrawalHistory();
  }, [dispatch]);

  // Format timestamp to readable date and time
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return { formattedDate, formattedTime };
  };

  if (!withdrawalResponse) {
    return <h5>Loading ...</h5>;
  }

  return (
    <section>
      <div className="flex justify-center font-bold text-lg p-4">
        WITHDRAWAL HISTORY
      </div>
      <div className="flex items-center justify-center min-h-screen bg-custom">
        <div className="h-screen w-full bg-gray-300 p-8 flex flex-col gap-5 overflow-y-auto">
          {withdrawalResponse.result
            .slice()
            .reverse()
            .map((item) => {
              const { formattedDate, formattedTime } = formatTimestamp(
                item.timestamp
              );

              return (
                <div
                  key={item._id}
                  className="px-4 py-1 w-full max-w-md mx-auto bg-white rounded-md shadow-md"
                >
                  <div className="flex flex-col">
                    <div className="flex justify-between gap-6 border-b-2 pb-2">
                      <div className="flex items-center">
                        <img
                          src={ic}
                          alt="icon"
                          className="h-6 w-6 mr-2 bg-gray-200 rounded-full p-1"
                        />
                        <p className="text-sm font-bold">{item._id}</p>
                      </div>
                      <p
                        className={`text-sm ${
                          item.status === "Successful"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {item.status}
                      </p>
                    </div>
                    <div className="bg-gray-200 mt-4 text-base rounded-sm">
                      <div className="flex flex-col">
                        <div className="flex justify-between px-2">
                          <p className="text-gray-400">Network</p>
                          <div className="flex gap-1 items-center">
                            <img
                              src={
                                item.network === "TRC20"
                                  ? trc
                                  : item.network === "ERC20"
                                  ? erc
                                  : ic
                              }
                              alt="network-icon"
                              className="w-4"
                            />
                            <p>{item.network}</p>
                          </div>
                        </div>
                        <div className="flex justify-between px-2">
                          <p className="text-gray-400">Create time</p>
                          <div className="flex">
                            <p>{formattedDate}</p>
                            <p>{formattedTime}</p>
                          </div>
                        </div>
                        <div className="flex justify-between px-2">
                          <p className="text-gray-400">Wallet Address</p>
                          <p className="break-all">{item.walletAddress}</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex justify-end gap-2">
                      <p className="text-gray-400 py-1">Amount</p>
                      <div className="flex items-center">
                        <img src={currency} alt="icon" className="w-5" />
                        <p className="font-bold">{item.withdrawalAmount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default WithdrawalHistory;
