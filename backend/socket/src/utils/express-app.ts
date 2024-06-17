import express, {Express} from "express";
import cors from "cors";
import path from "path";

export default async function expressApp(app : Express) {
  app.use(express.json());
  app.use(cors());
  app.use(express.static(path.join(__dirname, "/public")));

}
