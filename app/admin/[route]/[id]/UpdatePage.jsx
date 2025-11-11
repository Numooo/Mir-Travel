"use client";

import React, {useEffect, useState} from "react";
import AddSVG from "@/utils/AddSVG";
import {useParams, usePathname} from "next/navigation";
import {useGetRoutes, useRoutes, useUploadImage, useUploading} from "@/stores/routeStore";
import {useDeleteSocial, useGetByIdSocial, useLoadingSocial, useSocial, useUpdateSocial} from "@/stores/socialStore";
import {useCar, useDeleteCar, useGetByIdCar, useLoadingCar, useUpdateCar} from "@/stores/carStore";
import {useRouter} from "next/navigation";
import {
    useDeleteLocation,
    useGetByIdLocation, useGetLocations,
    useLoadingLocation,
    useLocation, useLocations,
    useUpdateLocation
} from "@/stores/locationStore";
import {useDeleteTour, useGetByIdTour, useLoadingTour, useTour, useUpdateTour} from "@/stores/tourStore";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function UpdatePage() {
    const uploadImage = useUploadImage();
    const getRoutes = useGetRoutes();
    const routesList = useRoutes();

    const social = useSocial();
    const getByIdSocial = useGetByIdSocial();
    const deleteSocial = useDeleteSocial();
    const updateSocial = useUpdateSocial();
    const loadingSocial = useLoadingSocial();

    const car = useCar();
    const getByIdCar = useGetByIdCar();
    const deleteCar = useDeleteCar();
    const updateCar = useUpdateCar();
    const loadingCar = useLoadingCar();

    const location = useLocation();
    const locations = useLocations();
    const getLocations = useGetLocations();
    const getByIdLocation = useGetByIdLocation();
    const deleteLocation = useDeleteLocation();
    const updateLocation = useUpdateLocation();
    const loadingLocation = useLoadingLocation()

    const tour = useTour();
    const getByIdTour = useGetByIdTour();
    const deleteTour = useDeleteTour();
    const updateTour = useUpdateTour();
    const loadingTour = useLoadingTour();

    const params = useParams();
    const router = useRouter();
    const {id} = useParams();
    const pathname = usePathname();
    const uploading = useUploading()
    const isLoading =
        loadingSocial ||
        loadingCar ||
        loadingLocation ||
        loadingTour ||
        uploading;
    const isSocialPage =
        params?.slug === "social" || pathname?.includes("/admin/social");
    const isTourPage =
        params?.slug === "tour" || pathname?.includes("/admin/tour");
    const isLocationPage =
        params?.slug === "location" || pathname?.includes("/admin/location");
    const isCarPage =
        params?.slug === "cars" || pathname?.includes("/admin/cars");

    useEffect(() => {
        void getRoutes();
        if (isSocialPage) void getByIdSocial(id);
        if (isCarPage) void getByIdCar(id);
        if (isLocationPage) void getByIdLocation(id);
        if (isTourPage){void getByIdTour(id); void getLocations();}
    }, [id, isSocialPage, isCarPage, isLocationPage, isTourPage, getLocations]);

    let data = null;
    let name = "";

    if (isSocialPage) {
        data = social;
        name = "социальную сеть";
    } else if (isTourPage) {
        data = tour;
        name = "тур";
    } else if (isLocationPage) {
        data = location;
        name = "локацию";
    } else if (isCarPage) {
        data = car;
        name = "машину";
    }

    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [engine, setEngine] = useState("");
    const [places, setPlaces] = useState("");
    const [year, setYear] = useState("");
    const [type, setType] = useState("");
    const [region, setRegion] = useState("");
    const [text, setText] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [groupSize, setGroupSize] = useState("");
    const [mapUrl, setMapUrl] = useState("");
    const [days, setDays] = useState("");
    const [season, setSeason] = useState("");
    const [file, setFile] = useState(null);
    const [bg, setBg] = useState(null);
    const [map, setMap] = useState(null);
    const [isEditingImage, setIsEditingImage] = useState(false);
    const [isEditingBg, setIsEditingBg] = useState(false);
    const [isEditingMap, setIsEditingMap] = useState(false);
    const [files, setFiles] = useState([]);
    const [newFiles, setNewFiles] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [locationsCurrent, setLocations] = useState([]);
    const [itineraries, setItineraries] = useState([]);

    useEffect(() => {
        if (data) {
            setTitle(data.title || "");
            setUrl(data.url || "");
            setEngine(data.engine || "");
            setPlaces(data.places || "");
            setYear(data.year || "");
            setType(data.type || "");
            setRegion(data.region || "");
            setText(data.text || "");
            setDescription(data.description || "");
            setPrice(data.price || "");
            setDifficulty(data.difficulty || "");
            setGroupSize(data.groupSize || "");
            setMapUrl(data.mapUrl || "")
            setDays(data.days || "")
            setSeason(data.season || "")
            setFiles(data.images || []);
            setLocations(data.locations || []);
            setItineraries(data.itineraries || [])
        }
    }, [data]);
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

    const handleItineraryChange = (index, field, value) => {
        const updated = [...itineraries];
        updated[index][field] = value;
        setItineraries(updated);
    };
    const handleAddItinerary = () => {
        const newItinerary = {
            id: Date.now().toString(),
            title: "",
            description: "",
            images: []
        };
        setItineraries([...itineraries, newItinerary]);
    };
    const handleDeleteItinerary = (index) => {
        const updated = itineraries.filter((_, i) => i !== index);
        setItineraries(updated);
    };
    const handleAddImageI = (index, file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const updated = [...itineraries];
            updated[index].images.push(reader.result);
            setItineraries(updated);
        };
        reader.readAsDataURL(file);
    };
    const handleDeleteImageI = (itineraryIndex, imageIndex) => {
        const updated = [...itineraries];
        updated[itineraryIndex].images = updated[itineraryIndex].images.filter((_, i) => i !== imageIndex);
        setItineraries(updated);
    };
    const handleFileChange = (e) => setFile(e.target.files[0]);
    const handleMapChange = (e) => setMap(e.target.files[0]);
    const handleFilesChange = (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        const updated = [...files];
        updated[index] = file;
        setFiles(updated);
    };
    const handleSaveImage = async (index) => {
        const file = files[index];
        if (!(file instanceof File)) return;

        const uploadedPath = await uploadImage(file);
        const updated = [...files];
        updated[index] = uploadedPath;

        setFiles(updated);
        setEditingIndex(null);
    };
    const handleDeleteImage = (index) => {
        const updated = files.filter((_, i) => i !== index);
        setFiles(updated);
    };
    const handleAddFileChange = (e) => {
        const selected = Array.from(e.target.files);
        setNewFiles((prev) => [...prev, ...selected]);
        e.target.value = "";
    };
    const handleAddImage = async () => {
        if (newFiles.length === 0) return;

        const uploadedPaths = [];
        for (const file of newFiles) {
            const uploadedPath = await uploadImage(file);
            if (uploadedPath) uploadedPaths.push(uploadedPath);
        }

        const updated = [...files, ...uploadedPaths];
        setFiles(updated);
        setNewFiles([]);
    };
    const handleBgChange = (e) => setBg(e.target.files[0]);
    const handleDelete = async () => {
        try {
            if (isCarPage) {
                await deleteCar(id);
                router.push("/admin/cars");
            } else if (isSocialPage) {
                await deleteSocial(id);
                router.push("/admin/socials");
            } else if (isLocationPage) {
                await deleteLocation(id);
                router.push("/admin/locations");
            } else if (isTourPage) {
                await deleteTour(id);
                router.push("/admin/tours");
            }
        } catch (error) {
            console.error("Ошибка при удалении:", error);
        }
    };
    const handleUpdate = async () => {
        let imagePath = data.image;
        let bgPath = data.bg;
        let mapPath = data.maps
        let imagesPaths = [];

        if (file) {
            const uploadedPath = await uploadImage(file);
            if (uploadedPath) imagePath = uploadedPath;
        }
        if (map) {
            const uploadedPath = await uploadImage(map);
            if (uploadedPath) mapPath = uploadedPath;
        }
        if (bg) {
            const uploadedPath = await uploadImage(bg);
            if (uploadedPath) bgPath = uploadedPath;
        }
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file instanceof File) {
                const uploadedPath = await uploadImage(file);
                if (uploadedPath) {
                    imagesPaths[i] = uploadedPath;
                }
            } else if (typeof file === "string") {
                imagesPaths[i] = file;
            }
        }
        const updatedTour = {
            days,
            title,
            description,
            bg: bgPath,
            season,
            maps: mapPath,
            locations: locationsCurrent,
            itineraries
        };
        const updatedCar = {
            title,
            engine,
            places,
            year,
            type,
            image: imagePath,
        };

        const updatedLocation = {
            title,
            image: imagePath,
            region,
            text,
            description,
            price,
            difficulty,
            groupSize,
            mapUrl,
            bg: bgPath,
            images: imagesPaths,
        };

        try {
            if (isCarPage) {
                await updateCar(id, updatedCar);
                router.push("/admin/cars");
            } else if (isSocialPage) {
                await updateSocial(id, {title, url});
                router.push("/admin/socials");
            } else if (isLocationPage) {
                await updateLocation(id, updatedLocation);
                router.push("/admin/locations");
            } else if (isTourPage) {
                await updateTour(id, updatedTour);
                router.push("/admin/tours");
            }
        } catch (err) {
            console.error("❌ Error updating:", err);
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
                className="mx-auto bg-black rounded-lg w-full md:w-4/5 p-6 overflow-y-auto max-h-[560px] md:max-h-[670px]">
                <div className={'flex justify-between items-start'}>
                    <h2 className="text-xl font-medium mb-6">
                        Изменить {name}
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
                {isSocialPage && (
                    <div className="mb-4">
                        <div className="flex gap-10">
                            <label className="block mb-2 w-1/5 md:w-1/10 text-sm md:text-base">Ссылка:</label>
                            <div className="mt-1">
                                <p className={'text-sm'}>
                                    Сейчас:{" "}
                                    <a href={data?.url} className="text-blue-400 hover:underline">
                                        {data?.url}
                                    </a>
                                </p>
                                <div className="flex items-center">
                                    <label className="text-sm">Изменить:</label>
                                    <input
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        className="min-w-64 bg-gray-800 border border-gray-600 rounded-md px-3 py-2 mt-1 text-sm outline-none focus:ring-1 focus:ring-blue-400"
                                    />
                                </div>
                                <p className="text-xs text-gray-400 mt-2">
                                    Введите в виде URL (https://…)
                                </p>
                            </div>
                        </div>
                    </div>
                )}
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
                {(isCarPage || isLocationPage) && (
                    <div className="mb-4">
                        <div className="flex gap-10 items-center">
                            <label className="block mb-1 w-1/5 md:w-1/10 text-sm md:text-base">Фото:</label>
                            {data?.image && !isEditingImage ? (
                                <div className="flex items-start flex-col gap-4">
                                    <img
                                        src={data?.image}
                                        alt={data?.title}
                                        className="w-64 h-40 object-cover bg-gray-800 border border-gray-600 rounded-md"
                                    />
                                    <button
                                        onClick={() => setIsEditingImage(true)}
                                        className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded-md transition"
                                    >
                                        Изменить
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="w-64 bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setIsEditingImage(false)}
                                            className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-md transition"
                                        >
                                            Отмена
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {(isLocationPage || isTourPage) && (
                    <div className="mb-4">
                        <div className="flex gap-10 items-center">
                            <label className="block mb-1 w-1/5 md:w-1/10 text-sm md:text-base">Фон:</label>
                            {data?.bg && !isEditingBg ? (
                                <div className="flex items-start flex-col gap-4">
                                    <img
                                        src={data?.bg}
                                        alt={data?.title}
                                        className="w-64 h-40 object-cover bg-gray-800 border border-gray-600 rounded-md"
                                    />
                                    <button
                                        onClick={() => setIsEditingBg(true)}
                                        className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded-md transition"
                                    >
                                        Изменить
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <input
                                        type="file"
                                        onChange={handleBgChange}
                                        className="w-64 bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setIsEditingBg(false)}
                                            className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-md transition"
                                        >
                                            Отмена
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
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
                                {data?.maps && !isEditingImage ? (
                                    <div className="flex items-start flex-col gap-4">
                                        <img
                                            src={data?.maps}
                                            alt={data?.title}
                                            className="w-96 h-60 object-cover bg-gray-800 border border-gray-600 rounded-md"
                                        />
                                        <button
                                            onClick={() => setIsEditingImage(true)}
                                            className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded-md transition"
                                        >
                                            Изменить
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        <input
                                            type="file"
                                            onChange={handleMapChange}
                                            className="w-64 bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400"
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setIsEditingImage(false)}
                                                className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-md transition"
                                            >
                                                Отмена
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
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
                            <div className="flex flex-col gap-6 max-h-96 overflow-y-auto">
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
                                            <label className="flex flex-col items-center justify-center w-28 h-28 border-2 border-dashed border-gray-600 rounded-md cursor-pointer hover:border-blue-400">
                                                <span className="text-gray-400 text-sm">+</span>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) => handleAddImageI(index, e.target.files[0])}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                ))}

                                <button
                                    onClick={handleAddItinerary}
                                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 w-fit"
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
                                <label className="block mb-1 w-1/5 md:w-1/10 text-sm md:text-base">Карта:</label>
                                {mapUrl && !isEditingMap ? (
                                    <div className="flex items-start flex-col gap-4">
                                        <iframe className={'w-64 rounded-lg overflow-hidden'} src={mapUrl}
                                                allowFullScreen
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                                title="Location map"/>
                                        <button
                                            onClick={() => setIsEditingMap(true)}
                                            className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded-md transition"
                                        >
                                            Изменить
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        <textarea
                                            value={mapUrl}
                                            placeholder={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d629673.8753490128!2d74.82906237060105!3d42.869474622757075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389bf3fd4de734ad%3A0x3fd30e77c732683e!2z0JHRg9GA0LDQvdCw!5e0!3m2!1sru!2skg!4v1761570964250!5m2!1sru!2skg"}
                                            onChange={(e) => setMapUrl(e.target.value)}
                                            className="w-64 overflow-hidden bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400"
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setIsEditingMap(false)}
                                                className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-md transition"
                                            >
                                                Отмена
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex flex-col gap-4">
                                <label className="block mb-1 w-full md:w-1/5 text-sm md:text-base">Фотки:</label>
                                <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                                    {files.map((item, i) => {
                                        const isEditing = editingIndex === i;
                                        const imageSrc = item instanceof File ? URL.createObjectURL(item) : item;

                                        return (
                                            <div key={i} className="flex flex-col items-start gap-3 shrink-0">
                                                {!isEditing ? (
                                                    <>
                                                        <img
                                                            src={imageSrc}
                                                            alt={`image-${i}`}
                                                            className="md:w-64 w-44 h-40 object-cover bg-gray-800 border border-gray-600 rounded-md"
                                                        />
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => setEditingIndex(i)}
                                                                className="md:px-3 px-1 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded-md transition"
                                                            >
                                                                Изменить
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteImage(i)}
                                                                className="md:px-3 px-1 py-1 text-sm bg-red-600 hover:bg-red-700 rounded-md transition"
                                                            >
                                                                Удалить
                                                            </button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="flex flex-col gap-2">
                                                        <input
                                                            type="file"
                                                            onChange={(e) => handleFilesChange(e, i)}
                                                            className="w-64 bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400"
                                                        />
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleSaveImage(i)}
                                                                className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 rounded-md transition"
                                                            >
                                                                Сохранить
                                                            </button>
                                                            <button
                                                                onClick={() => setEditingIndex(null)}
                                                                className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-md transition"
                                                            >
                                                                Отмена
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="flex flex-col mt-4 gap-2">
                                    <input
                                        type="file"
                                        multiple
                                        onChange={handleAddFileChange}
                                        className="w-64 bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-400"
                                    />
                                    {newFiles.length > 0 && (
                                        <ul className="text-sm text-gray-300 list-disc list-inside">
                                            {newFiles.map((file, index) => (
                                                <li key={index}>{file.name}</li>
                                            ))}
                                        </ul>
                                    )}
                                    <button
                                        onClick={handleAddImage}
                                        className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 rounded-md transition"
                                    >
                                        Добавить фото
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <div className="flex flex-wrap gap-3 mt-6">
                    <button
                        onClick={handleUpdate}
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
                    <button onClick={handleDelete}
                            className="px-6 py-2 rounded-md bg-red-600 hover:bg-red-500 transition ml-auto">
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
}