import React from 'react';

const HeaderAdmin = () => {
    return (
        <header className="bg-sky-800 text-white p-4">
            <div className="container flex items-center justify-between">
                <a href={'/admin'} className="md:text-2xl font-light">
                    Администрирование сайта
                </a>
                <div className="text-sm text-right space-x-2 lowercase md:normal-case">
                    <span>ДОБРО ПОЖАЛОВАТЬ, <span className="font-bold">ADMIN</span>.</span>
                    <a href="/" className="hover:underline">ОТКРЫТЬ САЙТ</a>
                </div>
            </div>
        </header>
    );
};

export default HeaderAdmin;