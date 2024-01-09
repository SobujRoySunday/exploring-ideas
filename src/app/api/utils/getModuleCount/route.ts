import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const count = await prisma.modules.count()
    return NextResponse.json({ count })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}