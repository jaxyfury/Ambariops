
import mongoose, { Schema } from 'mongoose';
import type { Task as ITask } from '@amberops/lib';

const TaskSchema = new Schema<ITask>({}, { strict: false });

export const Task = mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);
