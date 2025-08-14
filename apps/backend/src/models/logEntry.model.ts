
import mongoose, { Schema } from 'mongoose';
import type { LogEntry as ILogEntry } from '@amberops/lib';

const LogEntrySchema = new Schema<ILogEntry>({}, { strict: false,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
});

export const LogEntry = mongoose.models.LogEntry || mongoose.model<ILogEntry>('LogEntry', LogEntrySchema);
