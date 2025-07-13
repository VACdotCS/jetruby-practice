import {Router} from "express";
import { githubRepositoryController } from "./repos.controller";

const githubRepoRouter: Router = Router(); // Nest like controller

githubRepoRouter.get('', githubRepositoryController.getGithubRepoById);
githubRepoRouter.get('/all', githubRepositoryController.getAllGithubRepos);
githubRepoRouter.post('/force-sync', githubRepositoryController.forceReposUpdate)

export { githubRepoRouter };