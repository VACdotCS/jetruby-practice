import { Schema, Document, Types } from 'mongoose';

export interface IGitRepository extends Document {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: Types.ObjectId;
    html_url: string;
    description?: string;
    fork: boolean;
    url: string;
    created_at: Date;
    updated_at: Date;
    pushed_at: Date;
    homepage?: string;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language?: string | null;
    forks_count: number;
    open_issues_count: number;
    default_branch: string;
    score?: number;
    topics: string[];
    visibility: 'public' | 'private' | 'internal';
    forks: number;
    open_issues: number;
    watchers: number;
    permissions: {
        admin: boolean;
        maintain: boolean;
        push: boolean;
        triage: boolean;
        pull: boolean;
    };
    license?: Types.ObjectId | null;
    archived: boolean;
    disabled: boolean;
    is_template: boolean;

    // URL fields
    archive_url: string;
    assignees_url: string;
    blobs_url: string;
    branches_url: string;
    collaborators_url: string;
    comments_url: string;
    commits_url: string;
    compare_url: string;
    contents_url: string;
    contributors_url: string;
    deployments_url: string;
    downloads_url: string;
    events_url: string;
    forks_url: string;
    git_commits_url: string;
    git_refs_url: string;
    git_tags_url: string;
    git_url: string;
    issue_comment_url: string;
    issue_events_url: string;
    issues_url: string;
    keys_url: string;
    labels_url: string;
    languages_url: string;
    merges_url: string;
    milestones_url: string;
    notifications_url: string;
    pulls_url: string;
    releases_url: string;
    ssh_url: string;
    stargazers_url: string;
    statuses_url: string;
    subscribers_url: string;
    subscription_url: string;
    tags_url: string;
    teams_url: string;
    trees_url: string;
    clone_url: string;
    mirror_url: string | null;
    hooks_url: string;
    svn_url: string;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    has_discussions: boolean;
    allow_forking: boolean;
    web_commit_signoff_required: boolean;
}

const GitRepositorySchema = new Schema<IGitRepository>({
    id: { type: Number, required: true, unique: true },
    node_id: { type: String },
    name: { type: String, required: true },
    full_name: { type: String, required: true },
    private: { type: Boolean, default: false },
    owner: { type: Schema.Types.ObjectId, ref: 'Owner', required: true },
    html_url: { type: String },
    description: { type: String },
    fork: { type: Boolean, default: false },
    url: { type: String },
    created_at: { type: Date },
    updated_at: { type: Date },
    pushed_at: { type: Date },
    homepage: { type: String },
    size: { type: Number },
    stargazers_count: { type: Number, default: 0 },
    watchers_count: { type: Number, default: 0 },
    language: { type: String },
    forks_count: { type: Number, default: 0 },
    open_issues_count: { type: Number, default: 0 },
    default_branch: { type: String },
    score: { type: Number },
    topics: { type: [String], default: [] },
    visibility: { type: String, enum: ['public', 'private', 'internal'], default: 'public' },
    forks: { type: Number, default: 0 },
    open_issues: { type: Number, default: 0 },
    watchers: { type: Number, default: 0 },
    permissions: {
        admin: { type: Boolean, default: false },
        maintain: { type: Boolean, default: false },
        push: { type: Boolean, default: false },
        triage: { type: Boolean, default: false },
        pull: { type: Boolean, default: true }
    },
    license: { type: Schema.Types.ObjectId, ref: 'License', default: null },
    archived: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    is_template: { type: Boolean, default: false },
    allow_forking: { type: Boolean, default: true },
    web_commit_signoff_required: { type: Boolean, default: false },

    // URL fields
    archive_url: { type: String },
    assignees_url: { type: String },
    blobs_url: { type: String },
    branches_url: { type: String },
    collaborators_url: { type: String },
    comments_url: { type: String },
    commits_url: { type: String },
    compare_url: { type: String },
    contents_url: { type: String },
    contributors_url: { type: String },
    deployments_url: { type: String },
    downloads_url: { type: String },
    events_url: { type: String },
    forks_url: { type: String },
    git_commits_url: { type: String },
    git_refs_url: { type: String },
    git_tags_url: { type: String },
    git_url: { type: String },
    issue_comment_url: { type: String },
    issue_events_url: { type: String },
    issues_url: { type: String },
    keys_url: { type: String },
    labels_url: { type: String },
    languages_url: { type: String },
    merges_url: { type: String },
    milestones_url: { type: String },
    notifications_url: { type: String },
    pulls_url: { type: String },
    releases_url: { type: String },
    ssh_url: { type: String },
    stargazers_url: { type: String },
    statuses_url: { type: String },
    subscribers_url: { type: String },
    subscription_url: { type: String },
    tags_url: { type: String },
    teams_url: { type: String },
    trees_url: { type: String },
    clone_url: { type: String },
    mirror_url: { type: String },
    hooks_url: { type: String },
    svn_url: { type: String },
    has_issues: { type: Boolean, default: true },
    has_projects: { type: Boolean, default: false },
    has_downloads: { type: Boolean, default: true },
    has_wiki: { type: Boolean, default: true },
    has_pages: { type: Boolean, default: false },
    has_discussions: { type: Boolean, default: false }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    toJSON: {
        transform: (doc, ret) => {
            delete ret._id;
            delete ret.__v;

            if (ret.license) {
                delete ret.license._id;
                delete ret.license.__v;
            }

            if (ret.owner) {
                delete ret.owner._id;
                delete ret.owner.__v;
            }

            return ret;
        }
    },
    toObject: { virtuals: true }
});

export { GitRepositorySchema };