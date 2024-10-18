import Title, { TitleEffect, TitleSize } from "../shared/Title";

interface DashboardProps {
    setSection: (section: string) => void;
}
export const Dashboard: React.FC<DashboardProps> = ({ setSection }) => (
    <div className="text-center">
        <Title
            titleName="Dashboard"
            titleSize={TitleSize.H3}
            titleEffect={TitleEffect.Zoom}
        />
        <p>Welcome to the dashboard!</p>
    </div>
);