import "reflect-metadata";
import dotenv from "dotenv"
dotenv.config()

import Database from "Database/Database";
import buildApp from './app'

const port = process.env.PORT || 8000

Database.init()
    .then(buildApp)
    .then(app => app.listen(port, () => console.log(`Server started at http://localhost:${port}`)))