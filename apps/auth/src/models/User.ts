
import mongoose, { Schema, Document } from 'mongoose';

// Note: This model should be kept in sync with the structure
// used by the seed script and the NextAuth implementation.

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: 'Admin' | 'Operator' | 'Viewer';
  image: string;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Operator', 'Viewer'], default: 'Viewer' },
  image: { type: String },
  lastLogin: { type: Date, default: () => new Date() },
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
