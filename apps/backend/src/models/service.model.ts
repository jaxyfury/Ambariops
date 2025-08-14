
import mongoose, { Schema } from 'mongoose';
import type { Service as IService } from '@amberops/lib';

const ServiceSchema = new Schema<IService>({}, { strict: false });

export const Service = mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
