
import mongoose, { Schema } from 'mongoose';
import type { User as IUser } from '@amberops/lib';

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Operator', 'Viewer'], default: 'Viewer' },
  image: { type: String },
  lastLogin: { type: Date, default: Date.now },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
