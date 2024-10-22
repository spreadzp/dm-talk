import { useStoreChat } from "@/app/hooks/store";
import { getChatsWithUser, getGeneralChatsWithUser, getUserChatsByUserAddress } from "@/app/server/chat";
import { useEffect, useState } from "react"; import Table from "../shared/Table";
import Spinner from "../shared/Spinner";
import Title, { TitleEffect, TitleSize } from "../shared/Title";
interface ChannelsProps {
    setSection: (section: string) => void;
}

export const Channels: React.FC<ChannelsProps> = ({ setSection }) => {
    const { activeAccount, setChatId, chainId, setSelectedChat } = useStoreChat();
    const [chats, setChats] = useState<any[]>([]);
    const [generalChats, setGeneralChats] = useState<any[]>([]);
    const [loadingPrivate, setLoadingPrivate] = useState<boolean>(true);
    const [loadingGeneral, setLoadingGeneral] = useState<boolean>(true);

    useEffect(() => {
        setLoadingPrivate(true);
        setLoadingGeneral(true);
        if (activeAccount) {
            getUserChatsByUserAddress(activeAccount as string).then((chats) => {
                console.log("🚀 ~ getChatsWithUser ~ chats:", chats);
                setChats(chats);
                setLoadingPrivate(false);
            });
            getGeneralChatsWithUser(activeAccount as string).then((chats) => {
                setGeneralChats(chats);
                setLoadingGeneral(false);
            })

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
            <br />
            {loadingPrivate ? <Spinner text="Loading channels..." /> :
                chats.length > 0 ? <div>
                    <Title
                        titleName="Private channels you participate in"
                        titleSize={TitleSize.H4}
                        titleEffect={TitleEffect.Zoom}
                    />
                    <Table data={chats} onJoinClick={(item) => handleJoin(item)} buttonLabel="Join" />
                </div> :
                    <p>No private channels found</p>}
            <br />
            {loadingGeneral ? <Spinner text="Loading general channels..." /> :
                generalChats.length > 0 ? <div>
                    <Title
                        titleName="General channels you participate in"
                        titleSize={TitleSize.H4}
                        titleEffect={TitleEffect.Zoom}
                    />
                    <Table data={generalChats} onJoinClick={(item) => handleJoin(item)} buttonLabel="Join" />

                </div> :
                    <p>No general channels found</p>}
        </div>
    );
};