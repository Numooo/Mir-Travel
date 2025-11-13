"use client";

import { Suspense, useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Hero from "@/app/main/Hero";
import LocationCard from "@/app/main/LocationCard";
import IncludedExcluded from "@/app/main/IncludedExcluded";
import TourCard from "@/app/main/TourCard";
import WhatsAppButton from "@/components/WhatsAppButton";

function PageContent() {
    const images = [
        "/assets/бир.jpg",
        "/assets/issykkul.jpg",
        "/assets/karakolbg.webp",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);
    useEffect(() => {
        images.forEach((src) => {
            const img = new Image();
            img.src = src; // браузер кэширует изображение
        });
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % images.length);
                setFade(true);
            }, 500);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative overflow-hidden">
            <div
                className={`fixed inset-0 -z-10 bg-cover bg-center transition-opacity duration-500 ${
                    fade ? "opacity-100" : "opacity-0"
                }`}
                style={{ backgroundImage: `url(${images[currentIndex]})` }}
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10">
                <Hero />
                <LocationCard />
                <IncludedExcluded />
                <TourCard />
                <Footer />
                <WhatsAppButton />
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<div role="status" aria-live="polite">Loading...</div>}>
            <PageContent />
        </Suspense>
    );
}
