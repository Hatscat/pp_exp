import type { Experiment, ExperimentVariant, UserSegment } from "./types";
import { experiments } from "./experiments";

export * from "./types";
export { experiments };

export function enablePostProcessingExperiments(): void {
  setupPpExp();
  postProcessExperiments();
  const observer = new MutationObserver(postProcessExperiments);
  observer.observe(document.body.firstElementChild || document.body, {
    childList: true,
    subtree: true,
  });
}

export function getUserSegments(): UserSegment[] {
  return Object.values(state.activeVariantByUrl).map(
    ({ experimentId, variantId }) => ({
      experimentId,
      variantId,
    })
  );
}

const localStorageKeys = {
  drawnNbByExpId: "pp_exp:drawnNbByExpId",
};

const state: {
  activeVariantByUrl: Record<
    Experiment["url"],
    ExperimentVariant & UserSegment
  >;
} = {
  activeVariantByUrl: {},
};

function setupPpExp() {
  const drawnNbByExpId = updateDrawnNbByExpId();

  state.activeVariantByUrl = Object.fromEntries(
    experiments.map((experiment) => {
      const nb = drawnNbByExpId[experiment.id];
      const variant =
        experiment.variants.find(
          (variant, i) =>
            nb <
            variant.slicePercentage +
              experiment.variants
                .slice(0, i)
                .reduce((acc, v) => acc + v.slicePercentage, 0)
        ) ?? experiment.variants[0];

      return [
        experiment.url,
        { ...variant, variantId: variant.id, experimentId: experiment.id },
      ];
    })
  );
}

function updateDrawnNbByExpId() {
  const initialDrawnNbByExpId = loadLocalDrawnNumbers() ?? {};

  const drawnNbByExpId = experiments.reduce(
    (result: Record<string, number>, { id }) => {
      if (typeof result[id] === "number") {
        return result;
      }
      return {
        ...result,
        [id]: Math.random() * 100,
      };
    },
    initialDrawnNbByExpId
  );

  localStorage.setItem(
    localStorageKeys.drawnNbByExpId,
    JSON.stringify(drawnNbByExpId)
  );

  return drawnNbByExpId;
}

function postProcessExperiments(): void {
  const variant = state.activeVariantByUrl[location.origin + location.pathname];
  if (!variant || !("elements" in variant)) {
    return;
  }
  variant.elements.forEach(({ selector, value }) => {
    const elem = document.querySelector(selector);
    if (elem && elem.innerHTML !== value) {
      elem.innerHTML = value;
    }
  });
}

function loadLocalDrawnNumbers(): Record<string, number> | null {
  const stringData = localStorage.getItem(localStorageKeys.drawnNbByExpId);
  if (!stringData) {
    return null;
  }
  try {
    const data = JSON.parse(stringData);
    if (typeof data === "object" && data !== null) {
      return data;
    }
    return null;
  } catch (error) {
    return null;
  }
}
