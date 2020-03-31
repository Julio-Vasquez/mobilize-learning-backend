import { Schema, Types } from 'mongoose';

export const UserSchema = new Schema({
  id: { required: true, type: Types.ObjectId, unique: true },
  userName: { required: true, type: String, maxlength: 45 },
  password: { required: true, type: String },
  avatar: { required: true, type: String },
  email: { required: true, type: String },
  state: {
    required: true,
    type: String,
    enum: ['Activo', 'Inactivo'],
  },
  people: { type: Types.ObjectId, ref: 'People' },
});
