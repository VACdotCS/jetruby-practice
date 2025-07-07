import {Schema, model, Document, Model} from 'mongoose';

export interface ILicense extends Document {
    key: string;
    name: string;
    url: string;
    spdxId: string;
    nodeId: string;
    htmlUrl: string;
}

const licenseSchema = new Schema<ILicense>({
    key: { type: String },
    name: { type: String },
    url: { type: String },
    spdxId: { type: String },
    nodeId: { type: String },
    htmlUrl: { type: String }
});

export const License: Model<ILicense> = model<ILicense>('License', licenseSchema);