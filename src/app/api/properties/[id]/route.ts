import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;  // Corrected: destructuring directly

    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json(property, { status: 200 });
  } catch (error) {
    console.error(error); // Log error details for debugging
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
