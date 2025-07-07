import {Schema, model, Document, Model} from 'mongoose';

export interface IOwner extends Document {
    login: string;
    id: number;
    nodeId: string;
    avatarUrl: string;
    gravatarId: string;
    url: string;
    receivedEventsUrl: string;
    type: string;
    htmlUrl: string;
    followersUrl: string;
    followingUrl: string;
    gistsUrl: string;
    starredUrl: string;
    subscriptionsUrl: string;
    organizationsUrl: string;
    reposUrl: string;
    eventsUrl: string;
    siteAdmin: boolean;
}

const ownerSchema = new Schema<IOwner>({
    login: { type: String, required: true },
    id: { type: Number, required: true, unique: true },
    nodeId: { type: String },
    avatarUrl: { type: String },
    gravatarId: { type: String },
    url: { type: String },
    receivedEventsUrl: { type: String },
    type: { type: String, enum: ['User', 'Organization'] },
    htmlUrl: { type: String },
    followersUrl: { type: String },
    followingUrl: { type: String },
    gistsUrl: { type: String },
    starredUrl: { type: String },
    subscriptionsUrl: { type: String },
    organizationsUrl: { type: String },
    reposUrl: { type: String },
    eventsUrl: { type: String },
    siteAdmin: { type: Boolean, default: false }
});

export const Owner: Model<IOwner> = model<IOwner>('Owner', ownerSchema);