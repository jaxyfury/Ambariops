
import mongoose, { Schema, Document } from 'mongoose';
import type { User as IUserType } from '@amberops/lib';

// Extend the shared User type for Mongoose
export interface IUser extends IUserType, Document {}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Operator', 'Viewer'], default: 'Viewer' },
  image: { type: String },
  lastLogin: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
