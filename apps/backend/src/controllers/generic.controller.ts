
import { Request, Response } from 'express';
import * as genericService from '../services/generic.service';
import type { Model } from 'mongoose';
import { handleServiceError } from '../utils/error-handler';

export interface IGenericController {
    getAll(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void | Response>;
    create(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void | Response>;
    delete(req: Request, res: Response): Promise<void | Response>;
}

export const createGenericController = (model: Model<any>, modelName: string): IGenericController => {

    const getAll = async (req: Request, res: Response) => {
        try {
            const items = await genericService.findAll(model);
            res.json(items);
        } catch (error) {
            handleServiceError(error, res, `Failed to fetch ${modelName}s`);
        }
    };

    const getById = async (req: Request, res: Response) => {
        try {
            const item = await genericService.findById(model, req.params.id);
            if (!item) {
                return res.status(404).json({ message: `${modelName} not found` });
            }
            res.json(item);
        } catch (error) {
            handleServiceError(error, res, `Failed to fetch ${modelName}`);
        }
    };

    const create = async (req: Request, res: Response) => {
        try {
            const newItem = await genericService.create(model, req.body);
            res.status(201).json(newItem);
        } catch (error: any) {
            if (error.code === 11000) {
                 return res.status(409).json({ message: `${modelName} with this identifier already exists.` });
            }
            handleServiceError(error, res, `Failed to create ${modelName}`);
        }
    };

    const update = async (req: Request, res: Response) => {
        try {
            const updatedItem = await genericService.update(model, req.params.id, req.body);
            if (!updatedItem) {
                return res.status(404).json({ message: `${modelName} not found` });
            }
            res.json(updatedItem);
        } catch (error) {
            handleServiceError(error, res, `Failed to update ${modelName}`);
        }
    };

    const deleteFn = async (req: Request, res: Response) => {
        try {
            const deletedItem = await genericService.deleteById(model, req.params.id);
            if (!deletedItem) {
                return res.status(404).json({ message: `${modelName} not found` });
            }
            res.json({ message: `${modelName} deleted successfully`, id: req.params.id });
        } catch (error) {
            handleServiceError(error, res, `Failed to delete ${modelName}`);
        }
    };
    
    return {
        getAll,
        getById,
        create,
        update,
        delete: deleteFn,
    };
};
