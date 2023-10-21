import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const url = new URL(req.url);
  const date = url.searchParams.get("q");
  const search = await prisma.reservation.findMany({
    where: {
      date: date?.toString(),
    },
  });

  if (search.length > 0) {
    const res = ``;
    return NextResponse.json(res);
  } else {
    const res = `Good news! ${date} is avaliable.`;
    return NextResponse.json(res);
  }
}
