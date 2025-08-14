
import mongoose, { Schema } from 'mongoose';
import type { Service as IService } from '@amberops/lib';

const ServiceSchema = new Schema<IService>({}, { strict: false,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
});

export const Service = mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
