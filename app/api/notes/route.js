import connectDB from "@/lib/db";
import Note from "@/models/Note";

import { NextResponse } from "next/server";
import { success } from "zod";

export async function GET(request){
    try{
        await connectDB();  // putting this flag to ensure DB is connected before any operation
        const notes = await Note.find({}).sort({ createdAt: -1 }); // fetching all notes from the DB
        return NextResponse.json({success:true, data:notes}, {status: 200}); // returning the notes with status 200
    }
    catch(error){
        console.error("GET /api/notes error:", error);
        return NextResponse.json({success:false, error: error.message || "Failed to fetch notes"}, {status: 400});
    }
}

export async function POST(request){
    try{
        await connectDB();  // putting this flag to ensure DB is connected before any operation
        const body = await request.json(); // extracting the body from the request
        const note  = await Note.create(body); // creating a new note in the DB
        return NextResponse.json({success:true, data:note}, {status: 201}); // returning the created note with status 201
    }
    catch(error){
        console.error("POST /api/notes error:", error);
        return NextResponse.json({success:false, error: error.message || "Failed to create note"}, {status: 400});
    }
}