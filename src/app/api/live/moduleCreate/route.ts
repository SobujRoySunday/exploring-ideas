import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

  try {
    const reqBody = await request.json();
    const { module } = reqBody;
    const createdModule = await prisma.modules.create({ data: { moduleName: module } })
    return NextResponse.json({
      message: 'New Module created',
      success: true,
      createdModule
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}