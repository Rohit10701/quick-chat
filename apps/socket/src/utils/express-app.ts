import express, { Express } from "express";
import cors from "cors";
import path from "path";

export default async function expressApp(app: Express) {
  app.use(express.json());

  // Enabling CORS for Express
  app.use(cors({
    origin: 'http://localhost:3000', // Your frontend's URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }));

  // Uncomment if you want to serve static files
  // app.use(express.static(path.join(__dirname, "/public")));
}
