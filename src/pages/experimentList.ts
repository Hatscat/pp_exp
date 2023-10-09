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
      "flex flex-col p-8 space-y-2 bg-stone-300 border rounded cursor-pointer hover:bg-stone-200",
    onclick: () => goTo(PageName.ExperimentConfig, experiment.id),
  })(
    lm("h2", { className: "text-xl font-medium" })(experiment.name),
    lm("p", { className: "text-lg" })(experiment.url),
    lm("p", { className: "text-sm" })("id: " + experiment.id)
  );
}
