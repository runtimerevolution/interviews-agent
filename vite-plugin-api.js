// Simple in-memory API for local development
const sessions = new Map();

export function apiPlugin() {
  return {
    name: 'vite-plugin-api',
    configureServer(server) {
      server.middlewares.use('/api/code-session', async (req, res, next) => {
        console.log(`[API] ${req.method} /api/code-session`);

        // Parse URL
        const url = new URL(req.url, `http://${req.headers.host}`);
        const sessionId = url.searchParams.get('sessionId');

        console.log('[API] Session ID:', sessionId);

        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
          res.statusCode = 200;
          res.end();
          return;
        }

        if (!sessionId) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Session ID is required' }));
          return;
        }

        try {
          if (req.method === 'GET') {
            const session = sessions.get(sessionId);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');

            if (!session) {
              console.log('[API] Session not found');
              res.end(JSON.stringify({
                exists: false,
                code: '',
                questionInfo: null,
                timestamp: null,
                lastModified: null,
              }));
            } else {
              console.log('[API] Returning session:', { codeLength: session.code?.length, lastModified: session.lastModified });
              res.end(JSON.stringify({
                exists: true,
                code: session.code || '',
                questionInfo: session.questionInfo || null,
                timestamp: session.timestamp,
                lastModified: session.lastModified,
              }));
            }
            return;
          }

          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });

            req.on('end', () => {
              try {
                const { code, questionInfo } = JSON.parse(body);

                if (code === undefined) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Code is required' }));
                  return;
                }

                const now = Date.now();
                const sessionData = {
                  code,
                  questionInfo: questionInfo || null,
                  timestamp: new Date().toISOString(),
                  lastModified: now,
                };

                sessions.set(sessionId, sessionData);
                console.log('[API] Session saved:', { sessionId, codeLength: code?.length, sessionsCount: sessions.size });

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  success: true,
                  message: 'Code session saved',
                  timestamp: sessionData.timestamp,
                }));
              } catch (error) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
              }
            });
            return;
          }

          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed' }));
        } catch (error) {
          console.error('Error handling code session:', error);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Internal server error' }));
        }
      });
    },
  };
}

