import { lm } from "../libs/lm";
import { Experiment } from "../models/Experiment";
import { goTo } from "../router";
import { PageName, state } from "../state";

export function experimentListPage() {
  return lm("div", { className: "flex flex-col space-y-8" })(
    ...state.experimentList.map(experimentCard),
    lm("button", {
      className: "btn-primary my-4",
      onclick: () => goTo(PageName.ExperimentConfig),
    })("Create New Experiment")
  );
}

function experimentCard(experiment: Experiment) {
  return lm("div", {
    className:
      "flex flex-col px-16 py-8 space-y-4 bg-stone-200 border-8 border-stone-300 rounded-lg shadow cursor-pointer hover:invert",
    onclick: () => goTo(PageName.ExperimentConfig, experiment.id),
  })(
    lm("h2", { className: "text-xl font-medium" })(experiment.name),
    lm("p", { className: "text-lg" })(experiment.url),
    lm("p", { className: "text-sm" })("id: " + experiment.id)
  );
}
