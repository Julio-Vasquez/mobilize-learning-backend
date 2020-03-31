import { Schema, Types } from 'mongoose';

export const UserSchema = new Schema({
  _id: { required: false, type: Types.ObjectId, unique: true },
  userName: { required: true, type: String, maxlength: 45 },
  password: { required: true, type: String },
  avatar: { required: true, type: String },
  email: { required: true, type: String },
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
  people: { type: Types.ObjectId, ref: 'People' },
});
