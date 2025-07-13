import express from "express";
import { githubRepositoryService } from './repos.service'
import {HttpStatusCode} from "axios";
import {IGitRepository} from "./entities/GitRepository";
import {GitRepositoryDtoMapper} from "./dto/GitRepository.dto";

class GithubRepositoryController {
    async getAllGithubRepos(req: express.Request, res: express.Response) {
        try {
            const repos = await githubRepositoryService.getAllGithubRepos();
            res.status(HttpStatusCode.Ok).json(repos);
        } catch (error: unknown) {
            res.status(HttpStatusCode.BadRequest).send(error);
        }
    }

    async getGithubRepoById(req: express.Request<null, null, null, { id: number, name: string }>, res: express.Response) {
        try {
            const { id, name } = req.query;

            if (id) {
                const gitRepo: IGitRepository | null = await githubRepositoryService.getGithubRepoBy({ id });

                if (!gitRepo) {
                    res.status(HttpStatusCode.NotFound).json({
                        message: 'No Github repository found',
                    });
                    return;
                }

                res.status(HttpStatusCode.Ok).json(GitRepositoryDtoMapper(gitRepo));
                return;
            }

            if (name) {
                const gitRepo: IGitRepository | null = await githubRepositoryService.getGithubRepoBy({ name });

                if (!gitRepo) {
                    res.status(HttpStatusCode.NotFound).json({
                        message: 'No Github repository found',
                    });
                    return;
                }

                res.status(HttpStatusCode.Ok).json(GitRepositoryDtoMapper(gitRepo));
                return;
            }

            res.status(HttpStatusCode.BadRequest).json({
                error: 'Validation error',
                message: "'name' or 'id' is required in query"
            });
        } catch (error: unknown) {
            res.status(HttpStatusCode.BadRequest).send(error);
        }
    }

    async forceReposUpdate(req: express.Request, res: express.Response) {
        try {
            githubRepositoryService.gitRepoForcePull();
            res.status(HttpStatusCode.Ok).json({
                message: 'Repository worker successfully restarted, repositories force pulling',
            })
        } catch (error: any) {
            res.status(HttpStatusCode.BadRequest).json({
                error: error.toString(),
            });
        }
    }
}

export const githubRepositoryController = new GithubRepositoryController();