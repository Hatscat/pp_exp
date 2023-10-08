import { elements } from "./elements";
import { lm } from "./libs/lm";
import { goto, router } from "./router";
import { Page } from "./state";

(function main() {
  document.getElementById("root")?.appendChild(pageLayout());

  router();

  fetch("/gist-template/package.json")
    .then((res) => {
      console.log({ res });
      res.text().then((text) => {
        console.log({ text });
      });
    })
    .catch((err) => {
      console.error({ err });
    });
})();

function pageLayout() {
  return lm("div", { className: "flex flex-col items-center" })([
    header(),
    elements.pageContainer,
  ]);
}

function header() {
  return lm("div", {
    className:
      "sticky top-0 flex justify-between items-center	w-full px-16 py-4 bg-stone-100",
  })([
    lm("h1", { className: "text-2xl font-black" })("PP Exp"),
    lm("div", { className: "flex space-x-4" })([
      lm("button", {
        className: "px-4 py-2 border bg-white hover:invert",
        onclick: () => goto(Page.ExperimentList),
      })("Experiments"),
      lm("button", {
        className: "px-4 py-2 border bg-white hover:invert",
        onclick: () => goto(Page.Settings),
      })("Settings"),
    ]),
  ]);
}
