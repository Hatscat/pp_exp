import { lm } from "./lm";

(function main() {
  console.log("Hello, world!");
  document.body.appendChild(pageLayout());
})();

function pageLayout() {
  return lm("div", { className: "flex flex-col items-center" })([
    lm("h1", { className: "text-4xl" })("Hello, world!"),
  ]);
}
