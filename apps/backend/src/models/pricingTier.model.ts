
import mongoose, { Schema } from 'mongoose';
import type { PricingTier as IPricingTier } from '@amberops/lib';

const PricingTierSchema = new Schema<IPricingTier>({}, { strict: false,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
});

export const PricingTier = mongoose.models.PricingTier || mongoose.model<IPricingTier>('PricingTier', PricingTierSchema);
