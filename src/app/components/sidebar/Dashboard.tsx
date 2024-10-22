import Landing from "../shared/Landing/Landing";

interface DashboardProps {
    setSection: (section: string) => void;
}
export const Dashboard: React.FC<DashboardProps> = ({ setSection }) => (
    <div className="text-center">
        <Landing />
    </div>
);