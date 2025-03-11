import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;  // Directly use params from context

    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      return new NextResponse(JSON.stringify({ error: 'Property not found' }), { status: 404 });
    }

    return new NextResponse(JSON.stringify(property), { status: 200 });
  } catch (error) {
    console.error(error); // Log error details for debugging
    return new NextResponse(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
