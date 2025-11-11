/** @type {import('next').NextConfig} */
import path from "path";

const nextConfig = {
    async headers() {
        return [
            {
                source: "/upload/:path*",
                headers: [
                    { key: "Access-Control-Allow-Origin", value: "*" },
                ],
            },
        ];
    },

    webpack: (config) => {
        config.resolve.alias["uploads"] = path.resolve("./upload");
        return config;
    },
};

export default nextConfig;