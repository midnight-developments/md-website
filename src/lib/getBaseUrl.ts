import { headers } from "next/headers";

export async function getBaseUrl(): Promise<string> {
    const headerList = await headers();
    const host = headerList.get("x-forwarded-host") || headerList.get("host") || "localhost:3000";
    const forwardedProto = headerList.get("x-forwarded-proto");

    let protocol = "http";
    if (forwardedProto) {
        protocol = forwardedProto.split(",")[0].trim();
    } else if (
        process.env.NODE_ENV === "production" &&
        !host.includes("localhost") &&
        !/^\d+\.\d+\.\d+\.\d+/.test(host)
    ) {
        protocol = "https";
    }

    return `${protocol}://${host}`;
}
