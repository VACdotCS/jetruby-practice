import {Schema, model, Document, Model} from 'mongoose';

export interface ILicense extends Document {
    key: string;
    name: string;
    url: string;
    spdx_id: string;
    node_id: string;
    html_url: string;
}

const licenseSchema = new Schema<ILicense>({
    key: { type: String, unique: true, required: true },
    name: { type: String },
    url: { type: String },
    spdx_id: { type: String },
    node_id: { type: String },
    html_url: { type: String }
});

export const License: Model<ILicense> = model<ILicense>('License', licenseSchema);