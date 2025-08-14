
import mongoose, { Schema } from 'mongoose';
import type { Host as IHost } from '@amberops/lib';

const HostSchema = new Schema<IHost>({}, { strict: false,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
});

export const Host = mongoose.models.Host || mongoose.model<IHost>('Host', HostSchema);
