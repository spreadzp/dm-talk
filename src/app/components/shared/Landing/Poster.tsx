'use client';
import Image from "next/image";
import React, { useCallback } from "react";
import Title, { TitleEffect, TitleSize } from "../Title"; import { useStoreChat } from "@/app/hooks/store";


export interface PosterProps {
    title: string;
    imageUrl: any;
    description: string;
    features: string[];
    callToAction: string;
    joinUrl: string; // Add this prop for the join URL
    activeLabel?: string;
}

const Poster: React.FC<PosterProps> = ({ title, imageUrl, description, features, callToAction, joinUrl, activeLabel }) => {
    const { setSelectedSection } = useStoreChat(); // Use the store hook

    const handleJoinClick = useCallback((section: string) => {
        console.log("🚀 ~ handleJoinClick ~ section:", section)
        setSelectedSection(section); // Change the selected section
    }, [setSelectedSection]);

    return (
        <div className="poster p-4 bg-white bg-opacity-20 text-orange-200">
            <div className="poster-content">
                <div className="poster-description ">
                    <div className="text-xl text-center">{description}</div>
                    <ul className="list-disc px-4 text-left">
                        {features.map((feature, index) => (
                            <li key={index} className="text-base">{feature}</li>
                        ))}
                    </ul>
                    <div className="text-xl text-center flex items-start">
                        <div className="align-top cursor-pointer" onClick={() => handleJoinClick(joinUrl)}>
                            <Title
                                titleName={activeLabel || "Join"}
                                titleSize={TitleSize.H3}
                                titleEffect={TitleEffect.Gradient}
                            />
                        </div>
                        <span className="ml-2">{callToAction}</span>
                    </div>
                </div>
                <div className="poster-image-container">
                    <Image src={imageUrl} alt={title} className="poster-image" width={1500} height={350} />
                </div>
            </div>
        </div >
    );
};

export default Poster;