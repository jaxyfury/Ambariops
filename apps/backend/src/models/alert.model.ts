
import mongoose, { Schema } from 'mongoose';
import type { Alert as IAlert } from '@amberops/lib';

const AlertSchema = new Schema<IAlert>({}, { strict: false,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
});

export const Alert = mongoose.models.Alert || mongoose.model<IAlert>('Alert', AlertSchema);
