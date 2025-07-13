import {model} from "mongoose";
import {GitRepositorySchema, IGitRepository} from "./entities/GitRepository";

const GitRepositoryModel = model<IGitRepository>('GitRepository', GitRepositorySchema);

export default GitRepositoryModel;