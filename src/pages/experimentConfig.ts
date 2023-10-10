import {
  deleteAndSyncRemoteExperiment,
  saveAndSyncRemoteExperiment,
} from "../gistSync";
import { lm } from "../libs/lm";
import { Experiment } from "../models/Experiment";
import { goTo } from "../router";
import { PageName, state } from "../state";

export function experimentConfigPage() {
  const experiment = state.experimentList.find(
    (exp) => exp.id === state.experimentId
  );

  const inputs = {
    name: lm("input", { id: "exp_name", className: "input" })(
      experiment?.name ?? ""
    ),
    url: lm("input", { id: "exp_url", className: "input" })(
      experiment?.url ?? ""
    ),
    id: lm("input", { id: "exp_id", className: "input" })(experiment?.id ?? ""),
  };

  return lm("div", {
    className: "flex flex-col px-16 py-8 space-y-8 bg-stone-100 min-w-[512px]",
  })(
    lm("div", { className: "flex flex-col" })(
      lm("label", { htmlFor: "exp_name", className: "font-bold" })("Name"),
      inputs.name
    ),
    lm("div", { className: "flex flex-col" })(
      lm("label", { htmlFor: "exp_url", className: "font-bold" })("URL"),
      inputs.url
    ),
    lm("div", { className: "flex flex-col" })(
      lm("label", { htmlFor: "exp_id", className: "font-bold" })(
        "Analytics ID"
      ),
      inputs.id
    ),
    state.experimentId
      ? lm("button", {
          className: "btn-primary",
          onclick: () =>
            goTo(PageName.ExperimentBuilder, state.experimentId ?? ""),
        })("Edit Variants")
      : undefined,
    lm("button", {
      className: "btn-success",
      onclick: () => saveExperiment(experiment, inputs),
    })("Save"),
    lm("button", {
      className: "btn-danger",
      onclick: () =>
        confirm("Are you sure to delete this experiment?") &&
        deleteExperiment(),
    })("Delete"),
    lm("button", {
      className: "btn-secondary",
      onclick: () => goTo(PageName.ExperimentList),
    })("Back")
  );
}
async function saveExperiment(
  currentExperiment: Experiment | undefined,
  inputs: {
    name: HTMLInputElement;
    url: HTMLInputElement;
    id: HTMLInputElement;
  }
) {
  if (!inputs.name.value || !inputs.url.value || !inputs.id.value) {
    alert("Please fill all the fields!");
    return;
  }

  const newExperiment: Experiment = currentExperiment
    ? {
        ...currentExperiment,
        name: inputs.name.value,
        url: inputs.url.value,
        id: inputs.id.value,
      }
    : {
        name: inputs.name.value,
        url: inputs.url.value,
        id: inputs.id.value,
        variants: [],
      };

  const isSuccessFul = await saveAndSyncRemoteExperiment(
    currentExperiment?.id,
    newExperiment
  );

  alert(isSuccessFul ? "Experiment saved!" : "Failed to save experiment!");
}

async function deleteExperiment() {
  if (!state.experimentId) return;

  const isSuccessFul = await deleteAndSyncRemoteExperiment(state.experimentId);

  if (isSuccessFul) {
    goTo(PageName.ExperimentList);
  } else {
    alert("Failed to delete experiment!");
  }
}
