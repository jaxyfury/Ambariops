
import mongoose, { Schema } from 'mongoose';
import type { Task as ITask } from '@amberops/lib';

const TaskSchema = new Schema<ITask>({}, { strict: false,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
});

export const Task = mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);
