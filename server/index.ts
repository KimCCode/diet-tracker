import { connectDB } from './src/db/connection';
import express, { json, Request, Response } from 'express';
import morgan from 'morgan';
import config from './src/config.json';
import cors from 'cors';
import errorHandler from 'middleware-http-errors';
import { adminRoutes } from './src/routes/admin';
import { logRoutes } from './src/routes/log';
import { entryRoutes } from './src/routes/entry';
const path = require('path');
require('dotenv').config();

// Set up web app
const app = express();
// Use middleware that allows us to access the JSON body of requests
app.use(json());
// Use middleware that allows for access from other domains
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
const PORT: number = parseInt(process.env.PORT || config.port);
const HOST: string = process.env.IP || 'localhost';

// For logging errors (print to terminal)
app.use(morgan('dev'));
app.use('/api/admin', adminRoutes);
app.use('/api/log', logRoutes);
app.use('/api/entry', entryRoutes);

// For handling errors
app.use(errorHandler());

// start server
const start = async () => {
  try {
    await connectDB(process.env.API_KEY as string);
    app.listen(PORT, HOST, () => {
      console.log(`⚡️ Server started on port ${PORT} at ${HOST}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
