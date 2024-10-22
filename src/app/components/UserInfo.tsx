import React from "react";
import { truncateAddress } from "../utils/utils";
import Image from "next/image";

interface UserInfoProps {
    userInfo: any;
    address: string;
    chainInfo: any;
    balance: string;
    fetchBalance: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({
    userInfo,
    address,
    chainInfo,
    balance,
    fetchBalance,
}) => {
    return (
        <div className="border border-purple-500 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-2 text-white">Accounts info</h2>
            <div className="flex items-center">
                <h2 className="text-lg font-semibold mb-2 text-white mr-2">
                    Name: {userInfo?.name}
                </h2>
                <img
                    src={userInfo?.avatar}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                />
            </div>
            <h2 className="text-lg font-semibold mb-2 text-white">
                Address: <code>{truncateAddress(address || "")}</code>
            </h2>
            <div className="flex items-center">
                <h3 className="text-lg mb-2 text-gray-400">Chain: {chainInfo.name}</h3>
            </div>
            <div className="flex items-center">
                <h3 className="text-lg font-semibold text-purple-400 mr-2">
                    Balance: {balance} {chainInfo.nativeCurrency.symbol}
                </h3>
                <button
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center"
                    onClick={fetchBalance}
                >
                    🔄
                </button>
            </div>

        </div>
    );
};

export default UserInfo;