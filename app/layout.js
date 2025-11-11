import "./globals.css";
import Head from "next/head";

export const metadata = {
    title: "Mir Travel",
    description: "Unforgettable travel experiences!",
    icons: {
        icon: "/logo.png",
        shortcut: "/logo.png",
        apple: "/logo.png",
    },
};


export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <head>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"/>
        </head>
        <body className="antialiased">{children}</body>
        </html>
    );
}
