# NoteMaster

A professional note-taking application built with Next.js, MongoDB, and Tailwind CSS. NoteMaster provides a clean, corporate interface for creating, editing, and managing your notes efficiently.

## Features

- **Create Notes**: Add new notes with title and content
- **Edit Notes**: Update existing notes with an inline editor
- **Delete Notes**: Remove notes you no longer need
- **Real-time Updates**: Automatically updates the UI after any changes
- **Toast Notifications**: Get instant feedback on your actions
- **Timestamps**: Track when notes were created and last updated
- **Responsive Design**: Professional corporate design that works on all devices
- **MongoDB Integration**: Persistent storage with automatic timestamps

## Tech Stack

- **Frontend**: Next.js 16, React 19
- **Styling**: Tailwind CSS 4
- **Database**: MongoDB with Mongoose ODM
- **Notifications**: React Hot Toast
- **API**: Next.js API Routes

## Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account or local MongoDB installation

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd notes-taking-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/notesdb?retryWrites=true&w=majority
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
notes-taking-app/
├── app/
│   ├── api/
│   │   └── notes/
│   │       ├── route.js          # GET, POST endpoints
│   │       └── [id]/
│   │           └── route.js      # PUT, DELETE endpoints
│   ├── globals.css               # Global styles
│   ├── layout.js                 # Root layout
│   └── page.js                   # Home page
├── components/
│   └── NotesClient.jsx           # Main notes component
├── lib/
│   └── db.js                     # MongoDB connection
├── models/
│   └── Note.js                   # Mongoose Note model
└── public/                       # Static assets
```

## API Endpoints

### Notes
- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create a new note
- `PUT /api/notes/[id]` - Update a note
- `DELETE /api/notes/[id]` - Delete a note

## Features in Detail

### Create Notes
- Simple form with title and content fields
- Form validation to ensure both fields are filled
- Success notification on creation

### Edit Notes
- Click "Edit" button on any note
- Inline editing form appears
- Save or cancel changes

### Delete Notes
- Click "Delete" button to remove a note
- Instant UI update with confirmation toast

### Timestamps
- Automatic creation and update timestamps
- Displayed in a readable format (e.g., "Dec 29, 2025")

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| MONGODB_URL | MongoDB connection string | Yes |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## Author

Built with ❤️ using Next.js and MongoDB
