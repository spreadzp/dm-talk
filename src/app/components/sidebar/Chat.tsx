import { useStoreChat } from "@/app/hooks/store";
import { deleteMessageById, getChatByChatId, updateChatByChatId } from "@/app/server/chat";
import React, { createRef, useState, useEffect } from "react";
import { ChatList, MessageList, Input, Button } from "react-chat-elements";
import WalletAddressDisplay from "../shared/WalletAddressDisplay";
import RemoveMessageModal from "./RemoveMessageModal";
import { icons } from "./Icons";

interface ChatProps {
    setSection: (section: string) => void;
}

interface Message {
    avatar: string,
    date: Date;
    message: string;
    senderAddress: string;
    typeMessage: any//"text" | "cypher" | "image" | "video" | "file";
}

const Chat: React.FC<ChatProps> = ({ setSection }) => {
    const inputReference = createRef<any>();
    const messageListReference = createRef<any>();
    const [chatData, setChatData] = useState<any>([]);
    const [inputMessage, setInputMessage] = useState<string>("");
    const { activeAccount, chatId, selectedChat, activeUser } = useStoreChat();
    const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
    const [addressPartner, setAddressPartner] = useState('')
    const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
    const [isValidChat, setIsValidChat] = useState(false)
    useEffect(() => {
        console.log('selectedChat :>>', selectedChat)
        fetchMessages(selectedChat?.chatId as string)
            .then(() => {
            })

    }, [selectedChat]);

    useEffect(() => {
        if (selectedChat) {
            setIsValidChat(true)
            const addresses = selectedChat.chatId?.split('_');
            if (addresses && addresses.length > 1) {
                setAddressPartner(addresses.find((address: string) => address !== activeAccount) as string);
            } else {
                setAddressPartner('');
            }
        }
    }, [selectedChat, activeAccount]);
    const fetchMessages = async (chatId: string) => {
        debugger
        console.log("🚀 ~ fetchMessages ~ chatId:", chatId)
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
            await fetchMessages(selectedChat.chatId as string)
            ref.value = "";
        }
    };

    const handleOnRemove = (selectedMessage: any) => {
        if (selectedMessage) {
            deleteMessageById(selectedMessage.dbId);
            fetchMessages(selectedChat?.chatId as string)
                .then(() => {
                })
        }
    }
    const handleRemoveMessage = (message: any) => {
        setSelectedMessage(message);
        setShowRemoveModal(true);
    };

    return (
        <div>
            {isValidChat ?
                <div className="p-4 bg-gray-800 text-white rounded-lg shadow-lg">
                    {chatData.type === "Private" && <h2 className=" flex text-2xl font-bold mb-4">Your chat with &nbsp;  <WalletAddressDisplay address={addressPartner as string} />  </h2>}
                    {chatData.type === "General" && <h2 className=" flex text-2xl font-bold mb-4">{chatData?.name} </h2>}
                    <div className="h-64 overflow-y-auto mb-4">
                        {chatData?.messages && <MessageList
                            referance={messageListReference}
                            className="message-list text-black"
                            lockable={true}
                            toBottomHeight={"100%"}
                            onRemoveMessageClick={handleRemoveMessage}
                            dataSource={chatData?.messages.map((msg: any, index: number) => ({
                                id: index.toString(),
                                avatar: msg.user.avatar,
                                position: msg.user.senderAddress === activeAccount ? "right" : "left",
                                text: msg.message,
                                title: msg.user.senderAddress === activeAccount ? "You" : msg.user.senderAddress,
                                atarFlexible: true,
                                date: msg.date,
                                type: msg.typeMessage,
                                dbId: msg.id,
                                removeButton: msg.user.senderAddress === activeAccount ? true : false,

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
                                handleOnRemove(message)
                                setShowRemoveModal(false);
                            }}
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