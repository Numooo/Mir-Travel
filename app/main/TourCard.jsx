"use client";

import {useEffect} from "react";
import Link from "next/link";
import {Calendar, Clock, MapPin, ArrowRight} from 'lucide-react';
import {useGetTours, useLoadingTour, useTours} from "@/stores/tourStore";

const TourCard = () => {
    const tours = useTours();
    const getTours = useGetTours();
    const loadingTour = useLoadingTour();

    useEffect(() => {
        void getTours()
    }, [getTours]);
    const SkeletonCard = () => (
        <div className="w-90 bg-gray-200 animate-pulse rounded-xl overflow-hidden border-2 border-blue-950/10">
            <div className="h-56 md:h-64 bg-gray-300"></div>
            <div className="p-5 md:p-6 space-y-3">
                <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="space-y-2">
                    <div className="h-3 bg-gray-300 rounded w-full"></div>
                    <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                </div>
                <div className="h-10 bg-gray-300 rounded-lg w-full"></div>
            </div>
        </div>
    );

    return (
        <div id={"tours"} className={'text-[#05073C] bg-white'}>
            <div className={'flex flex-col items-center pt-10 text-center'}>
                <h3 className={'text-3xl font-extrabold mt-10'}>Best Tours</h3>
                <p className={'text-lg pt-2'}>If you want to take a cultural tour or visit other places. We are glad to
                    have your tour according to your request.</p>
            </div>

            <div className="overflow-x-auto" style={{scrollbarWidth: "none", msOverflowStyle: "none"}}>
                <div className="flex gap-6 px-10 py-6 w-max">
                    {loadingTour
                        ? Array.from({length: 3}).map((_, i) => <SkeletonCard key={i}/>)
                        : tours.map((tour) => {
                            const {id, title, days, season, locations, bg} = tour;
                            const displayLocations = locations.slice(0, 3);
                            const hasMoreLocations = locations.length > 3;

                            return (
                                <Link key={id} href={`/tour/${id}`} className="flex-shrink-0">
                                    <div
                                        className="group w-90 bg-white rounded-xl overflow-hidden border-2 border-blue-950/10 hover:border-blue-950 transition-all duration-300 hover:shadow-2xl">
                                        <div className="relative h-56 md:h-64 overflow-hidden">
                                            <img
                                                src={bg}
                                                alt={title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div
                                                className="absolute inset-0 bg-gradient-to-t from-blue-950/60 to-transparent"/>

                                            <div
                                                className="absolute top-4 right-4 bg-blue-950 text-white px-3 py-1.5 rounded-full flex items-center gap-2">
                                                <Calendar className="w-4 h-4"/>
                                                <span className="text-sm">{days} days</span>
                                            </div>
                                        </div>
                                        <div className="p-5 md:p-6">
                                            <h3 className="text-blue-950 mb-3 md:mb-4 group-hover:text-blue-900 transition-colors">
                                                {title}
                                            </h3>
                                            <div className="flex items-center gap-2 text-blue-950/70 mb-4">
                                                <Clock className="w-4 h-4"/>
                                                <span className="text-sm">{season}</span>
                                            </div>
                                            <div className="space-y-2 mb-5">
                                                {displayLocations.map((location, index) => (
                                                    <div key={index}
                                                         className="flex items-start gap-2 text-sm text-blue-950/80">
                                                        <MapPin
                                                            className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-950/60"/>
                                                        <span className="line-clamp-1">{location.title}</span>
                                                    </div>
                                                ))}
                                                {hasMoreLocations && (
                                                    <div className="text-sm text-blue-950/60 pl-6">
                                                        +{locations.length - 3} more locations
                                                    </div>
                                                )}
                                            </div>
                                            <button
                                                className="w-full bg-blue-950 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-900 transition-colors group/btn">
                                                <span>View Details</span>
                                                <ArrowRight
                                                    className="w-4 h-4 transition-transform group-hover/btn:translate-x-1"/>
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default TourCard;
