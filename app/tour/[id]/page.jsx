"use client"
import {useEffect, useState} from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {useGetByIdTour, useTour} from "@/stores/tourStore";
import {useParams} from "next/navigation";
import Link from "next/link";
import {Calendar, MapPin, Clock, Users, DollarSign} from 'lucide-react';

const CardDetails = () => {
    const tour = useTour()
    const getByIdTour = useGetByIdTour()
    const {id} = useParams()
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    useEffect(() => {
        getByIdTour(id)
    }, [getByIdTour, id]);
    if (!tour) {
        return (
            <div className="flex items-center justify-center h-screen text-white">
                Loading...
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-white">
            <div className="relative h-[80vh] md:h-[70vh] overflow-hidden">
                <img
                    src={tour.bg}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-blue-950/70 to-blue-950/40"/>

                <div className="absolute inset-0 flex items-end">
                    <div className="w-full flex flex-col justify-between h-full">
                        <Header/>
                        <div className="container px-8 md:p-24 p-8 w-full">
                            <h1 className="text-white mb-4 md:mb-6 text-2xl max-w-4xl">{tour.title}</h1>
                            <div className="flex flex-wrap gap-4 md:gap-6 text-white/90">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 md:w-5 md:h-5"/>
                                    <span className="text-sm md:text-base">{tour.days} days</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 md:w-5 md:h-5"/>
                                    <span className="text-sm md:text-base">{tour.season}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-8 md:py-16">
                <div className="container mx-auto px-4 mb-12 md:mb-16">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-blue-950 mb-4 text-2xl md:mb-6">About the tour</h2>
                        <p className="text-blue-950/80 text-base md:text-lg leading-relaxed whitespace-pre-line">
                            {tour.description}
                        </p>
                    </div>
                </div>
                {tour.locations && tour.locations.length > 0 && (
                    <div className="container mx-auto px-4 mb-12 md:mb-16">
                        <div className="max-w-5xl mx-auto">
                            <h2 className="text-blue-950 text-2xl mb-6 md:mb-8 text-center">Locations</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                {tour.locations.map((location) => (
                                    <Link
                                        href={`/location/${location.id}`}
                                        key={location.id}
                                        className="group bg-white rounded-xl overflow-hidden border-2 border-blue-950/10 hover:border-blue-950/30 transition-all duration-300 shadow-md hover:shadow-xl"
                                    >
                                        <div className="relative h-40 md:h-48 overflow-hidden">
                                            <img
                                                src={location.image}
                                                alt={location.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div
                                                className="absolute inset-0 bg-gradient-to-t from-blue-950/60 to-transparent"/>
                                        </div>
                                        <div className="p-4 flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-blue-950 flex-shrink-0"/>
                                            <span className="text-blue-950">{location.title}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                <div className="container mx-auto px-4 mb-12 md:mb-16">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-8 md:mb-10">
                            <h2 className="text-blue-950 mb-3 text-2xl">Price per person</h2>
                            <p className="text-blue-950/70 text-base md:text-lg">
                                Choose the best option for your group
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            <button
                                className="bg-white border-2 border-blue-950/10 rounded-xl p-5 md:p-6 hover:border-blue-950 hover:shadow-xl transition-all duration-300"
                                onClick={() => {
                                    const phone = "996702191998";
                                    const tourName = tour.title;
                                    const people = 1;
                                    const price = tour.days * 250;
                                    const message = `Hello! 👋 I'm writing from the website regarding the "${tourName}" tour.
                                    Number of people: ${people}.
                                    Total price: ${price} $.`;
                                    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
                                    window.open(url, "_blank");
                                }}
                            >
                                <div
                                    className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-blue-50 mx-auto mb-4">
                                    <Users className="w-6 h-6 md:w-7 md:h-7 text-blue-950"/>
                                </div>
                                <div className="text-center">
                                    <div className="text-blue-950/70 text-sm mb-2">1 person</div>
                                    <div className="flex items-center justify-center gap-1">
                                        <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-blue-950"/>
                                        <span className="text-blue-950">{tour.days * 250}</span>
                                    </div>
                                </div>
                            </button>
                            <button
                                className="bg-white border-2 border-blue-950/10 rounded-xl p-5 md:p-6 hover:border-blue-950 hover:shadow-xl transition-all duration-300"
                                onClick={() => {
                                    const phone = "996702191998";
                                    const tourName = tour.title;
                                    const people = 2;
                                    const price = tour.days * 320;
                                    const message = `Hello! 👋 I'm writing from the website regarding the "${tourName}" tour.
                                    Number of people: ${people}.
                                    Total price: ${price} $.`;
                                    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
                                    window.open(url, "_blank");
                                }}
                            >
                                <div
                                    className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-blue-50 mx-auto mb-4">
                                    <Users className="w-6 h-6 md:w-7 md:h-7 text-blue-950"/>
                                </div>
                                <div className="text-center">
                                    <div className="text-blue-950/70 text-sm mb-2">2 people</div>
                                    <div className="flex items-center justify-center gap-1">
                                        <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-blue-950"/>
                                        <span className="text-blue-950">{tour.days * 320}</span>
                                    </div>
                                </div>
                            </button>

                            <button
                                className="bg-white border-2 border-blue-950/10 rounded-xl p-5 md:p-6 hover:border-blue-950 hover:shadow-xl transition-all duration-300"
                                onClick={() => {
                                    const phone = "996702191998";
                                    const tourName = tour.title;
                                    const people = 3;
                                    const price = tour.days * 450;
                                    const message = `Hello! 👋 I'm writing from the website regarding the "${tourName}" tour.
                                    Number of people: ${people}.
                                    Total price: ${price} $.`;
                                    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
                                    window.open(url, "_blank");
                                }}
                            >
                                <div
                                    className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-blue-50 mx-auto mb-4">
                                    <Users className="w-6 h-6 md:w-7 md:h-7 text-blue-950"/>
                                </div>
                                <div className="text-center">
                                    <div className="text-blue-950/70 text-sm mb-2">3 people</div>
                                    <div className="flex items-center justify-center gap-1">
                                        <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-blue-950"/>
                                        <span className="text-blue-950">{tour.days * 450}</span>
                                    </div>
                                </div>
                            </button>
                            <button
                                className="bg-white border-2 border-blue-950/10 rounded-xl p-5 md:p-6 hover:border-blue-950 hover:shadow-xl transition-all duration-300"
                                onClick={() => {
                                    const phone = "996702191998";
                                    const tourName = tour.title;
                                    const people = 4;
                                    const price = tour.days * 600;
                                    const message = `Hello! 👋 I'm writing from the website regarding the "${tourName}" tour.
                                    Number of people: ${people}.
                                    Total price: ${price} $.`;
                                    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
                                    window.open(url, "_blank");
                                }}
                            >
                                <div
                                    className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-blue-50 mx-auto mb-4">
                                    <Users className="w-6 h-6 md:w-7 md:h-7 text-blue-950"/>
                                </div>
                                <div className="text-center">
                                    <div className="text-blue-950/70 text-sm mb-2">4 people</div>
                                    <div className="flex items-center justify-center gap-1">
                                        <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-blue-950"/>
                                        <span className="text-blue-950">{tour.days * 600}</span>
                                    </div>
                                </div>
                            </button>
                        </div>

                        <button className="mt-6 w-full bg-blue-950 rounded-xl p-6 md:p-8 text-center"
                                onClick={() => {
                                    const phone = "996702191998";
                                    const tourName = tour.title;
                                    const people = "5+";
                                    const price = `${tour.days * 150} per person`;
                                    const message = `Hello! 👋 I'm writing from the website regarding the tour "${tourName}" tour.
                                    Number of people: ${people}.
                                    Total price: ${price} $.`;
                                    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
                                    window.open(url, "_blank");
                                }}>
                            <div className="flex items-center justify-center gap-2 mb-3">
                                <Users className="w-6 h-6 text-white"/>
                                <h3 className="text-white">Group discount</h3>
                            </div>
                            <p className="text-white/90 mb-4">
                                For groups of 5 or more people
                            </p>
                            <div className="flex items-center justify-center gap-2">
                                <DollarSign className="w-7 h-7 md:w-8 md:h-8 text-white"/>
                                <span className="text-white text-2xl md:text-3xl">{tour.days * 150}</span>
                                <span className="text-white/80">per person</span>
                            </div>
                        </button>
                    </div>
                </div>

                {
                    tour.maps && (
                        <div className="container mx-auto px-4 mb-12 md:mb-16">
                            <div className="max-w-5xl mx-auto">
                                <h2 className="text-blue-950 mb-6 md:mb-8 text-2xl text-center">Tour route</h2>
                                <div
                                    className="rounded-lg overflow-hidden shadow-xl border-2 md:border-4 border-blue-950 bg-blue-50">
                                    <img
                                        src={tour.maps}
                                        alt="Tour route map"
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    tour.itineraries && tour.itineraries.length > 0 && (
                        <div className="container mx-auto px-4 mb-12 md:mb-16">
                            <div className="max-w-5xl mx-auto">
                                <h2 className="text-blue-950 mb-6 md:mb-8 text-2xl text-center">Day by day itinerary</h2>

                                <div type="single" className="space-y-4">
                                    {tour.itineraries.map((itinerary, index) => (
                                        <div
                                            key={itinerary.id}
                                            className="border-2 border-blue-950 rounded-lg overflow-hidden bg-white"
                                        >
                                            <div
                                                onClick={() => toggle(index)}
                                                className="px-4 md:px-6 py-4 md:py-5 cursor-pointer hover:bg-blue-50/50 transition-colors"
                                            >
                                                <div className="flex items-start gap-3 md:gap-4 text-left pr-4">
                                                    <div
                                                        className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-950 text-white flex items-center justify-center">
                                                        <span>{index + 1}</span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-blue-950 text-sm md:text-base">
                                                            {itinerary.title}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                            {openIndex === index && (
                                                <div className="px-4 md:px-6 pb-4 md:pb-6 pt-2">
                                                    {itinerary.images && itinerary.images.length > 0 && (
                                                        <div className="mb-4 md:mb-6">
                                                            <div
                                                                className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
                                                                <div className="flex gap-3 pb-2">
                                                                    {itinerary.images.map((img, imgIndex) => (
                                                                        <div
                                                                            key={imgIndex}
                                                                            className="relative flex-shrink-0 w-[80vw] overflow-hidden rounded-lg aspect-[16/10]"
                                                                        >
                                                                            <img
                                                                                src={img}
                                                                                alt={`Day ${index + 1} - Photo ${imgIndex + 1}`}
                                                                                className="w-full h-full object-cover"
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                                {itinerary.images.map((img, imgIndex) => (
                                                                    <div
                                                                        key={imgIndex}
                                                                        className="relative overflow-hidden rounded-lg aspect-[16/10] group"
                                                                    >
                                                                        <img
                                                                            src={img}
                                                                            alt={`Day ${index + 1} - Photo ${imgIndex + 1}`}
                                                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                    <p className="text-blue-950/80 text-sm md:text-base leading-relaxed whitespace-pre-line">
                                                        {itinerary.description}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="bg-cover bg-bottom" style={{backgroundImage: `url(${tour.bg})`}}>
                <Footer/>
            </div>
        </div>
    )
        ;
};

export default CardDetails;