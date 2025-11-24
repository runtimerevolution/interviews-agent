# Real-Time Code Editor Collaboration

## Overview

The Code Editor now supports **real-time collaboration** across multiple devices and browsers. When you share a Code Editor link with a candidate, both you and the candidate can see each other's changes in near real-time.

## How It Works

### Architecture

1. **Backend API**: Vercel Serverless Function (`/api/code-session`)
   - Stores code sessions in memory (with 24-hour TTL)
   - Handles GET (read) and POST (write) operations
   - Supports CORS for cross-origin requests

2. **Frontend Polling**: CodeEditor component
   - **Auto-save**: Saves changes every 10 seconds
   - **Polling**: Checks for remote updates every 3 seconds
   - **Conflict Resolution**: Local changes have priority for 5 seconds
   - **Visual Feedback**: Shows sync status with animated icon

### Data Flow

```
User A Types → Click Save → Backend API → Poll (3s) → User B Sees Change
User B Types → Click Save → Backend API → Poll (3s) → User A Sees Change
```

## Features

### ✅ Real-Time Sync
- Changes are synced every 3 seconds
- Multiple users can view the same session simultaneously
- Visual "Syncing..." indicator shows when data is being exchanged

### ✅ Manual Save
- Click "Save Code" button to save changes
- Changes are synced to other viewers within 3 seconds
- Manual control over when code is saved

### ✅ Conflict Resolution
- Local changes are prioritized for 5 seconds after typing
- Prevents overwriting while actively typing
- Smooth merge of changes from multiple users

### ✅ Fallback to localStorage
- Works offline (localStorage backup)
- Backward compatible with old sessions
- Graceful degradation if backend is unavailable

## Development

### Local Development

The Vite plugin (`vite-plugin-api.js`) provides an in-memory API server for local development:

```bash
yarn dev
```

The API is available at `/api/code-session` and works identically to the production version.

### Production (Vercel)

Deploy to Vercel, and the serverless function in `/api/code-session.js` handles all requests automatically.

```bash
vercel --prod
```

## Usage

### Interviewer Flow

1. Click "Share Code Editor with Candidate" button in the interview
2. A unique link is generated (e.g., `https://yourapp.com/code/XXXXX-XXXXX-XXXXX-XXXXX`)
3. Copy and share this link with the candidate
4. Both users can now see changes in real-time

### Candidate Flow

1. Receive the Code Editor link from interviewer
2. Open the link in any browser
3. Write code in the text area
4. Changes are auto-saved and visible to the interviewer

## API Reference

### GET /api/code-session?sessionId=XXXXX

Retrieves session data.

**Response:**
```json
{
  "exists": true,
  "code": "def hello\n  puts 'world'\nend",
  "questionInfo": {
    "title": "Question Title",
    "image": "/path/to/image.png"
  },
  "timestamp": "2024-01-15T10:30:00.000Z",
  "lastModified": 1705315800000
}
```

### POST /api/code-session?sessionId=XXXXX

Saves session data.

**Request Body:**
```json
{
  "code": "def hello\n  puts 'world'\nend",
  "questionInfo": {
    "title": "Question Title",
    "image": "/path/to/image.png"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Code session saved",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Limitations

### In-Memory Storage
- Sessions are stored in memory on the serverless function
- Sessions persist for 24 hours
- Cold starts may clear session data
- **For production**: Consider upgrading to Vercel KV, Redis, or PostgreSQL

### Polling Interval
- 3-second polling interval balances performance and real-time feel
- Not true real-time (for that, use WebSockets)
- Network latency may cause delays

### Concurrent Editing
- Simple conflict resolution (last write wins with local priority)
- No operational transformation (OT) or CRDT algorithms
- May cause occasional overwrites with simultaneous edits

## Future Enhancements

### Upgrade to WebSockets
For true real-time collaboration without polling:
- Use Vercel's Edge Functions with WebSocket support
- Or integrate with Pusher/Ably for managed WebSocket service
- Or use Socket.io with a custom Node.js server

### Persistent Storage
Replace in-memory storage with a database:
- **Vercel KV** (Redis-based, easiest)
- **PostgreSQL** (via Vercel Postgres)
- **MongoDB Atlas**
- **Supabase**

### Operational Transformation
Implement OT or CRDT for better concurrent editing:
- Use libraries like Yjs or Automerge
- Enables Google Docs-style collaboration
- No lost edits or overwrites

## Troubleshooting

### Changes not syncing

1. Check network connection
2. Verify the API endpoint is accessible
3. Check browser console for errors
4. Try manual save button

### Session data lost

- In-memory storage resets on serverless cold starts
- Consider upgrading to persistent storage
- Check 24-hour TTL hasn't expired

### Slow sync

- 3-second polling may feel slow
- Network latency impacts sync speed
- Consider WebSocket upgrade for instant updates

