"use client";

import React, { useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Car, Users, Gauge, Settings, Calendar } from 'lucide-react';
import { useCars, useGetCars, useLoadingCar } from "@/stores/carStore";

const Page = () => {
    const getCars = useGetCars();
    const cars = useCars();
    const loadingCar = useLoadingCar();

    useEffect(() => {
        void getCars();
    }, [getCars]);

    const SkeletonCarCard = () => (
        <div className="bg-white rounded-xl overflow-hidden border-2 border-blue-950/10 animate-pulse shadow-md">
            <div className="h-56 md:h-72 bg-gray-300"></div>
            <div className="p-5 md:p-6 space-y-4">
                <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                <div className="grid grid-cols-3 gap-3">
                    <div className="h-14 bg-gray-200 rounded-lg"></div>
                    <div className="h-14 bg-gray-200 rounded-lg"></div>
                    <div className="h-14 bg-gray-200 rounded-lg"></div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="relative overflow-hidden">
            <div
                className="fixed inset-0 -z-10 bg-cover bg-center"
                style={{
                    backgroundImage: `url(https://avatars.mds.yandex.net/i?id=6b4197395ac1c1397f903e7f79a72346_l-5213143-images-thumbs&n=13)`
                }}
            ></div>
            <div className="absolute inset-0 bg-black/30"></div>

            <div className="relative z-10">
                <Header />
                <div className="py-12 md:py-16">
                    <div className="container mx-auto px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

                            {loadingCar
                                ? Array.from({ length: 6 }).map((_, i) => <SkeletonCarCard key={i} />)
                                : cars.map((car) => (
                                    <div
                                        key={car.id}
                                        className="group bg-white rounded-xl overflow-hidden border-2 border-blue-950/10 hover:border-blue-950/30 transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                        <div className="relative h-56 md:h-72 overflow-hidden bg-gradient-to-br from-blue-50 to-white">
                                            <img
                                                src={car.image}
                                                alt={car.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/40 to-transparent" />

                                            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-blue-950 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                                                <Settings className="w-4 h-4" />
                                                <span className="text-sm">{car.type}</span>
                                            </div>
                                        </div>

                                        <div className="p-5 md:p-6">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Car className="w-5 h-5 text-blue-950 flex-shrink-0" />
                                                <h3 className="text-blue-950">
                                                    {car.title}
                                                </h3>
                                            </div>
                                            <div className="grid grid-cols-3 gap-3">
                                                <div className="text-center p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                                                    <Calendar className="w-4 h-4 text-blue-950 mx-auto mb-1" />
                                                    <div className="text-xs text-blue-950/60 mb-0.5">Year</div>
                                                    <div className="text-sm text-blue-950">{car.year}</div>
                                                </div>
                                                <div className="text-center p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                                                    <Gauge className="w-4 h-4 text-blue-950 mx-auto mb-1" />
                                                    <div className="text-xs text-blue-950/60 mb-0.5">Engine</div>
                                                    <div className="text-sm text-blue-950">{car.engine}</div>
                                                </div>
                                                <div className="text-center p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                                                    <Users className="w-4 h-4 text-blue-950 mx-auto mb-1" />
                                                    <div className="text-xs text-blue-950/60 mb-0.5">Seats</div>
                                                    <div className="text-sm text-blue-950">{car.places}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

                <div className="bg-blue-950/5 py-12 md:py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-white mb-6 text-2xl">Why Choose Our Vehicles?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                                <div className="p-6 bg-white rounded-lg border-2 border-blue-950/10">
                                    <div className="text-3xl mb-3">🛡️</div>
                                    <h3 className="text-blue-950 mb-2">Safe & Reliable</h3>
                                    <p className="text-blue-950/70 text-sm">
                                        All vehicles regularly maintained and inspected
                                    </p>
                                </div>
                                <div className="p-6 bg-white rounded-lg border-2 border-blue-950/10">
                                    <div className="text-3xl mb-3">🏔️</div>
                                    <h3 className="text-blue-950 mb-2">Mountain Ready</h3>
                                    <p className="text-blue-950/70 text-sm">
                                        4WD vehicles perfect for mountain terrain
                                    </p>
                                </div>
                                <div className="p-6 bg-white rounded-lg border-2 border-blue-950/10">
                                    <div className="text-3xl mb-3">✨</div>
                                    <h3 className="text-blue-950 mb-2">Comfort First</h3>
                                    <p className="text-blue-950/70 text-sm">
                                        Spacious interiors for long journeys
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Page;
