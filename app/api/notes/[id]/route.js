import connectDB from "@/lib/db";
import Note from "@/models/Note";
import { NextResponse } from "next/server";

export async function PUT (request, { params }){
    try{    
        const { id } = await params;
        await connectDB();
        const body = await request.json();

        const note = await Note.findByIdAndUpdate(
            id,
            {...body, updatedAt: new Date()},
            { new: true , runValidators: true }
        )

         if(!note){
            return NextResponse.json({success:false, error: "Note not found"}, {status: 404});
        }

        return NextResponse.json({success:true, data:note}, {status: 200});

    }
    catch(error){
        return NextResponse.json({success:false, error: error.message || "Failed to update note"}, {status: 400});
    }
}


export async function DELETE(request, { params }){
    try{
        const { id } = await params;
        await connectDB();
        const note = await Note.findByIdAndDelete(id);

        if(!note){
            return NextResponse.json({success:false, error: "Note not found"}, {status: 404});
        }
        return NextResponse.json({success:true, data:note}, {status: 200}); 
    }
    
    catch(error){
        console.error("DELETE /api/notes/[id] error:", error);
        return NextResponse.json({success:false, error: error.message || "Failed to delete note"}, {status: 400});
    }
}