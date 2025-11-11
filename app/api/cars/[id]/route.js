import fs from "fs";
import path from "path";

export async function GET(request, { params }) {
    const { id } = params;

    const filePath = path.join(process.cwd(), "db.json");
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const car = jsonData.cars.find((car) => String(car.id) === String(id));

    if (!car) {
        return new Response(JSON.stringify({ error: "Car not found" }), {
            status: 404,
        });
    }

    return Response.json(car);
}
export async function DELETE(request, { params }) {
    const { id } = params;

    const filePath = path.join(process.cwd(), "db.json");
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const carIndex = jsonData.cars.findIndex((car) => String(car.id) === String(id));

    if (carIndex === -1) {
        return new Response(JSON.stringify({ error: "Car not found" }), {
            status: 404,
        });
    }
    jsonData.cars.splice(carIndex, 1);
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

    return new Response(JSON.stringify({ message: "Car deleted successfully" }), {
        status: 200,
    });
}
export async function PATCH(request, { params }) {
    const { id } = params;

    const filePath = path.join(process.cwd(), "db.json");

    let jsonData;
    try {
        const raw = fs.readFileSync(filePath, "utf-8");
        jsonData = raw ? JSON.parse(raw) : { cars: [] };
    } catch (e) {
        return new Response(JSON.stringify({ error: "Ошибка чтения базы" }), {
            status: 500,
        });
    }
    const carIndex = jsonData.cars.findIndex((car) => String(car.id) === String(id));
    if (carIndex === -1) {
        return new Response(JSON.stringify({ error: "Car not found" }), {
            status: 404,
        });
    }
    const updatedFields = await request.json();

    jsonData.cars[carIndex] = {
        ...jsonData.cars[carIndex],
        ...updatedFields,
    };

    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

    return new Response(JSON.stringify(jsonData.cars[carIndex]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
