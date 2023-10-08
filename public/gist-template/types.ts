export interface Experiment {
  id: string;
  name: string;
  url: string;
  variants: ExperimentVariant[];
}

export interface ExperimentVariant {
  id: string;
  slicePercentage: number;
  elements?: VariantElement[];
}

export interface VariantElement {
  selector: string;
  value: string;
}

export interface UserSegment {
  experimentId: string;
  variantId: string;
}
