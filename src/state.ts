export const enum PageName {
  ExperimentList = "ExperimentList",
  Settings = "Settings",
  ExperimentConfig = "ExperimentConfig",
  ExperimentBuilder = "ExperimentBuilder",
  NotFound = "NotFound",
}

export const state = {
  page: PageName.ExperimentList,
  experimentId: null as string | null,
  githubToken: null as string | null,
  gistId: null as string | null,
  experimentList: [],
};
