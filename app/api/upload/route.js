import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
    cloud_name: "deo45yho0",
    api_key: "717183974966968",
    api_secret: "0gZNyUSwE-Zc3ZYy1gAurkFcGFg",
});

export async function POST(req) {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
        return NextResponse.json({ error: "Файл не найден" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    try {
        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "kg-tour" },
                (err, result) => (err ? reject(err) : resolve(result))
            );
            stream.end(buffer);
        });

        return NextResponse.json({ path: uploadResult.secure_url });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Ошибка при загрузке" }, { status: 500 });
    }
}
