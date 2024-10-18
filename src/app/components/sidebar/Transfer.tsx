import React from "react";
import UserInfo from "../UserInfo";
import TransactionForm from "../shared/TransactionForm";
import Title, { TitleEffect, TitleSize } from "../shared/Title";

interface TransferProps {
    userInfo: any;
    address: string;
    chainInfo: any;
    balance: string;
    fetchBalance: () => void;
    recipientAddress: string;
    setRecipientAddress: (address: string) => void;
    selectedMode: number;
    setSelectedMode: (mode: number) => void;
    executeTxEthers: () => void;
    isSending: boolean;
    transactionHash: string | null;
}

const Transfer: React.FC<TransferProps> = ({
    userInfo,
    address,
    chainInfo,
    balance,
    fetchBalance,
    recipientAddress,
    setRecipientAddress,
    selectedMode,
    setSelectedMode,
    executeTxEthers,
    isSending,
    transactionHash,
}) => {
    return (
        <div>
            <Title
                titleName="Transfer"
                titleSize={TitleSize.H3}
                titleEffect={TitleEffect.Zoom}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto mt-5">
                <UserInfo
                    userInfo={userInfo}
                    address={address}
                    chainInfo={chainInfo}
                    balance={balance}
                    fetchBalance={fetchBalance}
                />
                <TransactionForm
                    recipientAddress={recipientAddress}
                    setRecipientAddress={setRecipientAddress}
                    selectedMode={selectedMode}
                    setSelectedMode={setSelectedMode}
                    executeTxEthers={executeTxEthers}
                    isSending={isSending}
                    transactionHash={transactionHash}
                    chainInfo={chainInfo}
                />
            </div>
        </div>

    );
};

export default Transfer;