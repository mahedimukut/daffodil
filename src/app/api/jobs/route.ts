import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "../../../../auth";

// GET all jobs
export async function GET(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch all jobs
    const jobs = await prisma.job.findMany();

    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST a new job
export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, location, description, responsibilities, requirements, benefits } = body;

    // Validate required fields
    if (!title || !location || !description || !responsibilities || !requirements || !benefits) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create a new job
    const newJob = await prisma.job.create({
      data: {
        title,
        location,
        description,
        responsibilities,
        requirements,
        benefits,
      },
    });

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PUT (update) an existing job
export async function PUT(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, title, location, description, responsibilities, requirements, benefits } = body;

    // Validate required fields
    if (!id || !title || !location || !description || !responsibilities || !requirements || !benefits) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Update the job
    const updatedJob = await prisma.job.update({
      where: { id },
      data: {
        title,
        location,
        description,
        responsibilities,
        requirements,
        benefits,
      },
    });

    return NextResponse.json(updatedJob, { status: 200 });
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE a job
export async function DELETE(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();

    // Validate job ID
    if (!id) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }

    // Delete the job
    await prisma.job.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Job deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}