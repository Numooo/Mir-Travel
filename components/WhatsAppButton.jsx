import React from "react";
import {FaWhatsapp} from "react-icons/fa";

const WhatsAppButton = () => {

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <button
                className="flex items-center gap-1 md:text-base text-sm bg-green-500 hover:bg-green-600 text-white font-semibold py-2 md:py-3 px-3 md:px-6 rounded-full"
                onClick={() => {
                    const phone = "996702191998";
                    const message = `Hi, I write from web-site, `;
                    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
                    window.open(url, '_blank');
                }}
            >
                <span className={'text-xl'}><FaWhatsapp /></span><span className={'md:inline hidden'}>Write on </span>WhatsApp
            </button>
        </div>
    );
};

export default WhatsAppButton;