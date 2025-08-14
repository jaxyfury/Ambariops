
import { User } from '../models/user.model';
import bcrypt from 'bcryptjs';
import type { IUser } from '@amberops/lib';
import mongoose from 'mongoose';

const toUserResponse = (user: any): IUser => {
    const userObject = user.toObject();
    return {
        ...userObject,
        id: userObject._id.toString(),
    };
};


export const findAllUsers = async () => {
    const users = await User.find({});
    return users.map(toUserResponse);
};

export const findUserById = async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }
    const user = await User.findById(id);
    return user ? toUserResponse(user) : null;
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
    return toUserResponse(newUser);
};

export const updateUser = async (id: string, userData: Partial<IUser>) => {
     if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }
    const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
    return updatedUser ? toUserResponse(updatedUser) : null;
};

export const deleteUser = async (id: string) => {
     if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }
    return User.findByIdAndDelete(id);
};
