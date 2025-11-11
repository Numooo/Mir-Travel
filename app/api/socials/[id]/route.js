import fs from "fs";
import path from "path";

export async function GET(request, { params }) {
    const { id } = params;

    const filePath = path.join(process.cwd(), "db.json");
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const social = jsonData.socials.find((social) => String(social.id) === String(id));

    if (!social) {
        return new Response(JSON.stringify({ error: "Social not found" }), {
            status: 404,
        });
    }

    return Response.json(social);
}
export async function DELETE(request, { params }) {
    const { id } = params;

    const filePath = path.join(process.cwd(), "db.json");
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const socialIndex = jsonData.socials.findIndex((social) => String(social.id) === String(id));

    if (socialIndex === -1) {
        return new Response(JSON.stringify({ error: "Social not found" }), {
            status: 404,
        });
    }
    jsonData.socials.splice(socialIndex, 1);
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

    return new Response(JSON.stringify({ message: "Social deleted successfully" }), {
        status: 200,
    });
}
export async function PATCH(request, { params }) {
    const { id } = params;

    const filePath = path.join(process.cwd(), "db.json");

    let jsonData;
    try {
        const raw = fs.readFileSync(filePath, "utf-8");
        jsonData = raw ? JSON.parse(raw) : { socials: [] };
    } catch (e) {
        return new Response(JSON.stringify({ error: "Ошибка чтения базы" }), {
            status: 500,
        });
    }
    const socialIndex = jsonData.socials.findIndex((social) => String(social.id) === String(id));
    if (socialIndex === -1) {
        return new Response(JSON.stringify({ error: "Social not found" }), {
            status: 404,
        });
    }
    const updatedFields = await request.json();

    jsonData.socials[socialIndex] = {
        ...jsonData.socials[socialIndex],
        ...updatedFields,
    };

    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

    return new Response(JSON.stringify(jsonData.socials[socialIndex]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
