import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, phone, date } = await req.json();
    const reservation = await prisma.reservation.create({
      data: {
        name,
        email,
        phone,
        date,
      },
    });
    return NextResponse.json(reservation);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
