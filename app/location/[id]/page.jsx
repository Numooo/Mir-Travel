"use client"

import {useEffect} from "react";
import {useGetByIdLocation, useLocation} from "@/stores/locationStore";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {useParams} from "next/navigation";

const Page = () => {
    const {id} = useParams();
    const location = useLocation()
    const getByIdLocation = useGetByIdLocation()
    useEffect(() => {
        getByIdLocation(id)
    }, [getByIdLocation, id]);
    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, []);

    if (!location) {
        return (
            <div className="flex items-center justify-center h-screen text-white">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="relative h-[65vh] md:h-[70vh] overflow-hidden">
                <img
                    src={location.bg}
                    alt={location.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-blue-950/70 to-blue-950/40"/>

                <div className="absolute inset-0 flex items-end">
                    <div className="w-full flex flex-col justify-between h-full">
                        <Header/>
                        <div className="container px-8 flex w-full">
                            <div className="md:p-24 p-8">
                                <div className="flex items-center gap-2 mb-3 md:mb-4 text-white/90">
                                    <svg width="14" height="20" viewBox="0 0 14 20" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M14 7C14 6.08075 13.8189 5.1705 13.4672 4.32122C13.1154 3.47194 12.5998 2.70026 11.9497 2.05025C11.2997 1.40024 10.5281 0.884626 9.67878 0.532843C8.8295 0.18106 7.91925 0 7 0C6.08075 0 5.17049 0.18106 4.32122 0.532843C3.47194 0.884626 2.70026 1.40024 2.05025 2.05025C1.40024 2.70026 0.884626 3.47194 0.532843 4.32122C0.18106 5.1705 -1.36979e-08 6.08075 0 7C0 8.387 0.41 9.677 1.105 10.765H1.097C3.457 14.46 7 20 7 20L12.903 10.765H12.896C13.6164 9.64137 13.9995 8.33474 14 7ZM7 10C6.20435 10 5.44129 9.68393 4.87868 9.12132C4.31607 8.55871 4 7.79565 4 7C4 6.20435 4.31607 5.44129 4.87868 4.87868C5.44129 4.31607 6.20435 4 7 4C7.79565 4 8.55871 4.31607 9.12132 4.87868C9.68393 5.44129 10 6.20435 10 7C10 7.79565 9.68393 8.55871 9.12132 9.12132C8.55871 9.68393 7.79565 10 7 10Z"
                                            fill="#FFFFFF"/>
                                    </svg>
                                    <span className="text-sm md:text-base">{location.region}</span>
                                </div>
                                <h1 className="text-white mb-3 md:mb-4 max-w-4xl">{location.title}</h1>
                                <p className="text-white/90 text-base md:text-xl max-w-3xl">{location.text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-8 md:py-16">
                <div className="container mx-auto px-4 mb-12 md:mb-16">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-blue-950 mb-4 text-2xl md:mb-6">About the {location.title}</h2>
                        <p className="text-blue-950/80 text-base md:text-lg leading-relaxed">
                            {location.description}
                        </p>
                    </div>
                </div>

                {location.images && location.images.length > 0 && (
                    <div className="mb-12 md:mb-16">
                        <div className="container mx-auto px-4 mb-6 md:mb-8">
                            <h2 className="text-blue-950 text-center text-3xl">Gallery</h2>
                        </div>

                        <div className="md:hidden overflow-x-auto scrollbar-hide">
                            <div className="flex gap-3 px-4 pb-4">
                                {location.images.map((img, index) => (
                                    <div
                                        key={index}
                                        className="relative flex-shrink-0 w-[85vw] overflow-hidden rounded-lg aspect-[4/3]"
                                    >
                                        <img
                                            src={img}
                                            alt={`${location.title} - фото ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="hidden md:block max-w-5xl mx-auto px-4">
                            <div className="grid grid-cols-2 gap-4">
                                {location.images.map((img, index) => (
                                    <div
                                        key={index}
                                        className="relative overflow-hidden rounded-lg aspect-[4/3] group"
                                    >
                                        <img
                                            src={img}
                                            alt={`${location.title} - фото ${index + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {location.mapUrl && (
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto">
                            <h2 className="text-blue-950 text-3xl mb-6 md:mb-8 text-center">Location on the map</h2>
                            <div className="rounded-lg overflow-hidden shadow-xl border-2 md:border-4 border-blue-950">
                                <iframe
                                    src={location.mapUrl}
                                    width="100%"
                                    height="400"
                                    className="md:h-[500px]"
                                    style={{border: 0}}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title={`Карта ${location.title}`}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className={'bg-cover bg-bottom'} style={{backgroundImage: `url(${location.bg})`}}>
                <Footer/>
            </div>
        </div>
    );
};

export default Page;
