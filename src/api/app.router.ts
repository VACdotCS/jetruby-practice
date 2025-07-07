import {Router} from "express";
import {githubRepoRouter} from "./domain/repos/repos.router";

const appRouter: Router = Router();

appRouter.use('/repos', githubRepoRouter);

export default appRouter;