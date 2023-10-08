import { lm } from "../libs/lm";

export function experimentConfigPage() {
  return lm("div", { className: "flex flex-col" })(
    lm("h1", { className: "text-2xl" })("Experiment Config")
  );
}
