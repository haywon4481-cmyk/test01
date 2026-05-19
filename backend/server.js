const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');

const isProduction = process.env.NODE_ENV === 'production';
const standaloneServerPath = path.join(__dirname, 'dist', 'server.js');
const useStandaloneServer = fs.existsSync(standaloneServerPath);

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

process.env.PORT = String(PORT);
process.env.HOSTNAME = HOST;

if (process.env.RENDER_EXTERNAL_URL && !process.env.NEXT_PUBLIC_SITE_URL) {
  process.env.NEXT_PUBLIC_SITE_URL = process.env.RENDER_EXTERNAL_URL;
}

if (useStandaloneServer) {
  console.log('🚀 Starting Next.js standalone server from', standaloneServerPath);
  require(standaloneServerPath);
} else {
  console.log('⚠️  Next.js dist not found. Starting fallback Express server...');
  const dotenv = require('dotenv');
  dotenv.config();

  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Serve static files from dist/public if available
  const publicDir = path.join(__dirname, 'dist', 'public');
  if (fs.existsSync(publicDir)) {
    console.log('📁 Serving static files from', publicDir);
    app.use(express.static(publicDir));
  }

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Root endpoint
  app.get('/', (req, res) => {
    res.send('Backend Server is Running (Fallback Mode)');
  });

  app.listen(PORT, HOST, () => {
    console.log(`✓ Server listening on http://${HOST}:${PORT}`);
  });
}
