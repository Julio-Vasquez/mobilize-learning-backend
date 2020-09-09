import { Document } from "mongoose";

export interface IQuestion extends Document {
  readonly _id: string;
  readonly question: string;
  readonly type: string;
  readonly media: string;
  readonly option1: string;
  readonly option2: string;
  readonly option3: string;
  readonly option4: string;
  readonly solution: string;
  readonly module: string;
}