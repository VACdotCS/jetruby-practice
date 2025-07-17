import {api} from "../index";

export class ReposApi {
  static async getAllRepos() {
    try {
      const res = await api.get("/repos/all");
      return {
        data: res.data,
        fileName: `repo-all-${new Date().toISOString()}.json`
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  static async getRepoById(id) {
    try {
      const res = await api.get(`/repos?id=${id}`);
      return {
        data: res.data,
        fileName: `repo-${id}-${new Date().toISOString()}.json`
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getRepoByName(name) {
    try {
      const res = await api.get(`/repos?name=${name}`);
      return {
        data: res.data,
        fileName: `repo-${name}-${new Date().toISOString()}.json`
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async runRepoForcePull(name) {
    try {
      await api.post("repos/force-sync");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}