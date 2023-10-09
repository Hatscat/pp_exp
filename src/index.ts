import { header } from "./components/header";
import { config } from "./config";
import { elements } from "./elements";
import { fetchAndSyncRemoteGist } from "./gistSync";
import { lm } from "./libs/lm";
import { setupRouter } from "./router";
import { state } from "./state";

(function main() {
  document.getElementById("root")?.appendChild(pageLayout());

  loadLocalData();

  setupRouter();

  void fetchAndSyncRemoteGist();

  // TODO: fetch local gist template files then save to state
  fetch("/gist-template/package.json")
    .then((res) => {
      console.log({ res });
      res.text().then((text) => {
        console.log({ text });
      });
    })
    .catch((err) => {
      console.error({ err });
    });
})();

function pageLayout() {
  return lm("div", { className: "flex flex-col items-center" })([
    header(),
    elements.pageContainer,
  ]);
}

function loadLocalData() {
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
