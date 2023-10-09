import { header } from "./components/header";
import { config } from "./config";
import { elements } from "./elements";
import { fetchAndSyncRemoteGist } from "./gistSync";
import { lm } from "./libs/lm";
import { renderPage, setupRouter } from "./router";
import { state } from "./state";

(function main() {
  document.getElementById("root")?.appendChild(pageLayout());

  loadLocalStorage();

  setupRouter();

  void fetchAndSyncRemoteGist().then(() => renderPage());

  void loadGistTemplateFiles();
})();

function pageLayout() {
  return lm("div", { className: "flex flex-col items-center w-full" })(
    header(),
    elements.pageContainer
  );
}

function loadLocalStorage() {
  const localData = localStorage.getItem(config.localStorageKey);
  if (!localData) return null;
  try {
    const parsedData = JSON.parse(localData);
    state.githubToken = parsedData.githubToken;
    state.gistId = parsedData.gistId;
    return parsedData;
  } catch (err) {
    return null;
  }
}

async function loadGistTemplateFiles() {
  try {
    const packageFileRes = await fetch("/gist-template/package.json");
    state.gistFiles["package.json"] = await packageFileRes.text();

    const typesFileRes = await fetch("/gist-template/types.ts");
    state.gistFiles["types.ts"] = await typesFileRes.text();

    const scriptFileRes = await fetch("/gist-template/pp_exp.ts");
    state.gistFiles["pp_exp.ts"] = await scriptFileRes.text();

    console.log({ gistFiles: state.gistFiles });
  } catch (err) {
    console.error(err);
    alert("Failed to load gist template files! error logged to console.");
  }
}
