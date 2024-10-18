import React from "react";
import { CreateChannel } from "./sidebar/CreateChannel";
import { Channels } from "./sidebar/Channels";
import { Inbox } from "./sidebar/Inbox";
import { Dashboard } from "./sidebar/Dashboard";
import Chat from "./sidebar/Chat";
import Transfer from "./sidebar/Transfer";
import { useStoreChat } from "../hooks/store";

interface MainContentProps {
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

const MainContent: React.FC<MainContentProps> = ({
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
    const { setSelectedSection, selectedSection } = useStoreChat();
    return (
        <main className="flex-grow p-8 bg-black ">
            {selectedSection === "dashboard" && <Dashboard setSection={setSelectedSection} />}
            {selectedSection === "chat" && <Chat setSection={setSelectedSection} />}
            {selectedSection === "inbox" && <Inbox setSection={setSelectedSection} />}
            {selectedSection === "channels" && <Channels setSection={setSelectedSection} />}
            {selectedSection === "create channel" && <CreateChannel setSection={setSelectedSection} />}
            {selectedSection === "transfer" && (
                <Transfer
                    userInfo={userInfo}
                    address={address}
                    chainInfo={chainInfo}
                    balance={balance}
                    fetchBalance={fetchBalance}
                    recipientAddress={recipientAddress}
                    setRecipientAddress={setRecipientAddress}
                    selectedMode={selectedMode}
                    setSelectedMode={setSelectedMode}
                    executeTxEthers={executeTxEthers}
                    isSending={isSending}
                    transactionHash={transactionHash}
                />
            )}
        </main>
    );
};

export default MainContent;