import { header } from "./components/header";
import { elements } from "./elements";
import { lm } from "./libs/lm";
import { setupRouter } from "./router";

(function main() {
  document.getElementById("root")?.appendChild(pageLayout());

  setupRouter();

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
