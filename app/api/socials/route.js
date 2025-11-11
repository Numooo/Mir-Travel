import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";
const dbPath = path.join(process.cwd(), "db.json");
export async function GET() {
    const jsonData = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    return NextResponse.json(jsonData.socials || []);
}
export async function POST(req) {
    try {
        const data = await req.json();
        const jsonData = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
        jsonData.socials = jsonData.socials || [];
        jsonData.socials.push(data);
        fs.writeFileSync(dbPath, JSON.stringify(jsonData, null, 2));

        return NextResponse.json({ message: "Social added", social: data });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Ошибка при добавлении машины" }, { status: 500 });
    }
}
