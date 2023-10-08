import { lm } from "../libs/lm";

export function settingsPage() {
  return lm("div", { className: "flex flex-col" })(
    lm("h1", { className: "text-2xl" })("Settings")
  );
}
