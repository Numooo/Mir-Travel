import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), "db.json");

        const data = fs.readFileSync(filePath, "utf-8");
        const json = JSON.parse(data);

        const routes = Object.keys(json);

        return NextResponse.json({ routes });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Ошибка при чтении db.json" }, { status: 500 });
    }
}
