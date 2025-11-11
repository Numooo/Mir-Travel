import fs from "fs";
import path from "path";

export async function GET(request, { params }) {
    const { id } = params;

    const filePath = path.join(process.cwd(), "db.json");
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const location = jsonData.locations.find((location) => String(location.id) === String(id));

    if (!location) {
        return new Response(JSON.stringify({ error: "Location not found" }), {
            status: 404,
        });
    }

    return Response.json(location);
}
export async function DELETE(request, { params }) {
    const { id } = params;

    const filePath = path.join(process.cwd(), "db.json");
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const locationIndex = jsonData.locations.findIndex((location) => String(location.id) === String(id));

    if (locationIndex === -1) {
        return new Response(JSON.stringify({ error: "Location not found" }), {
            status: 404,
        });
    }
    jsonData.locations.splice(locationIndex, 1);
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

    return new Response(JSON.stringify({ message: "Location deleted successfully" }), {
        status: 200,
    });
}
export async function PATCH(request, { params }) {
    const { id } = params;

    const filePath = path.join(process.cwd(), "db.json");

    let jsonData;
    try {
        const raw = fs.readFileSync(filePath, "utf-8");
        jsonData = raw ? JSON.parse(raw) : { locations: [] };
    } catch (e) {
        return new Response(JSON.stringify({ error: "Ошибка чтения базы" }), {
            status: 500,
        });
    }
    const locationIndex = jsonData.locations.findIndex((location) => String(location.id) === String(id));
    if (locationIndex === -1) {
        return new Response(JSON.stringify({ error: "Location not found" }), {
            status: 404,
        });
    }
    const updatedFields = await request.json();

    jsonData.locations[locationIndex] = {
        ...jsonData.locations[locationIndex],
        ...updatedFields,
    };

    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

    return new Response(JSON.stringify(jsonData.locations[locationIndex]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
