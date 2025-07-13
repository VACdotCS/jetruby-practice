import { IGithubRepositoryService } from "./interface";
import {GitApiService, IGithubApiService} from "./git-api.service";
import { clearTimeout } from "node:timers";
import {IGitRepository} from "./entities/GitRepository";
import {License} from "./entities/License";
import {Model, Types} from "mongoose";
import {IOwner, Owner} from "./entities/Owner";
import GitRepositoryModel from "./repos.repository";
import {GitRepositoryDto, GitRepositoryDtoMapper} from "./dto/GitRepository.dto";

class GithubRepositoryService implements IGithubRepositoryService {
    private readonly gitApiService: IGithubApiService;
    private readonly repo: Model<IGitRepository>;

    // Worker config
    private updateReposIntervalMs: number = 1000000;
    private workerTimer: NodeJS.Timeout | null = null;

    constructor() {
        this.gitApiService = new GitApiService();
        this.repo = GitRepositoryModel;
    }

    // Worker for interval updating of top-rated repos

    private gitRepoPullerWorkerAction = async () => {
        console.log('Starting Github Top Rated Repos Worker');

        const topRatedRepos: IGitRepository[] = await this.gitApiService.getTopRepos({
            limit: 100,
        });

        let processedEntitiesCounter: number = 0;
        let newReposFound: number = 0;
        let updatedReposCount: number = 0;

        for (const repo of topRatedRepos) {
            const candidate = await this.getGithubRepoById(repo.id);

            if (!candidate) {
                let _license;

                if (repo?.license) {
                    // Save license as another entity
                    const license = new License(repo.license);
                    _license = await license.save().catch(() => null);

                    if (!_license) {
                        _license = await License.where({
                            id: repo.license.id,
                        }).findOne();
                    }
                }

                // Save owner as another entity
                const owner: IOwner = new Owner(repo.owner);
                let _owner = await owner.save().catch(() => null);

                if (!_owner) {
                    _owner = await Owner.where({
                        id: repo.owner.id,
                    }).findOne();
                }

                if (_owner) {
                    const repoToSave = { ...repo };
                    repoToSave.owner = _owner._id as Types.ObjectId;

                    if (_license) {
                        repoToSave.license = _license._id as Types.ObjectId;
                    }

                    // Save repo
                    const _repo = new GitRepositoryModel(repoToSave);
                    await _repo.save().catch(console.error);
                }

                newReposFound++;
            } else {
                const updatedCandidate = new GitRepositoryModel({ ...candidate, ...repo });
                const updateResult = await GitRepositoryModel.updateOne({ _id: updatedCandidate._id }, updatedCandidate);

                if (updateResult.upsertedCount) {
                    updatedReposCount++;
                }

                console.log(updateResult);
            }

            processedEntitiesCounter++;
            console.log(`Processed ${processedEntitiesCounter} repos from API of ${topRatedRepos.length}`);
        }

        console.log('Github Top Rated Repos Worker Finished');
        console.log(`Added new repos: ${newReposFound}`);
        console.log(`Updated repos: ${updatedReposCount}`);

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

    public getGithubRepoById = async (id: number): Promise<IGitRepository | null> => {
        const gitRepo = await this.repo.where({
            id,
        })
          .findOne()
          .populate('license')
          .populate('owner')
          .exec();

        if (!gitRepo) {
            return null;
        }

        return gitRepo;
    }

    public getAllGithubRepos = async (): Promise<GitRepositoryDto[]> => {
        const repos: IGitRepository[] = await this.repo.find().populate('license').populate('owner').exec();
        return repos.map(GitRepositoryDtoMapper);
    }

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