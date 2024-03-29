import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    // Extracting content of the request
    const reqBody = await request.json()
    const { email, password } = reqBody

    // Checking if the user exists
    const user = await prisma.users.findUnique({
      where: {
        email
      }
    })
    if (!user) {
      return NextResponse.json(`User doesn't exists`, { status: 400 })
    }

    // check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(`Invalid password`, { status: 400 })
    }

    // create token
    const tokenData = {
      id: user.id,
      name: user.name,
      role: user.role
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY!, { expiresIn: "1d" });

    // create the response
    const response = NextResponse.json({
      message: 'Login successful',
      success: true,
      token,
      role: user.role
    });
    response.cookies.set("authToken", token, { expires: Date.now() + 24 * 60 * 60 * 1000, httpOnly: true, path: '/' });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}