import * as dotenv from 'dotenv';
import cors from 'cors';

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

    app.use(cors())
    app.use(appRouter);
    app.use(errorHandler);

    githubRepositoryService.initializeWorker();

    app.listen(5000, () => {
        console.log(`Server started on port 5000`);
    })
}

start().then();