import { lm } from "./lm";

(function main() {
  document.body.appendChild(pageLayout());

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
  return lm("div", { className: "flex flex-col items-center" })([header()]);
}

function header() {
  return lm("div", {
    className:
      "sticky top-0 flex justify-between items-center	w-full px-16 py-4 bg-teal-100",
  })([
    lm("h1", { className: "text-2xl" })("PP Exp"),
    lm("div", { className: "flex space-x-4" })([
      lm("button", { className: "px-4 py-2 border bg-white hover:invert" })(
        "Experiments"
      ),
      lm("button", { className: "px-4 py-2 border bg-white hover:invert" })(
        "Settings"
      ),
    ]),
  ]);
}
