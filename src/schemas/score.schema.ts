import { Schema } from 'mongoose';

export const ScoreSchema = new Schema({
  _id: { required: false, type: Schema.Types.ObjectId },
  key: { required: true, type: Schema.Types.Number },//incrementable de la persona,
  tag: {
    required: true,
    type: Schema.Types.String,
    enum: ['APROBADO', 'REPROBADO', 'ACEPTABLE']
  },
  cal: {
    required: true,
    type: Schema.Types.Number,
    min: 0,
    max: 10
  },
  idPeople: { type: Schema.Types.ObjectId, ref: 'peoples' },
  idTheme: { type: Schema.Types.ObjectId, ref: 'datas' }
});