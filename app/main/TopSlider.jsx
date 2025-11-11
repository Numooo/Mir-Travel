"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {useGetImages, useImages} from "@/stores/routeStore";
import {useEffect} from "react";

const TopSlider = () => {
    const images = useImages();
    const getImages = useGetImages();

    useEffect(() => {
        void getImages();
    }, [getImages]);
    return (
        <div
            id="gallery"
            className="slider-container bg-white px-4 sm:px-6 lg:px-10 pt-10 sm:pt-16 lg:pt-20 pb-14 overflow-hidden"
        >
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    1024: {
                        centeredSlides: true,
                        slidesPerView: 2.5,
                        spaceBetween: 30,
                    },
                }}
                className="mySwiper"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative mb-8 h-60 sm:h-72 md:h-80 lg:h-96">
                            <img
                                src={image}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TopSlider;
