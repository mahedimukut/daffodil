// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { auth } from "../../../../../auth";

// // DELETE a team member
// export async function DELETE(req: NextRequest, { params }: { params: { id?: string } }) {
//   try {
//     const session = await auth();

//     if (!session || !session.user || !session.user.email) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const id = params?.id;

//     if (!id) {
//       return NextResponse.json({ error: "Team member ID is required" }, { status: 400 });
//     }

//     await prisma.teamMember.delete({
//       where: { id },
//     });

//     return NextResponse.json({ message: "Team member deleted successfully" }, { status: 200 });
//   } catch (error) {
//     console.error("Error deleting team member:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

// // PUT (update) an existing team member
// export async function PUT(req: NextRequest, { params }: { params: { id?: string } }) {
//   try {
//     const session = await auth();

//     if (!session || !session.user || !session.user.email) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const id = params?.id;

//     if (!id) {
//       return NextResponse.json({ error: "Team member ID is required" }, { status: 400 });
//     }

//     const body = await req.json();
//     const { name, position, image, description, socials } = body;

//     if (!name || !position || !image || !description || !socials) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     const updatedTeamMember = await prisma.teamMember.update({
//       where: { id },
//       data: {
//         name,
//         position,
//         image,
//         description,
//         socials,
//       },
//     });

//     return NextResponse.json(updatedTeamMember, { status: 200 });
//   } catch (error) {
//     console.error("Error updating team member:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

// // GET a single team member by ID
// export async function GET(req: NextRequest, { params }: { params: { id?: string } }) {
//   try {
//     const session = await auth();

//     if (!session || !session.user || !session.user.email) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const id = params?.id;

//     if (!id) {
//       return NextResponse.json({ error: "Team member ID is required" }, { status: 400 });
//     }

//     const teamMember = await prisma.teamMember.findUnique({
//       where: { id },
//     });

//     if (!teamMember) {
//       return NextResponse.json({ error: "Team member not found" }, { status: 404 });
//     }

//     return NextResponse.json(teamMember, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching team member:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

export async function GET(request: Request) {}