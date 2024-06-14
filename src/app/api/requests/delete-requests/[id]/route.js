import CollaborationRequest from "../../../../models/collaborationRequest";
import { NextCollaborationRequest, NextResponse } from "next/server";
import connect from "../../../../utils/db";
import mongoose from "mongoose";

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const deletedCollaborationRequest = await CollaborationRequest.findByIdAndDelete(
      id
    );

    if (!deletedCollaborationRequest) {
      return NextResponse.json({ error: "CollaborationRequest is not found" });
    }

    return NextResponse.json({
      message: " CollaborationRequest is deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting slide:", error);
    return NextResponse.json({ error: "Internal server error" });
  }
}