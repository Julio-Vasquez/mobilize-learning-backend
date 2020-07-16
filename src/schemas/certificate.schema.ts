import { Schema } from 'mongoose';

export const CertificateSchema = new Schema({
  _id: { required: true, type: Schema.Types.ObjectId },
  generate: { required: true, type: Boolean },
  urlCertificate: {
    required: false,
    type: String,
    index: true,
    unique: true,
    minlength: 4
  },
  progress: {
    required: true,
    type: Number,
    min: 0,
    max: 100
  },
  idUser: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
    unique: true
  },
});