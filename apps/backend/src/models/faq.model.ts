
import mongoose, { Schema } from 'mongoose';
import type { FAQ as IFAQ } from '@amberops/lib';

const FaqSchema = new Schema<IFAQ>({}, { strict: false,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
});

export const FAQ = mongoose.models.FAQ || mongoose.model<IFAQ>('FAQ', FaqSchema);
