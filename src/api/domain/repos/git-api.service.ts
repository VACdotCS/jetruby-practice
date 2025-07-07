import axios, {AxiosError, AxiosInstance} from "axios";

export interface IGithubRepositoryService {}

export class GitApiService implements IGithubRepositoryService {
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

    async getTopRepos(limit?: number) {
        try {
            const response = await this.githubApi.get('/search/repositories', {
                params: {
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