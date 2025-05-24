import TransactionComponent from "./TransactionComponetn";
import profileIcon from "../assets/profile.avif";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
function ExchangePage() {
  const user = useSelector((state) => state.appConfigReducer.userData);

  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      {/* User Profile Section */}
      <div className="flex items-center justify-between p-2 bg-gray-800 shadow-lg rounded-lg mb-2 sm:mb-4">
        <div className="flex items-center p-4">
          <img
            src={profileIcon}
            alt="Profile"
            className="w-12 h-12 sm:w-10 sm:h-10 rounded-full border-2 border-gray-600"
          />
          <div className="ml-2 sm:ml-4">
            <p className="text-white text-base sm:text-sm font-semibold">
              {user?.name}
            </p>
            <p className="text-lg sm:text-base font-bold text-white">
              +{user?.phone}
            </p>
            <p className="text-white text-sm sm:text-xs">
              Balance: <span className="font-bold">0</span>
            </p>
          </div>
        </div>
        <div>
          <img
            src="/path/to/notification-icon.png"
            alt="Notifications"
            className="w-6 h-6 sm:w-5 sm:h-5"
          />
        </div>
      </div>

      {/* Transaction Component */}
      <TransactionComponent />
      {/* Platform Price Section */}
      <div className="mt-4 bg-gradient-to-b from-orange-200 to-white shadow-lg rounded-lg p-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Platform Price
        </h2>
        <p className="mt-2 text-gray-600"></p>

        <div className="flex justify-center">
          <div className="mt-4 border border-white p-4 rounded-lg sm:max-w-60 lg:max-w-[300px]">
            <h3 className="text-8xl font-bold text-gray-800 flex justify-center">
              93{" "}
              <span className="font-semibold flex items-end">
                {" "}
                <p className="bg-red-600 text-sm px-2 rounded-lg py-[0.5px] text-white">
                  Base
                </p>
              </span>
            </h3>
            <div className="text-gray-600 p-2 font-bold flex justify-center text-xl">
              <p>1 USDT = ₹93</p>
            </div>
          </div>
        </div>

        <div className="mt-4 px-4 flex justify-center">
          <div className="w-full bg-gradient-to-b from-orange-300 to-orange-100 p-6 rounded-xl shadow-xl">
            <table className="w-full text-center border-collapse bg-white rounded-lg shadow-md overflow-hidden">
              <thead>
                <tr>
                  <th className="border-b-2  border-gray-400 p-4  text-gray-800 bg-gray-200 font-semibold rounded-tl-lg ">
                    Exchange ($)
                  </th>
                  <th className="border-b-2 border-l-[1px] border-gray-400 p-4  text-gray-800 bg-gray-200 font-semibold  rounded-tr-lg">
                    Price (₹)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="border-b border-r border-gray-300 p-4 text-gray-800">
                    1075.27 and 2150.54
                  </td>
                  <td className="border-b border-gray-300 p-4 text-gray-800">
                    93 <span className="text-red-600">+0.25</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="border-b border-r border-gray-300 p-4 text-gray-800">
                    2150.54 and 3225.81
                  </td>
                  <td className="border-b border-gray-300 p-4 text-gray-800">
                    93 <span className="text-red-600">+0.5</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="border-b border-r border-gray-300 p-4 text-gray-800">
                    3225.81
                  </td>
                  <td className="border-b border-gray-300 p-4 text-gray-800">
                    93 <span className="text-red-600">+1</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <Button
            onClick={() => {
              navigate("/sellusdt");
            }}
            className="w-full lg:w-1/3 !bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Sell USDT
          </Button>
        </div>
      </div>

      {/* Exchanges Price Section */}
      <div className="mt-4 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Exchanges Price
        </h2>
        <div className="flex flex-col sm:flex-row justify-around gap-6">
          <div className="bg-gradient-to-b from-amber-300 to-yellow-50 shadow-md rounded-lg p-6 flex flex-col items-center border border-gray-300">
            <h3 className="text-lg font-bold text-gray-800 mb-4">WazirX</h3>
            <p className="text-gray-600 mb-2 font-bold text-lg">
              Avg{" "}
              <span className="text-orange-600 text-6xl font-bold">95.26₹</span>
            </p>
            <p className="text-gray-600">
              1 USDT = <span className="font-bold">₹95.26</span>
            </p>
          </div>

          <div className="bg-gradient-to-b from-amber-300 to-yellow-50 shadow-md rounded-lg p-6 flex flex-col items-center border border-gray-300">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Binance</h3>
            <p className="text-gray-600 mb-2 font-bold text-lg">
              Avg{" "}
              <span className="text-orange-600 text-6xl font-bold">91.14₹</span>
            </p>
            <p className="text-gray-600">
              1 USDT = <span className="font-bold">₹91.14</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExchangePage;
