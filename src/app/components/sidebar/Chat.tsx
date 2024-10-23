import { useStoreChat } from "@/app/hooks/store";
import { createUserChat, deleteMessageById, getChatByChatId, updateChatByChatId } from "@/app/server/chat";
import React, { createRef, useState, useEffect } from "react";
import { ChatList, MessageList, Input, Button } from "react-chat-elements";
import WalletAddressDisplay from "../shared/WalletAddressDisplay";
import RemoveMessageModal from "./RemoveMessageModal";
import { icons } from "./Icons";
import { rankAddresses } from "@/app/utils/utils";
import { ChatType } from "@prisma/client";
import DirectMessageModal from "./DirectMessageModal";

interface ChatProps {
    setSection: (section: string) => void;
}



const Chat: React.FC<ChatProps> = ({ setSection }) => {
    const inputReference = createRef<any>();
    const messageListReference = createRef<any>();
    const [chatData, setChatData] = useState<any>([]);
    const [inputMessage, setInputMessage] = useState<string>("");
    const { activeAccount, chainId, selectedChat, activeUser, setSelectedChat } = useStoreChat();
    const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
    const [addressPartner, setAddressPartner] = useState('');
    const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
    const [isValidChat, setIsValidChat] = useState(false);
    const [showDmModal, setShowDmModal] = useState(false);

    useEffect(() => {
        console.log('selectedChat :>>', selectedChat);
        fetchMessages(selectedChat?.chatId as string)
            .then(() => {
            });
    }, [selectedChat]);

    useEffect(() => {
        if (selectedChat) {
            setIsValidChat(true);
            const addresses = selectedChat.chatId?.split('_');
            if (addresses && addresses.length > 1) {
                setAddressPartner(addresses.find((address: string) => address !== activeAccount) as string);
            } else {
                setAddressPartner('');
            }
        }
    }, [selectedChat, activeAccount]);

    const fetchMessages = async (chatId: string) => {
        console.log("🚀 ~ fetchMessages ~ chatId:", chatId);
        if (chatId) {
            const data = await getChatByChatId(chatId);
            setChatData(data);
        }
    }

    const handleSendMessage = async () => {
        const ref: any = inputReference.current;
        if (ref && ref.value.trim() !== "") {
            const newMessage: any = {
                date: new Date(),
                message: ref.value.trim(),
                typeMessage: "text",
                userId: activeUser?.id,
            };
            await updateChatByChatId(selectedChat.chatId as string, newMessage);
            await fetchMessages(selectedChat.chatId as string);
            ref.value = "";
        }
    };

    const handleOnRemove = (selectedMessage: any) => {
        if (selectedMessage) {
            deleteMessageById(selectedMessage.dbId);
            fetchMessages(selectedChat?.chatId as string)
                .then(() => {
                });
        }
    }

    const handleRemoveMessage = (message: any) => {
        setSelectedMessage(message);
        setShowRemoveModal(true);
    };

    const handleMessageClick = async (message: any) => {
        debugger
        console.log("🚀 ~ handleMessageClick ~ message:", message)
        console.log("Clicked message address:", message.title);
        console.log('chatData :>>', chatData)
        if (message.title !== 'You' && chatData.type !== 'Private') {
            setSelectedMessage(message);
            setShowDmModal(true);
        }


    };

    const handleDirectMessage = async (message: any) => {
        console.log("🚀 ~ handleDirectMessage ~ message:", message)

        const chatId = rankAddresses(activeAccount as string, message.title);

        let existingChat = await getChatByChatId(chatId);

        if (!existingChat && activeAccount) {
            await createUserChat(activeAccount as string, chainId as string, chatId, ChatType.Private);
        }

        setSelectedChat({ chatId });
        setSection("chat");
        setShowDmModal(false);
    };

    return (
        <div>
            {isValidChat ?
                <div className="p-4 bg-gray-800 text-white rounded-lg shadow-lg min-h-screen">
                    {chatData.type === "Private" && <h2 className=" flex text-2xl font-bold mb-4">Your chat with &nbsp;  <WalletAddressDisplay address={addressPartner as string} />  </h2>}
                    {chatData.type === "General" && <a href={chatData?.url} target="_blank"
                        rel="noopener noreferrer" className=" flex text-2xl text-blue-600 hover:text-blue-800 mb-4">{chatData?.name} </a>}
                    <div className=" overflow-y-auto mb-4">
                        {String(chatData?.url).includes('https://www.youtube.com/') && <iframe
                            src={chatData?.url}
                            width="50%"
                            height="300"
                            allowFullScreen
                            title="YouTube Video"
                            className="mb-2"
                        />}
                        {chatData?.messages && <MessageList
                            referance={messageListReference}
                            className="message-list text-black"
                            lockable={true}
                            toBottomHeight={"100%"}
                            onRemoveMessageClick={handleRemoveMessage}
                            onClick={handleMessageClick}
                            dataSource={chatData?.messages.map((msg: any, index: number) => ({
                                id: index.toString(),
                                avatar: msg.user.avatar,
                                position: msg.user.senderAddress === activeAccount ? "right" : "left",
                                text: msg.message,
                                title: msg.user.senderAddress === activeAccount ? "You" : msg.user.senderAddress,
                                focus: false,
                                date: msg.date,
                                titleColor: "black",
                                forwarded: false,
                                replyButton: false,
                                removeButton: msg.user.senderAddress === activeAccount ? true : false,
                                status: "read",
                                notch: true,
                                retracted: false,
                                type: msg.typeMessage,
                                // Add onClick handler
                            }))}
                        />}
                    </div>
                    <div className="flex">
                        <Input
                            referance={inputReference}
                            className="flex-grow mr-2 text-black"
                            maxHeight={10}
                            multiline={true}
                            placeholder="Type a message"
                            value={inputMessage}
                            onChange={(e: any) => setInputMessage(e.target.value)}
                            rightButtons={<Button color='yellow' backgroundColor='blue' text='Send' onClick={handleSendMessage} />}
                        />
                    </div>
                    {showRemoveModal && (
                        <RemoveMessageModal
                            message={selectedMessage}
                            onClose={() => setShowRemoveModal(false)}
                            onRemove={(message: any) => {
                                handleOnRemove(message);
                                setShowRemoveModal(false);
                            }}
                        />
                    )}
                    {showDmModal && (
                        <DirectMessageModal
                            message={selectedMessage}
                            onChat={(message: any) => {
                                handleDirectMessage(message);
                                setSelectedChat(message);
                                setShowDmModal(false);
                            }}
                            onClose={() => setShowDmModal(false)}
                        />
                    )}
                </div> :
                <div className="p-4 bg-gray-800 text-white rounded-lg shadow-lg">
                    <h2 className=" flex text-2xl font-bold mb-4">Select a chat please in Inbox
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icons[2].icon}></path>
                        </svg> &nbsp;
                        or Channels   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icons[3].icon}></path>
                        </svg>&nbsp; sections</h2>

                </div>
            }
        </div>

    );
};

export default Chat;