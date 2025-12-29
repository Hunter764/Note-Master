import NotesClient from "@/components/NotesClient";
import connectDB from "@/lib/db";
import Note from "@/models/Note";

async function getNotes(){
  await connectDB();
  const notes = await Note.find({}).sort({ createdAt: -1 }).lean();
  return notes.map((note) => ({
    ...note,
    _id: note._id.toString(),
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString(),
  }));
}

export default async  function Home() {

  const notes = await getNotes();

  console.log(notes);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 max-w-7xl">
          <h1 className="text-2xl font-semibold text-gray-900">Note Master</h1>
          <p className="text-sm text-gray-600 mt-1">Seamless Note Management</p>
        </div>
      </div>
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <NotesClient initialNotes={notes} />
      </div>
    </div>
  );
}
