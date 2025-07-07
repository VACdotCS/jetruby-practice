import {Schema, model, Document, Model} from 'mongoose';
import { IOwner } from './Owner';
import { ILicense } from './License';

export interface IGitRepository extends Document {
    id: number;
    nodeId: string;
    name: string;
    fullName: string;
    owner: IOwner['_id'];
    private: boolean;
    htmlUrl: string;
    description: string;
    fork: boolean;
    url: string;
    createdAt: Date;
    updatedAt: Date;
    pushedAt: Date;
    homepage: string;
    size: number;
    stargazersCount: number;
    watchersCount: number;
    language: string;
    forksCount: number;
    openIssuesCount: number;
    masterBranch: string;
    defaultBranch: string;
    score: number;
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
    mirrorUrl: string;
    hooksUrl: string;
    svnUrl: string;
    forks: number;
    openIssues: number;
    watchers: number;
    hasIssues: boolean;
    hasProjects: boolean;
    hasPages: boolean;
    hasWiki: boolean;
    hasDownloads: boolean;
    archived: boolean;
    disabled: boolean;
    visibility: string;
    license: ILicense['_id'];
}

const gitRepositorySchema = new Schema<IGitRepository>({
    id: { type: Number, required: true, unique: true },
    nodeId: { type: String },
    name: { type: String, required: true },
    fullName: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'Owner' },
    private: { type: Boolean, default: false },
    htmlUrl: { type: String },
    description: { type: String },
    fork: { type: Boolean, default: false },
    url: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    pushedAt: { type: Date },
    homepage: { type: String },
    size: { type: Number },
    stargazersCount: { type: Number, default: 0 },
    watchersCount: { type: Number, default: 0 },
    language: { type: String },
    forksCount: { type: Number, default: 0 },
    openIssuesCount: { type: Number, default: 0 },
    masterBranch: { type: String },
    defaultBranch: { type: String },
    score: { type: Number },
    archiveUrl: { type: String },
    assigneesUrl: { type: String },
    blobsUrl: { type: String },
    branchesUrl: { type: String },
    collaboratorsUrl: { type: String },
    commentsUrl: { type: String },
    commitsUrl: { type: String },
    compareUrl: { type: String },
    contentsUrl: { type: String },
    contributorsUrl: { type: String },
    deploymentsUrl: { type: String },
    downloadsUrl: { type: String },
    eventsUrl: { type: String },
    forksUrl: { type: String },
    gitCommitsUrl: { type: String },
    gitRefsUrl: { type: String },
    gitTagsUrl: { type: String },
    gitUrl: { type: String },
    issueCommentUrl: { type: String },
    issueEventsUrl: { type: String },
    issuesUrl: { type: String },
    keysUrl: { type: String },
    labelsUrl: { type: String },
    languagesUrl: { type: String },
    mergesUrl: { type: String },
    milestonesUrl: { type: String },
    notificationsUrl: { type: String },
    pullsUrl: { type: String },
    releasesUrl: { type: String },
    sshUrl: { type: String },
    stargazersUrl: { type: String },
    statusesUrl: { type: String },
    subscribersUrl: { type: String },
    subscriptionUrl: { type: String },
    tagsUrl: { type: String },
    teamsUrl: { type: String },
    treesUrl: { type: String },
    cloneUrl: { type: String },
    mirrorUrl: { type: String },
    hooksUrl: { type: String },
    svnUrl: { type: String },
    forks: { type: Number, default: 0 },
    openIssues: { type: Number, default: 0 },
    watchers: { type: Number, default: 0 },
    hasIssues: { type: Boolean, default: true },
    hasProjects: { type: Boolean, default: true },
    hasPages: { type: Boolean, default: true },
    hasWiki: { type: Boolean, default: true },
    hasDownloads: { type: Boolean, default: true },
    archived: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    visibility: { type: String, enum: ['public', 'private', 'internal'] },
    license: { type: Schema.Types.ObjectId, ref: 'License' }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret._id;
            delete ret.__v;
            return ret;
        }},
    toObject: { virtuals: true }
});

export const GitRepository: Model<IGitRepository> = model<IGitRepository>('Repository', gitRepositorySchema);