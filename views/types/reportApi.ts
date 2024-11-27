import type { Nullable, Respondent, LabelsData, Message } from './reportCommon';

export type ApiResponse = {
  id: Nullable<string>;
  nend: Nullable<number>;
  seasonName: Nullable<string>;
  title: Nullable<string>;
  univName: Nullable<string>;
  publishDate: Nullable<string>;
  displayEnd: Nullable<string>;
  missionText: Nullable<string>;
  systemMessage: Nullable<string>;
  attendance: Nullable<Respondent[]>;
  respondent: Nullable<Respondent[]>;
  enquete: Nullable<LabelsData[]>;
  gender: Nullable<LabelsData[]>;
  message: Nullable<Message[]>;
  kikkake: Nullable<Message[]>;
  question: Nullable<Message[]>;
  mission: Nullable<Message[]>;
};