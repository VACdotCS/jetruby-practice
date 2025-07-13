import axios, {AxiosError, AxiosInstance} from "axios";
import {IGitRepository} from "./entities/GitRepository";

export interface IGithubApiService {
    getTopRepos: (params: { limit?: number }) => Promise<IGitRepository[]>;
}

export class GitApiService implements IGithubApiService {
    private readonly githubApi: AxiosInstance;

    constructor() {
        if (!process.env.GIT_API_KEY) {
            throw new Error('GIT_TOKEN is required');
        }

        this.githubApi = axios.create({
            baseURL: 'https://api.github.com',
            headers: {
                'Authorization': `Bearer ${process.env.GIT_API_KEY}`,
                'Accept': 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
    }

    /**
     * @throws AxiosError
     * */
    async getTopRepos(params: { limit?: number }): Promise<IGitRepository[]> {
        try {
            const { limit } = params;
            console.log(`Collecting top repos from GitHub API: limit = ${limit}`);
            const response = await this.githubApi.get('/search/repositories', {
                params: {
                    q: 'stars:>0',
                    sort: 'stars',
                    order: 'desc',
                    per_page: limit ?? 10
                }
            });
            return response.data.items;
        } catch (error: any | AxiosError) {
            console.error('GitHub API Error:', error.response?.data || error.message);
            throw error;
        }
    }
}