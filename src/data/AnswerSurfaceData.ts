export interface AnswerSurfaceData {
  directAnswer: string;
  bestFitCustomer: string;
  serviceCoverage: string;
  vehicleSuitability: string;
  priceFactors: string[];
  timingExpectations: string;
  preparationRequirements: string[];
  exclusions: string[];
  evidenceLinks: { label: string; url: string }[];
  lastReviewedDate: string;
}
