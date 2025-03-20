import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "../../../../../auth";


// PUT (update) an existing job by ID
export async function PUT(req: Request, context: { params: { id?: string } }) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const params = context.params; // Get the `id` from the URL params
    const id = params?.id;

    if (!id) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }

    const body = await req.json();
    const { title, location, description, responsibilities, requirements, benefits } = body;

    // Validate required fields
    if (!title || !location || !description || !responsibilities || !requirements || !benefits) {
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

// DELETE a job by ID
export async function DELETE(req: Request, context: { params: { id?: string } }) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const params = context.params; // Get the `id` from the URL params
    const id = params?.id;

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

// GET a single job by ID or all jobs if no ID is provided
export async function GET(req: Request, context: { params: { id?: string } }) {
    try {
      const id = context.params?.id;
  
      if (id) {
        // Fetch a single job by ID
        const job = await prisma.job.findUnique({
          where: { id },
        });
  
        if (!job) {
          return NextResponse.json({ error: "Job not found" }, { status: 404 });
        }
  
        return NextResponse.json(job, { status: 200 });
      } else {
        // Fetch all jobs
        const jobs = await prisma.job.findMany();
        return NextResponse.json(jobs, { status: 200 });
      }
    } catch (error) {
      console.error("Error fetching job(s):", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  