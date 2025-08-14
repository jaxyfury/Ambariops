
import mongoose, { Schema } from 'mongoose';
import type { Alert as IAlert } from '@amberops/lib';

const AlertSchema = new Schema<IAlert>({}, { strict: false });

export const Alert = mongoose.models.Alert || mongoose.model<IAlert>('Alert', AlertSchema);
