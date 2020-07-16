import { Schema } from 'mongoose';

export const PeopleSchema = new Schema({
  _id: { required: false, type: Schema.Types.ObjectId },
  identification: {
    required: true,
    type: Number,
    unique: true,
    index: true
  },
  name: {
    required: true,
    type: String,
    minlength: 3,
    maxlength: 45
  },
  lastName: {
    required: true,
    type: String,
    minlength: 3,
    maxlength: 45
  },
  gender: {
    required: true,
    type: String,
    enum: ['Masculino', 'Femenino', 'Otro'],
  },
  birthDate: { required: true, type: String },
  typeDoc: {
    required: true,
    type: String,
    enum: [
      'Cédula de Ciudadanía',
      'Tarjeta de Identidad',
      'Cédula de Extranjería',
      'Pasaporte',
    ],
  },
  state: {
    required: true,
    type: String,
    enum: ['Activo', 'Inactivo'],
    default: 'Activo',
  },
});
