import { useStoreChat } from "@/app/hooks/store";
import { getChatsWithUser, getUserChatsByUserAddress } from "@/app/server/chat";
import { useEffect, useState } from "react"; import Table from "../shared/Table";
import Spinner from "../shared/Spinner";
import Title, { TitleEffect, TitleSize } from "../shared/Title";
interface ChannelsProps {
    setSection: (section: string) => void;
}

export const Channels: React.FC<ChannelsProps> = ({ setSection }) => {
    const { activeAccount, setChatId, chainId, setSelectedChat } = useStoreChat();
    const [chats, setChats] = useState<any[]>([]);

    useEffect(() => {
        if (activeAccount) {
            getUserChatsByUserAddress(activeAccount as string).then((chats) => {
                console.log("🚀 ~ getChatsWithUser ~ chats:", chats);
                setChats(chats);
            });
        }
    }, [activeAccount]);

    const handleJoin = async (item: any) => {
        setSelectedChat(item);
        setSection("chat");
    };

    return (
        <div className="text-center">
            <Title
                titleName="Channels"
                titleSize={TitleSize.H3}
                titleEffect={TitleEffect.Zoom}
            />
            {chats.length > 0 ? <Table data={chats} onJoinClick={(item) => handleJoin(item)} buttonLabel="Join" /> : <Spinner text="Loading channels..." />}
        </div>
    );
};