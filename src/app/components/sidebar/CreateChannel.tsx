import React, { useState } from "react";
import { createHashFromString, rankAddresses } from "@/app/utils/utils";
import { createGeneralChat, createUserChat, getChatByChatId } from "@/app/server/chat";
import { useStoreChat } from "@/app/hooks/store";
import Title, { TitleEffect, TitleSize } from "../shared/Title";
import { ChatType } from "@prisma/client";

interface CreateChannelProps {
    setSection: (section: string) => void;
}

export const CreateChannel: React.FC<CreateChannelProps> = ({ setSection }) => {
    const [inputAddress, setInputAddress] = useState<string>("");
    const [chatType, setChatType] = useState<"private" | "general">("private");
    const [chatTopic, setChatTopic] = useState<string>("");
    const [topicUrl, setTopicUrl] = useState<string>("");
    const { activeAccount, chainId, setSelectedChat, setChatId } = useStoreChat();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (chatType === "private") {
            const chatId = rankAddresses(activeAccount as string, inputAddress);
            setChatId(chatId);
            console.log("🚀 ~ handleSubmit ~ chatId:", chatId);

            let existingChat = await getChatByChatId(chatId);

            if (!existingChat && activeAccount) {
                await createUserChat(activeAccount as string, chainId as string, chatId, ChatType.Private);
            }
            setSelectedChat({ chatId });
        } else {
            // For general chat, you can generate a unique chatId based on the topic or URL
            const hashedChatId = createHashFromString(topicUrl) as string;
            setChatId(hashedChatId);
            let existingChat = await getChatByChatId(hashedChatId);
            debugger
            if (!existingChat && activeAccount) {
                await createGeneralChat(activeAccount as string, hashedChatId as string, topicUrl, chatTopic, ChatType.General);
            }
            setSelectedChat({ chatId: hashedChatId });
        }

        setSection("chat");
    };

    return (
        <div className="text-center">
            <Title
                titleName="Create Channel"
                titleSize={TitleSize.H3}
                titleEffect={TitleEffect.Zoom}
            />
            <p>This is the create channel section. Choose the type of chat you want to create.</p>
            <form className="mt-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="mr-2">
                        <input
                            type="radio"
                            value="private"
                            checked={chatType === "private"}
                            onChange={() => setChatType("private")}
                        />
                        Private Chat
                    </label>
                    <label className="ml-4">
                        <input
                            type="radio"
                            value="general"
                            checked={chatType === "general"}
                            onChange={() => setChatType("general")}
                        />
                        General Chat
                    </label>
                </div>
                {chatType === "private" ? (
                    <input
                        type="text"
                        placeholder="Enter Address"
                        className="p-2 w-full rounded border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                        value={inputAddress}
                        onChange={(e) => setInputAddress(e.target.value)}
                    />
                ) : (
                    <div>
                        <input
                            type="text"
                            placeholder="Enter name of the topic"
                            className="p-2 w-full rounded border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                            value={chatTopic}
                            onChange={(e) => setChatTopic(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Enter URL of the topic"
                            className="p-2 w-full rounded border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                            value={topicUrl}
                            onChange={(e) => setTopicUrl(e.target.value)}
                        />
                    </div>

                )}
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