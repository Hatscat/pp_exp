import { lm } from "../libs/lm";

export function experimentListPage() {
  return lm("div", { className: "flex flex-col" })(
    lm("h1", { className: "text-xl" })("Experiments page")
  );
}
