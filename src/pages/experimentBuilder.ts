import { lm } from "../libs/lm";
import { state } from "../state";

export function experimentBuilderPage() {
  return lm("div", { className: "flex flex-col" })(
    lm("h2", { className: "text-xl" })(state.experimentId ?? "New Experiment")
  );
}
