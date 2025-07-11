import React, { useState, useEffect } from "react";
import { axiosClient } from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
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

  const toggleExpand = (userId) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4 text-orange-600">Admin Panel</h1>
      <p className="text-lg mb-8 text-center max-w-2xl">
        Manage all the user data including deposits and withdrawals from this
        panel. Click on a user to view more details.
      </p>
      <div className="flex flex-col md:flex-row w-full">
        <div className="md:w-1/3 lg:w-full bg-white shadow-lg rounded-lg overflow-auto mb-4 md:mb-0">
          <h2 className="text-2xl font-bold p-4 border-b bg-orange-600 text-white">
            Users
          </h2>
          {error && <p className="text-red-500 p-4">{error}</p>}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mobile No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <React.Fragment key={user._id}>
                  <tr
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleExpand(user._id)}
                  >
                    <td className="px-6 py-4 whitespace-normal text-sm font-medium text-gray-900">
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
                            <p>
                              <strong>Name:</strong> {user.name || "N/A"}
                            </p>
                            <p>
                              <strong>Phone:</strong> {user.phone || "N/A"}
                            </p>
                            <p>
                              <strong>ID:</strong> {user._id || "N/A"}
                            </p>
                          </div>
                          <div className="mb-4">
                            <h3 className="text-xl font-bold mb-2">
                              Bank Accounts
                            </h3>
                            {user.bankAccounts.length > 0 ? (
                              <ul className="list-disc list-inside">
                                {user.bankAccounts.map((account, index) => (
                                  <li key={index}>{account}</li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-gray-500">None</p>
                            )}
                          </div>
                          <div className="mb-4">
                            <h3 className="text-xl font-bold mb-2">Deposits</h3>
                            {user.deposits.length > 0 ? (
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Deposit ID
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {user.deposits.map((deposit, index) => (
                                    <tr key={index}>
                                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                        {deposit}
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
                            {user.withdrawals.length > 0 ? (
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Withdrawal ID
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {user.withdrawals.map((withdrawal, index) => (
                                    <tr key={index}>
                                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                                        {withdrawal}
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
