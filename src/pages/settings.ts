import { fetchAndSyncRemoteGist } from "../gistSync";
import { lm } from "../libs/lm";
import { state } from "../state";

export function settingsPage() {
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
      lm("input", {
        id: "github_token",
        className: "input",
        onchange: (ev) => handleInputChange("githubToken", ev),
      })(state.githubToken ?? "")
    ),
    lm("div", { className: "flex flex-col" })(
      lm("label", { htmlFor: "gist_id", className: "font-bold" })("Gist ID"),
      lm("input", {
        id: "gist_id",
        className: "input",
        onchange: (ev) => handleInputChange("gistId", ev),
      })(state.gistId ?? "")
    )
  );
}

async function handleInputChange(name: "githubToken" | "gistId", event: Event) {
  const target = event.target as HTMLInputElement;
  state[name] = target.value;

  if (!state.githubToken || !state.gistId) {
    return;
  }

  const successFulSync = await fetchAndSyncRemoteGist();

  if (successFulSync) {
    alert("Successfully synced with remote gist!");
  }
}
