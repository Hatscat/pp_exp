import { lm } from "../libs/lm";
import { state } from "../state";

export function experimentConfigPage() {
  return lm("div", { className: "flex flex-col" })(
    lm("h2", { className: "text-xl" })(state.experimentId ?? "New Experiment")
  );
}
