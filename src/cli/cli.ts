#!/usr/bin/env node

import { program } from "commander";
import { green, red } from "colorette";
import inquirer from "inquirer";
import axios, {AxiosError} from "axios";
import ora from "ora";
import * as fs from "node:fs";

program.version("1.0.0").description("Git Repo Puller");

const controller = new AbortController();

function catchApiError(err: any, spinner: any) {
    if (err.code == 'ECONNREFUSED') {
        spinner.fail(`API is not reachable. Check servers or try again later.`);
        return;
    }
    if (err instanceof AxiosError) {
        spinner.fail(`API error: ${err.message}. ${JSON.stringify(err.response?.data || {})}`);
    }
}

const api = axios.create({
    baseURL: "http://localhost:3000",
    signal: controller.signal,
});

async function saveToJson(content: any) {
    const { filename } = await inquirer.prompt([
        {
            type: "input",
            name: "filename",
            message: "How to name JSON file?",
        },
    ]);

    fs.writeFileSync(`./${filename}.json`, JSON.stringify(content, null, 2));
    console.log(green("✅ Successfully written data to current directory."));
}

async function retry(spinner: ora.Ora, func: (spinner: ora.Ora) => Promise<void>, error: any) {
    catchApiError(error, spinner)

    const { choice } = await inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "Retry?",
            choices: ["Yes", "No"],
        },
    ]);

    if (choice === "Yes") {
        await func(spinner);
    }
}

async function getRepoByIdScenario(spinner: ora.Ora) {
    const { id } = await inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "Write id as number:",
        },
    ]);

    try {
        spinner.start();
        const res = await api.get(`repos?id=${id}`);
        spinner.succeed("Fetched successfully");
        await saveToJson(res.data);
    } catch (error: any) {
        await retry(spinner, getRepoByIdScenario, error);
    }
}

async function getRepoByNameScenario(spinner: ora.Ora) {
    const { name } = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Write name:",
        },
    ]);

    try {
        spinner.start();
        const res = await api.get(`repos?name=${name}`);
        spinner.succeed("Fetched successfully");
        await saveToJson(res.data);
    } catch (error: any) {
        await retry(spinner, getRepoByNameScenario, error);
    }
}

program.action(async () => {
    try {
        const { choice } = await inquirer.prompt([
            {
                type: "list",
                name: "choice",
                message: "Choose an action with API:",
                choices: ["Get all repos", "Get Repo by id", "Get Repo by name", "Run repo force pull"],
            },
        ]);

        const spinner = ora("⏳ Fetching data from API");

        if (choice === "Get all repos") {
            try {
                spinner.start();
                const res = await api.get("repos/all");
                spinner.succeed("✅ Fetched successfully");
                await saveToJson(res.data);
            } catch (error: any) {
                catchApiError(error, spinner)
            }
        }

        if (choice === "Get Repo by id") {
            await getRepoByIdScenario(spinner);
        }

        if (choice === "Get Repo by name") {
            await getRepoByNameScenario(spinner);
        }

        if (choice === "Run repo force pull") {
            try {
                spinner.start();
                const res = await api.post("repos/force-sync");
                spinner.succeed(`✅ ${res.data.message}`);
            } catch (error: any) {
                catchApiError(error, spinner)
            }
        }
    } catch (e) {
        console.log(red("❌ Prompt failed or was cancelled."));
    }
});

process.on("SIGINT", () => {
    console.log(red("\n🛑 Interrupted by user (SIGINT)"));
    controller.abort();
    process.exit(0);
});

program.parse(process.argv);
