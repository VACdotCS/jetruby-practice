import express from "express";
import { githubRepositoryService } from './repos.service'

class GithubRepositoryController {
    async getAllGithubRepos(req: express.Request, res: express.Response) {}
    async getGithubRepoById(req: express.Request, res: express.Response) {}
    async forceReposUpdate(req: express.Request, res: express.Response) {}
}

export const githubRepositoryController = new GithubRepositoryController();