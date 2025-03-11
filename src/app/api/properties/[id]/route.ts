import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;  // No need to await params, just destructure directly

    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      return new Response(JSON.stringify({ error: 'Property not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
