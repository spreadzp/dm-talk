import React from "react";
import { SendTransactionMode } from "@particle-network/aa";
import TxNotification from "./TxNotification";

interface TransactionFormProps {
    recipientAddress: string;
    setRecipientAddress: (address: string) => void;
    selectedMode: SendTransactionMode;
    setSelectedMode: (mode: SendTransactionMode) => void;
    executeTxEthers: () => void;
    isSending: boolean;
    transactionHash: string | null;
    chainInfo: any;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
    recipientAddress,
    setRecipientAddress,
    selectedMode,
    setSelectedMode,
    executeTxEthers,
    isSending,
    transactionHash,
    chainInfo,
}) => {
    return (
        <div className="border border-purple-500 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-2 text-white">
                Send a transaction with the ethers provider
            </h2>
            <h2 className="text-lg">Send 0.01 {chainInfo.nativeCurrency.symbol}</h2>
            <input
                type="text"
                placeholder="Recipient Address"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                className="mt-4 p-2 w-full rounded border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <select
                value={selectedMode}
                onChange={(e) =>
                    setSelectedMode(parseInt(e.target.value) as SendTransactionMode)
                }
                className="mt-4 p-2 w-full rounded border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
                <option value={SendTransactionMode.Gasless}>Gasless</option>
                <option value={SendTransactionMode.UserPaidNative}>
                    User Paid Native
                </option>
            </select>
            <button
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                onClick={executeTxEthers}
                disabled={!recipientAddress || isSending}
            >
                {isSending
                    ? "Sending..."
                    : `Send 0.001 ${chainInfo.nativeCurrency.symbol}`}
            </button>
            {transactionHash && (
                <TxNotification
                    hash={transactionHash}
                    blockExplorerUrl={chainInfo.blockExplorers?.default.url || ""}
                />
            )}
        </div>
    );
};

export default TransactionForm;