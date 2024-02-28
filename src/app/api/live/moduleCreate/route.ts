import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

  try {
    const reqBody = await request.json();
    const { module } = reqBody;

    const hasModule = await prisma.modules.findUnique({ where: { moduleName: module } })
    if (hasModule) {
      return NextResponse.json(`Module with that name already exists`, { status: 400 })
    }
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