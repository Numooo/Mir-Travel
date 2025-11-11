import Header from "@/components/Header";
import Link from "next/link";

const Hero = () => {
    return (
        <div className={'text-white px-5 md:px-0 min-h-screen'}>
            <Header svgColor="#fff" />
            <div className={"flex md:flex-row flex-col container px-8 items-center pt-4 md:pt-16 justify-between"}>
                <div className={'flex md:text-left text-center flex-col md:w-1/2 gap-5 items-center'}>
                    <h1 className={'tracking-wide text-4xl md:text-5xl font-semibold'}>Author's tours throughout Kyrgyzstan</h1>
                    <p className={''}>Book tours and discover Kyrgyzstan from new sides!
                        Unique routes, cultural immersion, exciting adventures in the mountains and steppes in all the
                        regions!</p>
                </div>
                <div className={'md:w-2/5'}>
                    <img className={''} src="/assets/karta.png" alt=""/>
                </div>
            </div>
        </div>
    );
};

export default Hero;