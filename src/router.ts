import { elements } from "./elements";
import { experimentBuilderPage } from "./pages/experimentBuilder";
import { experimentConfigPage } from "./pages/experimentConfig";
import { experimentListPage } from "./pages/experimentList";
import { settingsPage } from "./pages/settings";
import { Page, state } from "./state";

export function goto(page: Page) {
  location.pathname = page;
  router();
}

export function router() {
  const newPage = Object.values(Page).find(
    (page) => page === location.pathname
  );
  if (newPage) {
    state.page = newPage;
  } else {
    location.pathname = Page.ExperimentList;
    state.page = Page.ExperimentList;
  }

  renderPage();
}

function renderPage() {
  switch (state.page) {
    case Page.ExperimentList:
      return elements.pageContainer.replaceContent(experimentListPage());
    case Page.Settings:
      return elements.pageContainer.replaceContent(settingsPage());
    case Page.ExperimentConfig:
      return elements.pageContainer.replaceContent(experimentConfigPage());
    case Page.ExperimentBuilder:
      return elements.pageContainer.replaceContent(experimentBuilderPage());
  }
}
