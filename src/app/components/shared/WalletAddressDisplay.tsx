import { useState } from "react";
import { getIconByName } from "./Icons";

interface WalletAddressDisplayProps {
    address: string;
}

const WalletAddressDisplay: React.FC<WalletAddressDisplayProps> = ({ address }) => {
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const handleCopyClick = () => {
        navigator.clipboard.writeText(address).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    const formatAddress = (address: string): string => {
        if (!address) return '';
        return `${address.slice(0, 4)}....${address.slice(-4)}`;
    };

    return (
        <div className="flex items-center justify-center  space-x-4">
            <span>{formatAddress(address)}</span>
            <button
                onClick={handleCopyClick}
                className="focus:outline-none"
                title={isCopied ? 'Copied!' : 'Copy to clipboard'}
            >
                {getIconByName('Copy')}
            </button>
        </div>
    );
};

export default WalletAddressDisplay;