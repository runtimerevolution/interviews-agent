# Testing Real-Time Collaboration

## Step-by-Step Testing Guide

### Prerequisites
- Dev server running: `yarn dev`
- Two browser windows (one can be incognito/private)

### Test Steps

1. **Start Interview**
   - Open http://localhost:5173
   - Select a technology (e.g., Rails)
   - Click "Start Interview"

2. **Generate Code Editor Link**
   - Navigate to any question
   - Click "Share Code Editor with Candidate" button
   - Click "Copy Code Editor Link" (link will be copied to clipboard)
   - The link format: `http://localhost:5173/code/XXXXX-XXXXX-XXXXX-XXXXX`

3. **Open in Second Window**
   - Open a **new incognito/private window** (Cmd+Shift+N in Chrome/Edge)
   - Paste the copied link
   - You should see the same Code Editor page

4. **Test Real-Time Sync**
   - **Window 1**: Type some code (e.g., `def hello`)
   - **Click**: "Save Code" button
   - **Window 2**: Within 3 seconds, you should see the code appear!

5. **Test Bidirectional Sync**
   - **Window 2**: Type additional code (e.g., `puts 'world'`)
   - **Click**: "Save Code" button
   - **Window 1**: Should update with the new code within 3 seconds

6. **Test Editor Features**
   - **Line Numbers**: Should appear on the left side automatically
   - **Tab Key**: Press Tab to indent (inserts 2 spaces)
   - **Scrolling**: Line numbers should scroll with the code

### What to Look For

✅ **Working Signs:**
- "Syncing..." indicator appears periodically
- Code typed in one window appears in the other after clicking Save
- Line numbers display correctly
- Tab key indents code
- Console logs show API calls

❌ **Problem Signs:**
- Code doesn't appear in other window after 10 seconds
- Console shows API errors
- No "Syncing..." indicator
- Session ID is different in both windows

### Debugging with Console

Open Developer Tools (F12) in both windows and check the Console tab:

**Expected logs:**
```
[CodeEditor] Loading session data for: XXXXX-XXXXX-XXXXX-XXXXX
[API] GET /api/code-session
[API] Session ID: XXXXX-XXXXX-XXXXX-XXXXX
[API] Session not found
[CodeEditor] Initial load complete
[CodeEditor] Starting polling...
[CodeEditor] Saving to backend: { codeLength: 50, sessionId: ... }
[API] POST /api/code-session
[API] Session saved: { sessionId: ..., codeLength: 50, sessionsCount: 1 }
[CodeEditor] Saved successfully: {...}
[CodeEditor] Polled data: { exists: true, code: "...", ... }
```

### Common Issues & Solutions

#### Issue: Code not syncing
**Check:**
1. Are both windows using the EXACT same URL?
2. Did you click "Save Code" or wait 10 seconds?
3. Is polling running? (Check console for "Polled data" logs)
4. Is there an isLocalChange flag blocking? (Should reset after 5 seconds)

**Solution:**
- Refresh both windows
- Check that the session IDs match
- Look for error messages in console

#### Issue: "Syncing..." never appears
**Check:**
1. Is polling starting? (Should start 2 seconds after page load)
2. Are there network errors in console?

**Solution:**
- Restart dev server: `yarn dev`
- Clear browser cache
- Check vite-plugin-api.js is loaded

#### Issue: API 404 errors
**Check:**
1. Is vite-plugin-api.js being loaded?
2. Is the dev server running properly?

**Solution:**
- Check vite.config.js has `apiPlugin()` in plugins array
- Restart dev server

#### Issue: Session "not found" immediately
This is normal! The session is created on first save. After you type and save, it should exist.

### Timing Reference

- **Initial load**: Immediate
- **Auto-save**: Every 10 seconds
- **Polling**: Every 3 seconds (starts after 2-second delay)
- **Local change lock**: 5 seconds after typing

### Network Tab Verification

Open Network tab in DevTools:

**Expected requests:**
1. `GET /api/code-session?sessionId=...` - Every 3 seconds
2. `POST /api/code-session?sessionId=...` - When saving

**Response for GET (before save):**
```json
{
  "exists": false,
  "code": "",
  "questionInfo": null,
  "timestamp": null,
  "lastModified": null
}
```

**Response for GET (after save):**
```json
{
  "exists": true,
  "code": "def hello\n  puts 'world'\nend",
  "questionInfo": {...},
  "timestamp": "2024-01-15T10:30:00.000Z",
  "lastModified": 1705315800000
}
```

### Tips for Testing

1. **Use two different browsers** (not just windows) to avoid confusion
2. **Watch the timestamp** - it should update after saves
3. **Be patient** - 10 seconds for auto-save + 3 seconds for poll = up to 13 seconds
4. **Use manual save** - Click "Save Code" for instant testing
5. **Check both consoles** - One might have errors the other doesn't

### Success Criteria

✅ Code typed in Window 1 appears in Window 2 within 3 seconds after clicking Save
✅ Code typed in Window 2 appears in Window 1 within 3 seconds after clicking Save
✅ Line numbers display correctly on both windows
✅ Tab key inserts 2 spaces for indentation
✅ Line numbers scroll synchronously with code
✅ No console errors
✅ "Syncing..." indicator shows activity
✅ Both windows show the same final code

