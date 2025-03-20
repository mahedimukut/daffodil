import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "../../../../auth";

// GET all team members
export async function GET(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch all team members
    const teamMembers = await prisma.teamMember.findMany();

    return NextResponse.json(teamMembers, { status: 200 });
  } catch (error) {
    console.error("Error fetching team members:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST a new team member
export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, position, image, description, socials } = body;

    if (!name || !position || !image || !description || !socials) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create a new team member
    const newTeamMember = await prisma.teamMember.create({
      data: {
        name,
        position,
        image,
        description,
        socials,
      },
    });

    return NextResponse.json(newTeamMember, { status: 201 });
  } catch (error) {
    console.error("Error creating team member:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PUT (update) an existing team member
export async function PUT(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, name, position, image, description, socials } = body;

    if (!id || !name || !position || !image || !description || !socials) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Update the team member
    const updatedTeamMember = await prisma.teamMember.update({
      where: { id },
      data: {
        name,
        position,
        image,
        description,
        socials,
      },
    });

    return NextResponse.json(updatedTeamMember, { status: 200 });
  } catch (error) {
    console.error("Error updating team member:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE a team member
export async function DELETE(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Team member ID is required" }, { status: 400 });
    }

    // Delete the team member
    const deletedTeamMember = await prisma.teamMember.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Team member deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting team member:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}