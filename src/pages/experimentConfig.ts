import { lm } from "../libs/lm";
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
    className: "flex flex-col px-16 py-8 space-y-8 bg-stone-100",
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
    lm("button", {
      className: "btn-success",
      // onclick: () => saveExperiment(), // TODO: get input values, check values, send them to gist api, update state
    })("Save"),
    state.experimentId
      ? lm("button", {
          className: "btn-primary",
          onclick: () => goTo(PageName.ExperimentBuilder, experiment?.id ?? ""),
        })("Edit Variants")
      : undefined,
    lm("button", {
      className: "btn-danger",
      // onclick: () =>
      //   confirm("Are you sure to delete this experiment?") &&
      //   deleteExperiment(), // TODO: delete experiment from gist api, update state
    })("Delete"),
    lm("button", {
      className: "btn-secondary",
      onclick: () => goTo(PageName.ExperimentList),
    })("Back")
  );
}
