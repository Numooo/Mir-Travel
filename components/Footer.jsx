import React, {useEffect} from "react";
import {useGetSocials, useSocials} from "@/stores/socialStore";
import {FaFacebook, FaInstagram, FaTiktok, FaWhatsapp, FaYoutube} from "react-icons/fa";

const Footer = () => {
    const socials = useSocials();
    const getSocials = useGetSocials();
    const icons = {
        instagram: <FaInstagram className="md:w-3/4 w-10 h-10 md:h-3/4" />,
        facebook: <FaFacebook className="md:w-3/4 w-10 h-10 md:h-3/4" />,
        tiktok: <FaTiktok className="md:w-3/4 w-10 h-10 md:h-3/4" />,
        youtube: <FaYoutube className="md:w-3/4 w-10 h-10 md:h-3/4" />,
        whatsapp: <FaWhatsapp className="md:w-3/4 w-10 h-10 md:h-3/4" />
    };
    useEffect(() => {
        void getSocials();
    }, [getSocials])
    return (
        <div id={"footer"} className="relative text-white py-16">
            <div className={"absolute inset-0 backdrop-blur-md"}></div>
            <div className="md:px-20 z-10 relative px-10">
                <div className={"flex md:flex-row gap-10 md:gap-0 flex-col justify-around"}>
                    <div className={"md:w-1/4"}>
                        <a href="#" className={'text-3xl font-bold'}>
                            Mir-travel
                        </a>
                        <div className={"pt-2 md:pt-6"}>
                            <p>
                                Explore Kyrgyzstan — a land of mountains, lakes, and nomadic traditions.
                                At Kyrgyzstan.Tour, we offer unforgettable journeys for adventurers, culture lovers, and nature seekers.
                            </p>
                        </div>
                        <div className={"pt-2 md:pt-6"}>
                            <p>
                                Kyrgyzstan, 2025
                            </p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h2 className={"font-bold text-xl"}>
                                Contacts
                            </h2>
                            <a target={"_blank"} href="https://maps.app.goo.gl/d7JEwHSJA8wpkYVr9">
                                <p className={"pt-2 md:pt-6"}>
                                    Kyrgyzstan, <span>Bishkek</span>
                                </p>
                            </a>


                            <a target={"_blank"} href="https://wa.me/+996702191998">
                                <p>
                                    Phone: <span>+996 (702) 19 19 98</span>
                                </p>
                            </a>

                            <a target={"_blank"} href={'https://www.instagram.com/sadykov_mk?igsh=bTdlNXZyZjl2dHMy&utm_source=qr'}>
                                <p>
                                    Instagram: <span>sadykov_mk</span>
                                </p>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h2 className={"font-bold text-xl"}>
                            Our social cites
                        </h2>
                        <div className={'flex gap-2 pt-2 md:pt-6'}>
                            {socials.map((social) => (
                                <a
                                    key={social.id}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex justify-center items-center h-5 w-5 md:h-10 md:w-10 rounded-full hover:opacity-50"
                                >
                                    {icons[social.title.toLowerCase()] || (
                                        <span className="text-white text-sm">{social.title}</span>
                                    )}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className={'flex flex-col'}>
                            <h2 className={"font-bold text-xl"}>
                                Navigation
                            </h2>
                            <a href={'#tours'} className={"pt-2 md:pt-6"}>
                                Group tours
                            </a>
                            <a href={'#tours'}>
                                Individual tours
                            </a>
                            <a href={'#locations'}>
                                Author's tours
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;