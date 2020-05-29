import { Schema } from 'mongoose';

export const DataSchema = new Schema({
  _id: { required: false, type: Schema.Types.ObjectId },
  alt: { required: true, type: Schema.Types.String },
  urlImg: {
    required: true,
    type: Schema.Types.String,
  },
  url: {
    required: true,
    type: Schema.Types.String,
    unique: true,
    index: true,
  },
  title: {
    required: true,
    type: Schema.Types.String,
    maxlength: 100,
  },
  description: {
    required: true,
    type: Schema.Types.String,
    minlength: 20,
  },
  type: {
    required: true,
    type: Schema.Types.String,
    enum: ['BehaviorsData', 'RoadSignalData'],
  },
  state: {
    required: true,
    type: Schema.Types.String,
    enum: ['Activo', 'Inactivo'],
    default: 'Activo',
  },
});
