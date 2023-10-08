import { lm } from "../libs/lm";

export function experimentBuilderPage() {
  return lm("div", { className: "flex flex-col" })(
    lm("h1", { className: "text-2xl" })("Experiment Builder")
  );
}
