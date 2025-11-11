"use client"
import {useEffect} from "react";
import Header from "@/components/Header";
import Link from "next/link";
import {useGetTours, useTours} from "@/stores/tourStore";

const Locations = () => {
    const tours = useTours()
    const getTours = useGetTours()
    useEffect(() => {
        getTours()
    }, []);

    return (
        <div className="relative">
            <div className="relative overflow-hidden">
                <div
                    className={`fixed inset-0 -z-10 bg-center bg-cover transition-opacity duration-1000`}
                    style={{backgroundImage: `url(/assets/bg2.jpg)`}}
                ></div>

                <div className="absolute inset-0 bg-black/30 z-0"/>

                <div className="relative z-10">
                    <Header/>
                    <div
                        className="md:w-2/3 pt-24 pb-28 md:pt-44 md:pb-56 text-center gap-8 flex items-center m-auto justify-center flex-col md:container text-white  mt-8">
                        <h1 className={'md:text-5xl text-4xl font-bold text-red-500'}>Multidays tours in Kyrgyzstan
                        </h1>
                        <h2 className=" text-center text-2xl">If you want to take a cultural tour or visit other places.
                            We are glad to have your tour according to your request.</h2>
                    </div>

                    <div className="md:container px-3 m-auto flex md:px-20 justify-between flex-wrap gap-4 py-10">
                        {tours.map((card, index) => (
                            <Link
                                href={`/tour/${card.id}`}
                                key={card.id}
                                className="mb-20 w-full md:min-h-[432px] h-content pt-3 pb-3 rounded-2xl relative border-2 border-transparent hover:border-white transition-all duration-300"
                            >
                                <div className="absolute inset-0 backdrop-blur-3xl rounded-3xl"></div>

                                <div
                                    className="relative h-full z-10 px-4 flex flex-col md:flex-row justify-between md:gap-10">
                                    <div
                                        className="overflow-hidden rounded-xl w-full md:w-1/2 md:h-full h-72 bg-cover bg-center pt-5 duration-700 text-2xl uppercase font-bold text-green-600"
                                        style={{backgroundImage: `url(${card.bg})`}}
                                    ><span className={'p-2 rounded-r'}
                                           style={{background: `linear-gradient(to right, rgba(0, 47, 74, 0.8), rgba(0, 47, 74, 0.7))`}}>{card.days} days</span>
                                    </div>

                                    <div className="md:w-1/2 w-full flex flex-col md:h-full">
                                        <div className="flex flex-col md:flex-grow">
                                            <h5 className="text-green-600 text-2xl font-semibold my-2">
                                                {card.description.slice(0, 139)}...
                                            </h5>
                                            <ul className="text-white text-sm list-none flex flex-col flex-wrap gap-y-1 gap-x-6 content-start h-64">
                                                {card.locations.map((loc, i) => (
                                                    <li className="w-1/2 text-xl" key={i}>
                                                        {loc}
                                                    </li>
                                                ))}
                                            </ul>

                                        </div>

                                        <div className="mt-auto pt-6">
                                            <button
                                                className="bg-green-600 rounded-2xl text-white px-5 py-2 border-2 border-green-600 transition-all duration-300 hover:border-white hover:bg-green-700 hover:scale-105">
                                                More details ➜
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Locations;