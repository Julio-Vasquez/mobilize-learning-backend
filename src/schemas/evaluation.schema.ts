import { Schema } from 'mongoose';

export const EvaluationResultSchema = new Schema({
  _id: { required: false, type: Schema.Types.ObjectId },
  key: { required: true, type: Schema.Types.String },//incrementable de la persona,
  tag: {
    required: true,
    type: Schema.Types.String,
    enum: ['Aprobado', 'Reprobado']
  },
  cal: {
    required: true,
    type: Schema.Types.Number,
    min: 0,
    max: 10
  },
  People: { type: Schema.Types.ObjectId, ref: 'peoples' },
  idTheme: { type: Schema.Types.ObjectId, ref: 'datas' }
});