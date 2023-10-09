import { elements } from "../elements";
import { lm } from "../libs/lm";
import { goTo } from "../router";
import { PageName } from "../state";

export function header() {
  return lm("div", {
    className:
      "sticky top-0 flex justify-between items-center	w-full px-16 py-4 bg-stone-100",
  })(
    lm("span", { className: "text-2xl font-black" })("PP Exp"),
    elements.headerTitle,
    lm("div", { className: "flex space-x-4" })(
      lm("button", {
        className: "px-4 py-2 border bg-white hover:invert",
        onclick: () => goTo(PageName.ExperimentList),
      })("Experiments"),
      lm("button", {
        className: "px-4 py-2 border bg-white hover:invert",
        onclick: () => goTo(PageName.Settings),
      })("Settings")
    )
  );
}
