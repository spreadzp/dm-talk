import React from 'react';

interface DirectMessageModalProps {
    message: any;
    onClose: () => void;
    onChat: (removedMessage: string) => void;
}

const DirectMessageModal: React.FC<DirectMessageModalProps> = ({ message, onClose, onChat }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
                <span className="close text-black text-xl cursor-pointer" onClick={onClose}>&times;</span>
                <h2 className="text-lg font-bold mb-2 text-black">Direct message with {message?.title}</h2>
                <div className="mb-4 text-black">
                    <div>{"Do you want to continue the conversation in private chat?"}</div>
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>Cancel</button>
                    <button className="bg-blue-500 hover:bg-[hsl(187,100%,68%)] text-red-500 font-bold py-2 px-4 rounded mr-2" onClick={() => onChat(message)}>Go to chat</button>
                </div>
            </div>
        </div>
    );
};

export default DirectMessageModal;