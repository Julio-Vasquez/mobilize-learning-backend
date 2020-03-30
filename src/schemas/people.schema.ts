import { Schema, Types } from 'mongoose';

export const PeopleSchema = new Schema({
  id: {
    required: false,
    type: Types.ObjectId,
  },
  identification: Number,
  name: { required: true, type: String },
  lastName: String,
  gender: {
    required: true,
    type: String,
    enum: ['Masculino', 'Femenino', 'Otro'],
  },
  birthDate: String,
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
  },
});
