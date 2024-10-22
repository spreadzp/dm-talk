import { useEffect, useState } from "react";
import Title, { TitleEffect, TitleSize } from "../shared/Title";
import { inboxChatsByUserAddress } from "@/app/server/chat";
import { useStoreChat } from "@/app/hooks/store";
import Table from "../shared/Table";
import Spinner from "../shared/Spinner";

interface InboxProps {
    setSection: (section: string) => void;
}

export const Inbox: React.FC<InboxProps> = ({ setSection }) => {
    const { activeAccount, setChatId, chainId, setSelectedChat } = useStoreChat();
    const [chats, setChats] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (activeAccount) {
            setLoading(true);
            inboxChatsByUserAddress(activeAccount as string).then((chats) => {
                console.log("🚀 ~ inboxChatsByUserAddress ~ chats:", chats);
                setChats(chats);
                setLoading(false);
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
                titleName="Inbox"
                titleSize={TitleSize.H3}
                titleEffect={TitleEffect.Zoom}
            />
            {loading ? (
                <Spinner text="Loading inbox..." />
            ) : chats.length > 0 ? (
                <Table data={chats} onJoinClick={(item) => handleJoin(item)} buttonLabel="Join" />
            ) : (
                <p>No inbox messages not answered.</p>
            )}
        </div>
    );
};