"use client";

import {useGetLocations, useLoadingLocation, useLocations} from "@/stores/locationStore";
import { useEffect} from "react";
import Link from "next/link";
import { MapPin, ArrowRight, Image as ImageIcon } from 'lucide-react';

const LocationCard = () => {
    const locations = useLocations();
    const getLocations = useGetLocations();
    const loadingLocation = useLoadingLocation();

    useEffect(() => {
        void getLocations()
    }, [getLocations]);

    const SkeletonCard = () => (
        <div className="w-110 bg-gray-200 animate-pulse rounded-xl overflow-hidden border-2 border-blue-950/10">
            <div className="h-56 md:h-64 bg-gray-300"></div>
            <div className="p-5 md:p-6 space-y-3">
                <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-10 bg-gray-300 rounded-lg w-full"></div>
            </div>
        </div>
    );

    return (
        <div id={"locations"} className={'text-[#05073C] bg-white'}>
            <div className={'flex flex-col items-center pt-10 text-center'}>
                <h3 className={'text-3xl font-extrabold mt-10'}> Best Locations</h3>
                <p className={'text-lg pt-2'}>That will give you the best memories!</p>
            </div>

            <div className="overflow-x-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                <div className="flex gap-6 px-10 py-6 w-max">
                    {loadingLocation
                        ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
                        : locations.map((location) => {
                            const { id, title, image, images, text, region } = location;
                            const imageCount = images?.length || 0;
                            return (
                                <Link
                                    key={id}
                                    href={`/location/${id}`}
                                    className="flex-shrink-0"
                                >
                                    <div className="group w-84 md:w-110 bg-white rounded-xl overflow-hidden border-2 border-blue-950/10 hover:border-blue-950 transition-all duration-300 hover:shadow-2xl">
                                        <div className="relative h-56 md:h-64 overflow-hidden">
                                            <img
                                                src={image}
                                                alt={title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/70 to-transparent" />
                                            <div className="absolute top-4 left-4 bg-white text-blue-950 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                                                <MapPin className="w-4 h-4" />
                                                <span className="text-sm">{region}</span>
                                            </div>
                                            {imageCount > 0 && (
                                                <div className="absolute top-4 right-4 bg-blue-950 text-white px-3 py-1.5 rounded-full flex items-center gap-2">
                                                    <ImageIcon className="w-4 h-4" />
                                                    <span className="text-sm">{imageCount}</span>
                                                </div>
                                            )}

                                            {/* Title overlay */}
                                            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                                                <h3 className="text-white group-hover:text-white/90 transition-colors">
                                                    {title}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="p-5 md:p-6">
                                            <p className="text-blue-950/70 text-sm leading-relaxed line-clamp-3 mb-5">
                                                {text}
                                            </p>

                                            <button className="w-full bg-blue-950 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-900 transition-colors group/btn">
                                                <span>Explore Location</span>
                                                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
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

export default LocationCard;
