import Title, { TitleEffect, TitleSize } from "../shared/Title";

interface InboxProps {
    setSection: (section: string) => void;
}

export const Inbox: React.FC<InboxProps> = ({ setSection }) => (
    <div className="text-center">
        <Title
            titleName="Inbox"
            titleSize={TitleSize.H3}
            titleEffect={TitleEffect.Zoom}
        />
        <p>This is the inbox section.</p>
    </div>
);