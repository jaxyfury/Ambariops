
import mongoose, { Schema } from 'mongoose';
import type { ActivityLog as IActivityLog } from '@amberops/lib';

const ActivityLogSchema = new Schema<IActivityLog>({}, { strict: false,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
});

export const ActivityLog = mongoose.models.ActivityLog || mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema);
