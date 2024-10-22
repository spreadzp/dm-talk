import { useEffect, useState } from "react";
import Table from "../../shared/Table";
import { useStoreChat } from "@/app/hooks/store";
import { getChatStatistics } from "@/app/server/chat";
import Title, { TitleEffect, TitleSize } from "../Title";
import Spinner from "../Spinner";

export const StatisticInfo = () => {
    const { setSelectedSection } = useStoreChat(); // Use the store hook
    const [chatStats, setChatStats] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            const stats = await getChatStatistics();
            setChatStats(stats);
            setIsLoading(false);
        };

        fetchData();
    }, []);


    const handleJoinClick = (section: string) => {
        setSelectedSection(section); // Change the selected section
    };

    return (
        <div className="container mx-auto p-4">
            <div className="mb-8">

                {isLoading ? <Spinner text="Loading statistics" /> : chatStats.map((stat, index) => (
                    <div key={index} className="mb-8">
                        <Title
                            titleName={`${stat.type} Chats`}
                            titleSize={TitleSize.H4}
                            titleEffect={TitleEffect.Gradient}
                        />
                        <Table data={[stat]} onJoinClick={() => handleJoinClick(stat.typeChat === "Private" ? "your channels" : "general chats")} buttonLabel="Join" />
                    </div>
                ))}
            </div>

        </div>
    );
};