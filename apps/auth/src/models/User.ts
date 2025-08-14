import mongoose, { Schema, Document } from 'mongoose';
import type { User as IUserType } from '@amberops/lib';

// Extend the shared User type for Mongoose, but omit the 'id' to avoid conflict with Mongoose's Document 'id'
export interface IUser extends Omit<IUserType, 'id'>, Document {
  password?: string; // Ensure password is part of the interface
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false }, // Hide password by default
  role: { type: String, enum: ['Admin', 'Operator', 'Viewer'], default: 'Viewer' },
  image: { type: String },
  lastLogin: { type: Date, default: Date.now },
}, { timestamps: true });

// When returning user data, ensure the password is not included unless explicitly requested.
UserSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model<IUser>('User', UserSchema);
