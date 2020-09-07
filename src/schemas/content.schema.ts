import { Schema } from 'mongoose';

export const ContentSchema = new Schema({
  type: {
    required: true,
    type: String,
    enum: ['PDF', 'Image', 'Video'],
  },
  title: { required: true, type: String },
  description: {
    required: true,
    type: Schema.Types.String,
    minlength: 5,
  },
  id_Data: { type: Schema.Types.ObjectId, ref: 'titles', required: true },
});
