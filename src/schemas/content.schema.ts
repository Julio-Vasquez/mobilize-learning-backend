import { Schema } from 'mongoose';

export const ContentSchema = new Schema({
  _id: { required: false, type: Schema.Types.ObjectId },
  type: {
    required: true,
    type: Schema.Types.String,
    enum: ['PDF', 'Image', 'Video'],
  },
  title: {
    required: true,
    type: String,
    index: true
  },
  description: {
    required: true,
    type: Schema.Types.String,
    minlength: 5,
  },
  state: {
    required: true,
    type: String,
    enum: ['Activo', 'Inactivo'],
    default: 'Activo',
  },
  id_Data: { type: Schema.Types.ObjectId, ref: 'titles', required: true },
});
