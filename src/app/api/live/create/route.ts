import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { video, chapterId, fileBase64 } = reqBody

    const createdVideoLog = await prisma.videos.create({
      data: {
        videoName: video,
        chapterId,
        pptFile: fileBase64
      }
    })

    return NextResponse.json({
      message: 'New video log created',
      success: true,
      createdVideoLog
    })
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 })
  }
}