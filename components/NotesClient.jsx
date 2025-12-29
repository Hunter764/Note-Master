"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

const NotesClient = ({ initialNotes = [] }) => {
  const [notes, setNotes] = useState(initialNotes);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const createNote = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });
      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setNotes([result.data, ...notes]);
        toast.success("Note created successfully!");
        setTitle("");
        setContent("");
      }

      setLoading(false);
    } catch (error) {
      console.log("Error creating note: ", error);
      toast.error("Failed to create note. Please try again.");
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`/api/notes/${id}`, { method: "DELETE" });

      const result = await response.json();

      if (response.ok) {
        setNotes(notes.filter((note) => note._id !== id));
        toast.success("Note deleted successfully!");
      }
    } catch (error) {
      console.log("Error deleting note: ", error);
      toast.error("Failed to delete note. Please try again.");
    }
  };

  const startEdit = (note) => {
    setEditingId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  const updateNote = async (id) => {
    if (!editTitle.trim() || !editContent.trim()) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: editTitle, content: editContent }),
      });

      const result = await response.json();

      if (result.success) {
        setNotes(notes.map((note) => (note._id === id ? result.data : note)));
        toast.success("Note updated successfully!");
        setEditingId(null);
        setEditTitle("");
        setEditContent("");
      }

      setLoading(false);
    } catch (error) {
      console.log("Error updating note: ", error);
      toast.error("Failed to update note. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={createNote} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
          Create New Note
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-gray-900 placeholder-gray-400"
              placeholder="Enter note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              placeholder="Enter note content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-gray-900 placeholder-gray-400 resize-none"
              rows={5}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white font-medium px-6 py-2.5 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {loading ? "Creating Note..." : "Create Note"}
          </button>
        </div>
      </form>

      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Notes <span className="text-sm font-normal text-gray-500">({notes.length})</span>
          </h2>
        </div>
        {notes.length === 0 ? (
          <div className="bg-white p-12 rounded-lg text-center border border-gray-200">
            <p className="text-gray-500">
              No notes available. Create your first note above.
            </p>
          </div>
        ) : (
          notes.map((note) => (
            <div key={note._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              {editingId === note._id ? (

                <>
                    <div className="space-y-4">
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                       <input 
                          type="text"
                          value ={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-gray-900"
                          required
                       />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                       <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-gray-900 resize-none"
                          rows={5}
                          required
                       />
                     </div>

                        <div className="flex gap-3 mt-4">
                         <button
                            onClick={() => updateNote(note._id)}
                            disabled={loading}
                            className = "flex-1 bg-gray-900 text-white font-medium px-4 py-2.5 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                         >
                            { loading ? "Saving..." : "Save Changes"}
                         </button>

                         <button
                            onClick={cancelEdit}
                            className = "flex-1 bg-white text-gray-700 font-medium px-4 py-2.5 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                         >
                            Cancel
                         </button>
                        </div>
                    </div>
                
                </>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex-1 pr-4">{note.title}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(note)}
                        className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-medium px-4 py-1.5 rounded-md text-sm cursor-pointer transition-colors duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteNote(note._id)}
                        className="bg-white text-red-600 border border-gray-300 hover:bg-red-50 font-medium px-4 py-1.5 rounded-md text-sm cursor-pointer transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed mb-4 whitespace-pre-wrap">{note.content}</p>
                  
                  <div className="flex gap-6 text-xs text-gray-500 pt-4 border-t border-gray-100">
                    <div>
                      <span className="font-medium">Created:</span>
                      <span className="ml-1">{new Date(note.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}</span>
                    </div>
                    <div>
                      <span className="font-medium">Updated:</span>
                      <span className="ml-1">{new Date(note.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesClient;
