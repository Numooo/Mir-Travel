"use client";

import React, {useEffect, useState} from "react";
import AddSVG from "@/utils/AddSVG";
import {useParams, usePathname, useRouter} from "next/navigation";
import {useGetRoutes, useRoutes, useUploadError, useUploading} from "@/stores/routeStore";
import {useUploadImage, useUploadedImage} from "@/stores/routeStore";
import {useAddCar, useLoadingCar} from "@/stores/carStore";
import {useAddSocial, useLoadingSocial} from "@/stores/socialStore";
import {useAddLocation, useGetLocations, useLoadingLocation, useLocations} from "@/stores/locationStore";
import {useAddTour, useLoadingTour} from "@/stores/tourStore";

export default function CreatePage() {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [engine, setEngine] = useState("");
    const [places, setPlaces] = useState("");
    const [year, setYear] = useState("");
    const [type, setType] = useState("");
    const [region, setRegion] = useState("");
    const [text, setText] = useState("");
    const [description, setDescription] = useState("");
    const [mapUrl, setMapUrl] = useState("");
    const [days, setDays] = useState("");
    const [season, setSeason] = useState("");
    const [locationsCurrent, setLocations] = useState([]);
    const [itineraries, setItineraries] = useState([{
        id: Date.now().toString(),
        title: "",
        description: "",
        images: []
    }]);
    const [map, setMap] = useState(null);
    const [bg, setBg] = useState(null);
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [show, setShow] = useState(true);
    const uploadImage = useUploadImage();
    const uploadedImage = useUploadedImage();
    const uploadingError = useUploadError();
    const getRoutes = useGetRoutes();
    const routesList = useRoutes();
    const addCar = useAddCar();
    const addSocial = useAddSocial();
    const addLocation = useAddLocation();
    const locations = useLocations();
    const getLocations = useGetLocations();
    const addTour = useAddTour();
    const loadingTour = useLoadingTour();
    const loadingCar = useLoadingCar()
    const loadingLocation = useLoadingLocation()
    const loadingSocial = useLoadingSocial()
    const uploading = useUploading()
    const isLoading =
        loadingSocial ||
        loadingCar ||
        loadingLocation ||
        loadingTour ||
        uploading;
    const params = useParams();
    const pathname = usePathname();
    const router = useRouter();

    const isSocialPage =
        params?.slug === "social" || pathname?.includes("/admin/social");
    const isTourPage =
        params?.slug === "tour" || pathname?.includes("/admin/tour");
    const isLocationPage =
        params?.slug === "location" || pathname?.includes("/admin/location");
    const isCarPage =
        params?.slug === "cars" || pathname?.includes("/admin/cars");
    let name = "";

    if (isSocialPage) {
        name = "социальную сеть";
    } else if (isTourPage) {
        name = "тур";
    } else if (isLocationPage) {
        name = "локацию";
    } else if (isCarPage) {
        name = "машину";
    }
    useEffect(() => {
        void getRoutes();
        if (isTourPage) void getLocations();
    }, [getRoutes, isTourPage, getLocations]);
    const handleItineraryChange = (index, field, value) => {
        setItineraries(prev => {
            const updated = [...prev];
            updated[index][field] = value;
            return updated;
        });
    };

    const handleAddItinerary = () => {
        const newItinerary = {
            id: Date.now().toString(),
            title: "",
            description: "",
            images: []
        };
        setItineraries(prev => [...prev, newItinerary]);
    };

    const handleDeleteItinerary = (index) => {
        setItineraries(prev => {
            const updated = prev.filter((_, i) => i !== index);
            return updated.length ? updated : [{
                id: Date.now().toString(),
                title: "",
                description: "",
                images: []
            }];
        });
    };

    const handleAddImageI = async (index, file) => {
        if (!file) return;

        const uploadedPath = await uploadImage(file);
        if (!uploadedPath) return;

        setItineraries(prev => {
            const updated = [...prev];
            const updatedItem = { ...updated[index] };
            updatedItem.images = [...updatedItem.images, uploadedPath];
            updated[index] = updatedItem;
            return updated;
        });
    };

    const handleDeleteImageI = (itineraryIndex, imageIndex) => {
        setItineraries(prev => {
            const updated = [...prev];
            updated[itineraryIndex].images = updated[itineraryIndex].images.filter((_, i) => i !== imageIndex);
            return updated;
        });
    };

    const handleAddLocation = (id) => {
        const selected = locations.find((loc) => loc.id == id);
        if (selected) {
            const { id, title, image } = selected;
            setLocations([...locationsCurrent, { id, title, image }]);
        }
    };

    const handleDeleteLocation = (index) => {
        setLocations(locationsCurrent.filter((_, i) => i !== index));
    };

    const handleLocationChange = (index, newTitle) => {
        const updated = [...locationsCurrent];
        updated[index] = { ...updated[index], title: newTitle };
        setLocations(updated);
    };
    const handleFileChange = (e) => setFile(e.target.files[0]);
    const handleMapChange = (e) => setMap(e.target.files[0]);
    const handleFilesChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };
    const handleBgChange = (e) => setBg(e.target.files[0]);

    const handleUpload = async () => {
        let mainPhotoPath = "/assets/photo_2025-07-02_23-13-58.jpg";
        let bgPath = "";
        let mapPath = ""
        let imagesPaths = [];

        if (file) {
            const uploadedPath = await uploadImage(file);
            if (uploadedPath) mainPhotoPath = uploadedPath;
        }

        if (bg) {
            const uploadedPath = await uploadImage(bg);
            if (uploadedPath) bgPath = uploadedPath;
        }
        if (map) {
            const uploadedPath = await uploadImage(map);
            if (uploadedPath) mapPath = uploadedPath;
        }
        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const uploadedPath = await uploadImage(files[i]);
                if (uploadedPath) imagesPaths.push(uploadedPath);
            }
        }
        if (isTourPage) {
            await addTour({
                id: Date.now(),
                days,
                title,
                description,
                bg: bgPath,
                season,
                duration,
                maps: mapPath,
                locations,
                itineraries
            });
            router.push("/admin/tours");
        }

        if (isCarPage) {
            await addCar({
                id: Date.now(),
                title,
                engine,
                places,
                year,
                type,
                image: mainPhotoPath,
            });
            router.push("/admin/cars");
        }

        if (isLocationPage) {
            await addLocation({
                id: Date.now(),
                image: mainPhotoPath,
                region,
                title,
                text,
                description,
                bg: bgPath,
                mapUrl,
                images: imagesPaths
            });
            router.push("/admin/locations");
        }

        if (isSocialPage) {
            await addSocial({
                id: Date.now(),
                title,
                url
            });
            router.push("/admin/socials");
        }
    };


    return (
        <div className="container flex h-full bg-[#111] text-white">
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
            <div
                className="mx-auto bg-black rounded-lg w-full md:w-4/5 p-6 overflow-y-auto max-h-[555px] md:max-h-[670px]">
                <div className={'flex justify-between items-start'}>
                    <h2 className="text-xl font-medium mb-4">
                        Добавить {name}
                    </h2>
                </div>
                <div className="mb-4">
                    <div className="flex gap-10 items-center">
                        <label className="block mb-1 w-1/5 md:w-1/10 text-sm md:text-base">Название:</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-64 bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400"
                        />
                    </div>
                </div>
                {isCarPage && (
                    <>
                        <div className="mb-4">
                            <div className="flex gap-10 items-center">
                                <label className="block mb-1 w-1/5 md:w-1/10 text-sm md:text-base">Двигатель:</label>
                                <input
                                    value={engine}
                                    placeholder={"4.7 L"}
                                    onChange={(e) => setEngine(e.target.value)}
                                    className="w-64 bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex gap-10 items-center">
                                <label className="block mb-1 w-1/5 md:w-1/10 text-sm md:text-base">Мест:</label>
                                <input
                                    value={places}
                                    placeholder={"7 seats"}
                                    onChange={(e) => setPlaces(e.target.value)}
                                    className="w-64 bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex gap-10 items-center">
                                <label className="block mb-1 w-1/5 md:w-1/10 text-sm md:text-base">Год:</label>
                                <input
                                    value={year}
                                    type={"number"}
                                    placeholder={"2021"}
                                    onChange={(e) => setYear(e.target.value)}
                                    className="w-64 bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex gap-10 items-center">
                                <label className="block mb-1 w-1/5 md:w-1/10 text-sm md:text-base">Привод:</label>
                                <input
                                    value={type}
                                    placeholder={"4WD"}
                                    onChange={(e) => setType(e.target.value)}
                                    className="w-64 bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400"
                                />
                            </div>
                        </div>
                    </>
                )}
                {(isLocationPage || isCarPage) && (
                    <div className="mb-4">
                        <div className="flex gap-10 items-center">
                            <label className="block mb-1 w-1/5 md:w-1/10 text-sm md:text-base">Фото:</label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="w-64 bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400"
                            />
                        </div>
                        {file && (
                            <div className="mt-2">
                                <p className="text-sm text-gray-300">Выбран файл: {file.name}</p>
                            </div>
                        )}
                        {uploadedImage && (
                            <p className="mt-2 text-sm text-green-400">Файл загружен: {uploadedImage}</p>
                        )}
                        {uploadingError && (
                            <p className="mt-2 text-sm text-red-500">{uploadingError}</p>
                        )}
                    </div>
                )}
                {(isLocationPage || isTourPage) && (
                    <>
                        <div className="mb-4">
                            <div className="flex gap-10 items-center">
                                <label className="block mb-1 w-1/5 md:w-1/10 text-sm md:text-base">Описание:</label>
                                <textarea
                                    value={description}
                                    placeholder={"The Burana Tower is a historic minaret located near the ancient city of Balasagun, once a thriving stop on the Silk Road. Built in the 11th century, it stands as one of the oldest architectural monuments in Central Asia. Visitors can climb to the top for panoramic views of the Chuy Valley. Surrounding the tower are ancient stone carvings known as balbals and remnants of old city walls. The site offers a fascinating glimpse into the region’s rich nomadic and Islamic heritage."}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-64 bg-gray-800 overflow-hidden border border-gray-600 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex gap-10 items-center">
                                <label className="block mb-1 w-1/5 md:w-1/10 text-sm md:text-base">Задний фон:</label>
                                <input
                                    type="file"
                                    onChange={handleBgChange}
                                    className="w-64 bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400"
                                />
                            </div>
                            {bg && (
                                <div className="mt-2">
                                    <p className="text-sm text-gray-300">Выбран файл: {bg.name}</p>
                                </div>
                            )}
                            {uploadedImage && (
                                <p className="mt-2 text-sm text-green-400">Файл загружен: {uploadedImage}</p>
                            )}
                            {uploadingError && (
                                <p className="mt-2 text-sm text-red-500">{uploadingError}</p>
                            )}
                        </div>
                    </>
                )}
                {isTourPage && (
                    <>
                        <div className="mb-4">
                            <div className="flex gap-10 items-center">
                                <label className="block mb-1 w-1/5 md:w-1/10 text-sm md:text-base">День:</label>
                                <input
                                    value={days}
                                    type={"number"}
                                    placeholder={"2"}
                                    onChange={(e) => setDays(e.target.value)}
                                    className="w-64 bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex gap-10 items-center">
                                <label className="block mb-1 w-1/5 md:w-1/10 text-sm md:text-base">Сезон:</label>
                                <input
                                    value={season}
                                    placeholder={"Summer, Winter"}
                                    onChange={(e) => setSeason(e.target.value)}
                                    className="w-64 bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex gap-10 items-center">
                                <label className="block mb-1 w-1/5 md:w-1/10 text-sm md:text-base">Маршрут:</label>
                                <div className={'flex md:flex-row flex-col md:items-center gap-5'}>
                                    <input
                                        type="file"
                                        onChange={handleMapChange}
                                        className="w-64 bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400"
                                    />
                                    {show && <button
                                        className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded-md transition"
                                        onClick={() => setShow(false)}>Подсказка</button>}
                                    {!show && <a onClick={() => setShow(true)} target={"_blank"}
                                                 className={'text-blue-500 underline'}
                                                 href="https://www.google.com/maps/timeline?hl=en&authuser=0">Сделай на
                                        англ</a>}
                                </div>
                            </div>
                            {map && (
                                <div className="mt-2">
                                    <p className="text-sm text-gray-300">Выбран файл: {map.name}</p>
                                </div>
                            )}
                        </div>
                        <div className="mb-4">
                            <div className="flex gap-10 items-start">
                                <label className="block mb-1 w-1/5 md:w-1/10 text-sm md:text-base">Локации:</label>
                                <div className="flex flex-col gap-2 max-h-52 pr-5 overflow-y-auto">
                                    {locationsCurrent.map((location, index) => (
                                        <div key={location.id || index} className="flex items-center gap-2">
                                            <input
                                                value={location.title}
                                                placeholder="Issyk-Kul Lake"
                                                onChange={(e) => handleLocationChange(index, e.target.value)}
                                                className="w-64 bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400"
                                            />
                                            <button
                                                onClick={() => handleDeleteLocation(index)}
                                                className="text-red-400 hover:text-red-600 text-sm"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}

                                    <div className="flex items-center gap-2">
                                        <select
                                            className="w-64 bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-sm outline-none"
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value) handleAddLocation(value);
                                                e.target.value = "";
                                            }}
                                        >
                                            <option value="">Выбрать</option>
                                            {locations.map((location) => (
                                                <option key={location.id} value={location.id}>
                                                    {location.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-3">План поездки:</h3>
                            <div className="flex flex-col gap-4 max-h-96 overflow-y-auto">
                                {itineraries.map((item, index) => (
                                    <div key={item.id} className="p-4 border border-gray-700 rounded-lg bg-gray-800">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-medium text-base text-white">День {index + 1}</h4>
                                            <button
                                                onClick={() => handleDeleteItinerary(index)}
                                                className="text-red-400 hover:text-red-600 text-sm"
                                            >
                                                ✕ Удалить
                                            </button>
                                        </div>
                                        <input
                                            type="text"
                                            value={item.title}
                                            onChange={(e) => handleItineraryChange(index, "title", e.target.value)}
                                            placeholder="Введите название..."
                                            className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 mb-3 text-sm outline-none focus:ring-1 focus:ring-blue-400"
                                        />
                                        <textarea
                                            value={item.description}
                                            onChange={(e) => handleItineraryChange(index, "description", e.target.value)}
                                            placeholder="Описание..."
                                            className="w-full overflow-hidden bg-gray-900 border border-gray-700 rounded-md px-3 py-2 mb-3 text-sm outline-none focus:ring-1 focus:ring-blue-400"
                                        />
                                        <div className="flex flex-wrap gap-3">
                                            {item.images.map((img, imgIndex) => (
                                                <div key={imgIndex} className="relative w-40 h-28">
                                                    <img
                                                        src={img}
                                                        alt=""
                                                        className="w-40 h-28 object-cover rounded-md border border-gray-700"
                                                    />
                                                    <button
                                                        onClick={() => handleDeleteImageI(index, imgIndex)}
                                                        className="absolute top-0 right-0 bg-black bg-opacity-50 text-red-400 px-1 rounded-bl-md text-xs"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                            <label
                                                className="flex flex-col items-center justify-center w-28 h-28 border-2 border-dashed border-gray-600 rounded-md cursor-pointer hover:border-blue-400">
                                                <span className="text-gray-400 text-sm">+</span>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={async (e) => {
                                                        const file = e.target.files[0];
                                                        if (!file) return;
                                                        await handleAddImageI(index, file);
                                                        e.target.value = "";
                                                    }}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                ))}

                                <button
                                    onClick={handleAddItinerary}
                                    className="mt-1 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 w-fit"
                                >
                                    + Добавить день
                                </button>
                            </div>
                        </div>
                    </>
                )}
                {isLocationPage && (
                    <>
                        <div className="mb-4">
                            <div className="flex gap-10 items-center">
                                <label className="block mb-1 w-1/5 md:w-1/10 text-sm md:text-base">Регион:</label>
                                <input
                                    value={region}
                                    placeholder={"Tokmok city"}
                                    onChange={(e) => setRegion(e.target.value)}
                                    className="w-64 bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex gap-10 items-center">
                                <label className="block mb-1 w-1/5 md:w-1/10 text-sm md:text-base">Подзаголовок:</label>
                                <textarea
                                    value={text}
                                    placeholder="Climb the ancient Burana Tower, explore the ruins of a lost city, and uncover the secrets of the Silk Road."
                                    onChange={(e) => setText(e.target.value)}
                                    className="w-64 bg-gray-800 overflow-hidden border border-gray-600 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex gap-10 items-center">
                                <label className="block mb-1 w-1/5 md:w-1/10 text-sm md:text-base">Карта:</label>
                                <div className={'flex md:flex-row flex-col md:items-center gap-5'}>
                                    <textarea
                                        value={mapUrl}
                                        placeholder={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d629673.8753490128!2d74.82906237060105!3d42.869474622757075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389bf3fd4de734ad%3A0x3fd30e77c732683e!2z0JHRg9GA0LDQvdCw!5e0!3m2!1sru!2skg!4v1761570964250!5m2!1sru!2skg"}
                                        onChange={(e) => setMapUrl(e.target.value)}
                                        className="w-64 overflow-hidden bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400"
                                    />
                                    {show && <button
                                        className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded-md transition"
                                        onClick={() => setShow(false)}>Подсказка</button>}
                                    {!show && <img onClick={() => setShow(true)} className={'md:w-144 w-72'}
                                                   src="https://kappa.lol/Qa69nN" alt=""/>}
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex gap-10 items-center">
                                <label className="block mb-1 w-1/5 md:w-1/10 text-sm md:text-base">Фотки:</label>
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFilesChange}
                                    className="w-64 bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400"
                                />
                            </div>

                            {files.length > 0 && (
                                <div className="mt-2">
                                    <p className="text-sm text-gray-300">Выбраны файлы:</p>
                                    <ul className="text-sm text-gray-300 list-disc list-inside">
                                        {files.map((file, index) => (
                                            <li key={index}>{file.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {uploadedImage && (
                                <p className="mt-2 text-sm text-green-400">Файл загружен: {uploadedImage}</p>
                            )}

                            {uploadingError && (
                                <p className="mt-2 text-sm text-red-500">{uploadingError}</p>
                            )}
                        </div>
                    </>
                )}
                {isSocialPage && (
                    <div className="mb-4">
                        <div className="flex gap-10">
                            <label className="block mb-1 w-1/5 md:w-1/10 text-sm md:text-base">Ссылка:</label>
                            <div>
                                <input
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="w-72 bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400"
                                />
                            </div>
                        </div>
                    </div>
                )
                }
                <div className="flex flex-wrap gap-3 mt-6">
                    <button
                        onClick={handleUpload}
                        disabled={isLoading}
                        className={`px-6 py-2 rounded-md bg-sky-800 hover:bg-sky-700 transition flex items-center justify-center gap-2 ${
                            isLoading ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                    >
                        {isLoading ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                                    ></path>
                                </svg>
                                <span>Загрузка...</span>
                            </>
                        ) : (
                            "СОХРАНИТЬ"
                        )}
                    </button>
                    <button onClick={() => router.back()}
                            className="px-6 py-2 rounded-md bg-gray-600 hover:bg-gray-500 transition ml-auto cursor-pointer">
                        ОТМЕНА
                    </button>
                </div>
            </div>
        </div>
    )
        ;
}
