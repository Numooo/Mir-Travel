import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";
const dbPath = path.join(process.cwd(), "db.json");
export async function GET() {
    const jsonData = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    return NextResponse.json(jsonData.tours || []);
}
export async function POST(req) {
    try {
        const data = await req.json();
        const jsonData = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
        jsonData.tours = jsonData.tours || [];
        jsonData.tours.push(data);
        fs.writeFileSync(dbPath, JSON.stringify(jsonData, null, 2));

        return NextResponse.json({ message: "Tour added", tour: data });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Ошибка при добавлении машины" }, { status: 500 });
    }
}
