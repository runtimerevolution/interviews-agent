// Vercel Serverless Function for managing code sessions
// This acts as a simple in-memory store (or you could connect to a database)

// In-memory storage (resets on cold starts, but good enough for short sessions)
// For production, you'd want to use a database like Vercel KV, Redis, or PostgreSQL
const sessions = new Map();

// Session TTL: 24 hours
const SESSION_TTL = 24 * 60 * 60 * 1000;

// Cleanup old sessions periodically
const cleanupOldSessions = () => {
  const now = Date.now();
  for (const [sessionId, session] of sessions.entries()) {
    if (now - session.lastModified > SESSION_TTL) {
      sessions.delete(sessionId);
    }
  }
};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { sessionId } = req.query;

  if (!sessionId) {
    return res.status(400).json({ error: 'Session ID is required' });
  }

  try {
    if (req.method === 'GET') {
      // Get session data
      cleanupOldSessions();

      const session = sessions.get(sessionId);

      if (!session) {
        return res.status(200).json({
          exists: false,
          code: '',
          questionInfo: null,
          timestamp: null,
          lastModified: null,
        });
      }

      return res.status(200).json({
        exists: true,
        code: session.code || '',
        questionInfo: session.questionInfo || null,
        timestamp: session.timestamp,
        lastModified: session.lastModified,
      });
    }

    if (req.method === 'POST') {
      // Save session data
      const { code, questionInfo } = req.body;

      if (code === undefined) {
        return res.status(400).json({ error: 'Code is required' });
      }

      const now = Date.now();
      const sessionData = {
        code,
        questionInfo: questionInfo || null,
        timestamp: new Date().toISOString(),
        lastModified: now,
      };

      sessions.set(sessionId, sessionData);

      return res.status(200).json({
        success: true,
        message: 'Code session saved',
        timestamp: sessionData.timestamp,
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error handling code session:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

