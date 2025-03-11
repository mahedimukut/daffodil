import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request, // Use `Request` instead of `NextRequest`
  { params }: { params: { id: string } } // Correctly destructure `params`
) {
  try {
    const { id } = params; // Access `params` directly

    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json(property, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}