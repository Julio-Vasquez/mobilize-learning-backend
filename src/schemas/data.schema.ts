import { Schema } from 'mongoose';

export const DataSchema = new Schema({
  _id: { required: false, type: Schema.Types.ObjectId },
  alt: { required: true, type: Schema.Types.String },
  urlImg: {
    required: true,
    type: String,
    unique: true,
    minlength: 4,
    index: true
  },
  url: {
    required: true,
    type: String,
    unique: true,
    index: true,
  },
  title: {
    required: true,
    type: String,
    maxlength: 100,
  },
  description: {
    required: true,
    type: String,
    minlength: 20,
  },
  type: {
    required: true,
    type: String,
    enum: ['BehaviorsData', 'RoadSignalData'],
  },
  state: {
    required: true,
    type: String,
    enum: ['Activo', 'Inactivo'],
    default: 'Activo',
  },
});
