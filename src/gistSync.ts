import { Octokit } from "octokit";
import { config } from "./config";
import { state } from "./state";

export async function fetchAndSyncRemoteGist(): Promise<boolean> {
  if (!state.githubToken || !state.gistId) {
    return false;
  }
  const octokit = new Octokit({
    auth: state.githubToken,
  });

  const data = await octokit.request("GET /gists/{gist_id}", {
    gist_id: state.gistId,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (data.status !== 200) {
    console.error(data.status, data);
    return false;
  }

  if (data.data.files?.["experiments.json"]?.content) {
    try {
      const content = JSON.parse(data.data.files["experiments.json"].content);
      state.experimentList = content.experiments;

      console.log({ experimentList: state.experimentList });
    } catch (err) {
      console.error(err);
    }
  }

  localStorage.setItem(
    config.localStorageKey,
    JSON.stringify({
      githubToken: state.githubToken,
      gistId: state.gistId,
    })
  );
  return true;
}
