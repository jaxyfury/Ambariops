
import mongoose, { Schema } from 'mongoose';
import type { PricingTier as IPricingTier } from '@amberops/lib';

const PricingTierSchema = new Schema<IPricingTier>({}, { strict: false });

export const PricingTier = mongoose.models.PricingTier || mongoose.model<IPricingTier>('PricingTier', PricingTierSchema);
