import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Extract ID from URL dynamically
const extractIdFromUrl = (req: NextRequest): string | null => {
  const segments = req.nextUrl.pathname.split("/");
  return segments[segments.length - 1] || null;
};

// GET a single property by ID
export async function GET(req: NextRequest) {
  try {
    const id = extractIdFromUrl(req);

    if (!id) {
      return NextResponse.json({ error: "Property ID is required" }, { status: 400 });
    }

    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json(property, { status: 200 });
  } catch (error) {
    console.error("Error fetching property:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT (update) an existing property
export async function PUT(req: NextRequest) {
  try {
    const id = extractIdFromUrl(req);

    if (!id) {
      return NextResponse.json({ error: "Property ID is required" }, { status: 400 });
    }

    const body = await req.json();
    const { name, price, bedrooms, toilets, balcony,parking,garden, sqft, images, details, location, available } = body;

    const updatedProperty = await prisma.property.update({
      where: { id },
      data: {
        name,
        price,
        bedrooms,
        toilets,
        balcony,
        parking,
        garden,
        sqft,
        images,
        details,
        location,
        available,
      },
    });

    return NextResponse.json(updatedProperty, { status: 200 });
  } catch (error) {
    console.error("Error updating property:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE a property
export async function DELETE(req: NextRequest) {
  try {
    const id = extractIdFromUrl(req);

    if (!id) {
      return NextResponse.json({ error: "Property ID is required" }, { status: 400 });
    }

    await prisma.property.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Property deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting property:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
