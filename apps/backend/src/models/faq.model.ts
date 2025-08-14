
import mongoose, { Schema } from 'mongoose';
import type { FAQ as IFAQ } from '@amberops/lib';

const FaqSchema = new Schema<IFAQ>({}, { strict: false });

export const FAQ = mongoose.models.FAQ || mongoose.model<IFAQ>('FAQ', FaqSchema);
