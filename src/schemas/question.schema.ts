import { Schema } from 'mongoose';

export const QuestionSchema = new Schema({
  _id: { required: false, type: Schema.Types.ObjectId },
  question: { required: true, type: Schema.Types.String },
  type: { required: true, type: Schema.Types.String },
  media: { required: false, type: Schema.Types.String },
  option1: { required: true, type: Schema.Types.String },
  option2: { required: true, type: Schema.Types.String },
  option3: { required: true, type: Schema.Types.String },
  option4: { required: true, type: Schema.Types.String },
  solution: { required: true, type: Schema.Types.String },
  module: { required: true, type: Schema.Types.String }
});
