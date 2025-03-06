import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "../../../../auth";

// Handle POST request (add/remove favorite)
export async function POST(req: Request) {
  const session = await auth();

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { propertyId } = await req.json();
  const userEmail = session.user.email;

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  try {
    // Check if the property is already a favorite
    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        userId: user.id,
        propertyId,
      },
    });

    if (existingFavorite) {
      // Remove from favorites if already exists
      await prisma.favorite.delete({
        where: { id: existingFavorite.id },
      });
      return NextResponse.json({ message: "Removed from favorites" }, { status: 200 });
    } else {
      // Add to favorites if not already added
      await prisma.favorite.create({
        data: {
          userId: user.id,
          propertyId,
        },
      });
      return NextResponse.json({ message: "Added to favorites" }, { status: 201 });
    }
  } catch (error) {
    console.error("Error handling favorite:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// Handle GET request (fetch favorites)
export async function GET() {
  const session = await auth();

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userEmail = session.user.email;

  try {
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: { favorites: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user.favorites, { status: 200 });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
