import posterImage from './../../../../../assets/cm1.png';
import voteImage from './../../../../../assets/cm2.png';
import discussionImage from './../../../../../assets/cm3.png';
import surveyImage from './../../../../../assets/cm4.png';
import datasetImage from './../../../../../assets/cm5.png';
import particleNetworkImage from './../../../../../assets/particle-network.png'; // Add the new image for Particle Network
import { PosterProps } from './Poster';

const sliderItems: PosterProps[] = [
    {
        title: "Chain Messenger",
        imageUrl: posterImage,
        description: "Chain Messenger is a decentralized communication platform designed to facilitate secure, private, and efficient messaging. Join private chats, participate in general discussions, and manage your channels with ease.",
        features: [
            "Secure and private messaging.",
            "Decentralized chat management.",
            "User-friendly interface for seamless navigation.",
            "Real-time updates and notifications.",
            "Customizable experience to suit your needs."
        ],
        callToAction: "Chain Messenger and experience the future of secure communication.",
        joinUrl: "dashboard",
        activeLabel: "Join To"
    },
    {
        title: "Private Chats",
        imageUrl: discussionImage,
        description: "Engage in secure and private one-on-one or group chats. Share sensitive information, discuss personal topics, and ensure your conversations remain confidential.",
        features: [
            "End-to-end encryption for secure messaging.",
            "Group chat functionality for multiple participants.",
            "Customizable privacy settings.",
            "Real-time message synchronization.",
            "Easily manage and switch between chats."
        ],
        callToAction: "in private chats and enjoy secure communication.",
        joinUrl: "general chats",
        activeLabel: "Participate"
    },
    {
        title: "General Channels",
        imageUrl: voteImage,
        description: "Join open discussions on a variety of topics. Share ideas, collaborate on projects, and engage with a broader community. Make your voice heard and contribute to the conversation.",
        features: [
            "Public and open discussion forums.",
            "Reward mechanisms for active participation.",
            "Moderation tools to ensure a respectful environment.",
            "Integration with blockchain for transparency.",
            "Easily find and join channels of interest."
        ],
        callToAction: "your voice and earn rewards for your contributions.",
        joinUrl: "general chats",
        activeLabel: "Cast"
    },
    {
        title: "Channel Management",
        imageUrl: surveyImage,
        description: "Effortlessly manage your channels. Create new channels, invite participants, and customize settings to suit your needs. Stay organized and in control of your communication.",
        features: [
            "Create and manage multiple channels.",
            "Invite participants and manage roles.",
            "Customizable channel settings.",
            "Real-time analytics and insights.",
            "Integration with blockchain for secure management."
        ],
        callToAction: "your channels and streamline your communication.",
        joinUrl: "create channel",
        activeLabel: "Participate"
    },
    {
        title: "Real-Time Updates",
        imageUrl: datasetImage,
        description: "Stay informed with real-time message updates. Never miss an important discussion or announcement. Get instant notifications and stay connected.",
        features: [
            "Real-time message synchronization.",
            "Instant notifications for new messages.",
            "Customizable notification settings.",
            "Seamless integration with your workflow.",
            "Ensure you never miss an important update."
        ],
        callToAction: "to real-time updates and stay connected.",
        joinUrl: "your channels",
        activeLabel: "Contribute"
    },
    {
        title: "Particle Network Integration",
        imageUrl: particleNetworkImage,
        description: "Experience seamless onboarding and interaction with Chain Messenger through Particle Network's Wallet-as-a-Service. Users can create AA accounts directly via Particle Auth, leveraging familiar social accounts like Google for a smooth Web3 experience.",
        features: [
            "Non-custodial key management for secure account creation.",
            "Onboarding through familiar social accounts (OAuth).",
            "Embedded wallet interface within the application.",
            "Customizable transaction confirmations within the app.",
            "Integration with Particle Auth SDK for easy implementation."
        ],
        callToAction: "Chain Messenger with Particle Network and enjoy a seamless Web3 experience.",
        joinUrl: "dashboard",
        activeLabel: "Integrate"
    },
];

export default sliderItems;