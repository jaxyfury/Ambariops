
import mongoose, { Schema } from 'mongoose';
import type { ActivityLog as IActivityLog } from '@amberops/lib';

const ActivityLogSchema = new Schema<IActivityLog>({}, { strict: false });

export const ActivityLog = mongoose.models.ActivityLog || mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema);
