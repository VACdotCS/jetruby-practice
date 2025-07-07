import {Router} from "express";
import { githubRepositoryController } from "./repos.controller";

const githubRepoRouter: Router = Router(); // Nest like controller

githubRepoRouter.get('/:id', githubRepositoryController.getGithubRepoById);
githubRepoRouter.get('', githubRepositoryController.getAllGithubRepos);
githubRepoRouter.head('/force-sync', githubRepositoryController.forceReposUpdate)

export { githubRepoRouter };