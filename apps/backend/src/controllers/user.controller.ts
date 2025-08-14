
import { Request, Response } from 'express';
import * as userService from '../services/user.service';
import { handleServiceError } from '../utils/error-handler';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.findAllUsers();
        res.json(users);
    } catch (error) {
        handleServiceError(error, res);
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await userService.findUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        handleServiceError(error, res);
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        handleServiceError(error, res);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
         if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        handleServiceError(error, res);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.deleteUser(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully', id: req.params.id });
    } catch (error) {
        handleServiceError(error, res);
    }
};
