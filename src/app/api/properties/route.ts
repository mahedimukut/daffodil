import { NextResponse } from "next/server";
import { auth } from "../../../../auth"; // Import NextAuth authentication
import { prisma } from "@/lib/prisma";

// Handle POST request to create a new property
export async function POST(req: Request) {
  try {
    // Get the authenticated session
    const session = await auth();

    // Check if user is authenticated
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, price, bedrooms, toilets, balcony, parking, garden, sqft, images, details, location, available } = body;

    // Validate required fields
    if (!name || !price || !bedrooms || !toilets || !sqft || !images || !details || !location || !available) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // Create new property
    const newProperty = await prisma.property.create({
      data: {
        name,
        price,
        bedrooms,
        toilets,
        balcony,
        parking, 
        garden,
        sqft,
        images, // Array of image URLs
        details,
        location,
        available,
        ownerId: session.user.id, // Assign the property to the authenticated user
      },
    });

    return NextResponse.json(newProperty, { status: 201 });
  } catch (error) {
    console.error("Error adding property:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Handle GET request to fetch all properties
export async function GET() {
  try {
    const properties = await prisma.property.findMany();
    return NextResponse.json(properties, { status: 200 });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}