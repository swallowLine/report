import type { Nullable, Respondent, LabelsData, Message } from './reportCommon';

export type QuestionApiResponse = {
  id: Nullable<string>;
  nend: Nullable<number>;
  seasonName: Nullable<string>;
  title: Nullable<string>;
  univName: Nullable<string>;
  profName: Nullable<string>;
  publishDate: Nullable<string>;
  displayEnd: Nullable<string>;
  missionText: Nullable<string>;
  systemMessage: Nullable<string>;
  liveAttendance: Nullable<Respondent[]>;
  liveRespondent: Nullable<Respondent[]>;
  liveEnquete: Nullable<LabelsData[]>;
  liveGender: Nullable<LabelsData[]>;
  liveMessage: Nullable<Message[]>;
  questionAttendance: Nullable<Respondent[]>;
  questionRespondent: Nullable<Respondent[]>;
  questionEnquete: Nullable<LabelsData[]>;
  questionGender: Nullable<LabelsData[]>;
  questionMessage: Nullable<Message[]>;
  kikkake: Nullable<Message[]>;
  question: Nullable<Message[]>;
  mission: Nullable<Message[]>;
};
