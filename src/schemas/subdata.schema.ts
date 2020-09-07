import { Schema } from 'mongoose';

export const SubdataSchema = new Schema({
  _id: { required: false, type: Schema.Types.ObjectId },
  title: {
    required: true,
    type: Schema.Types.String,
    index: true,
    unique: true
  },
  urlImg: {
    required: true,
    type: Schema.Types.String,
    unique: true,
    minlength: 4,
    index: true
  },
  url: {
    required: true,
    type: Schema.Types.String,
    unique: true,
    index: true,
  },
  description: {
    required: true,
    type: Schema.Types.String,
    minlength: 5,
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
  id_Data: {
    type: Schema.Types.ObjectId,
    ref: 'datas',
    required: true
  },
});
