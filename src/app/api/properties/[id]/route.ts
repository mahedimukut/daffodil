import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  context: { params: { id?: string } } // `id` can be optional to avoid destructuring errors
) {
  try {
    const params = await context.params; // Await params before accessing properties
    const id = params?.id; // Safely access `id`

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
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT (update) an existing property
export async function PUT(req: Request, context: { params: { id?: string } }) {
  try {
    const params = context.params; // Get the `id` from the URL params
    const id = params?.id;

    if (!id) {
      return NextResponse.json({ error: "Property ID is required" }, { status: 400 });
    }

    const body = await req.json();
    const { name, price, bedrooms, toilets, balcony, sqft, images, details, location, available } = body;

    // Update the property
    const updatedProperty = await prisma.property.update({
      where: { id },
      data: {
        name,
        price,
        bedrooms,
        toilets,
        balcony,
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
export async function DELETE(req: Request, context: { params: { id?: string } }) {
  try {
    const params = context.params; // Get the `id` from the URL params
    const id = params?.id;

    if (!id) {
      return NextResponse.json({ error: "Property ID is required" }, { status: 400 });
    }

    // Delete the property
    const deletedProperty = await prisma.property.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Property deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting property:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}