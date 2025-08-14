
import mongoose, { Schema, Document } from 'mongoose';
import type { User as UserType } from '@amberops/lib';

// Define the interface for the Mongoose document, which may include methods and virtuals
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Password is included but often not selected
  role: 'Admin' | 'Operator' | 'Viewer';
  image?: string;
  lastLogin: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false }, // Hide password by default
  role: { type: String, enum: ['Admin', 'Operator', 'Viewer'], default: 'Viewer' },
  image: { type: String },
  lastLogin: { type: Date, default: Date.now },
}, { timestamps: true });

// When returning user data, ensure the password is not included.
UserSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model<IUser>('User', UserSchema);
