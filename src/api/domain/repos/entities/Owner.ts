import { Schema, model, Document, Model } from 'mongoose';

export interface IOwner extends Document {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    received_events_url: string;
    type: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    site_admin: boolean;
}

const ownerSchema = new Schema<IOwner>({
    login: { type: String, required: true },
    id: { type: Number, required: true, unique: true },
    node_id: { type: String },
    avatar_url: { type: String },
    gravatar_id: { type: String },
    url: { type: String },
    received_events_url: { type: String },
    type: { type: String, enum: ['User', 'Organization'] },
    html_url: { type: String },
    followers_url: { type: String },
    following_url: { type: String },
    gists_url: { type: String },
    starred_url: { type: String },
    subscriptions_url: { type: String },
    organizations_url: { type: String },
    repos_url: { type: String },
    events_url: { type: String },
    site_admin: { type: Boolean, default: false }
}, {
    toJSON: {
        transform: (doc, ret) => {
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    },
    toObject: { virtuals: true }
});

export const Owner: Model<IOwner> = model<IOwner>('Owner', ownerSchema);