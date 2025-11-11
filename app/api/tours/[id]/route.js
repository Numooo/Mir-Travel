import fs from "fs";
import path from "path";

export async function GET(request, { params }) {
    const { id } = params;

    const filePath = path.join(process.cwd(), "db.json");
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const tour = jsonData.tours.find((tour) => String(tour.id) === String(id));

    if (!tour) {
        return new Response(JSON.stringify({ error: "Tour not found" }), {
            status: 404,
        });
    }

    return Response.json(tour);
}
export async function DELETE(request, { params }) {
    const { id } = params;

    const filePath = path.join(process.cwd(), "db.json");
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const tourIndex = jsonData.tours.findIndex((tour) => String(tour.id) === String(id));

    if (tourIndex === -1) {
        return new Response(JSON.stringify({ error: "Tour not found" }), {
            status: 404,
        });
    }
    jsonData.tours.splice(tourIndex, 1);
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

    return new Response(JSON.stringify({ message: "Tour deleted successfully" }), {
        status: 200,
    });
}
export async function PATCH(request, { params }) {
    const { id } = params;

    const filePath = path.join(process.cwd(), "db.json");

    let jsonData;
    try {
        const raw = fs.readFileSync(filePath, "utf-8");
        jsonData = raw ? JSON.parse(raw) : { tours: [] };
    } catch (e) {
        return new Response(JSON.stringify({ error: "Ошибка чтения базы" }), {
            status: 500,
        });
    }
    const tourIndex = jsonData.tours.findIndex((tour) => String(tour.id) === String(id));
    if (tourIndex === -1) {
        return new Response(JSON.stringify({ error: "Tour not found" }), {
            status: 404,
        });
    }
    const updatedFields = await request.json();

    jsonData.tours[tourIndex] = {
        ...jsonData.tours[tourIndex],
        ...updatedFields,
    };

    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

    return new Response(JSON.stringify(jsonData.tours[tourIndex]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
