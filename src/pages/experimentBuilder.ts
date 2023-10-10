import { lm } from "../libs/lm";
import { ExperimentVariant } from "../models/Experiment";
import { goTo } from "../router";
import { PageName, state } from "../state";

export function experimentBuilderPage() {
  const experiment = state.experimentList.find(
    (exp) => exp.id === state.experimentId
  );

  const variantCardsContainer = lm("div", {
    className: "flex flex-col space-y-4",
  })(...(experiment ? experiment.variants.map(variantCard) : []));

  return lm("div", { className: "flex flex-col space-y-8" })(
    lm("div", {
      className:
        "flex justify-between p-8 space-x-8 bg-stone-800 text-white text-xl",
    })(
      lm("span")(experiment?.name),
      lm("span")(experiment?.url),
      lm("span")(experiment?.id)
    ),
    lm("div", { className: "flex flex-col" })(
      lm("iframe", { src: experiment?.url, height: "256" })()
    ),
    variantCardsContainer,
    lm("button", {
      className: "btn-primary",
      onclick: () =>
        variantCardsContainer.addContent(
          variantCard({ id: "", slicePercentage: 0 })
        ),
    })("Add New Variant"),
    lm("button", {
      className: "btn-secondary",
      onclick: () => goTo(PageName.ExperimentConfig, state.experimentId ?? ""),
    })("Back")
  );
}

function variantCard(variant: ExperimentVariant) {
  return lm("div", {
    className: "flex px-4 py-2 space-x-4 bg-stone-100 border-2 rounded",
  })(
    lm("div", { className: "flex flex-col" })(
      lm("label", { className: "font-bold" })("Analytics ID"),
      lm("input", { className: "input" })(variant.id)
    ),
    lm("div", { className: "flex flex-col" })(
      lm("label", { className: "font-bold" })("Slice Percentage"),
      lm("input", { className: "input" })(String(variant.slicePercentage))
    ),
    lm("button", { className: "btn-primary" })("Edit Elements"),
    lm("button", { className: "btn-success" })("Save"),
    lm("button", { className: "btn-danger" })("Delete")
  );
}
