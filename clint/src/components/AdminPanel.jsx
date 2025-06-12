import React, { useState, useEffect } from "react";
import { axiosClient } from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [Deposites, setDeposites] = useState([]);
  const [Withdrawal, setWithdrawl] = useState([]);
  const [userbankdetails, setuserbankdetails] = useState([]);
  const [usersellusdts,setusersellusdts]=useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const localStorage = window.localStorage;
    if (!localStorage.getItem("access_token")) {
      navigate("/login");
    }
    const fetchUsers = async () => {
      try {
        const response = await axiosClient.get("/auth/users");
        setUsers(response.result);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users. Please try again.");
      }
    };
    fetchUsers();
  }, []);

  // useEffect(() => {
  //   const fetchUserDeposites = async () => {
  //     try {
  //       const response = await axiosClient.get("/auth/user-deposites");
  //       setDeposites(response.result);
  //     } catch (error) {
  //       // console.error("Error fetching userDeposites:", error);
  //       setError("Failed to fetch userDeposites. Please try again.");
  //     }
  //   };
  //   fetchUserDeposites();
  // }, []);

  const fetchpersondata = async (personid) => {
    try {
      const response = await axiosClient.get(
        `/auth/person-deposites/${personid}`
      );

      const withdrawalresponse = await axiosClient.get(
        `/auth/person-withdrawal/${personid}`
      );

      const userbankdetailsresponse = await axiosClient.get(
        `/transaction/user-bankdetails/${personid}`
      );

      const usersellusdtsdetailsresponse=await axiosClient.get(
        `/transaction/user-sellusdts/${personid}`
      )

      console.log("personID", personid);
      setDeposites(response.result);
      setWithdrawl(withdrawalresponse?.result);
      setuserbankdetails(userbankdetailsresponse?.result);
      setusersellusdts(usersellusdtsdetailsresponse?.result);
      console.log("Usersellusdtsdetails",usersellusdtsdetailsresponse.result)
    } catch (error) {
      // console.error("Error fetching userDeposites:", error);
      setError("Failed to fetch userDeposites. Please try again.");
    }
  };

  const approvehandler = async (depositID) => {
    try {
      const data = {
        status: "Approve",
      };
      console.log("DepositID", depositID);
      const response = await axiosClient.patch(
        `/auth/status-change/${depositID}`,
        data
      );

      setDeposites((prev) => {
        console.log(prev);
        const updatedData = prev.map((item) => {
          if (item._id === depositID) {
            return { ...item, status: "Approve" }; // Correct key and value
          }
          return item;
        });

        return updatedData; // Return the updated array
      });
    } catch (error) {
      setError("Failed to fetch userDeposites. Please try again.");
    }
  };

  const rejecthandler = async (depositID) => {
    try {
      const data = {
        status: "Reject",
      };
      console.log("DepositID", depositID);
      const response = await axiosClient.patch(
        `/auth/status-change/${depositID}`,
        data
      );

      setDeposites((prev) => {
        const updatedData = prev.map((item) => {
          if (item._id === depositID) {
            return { ...item, status: "Reject" }; // Correct key and value
          }
          return item;
        });

        return updatedData; // Return the updated array
      });
    } catch (error) {
      setError("Failed to fetch userDeposites. Please try again.");
    }
  };

  const withdrawapprovehandler = async (withdrawID) => {
    try {
      const data = {
        status: "Approve",
      };
      const response = await axiosClient.patch(
        `/auth/status-change/withdraw/${withdrawID}`,
        data
      );

      setWithdrawl((prev) => {
        console.log(prev);
        const updatedData = prev.map((item) => {
          if (item._id === withdrawID) {
            return { ...item, status: "Approve" }; // Correct key and value
          }
          return item;
        });

        return updatedData; // Return the updated array
      });
    } catch (error) {
      setError("Failed to fetch userDeposites. Please try again.");
    }
  };

  const withdrawrejecthandler = async (withdrawID) => {
    try {
      const data = {
        status: "Reject",
      };
      const response = await axiosClient.patch(
        `/auth/status-change/withdraw/${withdrawID}`,
        data
      );

      setWithdrawl((prev) => {
        const updatedData = prev.map((item) => {
          if (item._id === withdrawID) {
            return { ...item, status: "Reject" }; // Correct key and value
          }
          return item;
        });

        return updatedData; // Return the updated array
      });
    } catch (error) {
      setError("Failed to fetch userDeposites. Please try again.");
    }
  };


  const sellusdtsapprovehandler = async (usdtsID, amount, status) => {
    try {
        const data = {
        status: "Approve",
        amount: amount,
        prevSatus : status
      };
      const response = await axiosClient.patch(
        `/auth/status-change/sellusdts/${usdtsID}`,
        data
      );

      setusersellusdts((prev) => {
        console.log(prev);
        const updatedData = prev.map((item) => {
          if (item._id === usdtsID) {
            return { ...item, status: "Approve" }; // Correct key and value
          }
          return item;
        });

        return updatedData; // Return the updated array
      });
    } catch (error) {
      setError("Failed to status change. Please try again.");
    }
  };
  

  const sellusdtsrejecthandler = async (usdtsID,status, amount) => {
    console.log(usdtsID , status)
    try {
      if(status){
        if(true){
        const data = {
        status: "Reject",
        amount: amount,
        prevSatus : status
      };
      const response = await axiosClient.patch(
        `/auth/status-change/sellusdts/${usdtsID}`,
        data
      );

      setusersellusdts((prev) => {
        console.log(prev);
        const updatedData = prev.map((item) => {
          if (item._id === usdtsID) {
            return { ...item, status: "Reject" }; // Correct key and value
          }
          return item;
        });

        return updatedData; // Return the updated array
      });
        }
      }
  
    } catch (error) {
      setError("Failed to status change. Please try again.");
    }
  };
  



  const toggleExpand = (userId) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">Admin Panel</h1>
      <p className="text-lg mb-8 text-center max-w-2xl">
        Manage all the user data including deposits and withdrawals from this
        panel. Click on a user to view more details.
      </p>
      <div className="flex flex-col md:flex-row w-full">
        <div className="md:w-1/3 lg:w-full bg-blue-600 shadow-lg rounded-lg overflow-auto mb-4 md:mb-0">
          <h2 className="text-2xl font-bold p-4 border-b bg-blue-600 text-white">
            Users
          </h2>
          {error && <p className="text-red-500 p-4">{error}</p>}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white text-black ">
              <tr>
                <th className="px-6 py-3 text-left text-sm  font-bold  uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm  font-bold  uppercase tracking-wider">
                  Mobile No
                </th>
                <th className="px-6 py-3 text-left text-sm  font-bold  uppercase tracking-wider">
                  ID
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users?.map((user) => (
                <React.Fragment key={user._id}>
                  <tr
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleExpand(user._id)}
                  >
                    <td
                      onClick={() => fetchpersondata(user._id)}
                      className="px-6 py-4 whitespace-normal text-sm font-medium text-gray-900"
                    >
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                      {user.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 break-words max-w-full">
                      {user._id}
                    </td>
                  </tr>
                  {expandedUserId === user._id && (
                    <tr>
                      <td colSpan="3" className="p-4">
                        <div className="bg-gray-100 p-4 rounded-lg">
                          <div className="mb-4">
                            <h3 className="text-xl font-bold mb-2">
                              User Details
                            </h3>
                            <table className="min-w-full divide-y divide-gray-300 bg-white rounded-lg shadow-md">
                              <thead className="bg-blue-600">
                                <tr>
                                  <th className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wide">
                                    Name
                                  </th>
                                  <th className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wide">
                                    Phone
                                  </th>
                                  <th className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wide">
                                    ID
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                <tr className="hover:bg-blue-50 transition-colors duration-200">
                                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 text-sm">
                                    {user.name || "N/A"}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 text-sm">
                                    {user.phone || "N/A"}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 text-sm">
                                    {user._id || "N/A"}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="mb-4">
                            <h3 className="text-xl font-bold mb-2">
                              Bank Accounts
                            </h3>
                            {userbankdetails?.length > 0 ? (
                              <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-sm">
                                  <thead className="bg-blue-600 text-white">
                                    <tr>
                                      <th className="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider">
                                        Bank Holder Name
                                      </th>
                                      <th className="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider">
                                        Bank Name
                                      </th>
                                      <th className="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider">
                                        Account Number
                                      </th>
                                      <th className="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider">
                                        IFSC Code
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="bg-white divide-y divide-gray-200">
                                    {userbankdetails?.length === 0 ? (
                                      <tr>
                                        <td
                                          colSpan="5"
                                          className="px-6 py-4 text-center text-gray-500"
                                        >
                                          No bank details available.
                                        </td>
                                      </tr>
                                    ) : (
                                      userbankdetails?.map((account) => (
                                        <tr key={account._id}>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {account.bankHolderName}
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {account.bankName}
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {account.bankAccountNumber}
                                          </td>
                                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {account.ifscCode}
                                          </td>
                                        </tr>
                                      ))
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <p className="text-gray-500">None</p>
                            )}
                          </div>
                          <div className="mb-4">
                            <h3 className="text-xl font-bold mb-2">Deposits</h3>
                            {Deposites?.length > 0 ? (
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-blue-600 text-white">
                                  <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                      Deposit ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                      Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                      Network
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                      Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                      Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                      Actions
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {Deposites.map((deposit, index) => (
                                    <tr key={index}>
                                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                        {deposit.transactionId}
                                      </td>
                                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                        {deposit.depositAmount}
                                      </td>
                                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                        {deposit.network}
                                      </td>
                                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                        {deposit.timestamp}
                                      </td>
                                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                        {deposit.status}
                                      </td>
                                      <td className="px-6 py-4 whitespace-normal flex gap-1  text-sm text-gray-500">
                                        {(deposit.status == "Reject" ||
                                          deposit.status == "Processing") && (
                                          <>
                                            <button
                                              onClick={() =>
                                                approvehandler(deposit._id)
                                              }
                                              className="bg-green-600 rounded text-center text-white cursor-pointer p-1"
                                            >
                                              Approve
                                            </button>
{/* 
                                            <button className="bg-red-500 rounded text-center text-white cursor-not-allowed opacity-60 p-1">
                                              Reject
                                            </button> */}
                                          </>
                                        )}
                                        {(deposit.status == "Approve" ||
                                          deposit.status == "Processing") && (
                                          <>
                                            {/* <button className="bg-green-500 rounded text-center text-white cursor-not-allowed opacity-60 p-1">
                                              Approve
                                            </button> */}

                                            <button
                                              onClick={() =>
                                                rejecthandler(deposit._id)
                                              }
                                              className="bg-red-600 rounded text-center text-white cursor-pointer p-1"
                                            >
                                              Reject
                                            </button>
                                          </>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            ) : (
                              <p className="text-gray-500">None</p>
                            )}
                          </div>
                          <div className="mb-4">
                            <h3 className="text-xl font-bold mb-2">
                              Withdrawals
                            </h3>
                            {Withdrawal?.length > 0 ? (
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-blue-600 text-white">
                                  <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                      Wallet Address
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                      Currency
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                      Network
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                      Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                      Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                      Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                      Actions
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {Withdrawal?.map((withdraw, index) => (
                                    <tr key={index}>
                                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                        {withdraw.walletAddress}
                                      </td>
                                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                        {withdraw.currency}
                                      </td>
                                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                        {withdraw.network}
                                      </td>
                                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                        {withdraw.withdrawalAmount}
                                      </td>
                                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                        {withdraw.timestamp}
                                      </td>
                                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                        {withdraw.status}
                                      </td>
                                      <td className=" py-4 pl-4  whitespace-normal flex gap-1  text-sm text-gray-500">
                                        {(withdraw.status == "Reject" ||
                                          withdraw.status == "Processing") && (
                                          <>
                                            <button
                                              onClick={() =>
                                                withdrawapprovehandler(
                                                  withdraw._id
                                                )
                                              }
                                              className="bg-green-600 rounded text-center text-white cursor-pointer p-1"
                                            >
                                              Approve
                                            </button>

                                            {/* <button className="bg-red-500 rounded text-center text-white cursor-not-allowed opacity-60 p-1">
                                              Reject
                                            </button> */}
                                          </>
                                        )}
                                        {(withdraw.status == "Approve" ||
                                          withdraw.status == "Processing") && (
                                          <>
                                            {/* <button className="bg-green-500 rounded text-center text-white cursor-not-allowed opacity-60 p-1">
                                              Approve
                                            </button> */}

                                            <button
                                              onClick={() =>
                                                withdrawrejecthandler(
                                                  withdraw._id
                                                )
                                              }
                                              className="bg-red-600 rounded text-center text-white cursor-pointer p-1"
                                            >
                                              Reject
                                            </button>
                                          </>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            ) : (
                              <p className="text-gray-500">None</p>
                            )}
                          </div>

                          <div className="mb-4">
                            <h3 className="text-xl font-bold mb-2">
                              Sellusdts
                            </h3>
                            {usersellusdts?.length > 0 ? (
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-blue-600 text-white">
                                  <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                      Bank Holder Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                      Bank Account Number
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                      Ifsc Code
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                      Sellusdt Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                      UsdtToRupees
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                      Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                      Actions
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {usersellusdts?.map((sellusdts, index) => (
                                    <tr key={index}>
                                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                        {sellusdts.bankHolderName}
                                      </td>
                                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                        {sellusdts.bankAccountNumber}
                                      </td>
                                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                       {sellusdts.ifscCode}
                                      </td>
                                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                        {sellusdts.sellUsdtAmount}
                                      </td>
                                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                        {sellusdts.usdtToRupees}
                                      </td>
                                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                        {sellusdts.status}
                                      </td>
                                      <td className=" py-4  pl-6 whitespace-normal flex gap-1  text-sm text-gray-500">
                                        {(sellusdts.status == "Reject" ||
                                          sellusdts.status == "Processing") && (
                                          <>
                                            <button
                                              onClick={() =>
                                                sellusdtsapprovehandler(
                                                  sellusdts._id,
                                                  sellusdts.sellUsdtAmount,
                                                  sellusdts.status
                                                )
                                              }
                                              className="bg-green-600 rounded text-center text-white cursor-pointer p-1"
                                            >
                                              Approve
                                            </button>

                                            {/* <button className="bg-red-500 rounded text-center text-white cursor-not-allowed opacity-60 p-1">
                                              Reject
                                            </button> */}
                                          </>
                                        )}
                                        {(sellusdts.status == "Approve" ||
                                          sellusdts.status == "Processing") && (
                                          <>
                                            {/* <button className="bg-green-500 rounded text-center text-white cursor-not-allowed opacity-60 p-1">
                                              Approve
                                            </button> */}

                                            <button
                                              onClick={() =>
                                                sellusdtsrejecthandler(
                                                  sellusdts._id,sellusdts.status, sellusdts.sellUsdtAmount
                                                )
                                              }
                                              className="bg-red-600 rounded text-center text-white cursor-pointer p-1"
                                            >
                                              Reject
                                            </button>
                                          </>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            ) : (
                              <p className="text-gray-500">None</p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
