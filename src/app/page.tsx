"use client";
import React, { useState, useEffect } from "react";
import type { NextPage } from "next";

// Import Particle Auth hooks and provider
import {
  useEthereum,
  useConnect,
  useAuthCore,
} from "@particle-network/authkit";
import {
  AAWrapProvider,
  SendTransactionMode,
  SmartAccount,
} from "@particle-network/aa";
import { ethers, type Eip1193Provider } from "ethers";

import { bscTestnet, mainnet, vechain } from "@particle-network/authkit/chains"; // Chains are imported here

import Sidebar from "./components/sidebar/Sidebar";
import MainContent from "./components/MainContent";

// Import the utility functions
import { formatBalance } from "./utils/utils";
import { useStoreChat } from "./hooks/store";
import { getOrCreateUser } from "./server/chat";
import Spinner from "./components/shared/Spinner";

const Home: NextPage = () => {
  // Hooks to manage logins, data display, and transactions
  const { connectionStatus } = useConnect();
  const { provider, chainInfo } = useEthereum();
  const { userInfo } = useAuthCore();
  const { setActiveAccount, setChainId, setSelectedSection, selectedSection, setActiveUser } = useStoreChat()

  const [balance, setBalance] = useState<string>(""); // states for fetching and display the balance
  const [recipientAddress, setRecipientAddress] = useState<string>(""); // states to get the address to send tokens to from the UI
  const [address, setAddress] = useState<string>(""); // states to handle the address of the smart account
  const [transactionHash, setTransactionHash] = useState<string | null>(null); // states for the transaction hash
  const [isSending, setIsSending] = useState<boolean>(false); // state to display 'Sending...' while waiting for a hash

  // state to handle the selected transaction mode. Gasless by default
  const [selectedMode, setSelectedMode] = useState<SendTransactionMode>(
    SendTransactionMode.Gasless
  );

  // Set up and configure the smart account
  const smartAccount = new SmartAccount(provider, {
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
    clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
    appId: process.env.NEXT_PUBLIC_APP_ID!,
    aaOptions: {
      accountContracts: {
        SIMPLE: [
          {
            version: "2.0.0",
            chainIds: [bscTestnet.id, mainnet.id, vechain.id],
          },
        ],
      },
    },
  });

  // Function to create ethers provider based on selected mode. This is for ethers V6
  const createEthersProvider = (mode: SendTransactionMode) => {
    return new ethers.BrowserProvider(
      new AAWrapProvider(smartAccount, mode) as Eip1193Provider,
      "any"
    );
  };

  // Initialize the ethers provider
  const [ethersProvider, setEthersProvider] = useState(() =>
    createEthersProvider(selectedMode)
  );

  // Update ethers provider when selectedMode changes
  useEffect(() => {
    setEthersProvider(createEthersProvider(selectedMode));
  }, [selectedMode]);

  // Fetch the balance when userInfo or chainInfo changes
  useEffect(() => {

    if (userInfo) {
      console.log("🚀 ~ useEffect ~ userInfo:", userInfo)
      fetchBalance();
    }
  }, [userInfo]);

  // Fetch the user's balance in Ether
  const fetchBalance = async () => {
    try {
      // Get the smart account address
      const address = await smartAccount.getAddress();
      const chainId = await smartAccount.getChainId();
      const user = await getOrCreateUser({ senderAddress: address, avatar: userInfo?.avatar as string, userName: userInfo?.name as string });
      setActiveUser(user);
      console.log("🚀 ~ fetchBalance ~ chainId:", chainId)
      setActiveAccount(address);
      setChainId(chainId);
      console.log("🚀 ~ fetchBalance ~ address:", address);
      const balanceResponse = await ethersProvider.getBalance(address);
      const balanceInEther = ethers.formatEther(balanceResponse); // ethers V5 will need the utils module for those convertion operations

      // Format the balance using the utility function
      const fixedBalance = formatBalance(balanceInEther);

      setAddress(address);
      setBalance(fixedBalance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };


  const executeTxEthers = async () => {
    setIsSending(true);
    const signer = await ethersProvider.getSigner();
    const tx = {
      to: recipientAddress,
      value: ethers.parseEther("0.001"),
      data: "0x",
    };

    try {
      const txResponse = await signer.sendTransaction(tx);
      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        setTransactionHash(txReceipt.hash);
      } else {
        console.error("Transaction receipt is null");
      }
    } catch (error) {
      console.error("Error executing EVM transaction:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">

      {connectionStatus === 'loading' ? <Spinner text="Loading accounts info" /> :
        <div className="flex flex-grow">
          <Sidebar
            onSelect={setSelectedSection}
            selectedSection={selectedSection}
          />
          <MainContent
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
        </div>}

    </div>
  );
};

export default Home;