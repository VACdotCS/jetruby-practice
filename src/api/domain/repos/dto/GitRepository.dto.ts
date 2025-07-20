import {IGitRepository} from "../entities/GitRepository";
import {ILicense} from "../entities/License";
import {IOwner} from "../entities/Owner";

export class GitRepositoryDto {
    constructor(entity: IGitRepository) {
        this.id = entity.id;
        this.nodeId = entity.node_id;
        this.name = entity.name;
        this.fullName = entity.full_name;
        this.private = entity.private;

        const owner: IOwner = entity.owner as unknown as IOwner;

        this.owner = {
            login: owner.login,
            id: owner.id,
            url: owner.url,
            type: owner.type,
            siteAdmin: owner.site_admin
        };
        this.htmlUrl = entity.html_url;
        this.description = entity.description;
        this.fork = entity.fork;
        this.url = entity.url;
        this.createdAt = entity.created_at;
        this.updatedAt = entity.updated_at;
        this.pushedAt = entity.pushed_at;
        this.homepage = entity.homepage;
        this.size = entity.size;
        this.stargazersCount = entity.stargazers_count;
        this.watchersCount = entity.watchers_count;
        this.language = entity.language;
        this.forksCount = entity.forks_count;
        this.openIssuesCount = entity.open_issues_count;
        this.defaultBranch = entity.default_branch;
        this.score = entity.score;
        this.topics = [...(entity.topics || [])];
        this.visibility = entity.visibility;
        this.forks = entity.forks;
        this.openIssues = entity.open_issues;
        this.watchers = entity.watchers;
        this.permissions = {
            admin: entity.permissions?.admin || false,
            maintain: entity.permissions?.maintain || false,
            push: entity.permissions?.push || false,
            triage: entity.permissions?.triage || false,
            pull: entity.permissions?.pull || false
        };

        const license: ILicense = entity.license as unknown as ILicense;
        this.license = license ? {
            key: license.key,
            name: license.name,
            url: license.url,
            spdxId: license.spdx_id,
            nodeId: license.node_id,
            htmlUrl: license.html_url
        } : undefined;
        this.archived = entity.archived;
        this.disabled = entity.disabled;
        this.isTemplate = entity.is_template;
        this.archiveUrl = entity.archive_url;
        this.assigneesUrl = entity.assignees_url;
        this.blobsUrl = entity.blobs_url;
        this.branchesUrl = entity.branches_url;
        this.collaboratorsUrl = entity.collaborators_url;
        this.commentsUrl = entity.comments_url;
        this.commitsUrl = entity.commits_url;
        this.compareUrl = entity.compare_url;
        this.contentsUrl = entity.contents_url;
        this.contributorsUrl = entity.contributors_url;
        this.deploymentsUrl = entity.deployments_url;
        this.downloadsUrl = entity.downloads_url;
        this.eventsUrl = entity.events_url;
        this.forksUrl = entity.forks_url;
        this.gitCommitsUrl = entity.git_commits_url;
        this.gitRefsUrl = entity.git_refs_url;
        this.gitTagsUrl = entity.git_tags_url;
        this.gitUrl = entity.git_url;
        this.issueCommentUrl = entity.issue_comment_url;
        this.issueEventsUrl = entity.issue_events_url;
        this.issuesUrl = entity.issues_url;
        this.keysUrl = entity.keys_url;
        this.labelsUrl = entity.labels_url;
        this.languagesUrl = entity.languages_url;
        this.mergesUrl = entity.merges_url;
        this.milestonesUrl = entity.milestones_url;
        this.notificationsUrl = entity.notifications_url;
        this.pullsUrl = entity.pulls_url;
        this.releasesUrl = entity.releases_url;
        this.sshUrl = entity.ssh_url;
        this.stargazersUrl = entity.stargazers_url;
        this.statusesUrl = entity.statuses_url;
        this.subscribersUrl = entity.subscribers_url;
        this.subscriptionUrl = entity.subscription_url;
        this.tagsUrl = entity.tags_url;
        this.teamsUrl = entity.teams_url;
        this.treesUrl = entity.trees_url;
        this.cloneUrl = entity.clone_url;
        this.mirrorUrl = entity.mirror_url;
        this.hooksUrl = entity.hooks_url;
        this.svnUrl = entity.svn_url;
        this.hasIssues = entity.has_issues;
        this.hasProjects = entity.has_projects;
        this.hasDownloads = entity.has_downloads;
        this.hasWiki = entity.has_wiki;
        this.hasPages = entity.has_pages;
        this.hasDiscussions = entity.has_discussions;
        this.allowForking = entity.allow_forking;
        this.webCommitSignoffRequired = entity.web_commit_signoff_required;
    }

    id: number;
    nodeId: string;
    name: string;
    fullName: string;
    private: boolean;
    owner: {
        login: string;
        id: number;
        url: string;
        type: string;
        siteAdmin: boolean;
    };
    htmlUrl: string;
    description?: string;
    fork: boolean;
    url: string;
    createdAt: Date;
    updatedAt: Date;
    pushedAt: Date;
    homepage?: string;
    size: number;
    stargazersCount: number;
    watchersCount: number;
    language?: string | null;
    forksCount: number;
    openIssuesCount: number;
    defaultBranch: string;
    score?: number;
    topics: string[];
    visibility: 'public' | 'private' | 'internal';
    forks: number;
    openIssues: number;
    watchers: number;
    permissions: {
        admin: boolean;
        maintain: boolean;
        push: boolean;
        triage: boolean;
        pull: boolean;
    };
    license?: {
        key: string;
        name: string;
        url: string;
        spdxId: string;
        nodeId: string;
        htmlUrl: string;
    };
    archived: boolean;
    disabled: boolean;
    isTemplate: boolean;
    archiveUrl: string;
    assigneesUrl: string;
    blobsUrl: string;
    branchesUrl: string;
    collaboratorsUrl: string;
    commentsUrl: string;
    commitsUrl: string;
    compareUrl: string;
    contentsUrl: string;
    contributorsUrl: string;
    deploymentsUrl: string;
    downloadsUrl: string;
    eventsUrl: string;
    forksUrl: string;
    gitCommitsUrl: string;
    gitRefsUrl: string;
    gitTagsUrl: string;
    gitUrl: string;
    issueCommentUrl: string;
    issueEventsUrl: string;
    issuesUrl: string;
    keysUrl: string;
    labelsUrl: string;
    languagesUrl: string;
    mergesUrl: string;
    milestonesUrl: string;
    notificationsUrl: string;
    pullsUrl: string;
    releasesUrl: string;
    sshUrl: string;
    stargazersUrl: string;
    statusesUrl: string;
    subscribersUrl: string;
    subscriptionUrl: string;
    tagsUrl: string;
    teamsUrl: string;
    treesUrl: string;
    cloneUrl: string;
    mirrorUrl: string | null;
    hooksUrl: string;
    svnUrl: string;
    hasIssues: boolean;
    hasProjects: boolean;
    hasDownloads: boolean;
    hasWiki: boolean;
    hasPages: boolean;
    hasDiscussions: boolean;
    allowForking: boolean;
    webCommitSignoffRequired: boolean;
}

export const GitRepositoryDtoMapper = (repo: IGitRepository): GitRepositoryDto => new GitRepositoryDto(repo.toJSON() as IGitRepository);