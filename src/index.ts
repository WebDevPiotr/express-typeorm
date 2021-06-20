import "reflect-metadata";
import { Container } from 'typeorm-typedi-extensions';
import { useContainer as ormUseContainer } from "typeorm";
import { useContainer as routingUseContainer } from "routing-controllers";

import Database from "Database/Database";
import Application from "App/Application";

const init = async () => {
    const port = process.env.PORT || 8000
    ormUseContainer(Container);
    routingUseContainer(Container)
    await Database.connect()
    Application.start().listen(port, () => console.log(`Server started at http://localhost:${port}`))
}

init()