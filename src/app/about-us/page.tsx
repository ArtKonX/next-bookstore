import AboutUsContainer from "@/components/aboutUs/AboutUsContainer";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'AboutUs',
}

const AboutUs = () => {

    return (
        <div>
            <AboutUsContainer />
        </div>
    );
};

export default AboutUs;