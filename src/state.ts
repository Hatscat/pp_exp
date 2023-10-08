export enum Page {
  ExperimentList = "/",
  Settings = "/settings",
  ExperimentConfig = "/experiment-config",
  ExperimentBuilder = "/experiment-builder",
}

export const state = {
  page: Page.ExperimentList,
};
