export type OddsInfo = {
  slug: string;
  value: number;
  fraction: string;
  source: string;
  exampleEvent: string;
  exampleDescription: string;
  indexNotation: string;
  mantissaRest?: number;
  related?: string[];
  category?: string;
};

export type EventSummary = {
  indexNotation: string;
  exampleEvent: string;
  fraction: string;
  category?: string;
  slug: string;
};
