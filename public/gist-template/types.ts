export interface Experiment {
  id: string;
  name: string;
  url: string;
  variants: ExperimentVariant[];
}

export type ExperimentVariant =
  | {
      id: "control";
      slicePercentage: number;
    }
  | {
      id: string;
      slicePercentage: number;
      elements: VariantElement[];
    };

export interface VariantElement {
  selector: string;
  value: string;
}

export interface UserSegment {
  experimentId: string;
  variantId: string;
}
