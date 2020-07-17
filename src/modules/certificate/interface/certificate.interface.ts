import { Document } from 'mongoose';

export interface ICertificate extends Document {
  readonly _id: string;
  readonly generate: boolean;
  readonly urlCertificate: string;
  readonly urlPreview: string;
  readonly progress: number;
  readonly idUser: string;
}