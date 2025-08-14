
import { User } from '../models/user.model';
import bcrypt from 'bcryptjs';
import type { User as IUser } from '@amberops/lib';
import mongoose from 'mongoose';

export const findAllUsers = async () => {
    return User.find({}).lean();
};

export const findUserById = async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }
    return User.findById(id).lean();
};

export const createUser = async (userData: any) => {
    if (userData.password) {
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);
    }
    if(userData.email && !userData.image) {
        userData.image = `https://avatar.vercel.sh/${userData.email}`;
    }
    const newUser = new User(userData);
    await newUser.save();
    return newUser.toJSON();
};

export const updateUser = async (id: string, userData: Partial<IUser>) => {
     if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }
    return User.findByIdAndUpdate(id, userData, { new: true }).lean();
};

export const deleteUser = async (id: string) => {
     if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }
    return User.findByIdAndDelete(id).lean();
};
