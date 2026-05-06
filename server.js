const fs = require('fs');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const standaloneServerPath = path.join(__dirname, 'dist', 'server.js');
const useStandaloneServer = fs.existsSync(standaloneServerPath);

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || process.env.HOSTNAME || '0.0.0.0';

process.env.PORT = String(PORT);
process.env.HOSTNAME = HOST;

if (process.env.RENDER_EXTERNAL_URL && !process.env.NEXT_PUBLIC_SITE_URL) {
  process.env.NEXT_PUBLIC_SITE_URL = process.env.RENDER_EXTERNAL_URL;
}

if (useStandaloneServer) {
  require(standaloneServerPath);
} else if (isProduction) {
  throw new Error(
    `Production mode requires ${standaloneServerPath} to exist. Run the frontend build before deploying.`
  );
} else {
  const express = require('express');
  const cors = require('cors');
  const dotenv = require('dotenv');

  dotenv.config();

  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.get('/', (req, res) => {
    res.send('Backend Server is Running.');
  });

  // Example API route
  app.get('/api/status', (req, res) => {
    res.json({ status: 'ok', message: 'API is working' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
}
