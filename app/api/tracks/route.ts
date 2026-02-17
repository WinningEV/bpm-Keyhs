import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { getLikedSongsWithFeatures } from "@/lib/spotify";

export async function GET(req: NextRequest) {
  const session = await getServerSession();
  const authHeader = req.headers.get("authorization");
  const accessToken = authHeader?.replace("Bearer ", "");

  if (!session || !accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "0");
  const pageSize = parseInt(searchParams.get("pageSize") ?? "50");

  try {
    const data = await getLikedSongsWithFeatures(accessToken, page, pageSize);
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
