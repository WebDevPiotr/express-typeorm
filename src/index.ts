import "reflect-metadata";
import { createConnection } from "typeorm";
import express from 'express'
import cors from 'cors'

createConnection()

const app = express();
app.use(cors());

const port = process.env.PORT || 8081;
const server = app.listen(port, () => console.log(`Server started at http://localhost:${port}`));