import { useStoreChat } from "@/app/hooks/store";
import { getGeneralChats, addUserToChat } from "@/app/server/chat";
import { useEffect, useState } from "react";
import Table from "../shared/Table";
import Spinner from "../shared/Spinner";
import Title, { TitleEffect, TitleSize } from "../shared/Title";

interface ChannelsProps {
    setSection: (section: string) => void;
}

export const GeneralChannels: React.FC<ChannelsProps> = ({ setSection }) => {
    const { setSelectedChat, activeAccount } = useStoreChat();

    const [generalChats, setGeneralChats] = useState<any[]>([]);
    const [loadingGeneral, setLoadingGeneral] = useState<boolean>(true);

    useEffect(() => {
        setLoadingGeneral(true);

        getGeneralChats().then((chats) => {
            setGeneralChats(chats);
            setLoadingGeneral(false);
        });
    }, []);

    const handleJoin = async (item: any) => {
        try {
            await addUserToChat(activeAccount, item.chatId);
            setSelectedChat(item);
            setSection("chat");
        } catch (error) {
            console.error("Error joining chat:", error);
        }
    };

    return (
        <div className="text-center">
            <Title
                titleName="General channels"
                titleSize={TitleSize.H3}
                titleEffect={TitleEffect.Zoom}
            />
            <br />

            {loadingGeneral ? <Spinner text="Loading general channels..." /> :
                generalChats.length > 0 ? <div>
                    <Title
                        titleName="General channels you can join"
                        titleSize={TitleSize.H4}
                        titleEffect={TitleEffect.Zoom}
                    />
                    <Table data={generalChats} onJoinClick={(item) => handleJoin(item)} buttonLabel="Join" />

                </div> :
                    <p>No general channels found</p>}
        </div>
    );
};