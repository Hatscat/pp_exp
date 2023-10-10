import { fetchAndSyncRemoteGist } from "../gistSync";
import { lm } from "../libs/lm";
import { state } from "../state";

export function settingsPage() {
  const inputs = {
    githubToken: lm("input", {
      id: "github_token",
      className: "input",
    })(state.githubToken ?? ""),
    gistId: lm("input", {
      id: "gist_id",
      className: "input",
    })(state.gistId ?? ""),
  };

  return lm("div", {
    className: "flex flex-col container px-16 py-8 space-y-8 bg-stone-100",
  })(
    lm("p", { className: "text-center" })(
      lm("span")(
        "Please enter a GitHub Personal Access Token and a Gist ID to manage the gist through the "
      ),
      lm("a", {
        href: "https://docs.github.com/en/rest/gists/gists",
        className: "text-blue-600 visited:text-purple-600",
      })("GitHub REST API"),
      lm("span")(".")
    ),
    lm("div", { className: "flex flex-col" })(
      lm("label", { htmlFor: "github_token", className: "font-bold" })(
        "GitHub Personal Access Token"
      ),
      inputs.githubToken
    ),
    lm("div", { className: "flex flex-col" })(
      lm("label", { htmlFor: "gist_id", className: "font-bold" })("Gist ID"),
      inputs.gistId
    ),
    lm("button", {
      className: "btn-success",
      onclick: () => syncWithGithub(inputs),
    })("Save and Sync")
  );
}

async function syncWithGithub(inputs: {
  githubToken: HTMLInputElement;
  gistId: HTMLInputElement;
}) {
  state.githubToken = inputs.githubToken.value;
  state.gistId = inputs.gistId.value;

  if (!state.githubToken || !state.gistId) {
    alert("Please fill all the fields!");
    return;
  }

  const successFulSync = await fetchAndSyncRemoteGist();

  if (successFulSync) {
    alert("Successfully synced with remote gist!");
  }
}
