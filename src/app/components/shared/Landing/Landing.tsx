'use client';
import Footer from "../Footer";
import Collaboration from "./Collaboration";
import FeatureSlider from "./FeatureSlider";
import sliderItems from "./SliderItems";
import { Statistic } from "./Statistic";



const Landing: React.FC = () => {
    return (
        <>
            <div className="min-h-screen">
                <div className="container mx-auto p-4">
                    <div className="landing">
                        <FeatureSlider items={sliderItems} />
                        <div className="mt-8"></div>
                        <Statistic />
                        <Collaboration />
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Landing;