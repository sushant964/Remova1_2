import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import multer from 'multer';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { removeBackground } from './src/server/services/background-removal.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  // Basic rate limiting
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: { error: 'Too many requests, please try again later.' }
  });
  app.use('/api/', apiLimiter);

  // Configure multer for image uploads (10MB limit)
  const storage = multer.memoryStorage(); // Use memory storage, avoiding permanent file storage
  const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (req, file, cb) => {
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Unsupported file type. Please upload JPG, PNG, or WEBP.'));
      }
    }
  });

  // Background removal endpoint
  app.post('/api/remove-background', (req, res, next) => {
    upload.single('image')(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(413).json({ error: 'File is too large. Maximum size is 10MB.' });
        }
        return res.status(400).json({ error: err.message });
      } else if (err) {
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  }, async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No image file uploaded.' });
      }

      if (!process.env.BACKGROUND_REMOVAL_API_KEY) {
        return res.status(503).json({
          error: 'Background removal API is not configured. Please add BACKGROUND_REMOVAL_API_KEY to your environment variables.'
        });
      }

      // Call our background removal service
      const processedImageBuffer = await removeBackground(req.file.buffer, req.file.mimetype);

      // Return the image
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Content-Disposition', 'attachment; filename="result.png"');
      res.send(processedImageBuffer);
      
    } catch (error: any) {
      console.error('Error in background removal:', error);
      
      const statusCode = error.statusCode || 500;
      const message = error.message || 'An unexpected error occurred during processing.';
      
      res.status(statusCode).json({ error: message });
    }
  });

  // Serve static files and UI
  if (isProd) {
    app.use(express.static(path.resolve(__dirname, 'dist/client')));
    app.use('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/client/index.html'));
    });
  } else {
    // Vite middleware for development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
