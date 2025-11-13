import "./globals.css";
import Head from "next/head";

export const metadata = {
    title: "Mir Travel – Tours in Kyrgyzstan",
    description: "Unforgettable travel experiences in Kyrgyzstan! Discover the best routes, guides, and tips for travelers exploring Kyrgyzstan.",
    keywords: "Kyrgyzstan tours, travel in Kyrgyzstan, excursions Kyrgyzstan, adventure trips Kyrgyzstan, Kyrgyzstan attractions, vacation Kyrgyzstan",
    icons: {
        icon: "/logo.png",
        shortcut: "/logo.png",
        apple: "/logo.png",
    },
    url: "https://mirtravel.asia",
    twitterHandle: "@mirtravel",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <head>
            {/* Google Fonts */}
            <link
                href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
                rel="stylesheet"
            />

            {/* Основные мета-теги */}
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
            <meta name="keywords" content={metadata.keywords} />
            <link rel="icon" href={metadata.icons.icon} />
            <link rel="apple-touch-icon" href={metadata.icons.apple} />
            <link rel="preload" as="image" href="/assets/бир.jpg" />
            <link rel="preload" as="image" href="/assets/issykkul.jpg" />
            <link rel="preload" as="image" href="/assets/karakolbg.webp" />

            {/* Open Graph (Facebook, LinkedIn и т.д.) */}
            <meta property="og:title" content={metadata.title} />
            <meta property="og:description" content={metadata.description} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={metadata.url} />
            <meta property="og:image" content={`${metadata.url}${metadata.icons.icon}`} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metadata.title} />
            <meta name="twitter:description" content={metadata.description} />
            <meta name="twitter:image" content={`${metadata.url}${metadata.icons.icon}`} />
            <meta name="twitter:site" content={metadata.twitterHandle} />
        </head>
        <body className="antialiased">{children}</body>
        </html>
    );
}
