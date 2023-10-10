import { Octokit } from "octokit";
import { state } from "./state";
import { Experiment } from "./models/Experiment";
import { OctokitResponse } from "@octokit/types";

export async function fetchAndSyncRemoteGist(): Promise<boolean> {
  if (!state.githubToken || !state.gistId) {
    return false;
  }
  const octokit = new Octokit({
    auth: state.githubToken,
  });

  const response = await octokit.request("GET /gists/{gist_id}", {
    gist_id: state.gistId,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (response.status !== 200) {
    console.error(response.status, response);
    return false;
  }

  updateStateWithApiResponse(response);

  return true;
}

export async function saveAndSyncRemoteExperiment(
  currentExpId: string | undefined,
  newExp: Experiment
): Promise<boolean> {
  const experiments = [
    newExp,
    ...state.experimentList.filter((e) => e.id !== currentExpId),
  ];

  return updateAndSyncRemoteGist(experiments);
}

export async function deleteAndSyncRemoteExperiment(
  experimentId: string
): Promise<boolean> {
  const experiments = state.experimentList.filter(
    (exp) => exp.id !== experimentId
  );

  return updateAndSyncRemoteGist(experiments);
}

async function updateAndSyncRemoteGist(
  experiments: Experiment[]
): Promise<boolean> {
  if (!state.githubToken || !state.gistId) {
    return false;
  }
  const octokit = new Octokit({
    auth: state.githubToken,
  });

  const response = await octokit.request("PATCH /gists/{gist_id}", {
    gist_id: state.gistId,
    description:
      "pp_exp typescript package to include as dependency in your project.",
    files: {
      ...state.gistFiles,
      "experiments.json": {
        content: JSON.stringify({ experiments }, null, 2),
      },
    },
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (response.status !== 200) {
    console.error(response.status, response);
    return false;
  }

  updateStateWithApiResponse(response);

  return true;
}

function updateStateWithApiResponse(response: OctokitResponse<any>) {
  if (response.data.files?.["experiments.json"]?.content) {
    try {
      const content = JSON.parse(
        response.data.files["experiments.json"].content
      );
      state.experimentList = content.experiments;

      console.log({ experimentList: state.experimentList });
    } catch (err) {
      console.error(err);
    }
  }
}
