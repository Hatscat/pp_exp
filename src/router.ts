import { elements } from "./elements";
import { experimentBuilderPage } from "./pages/experimentBuilder";
import { experimentConfigPage } from "./pages/experimentConfig";
import { experimentListPage } from "./pages/experimentList";
import { settingsPage } from "./pages/settings";
import { state, PageName } from "./state";

export const pagePath: Record<PageName, { route: string; pattern: RegExp }> = {
  [PageName.ExperimentList]: {
    route: "/",
    pattern: /^\/$/,
  },
  [PageName.Settings]: {
    route: "/settings",
    pattern: /^\/settings\/?$/,
  },
  [PageName.ExperimentConfig]: {
    route: "/experiment-config",
    pattern: /^\/experiment-config\/(?<experimentId>\w+)\/?$/,
  },
  [PageName.ExperimentBuilder]: {
    route: "/experiment-builder",
    pattern: /^\/experiment-builder\/(?<experimentId>\w+)\/?$/,
  },
  [PageName.NotFound]: {
    route: "/404",
    pattern: /^\/404\/?$/,
  },
};

export function goTo(page: PageName, ...resourceIds: string[]) {
  history.pushState(
    {},
    "",
    `${pagePath[page].route}${resourceIds.length ? "/" : ""}${resourceIds.join(
      "/"
    )}`
  );
  router();
}

export function setupRouter() {
  window.addEventListener("popstate", router);

  if (!state.githubToken || !state.gistId) {
    goTo(PageName.Settings);
    return;
  }
  router();
}

export function router() {
  const newPage = Object.entries(pagePath).find(([_, { pattern }]) =>
    pattern.test(location.pathname)
  );
  if (newPage) {
    state.page = newPage[0] as PageName;
    state.experimentId =
      newPage[1].pattern.exec(location.pathname)?.groups?.experimentId ?? null;
  } else {
    state.page = PageName.NotFound;
  }

  renderPage();
}

export function renderPage() {
  switch (state.page) {
    case PageName.ExperimentList:
      elements.headerTitle.textContent = "Experiments";
      return elements.pageContainer.replaceContent(experimentListPage());
    case PageName.Settings:
      elements.headerTitle.textContent = "Settings";
      return elements.pageContainer.replaceContent(settingsPage());
    case PageName.ExperimentConfig:
      elements.headerTitle.textContent = "Experiment Config";
      return elements.pageContainer.replaceContent(experimentConfigPage());
    case PageName.ExperimentBuilder:
      elements.headerTitle.textContent = "Experiment Builder";
      return elements.pageContainer.replaceContent(experimentBuilderPage());
    case PageName.NotFound:
    default:
      elements.headerTitle.textContent = "404";
      return elements.pageContainer.replaceContent("Not Found");
  }
}
