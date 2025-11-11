"use client"
import {useEffect, useState} from "react";
import {FaInstagram, FaWhatsapp, FaFacebook, FaYoutube, FaTiktok} from "react-icons/fa";
import {useGetSocials, useSocials} from "@/stores/socialStore";

const Header = () => {
    const [show, setShow] = useState(true);
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
    const toggleMenu = () => setShow((prev) => !prev);

    return (
        <header className={'border-b text-white p-8'}>
            <div className={'container flex md:flex-row flex-col justify-between items-center'}>
                <div className={'flex items-center'}>
                    <a href="/" className={'md:pointer-events-none'}>
                            <img
                                className={'w-18 h-18'}
                                src="/logo.png" alt=""/>
                    </a>
                    <a href="/" className={'md:text-4xl flex flex-col items-center text-3xl font-bold'}>
                        Mir-travel <br/>
                        <span className={'text-sm uppercase'}>tours in kyrgyztan</span>
                    </a>
                </div>
                <nav className={'md:flex hidden gap-10'}>
                    <a className={'hover:opacity-50'} href={"/#footer"}>About Us</a>
                    <a className={'hover:opacity-50'} href={"/#locations"}>Locations</a>
                    <a className={'hover:opacity-50'} href={"/#tours"}>Tours</a>
                    <a className={'hover:opacity-50'} href="/autopark/">Our Cars</a>
                    <a className={'hover:opacity-50'} href={"/#footer"}>Contacts</a>
                </nav>
                <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden md:hidden 
          ${show ? "max-h-[300px] py-1" : "max-h-0 py-0"}
        `}
                >
                    <nav className="flex flex-col items-center gap-2 text-white text-base md:text-lg font-medium">
                        <a onClick={toggleMenu} href={"/#footer"}>About Us</a>
                        <a onClick={toggleMenu} href={"/#locations"}>Locations</a>
                        <a onClick={toggleMenu} href={"/#tours"}>Tours</a>
                        <a onClick={toggleMenu} href="/autopark/">Our Cars</a>
                        <a onClick={toggleMenu} href={"/#footer"}>Contacts</a>
                    </nav>
                </div>
                <div className="flex gap-2">
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
        </header>

    );
};

export default Header;
