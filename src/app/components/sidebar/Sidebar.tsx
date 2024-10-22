import React from "react";
import { icons } from "./Icons";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { useConnect } from "@particle-network/authkit";
import { getIconByName } from "../shared/Icons";
import Image from 'next/image'; // Import the Image component from next/image
import logoImage from './../../../../assets/logo-site.png';

interface SidebarProps {
    onSelect: (section: string) => void;
    selectedSection: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect, selectedSection }) => {
    const { connect, disconnect, connectionStatus, connected } = useConnect();
    // Handle user login
    const handleLogin = async () => {
        if (!connected) {
            await connect({});
        }
    };

    // Handle user disconnect
    const handleDisconnect = async () => {
        try {
            await disconnect();
        } catch (error) {
            console.error("Error disconnecting:", error);
        }
    };
    return (
        <aside className="w-24 bg-gray-800 text-white flex flex-col items-center py-4">
            <div className="mb-4 p-2 rounded" data-tooltip-id="social-tooltip" data-tooltip-content={"Chain messenger"}>
                <Image src={logoImage} alt={'Chain messenger'} className="w-12 h-12 rounded-full" width={32} height={32} />
            </div>
            {
                icons.map((icon) => (
                    <button
                        key={icon.name}
                        className={`mb-4 p-2 rounded ${selectedSection === icon.name.toLowerCase() ? "bg-purple-600" : "hover:bg-purple-700"}`}
                        onClick={() => onSelect(icon.name.toLowerCase())} title={icon.name}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon.icon}></path>
                        </svg>
                    </button>
                ))
            }
            {
                connectionStatus === 'disconnected' && <button
                    className="focus:outline-none"
                    onClick={handleLogin} title="Connect"
                >
                    {getIconByName('SignIn')}
                </button>
            }
            {
                connectionStatus === 'connected' && <button
                    className="focus:outline-none"
                    title="Disconnect"
                    onClick={handleDisconnect}
                >
                    {getIconByName('SignOut')}
                </button>
            }
            <Tooltip id="social-tooltip" />
        </aside >
    );
};

export default Sidebar;