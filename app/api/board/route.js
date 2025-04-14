import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import Board from "@/models/Board";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    // Validate request body
    if (
      !body.name ||
      typeof body.name !== "string" ||
      body.name.trim() === ""
    ) {
      return NextResponse.json(
        { message: "Name is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    // Authenticate user
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Connect to MongoDB
    await connectMongo();

    // Find user
    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Create board
    const board = await Board.create({
      userId: user._id,
      name: body.name.trim(),
    });

    // Update user's boards
    if (user.boards) {
      user.boards.push(board._id);
    } else {
      user.boards = new Array(board._id);
    }
    await user.save();

    // Return success response
    return NextResponse.json(
      { message: "Board created successfully", board },
      { status: 201 }
    );
  } catch (error) {
    // Handle errors
    console.error("Error creating board:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
