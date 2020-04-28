import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  _id: { required: false, type: Schema.Types.ObjectId },
  userName: {
    required: true,
    type: String,
    maxlength: 45,
    unique: true,
    index: true,
  },
  password: { required: true, type: String },
  avatar: { required: true, type: String },
  email: { required: true, type: String, unique: true, index: true },
  code: { required: true, type: String },
  role: {
    required: true,
    type: String,
    enum: ['Administrador', 'Estudiante'],
  },
  state: {
    required: true,
    type: String,
    enum: ['Activo', 'Inactivo'],
    default: 'Activo',
  },
  people: { type: Schema.Types.ObjectId, ref: 'People' },
});
