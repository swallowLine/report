export type Nullable<T> = T | null;

export type Respondent = {
  total: Nullable<number>;
  labels: Nullable<Nullable<string>[]>;
  data: Nullable<Nullable<number>[]>;
};

export type LabelsData = {
  labels: Nullable<Nullable<string>[]>;
  data: Nullable<Nullable<number>[]>;
};

export type Message = {
  content: Nullable<string>;
  speaker: Nullable<string>;
};