import { IGithubRepositoryService } from "./interface";
import {GitApiService, IGithubApiService} from "./git-api.service";
import { clearTimeout } from "node:timers";
import {GithubRepositoryRepo} from "./repos.repository";

class GithubRepositoryService implements IGithubRepositoryService {
    private readonly gitApiService: IGithubApiService;
    private readonly repo: GithubRepositoryRepo;

    // Worker config
    private updateReposIntervalMs: number = 1000;
    private workerTimer: NodeJS.Timeout | null = null;

    constructor() {
        this.gitApiService = new GitApiService();
        this.repo = new GithubRepositoryRepo();
    }

    // Worker for interval updating of top-rated repos

    private gitRepoPullerWorkerAction = async () => {
        console.log('Starting Github Top Rated Repos Worker');

        console.log('Github Top Rated Repos Worker Finished');
        this.runRepoPullerWorker();
    }


    private runRepoPullerWorker = () => {
        this.workerTimer = setTimeout(this.gitRepoPullerWorkerAction, this.updateReposIntervalMs);
    }

    stopWorker = () => {
        if (this.workerTimer) {
            clearTimeout(this.workerTimer);
            this.workerTimer = null;
        }
    }

    // Functions for controllers

    public getGithubRepoById = async (id: string) => { }

    public getAllGithubRepos = async () => {}

    public initializeWorker = () => {
        this.gitRepoPullerWorkerAction().then(this.runRepoPullerWorker);
    }

    public gitRepoForcePull = async () => {
        this.stopWorker();

        await this.gitRepoPullerWorkerAction();

        this.runRepoPullerWorker();
    }
}

export const githubRepositoryService = new GithubRepositoryService();