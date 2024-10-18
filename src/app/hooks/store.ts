import { create } from "zustand";

interface StoreChat {
    selectedSection: string;
    setSelectedSection: (section: string) => void;
    activeAccount: string | null;
    setActiveAccount: (account: string | null) => void;
    chainId: string | null;
    setChainId: (chainId: string | null) => void;
    chatId: string | null;
    setChatId: (chatId: string | null) => void;
    selectedChat: any;
    setSelectedChat: (chat: any) => void;
    activeUser: any;
    setActiveUser: (user: any) => void;
}

export const useStoreChat = create<StoreChat>((set) => ({
    selectedSection: "dashboard",
    setSelectedSection: (section: string) => set({ selectedSection: section }),
    activeAccount: null,
    setActiveAccount: (account: string | null) => set({ activeAccount: account }),
    chainId: null,
    setChainId: (chainId: string | null) => set({ chainId: chainId }),
    chatId: null,
    setChatId: (chatId: string | null) => set({ chatId: chatId }),
    selectedChat: null,
    setSelectedChat: (chat: any) => set({ selectedChat: chat }),
    activeUser: null,
    setActiveUser: (user: any) => set({ activeUser: user }),
}))