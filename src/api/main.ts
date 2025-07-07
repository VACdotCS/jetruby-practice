import * as dotenv from 'dotenv';

dotenv.config({
    path: `./env/.${process.env.NODE_ENV}.env`,
}); // using to work with nodemon, Node.js support env out of box

import express, {Express } from 'express';
import appRouter from "./app.router";
import {connectDB} from "./database";
import { errorHandler } from "./app.errors";
import {githubRepositoryService} from "./domain/repos/repos.service";

async function start() {
    const app: Express = express();
    await connectDB();

    app.use(appRouter);
    app.use(errorHandler);

    githubRepositoryService.initializeWorker();

    app.listen(3000, () => {
        console.log(`Server started on port 3000`);
    })
}

start().then();