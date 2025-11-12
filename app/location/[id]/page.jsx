"use client"

import {useEffect, useRef} from "react";
import {useGetByIdLocation, useLocation} from "@/stores/locationStore";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {useParams} from "next/navigation";
import {MapPin} from "lucide-react";

const Page = () => {
    const scrollRef = useRef(null);
    const isUserScrolling = useRef(false);
    const lastTouchX = useRef(0);
    const {id} = useParams();
    const location = useLocation()
    const getByIdLocation = useGetByIdLocation()
    useEffect(() => {
        getByIdLocation(id)
    }, [getByIdLocation, id]);
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        let scrollAmount = 0;
        let animationFrame;

        const speed = 0.3;

        const step = () => {
            if (!isUserScrolling.current) {
                scrollAmount += speed;
                if (scrollAmount >= el.scrollWidth / 2) {
                    scrollAmount = 0;
                }
                el.scrollLeft = scrollAmount;
            }
            animationFrame = requestAnimationFrame(step);
        };

        animationFrame = requestAnimationFrame(step);

        // события для ручного управления
        const handleWheel = () => {
            isUserScrolling.current = true;
            clearTimeout(el._scrollTimeout);
            el._scrollTimeout = setTimeout(() => (isUserScrolling.current = false), 1000);
        };

        const handleTouchStart = (e) => {
            isUserScrolling.current = true;
            lastTouchX.current = e.touches[0].clientX;
        };

        const handleTouchMove = (e) => {
            const deltaX = lastTouchX.current - e.touches[0].clientX;
            el.scrollLeft += deltaX;
            lastTouchX.current = e.touches[0].clientX;
        };

        const handleTouchEnd = () => {
            clearTimeout(el._scrollTimeout);
            el._scrollTimeout = setTimeout(() => (isUserScrolling.current = false), 1000);
        };

        el.addEventListener("wheel", handleWheel);
        el.addEventListener("touchstart", handleTouchStart);
        el.addEventListener("touchmove", handleTouchMove);
        el.addEventListener("touchend", handleTouchEnd);

        return () => {
            cancelAnimationFrame(animationFrame);
            el.removeEventListener("wheel", handleWheel);
            el.removeEventListener("touchstart", handleTouchStart);
            el.removeEventListener("touchmove", handleTouchMove);
            el.removeEventListener("touchend", handleTouchEnd);
        };
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
                                    <MapPin className="w-5 h-5 flex-shrink-0"/>
                                    <span className="text-sm md:text-base">{location.region}</span>
                                </div>
                                <h1 className="text-white mb-3 md:mb-4 max-w-4xl">{location.title}</h1>
                                <p className="text-white/90 md:inline hidden text-base md:text-xl max-w-3xl">{location.text}</p>
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

                        <div className="md:hidden overflow-x-auto whitespace-nowrap scrollbar-hide"
                             ref={scrollRef}>
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
