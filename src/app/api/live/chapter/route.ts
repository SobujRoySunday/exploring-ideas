import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

  try {
    const reqBody = await request.json();
    const { chapter, moduleId } = reqBody;

    const createdChapter = await prisma.chapters.create({ data: { chapterName: chapter, moduleId } })
    return NextResponse.json({
      message: 'New chapter created',
      success: true,
      createdChapter
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}