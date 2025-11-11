"use client";

import React, {useEffect, useState} from "react";
import AddSVG from "@/utils/AddSVG";
import {useGetSocials, useSocials} from "@/stores/socialStore";
import {useParams, usePathname} from "next/navigation";
import {useGetTours, useTours} from "@/stores/tourStore";
import {useGetLocations, useLocations} from "@/stores/locationStore";
import {useGetRoutes, useRoutes} from "@/stores/routeStore";
import {useCars, useGetCars} from "@/stores/carStore";
import Link from "next/link";

export default function DetailPage() {
    const [selected, setSelected] = useState([]);

    const routesList = useRoutes();
    const getRoutes = useGetRoutes();
    const socials = useSocials();
    const getSocials = useGetSocials();

    const tours = useTours();
    const getTours = useGetTours();

    const locations = useLocations();
    const getLocations = useGetLocations();
    const cars = useCars();
    const getCars = useGetCars();

    const params = useParams();
    const pathname = usePathname();

    const isSocialPage =
        params?.slug === "socials" || pathname?.includes("/admin/socials");
    const isTourPage =
        params?.slug === "tours" || pathname?.includes("/admin/tours");
    const isLocationPage =
        params?.slug === "locations" || pathname?.includes("/admin/locations");
    const isCarPage =
        params?.slug === "cars" || pathname?.includes("/admin/cars");

    useEffect(() => {
        void getRoutes();
        if (isSocialPage) void getSocials();
        if (isTourPage) void getTours();
        if (isLocationPage) void getLocations();
        if (isCarPage) void getCars();
    }, [getSocials, getTours, getCars, isCarPage, getLocations, isSocialPage, isTourPage, isLocationPage]);

    const toggleSelect = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    if (!isSocialPage && !isTourPage && !isLocationPage && !isCarPage) {
        return (
            <div className="flex items-center justify-center h-screen text-white bg-black">
                <h1>Страница в разработке...</h1>
            </div>
        );
    }

    let data = [];
    let title = "";

    if (isSocialPage) {
        data = socials;
        title = "социальную сеть";
    } else if (isTourPage) {
        data = tours;
        title = "тур";
    } else if (isLocationPage) {
        data = locations;
        title = "локацию";
    } else if (isCarPage) {
        data = cars;
        title = "машину";
    }

    return (
        <div className="flex container h-full min-h-screen bg-black text-white">
            <aside className="w-1/5 md:inline hidden bg-gray-900 border-r border-gray-700 overflow-y-auto">
                <div className="p-3 text-gray-300 bg-sky-900 text-sm">APP</div>
                <ul className="space-y-1 text-sm">
                    {routesList.map((item, index) => (
                        <li key={index} className="flex justify-between items-center px-4 py-2 hover:bg-gray-800">
                            <a className={'hover:underline'} href={`/admin/${item}`}>{item}</a>
                            <a href={`/admin/${item}/create`}
                               className="text-green-400 hover:underline"><AddSVG/> Добавить</a>
                        </li>
                    ))}
                </ul>
            </aside>

            <main className="flex-1 flex flex-col p-6">
                <h1 className="text-lg mb-4">Выберите {title} для изменения</h1>

                <div className="md:flex hidden gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="Найти"
                        className="px-3 py-1 rounded bg-gray-800 border border-gray-700 focus:outline-none"
                    />
                    <select className="bg-gray-800 border border-gray-700 rounded px-2">
                        <option>Действие</option>
                    </select>
                    <button className="px-3 py-1 bg-blue-600 rounded">
                        Выполнить
                    </button>
                </div>
                <div className="md:max-h-[550px] max-h-[490px] overflow-y-auto">
                    <table className="w-full bg-gray-900 text-left border-collapse border border-gray-700">
                        <thead>
                        <tr className="bg-gray-800">
                            <th className="p-2 border border-gray-700">#</th>
                            <th className="p-2 border border-gray-700">ID</th>
                            <th className="p-2 border border-gray-700">Название</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data?.map((item) => (
                            <tr
                                key={item.id}
                                className="hover:bg-gray-800"
                            >
                                <td className="p-2 border border-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(Number(item.id))}
                                        readOnly
                                        onClick={() => toggleSelect(Number(item.id))}
                                    />
                                </td>
                                <td className="p-2 border border-gray-700">{item.id}</td>
                                <td className="p-2 border border-gray-700 text-blue-400">
                                    <a href={`${pathname}/${item.id}`}>{item.title}</a>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </main>

            <aside className="w-1/5 md:inline hidden bg-gray-900 border-l border-gray-700 p-4 text-sm">
                <a href={`${pathname}/create`}>
                    <button className="mb-4 w-full bg-gray-800 hover:bg-gray-700 py-2 rounded">
                        Добавить {title}
                    </button>
                </a>
                <div className="font-semibold mb-2">ФИЛЬТР</div>
                <div className="space-y-2">
                    <div>
                        <p className="text-gray-400">Название</p>
                        <ul>
                            {data?.map((s) => (
                                <li key={s.id}>{s.title}</li>
                            ))}
                        </ul>
                    </div>
                    {"url" in (data[0] || {}) && (
                        <div>
                            <p className="text-gray-400">Ссылка</p>
                            <ul>
                                {data?.map((s) => (
                                    <li key={s.id} className="truncate">
                                        {s.url}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </aside>
        </div>
    );
}
