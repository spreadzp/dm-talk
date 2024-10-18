import React, { useState } from "react";
import { rankAddresses } from "@/app/utils/utils";
import { createUserChat, getChatByChatId } from "@/app/server/chat";
import { useStoreChat } from "@/app/hooks/store";
import Title, { TitleEffect, TitleSize } from "../shared/Title";

interface CreateChannelProps {
    setSection: (section: string) => void;
}

export const CreateChannel: React.FC<CreateChannelProps> = ({ setSection }) => {
    const [inputAddress, setInputAddress] = useState<string>("");
    const { activeAccount, chainId, setSelectedChat, setChatId } = useStoreChat();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const chatId = rankAddresses(activeAccount as string, inputAddress);
        setChatId(chatId);
        console.log("🚀 ~ handleSubmit ~ chatId:", chatId)
        debugger
        let existingChat = await getChatByChatId(chatId);

        if (!existingChat && activeAccount) {
            await createUserChat(activeAccount as string, chainId as string, [chatId]);
        }
        setSelectedChat({ chatId });
        setSection("chat");
    };

    return (
        <div className="text-center">
            <Title
                titleName="Create Channel"
                titleSize={TitleSize.H3}
                titleEffect={TitleEffect.Zoom}
            />
            <p>This is the create channel section. Enter the address of the user with whom you want to create a chat.</p>
            <form className="mt-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter Address"
                    className="p-2 w-full rounded border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={inputAddress}
                    onChange={(e) => setInputAddress(e.target.value)}
                />
                <button
                    type="submit"
                    className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                >
                    Create Channel
                </button>
            </form>
        </div>
    );
};