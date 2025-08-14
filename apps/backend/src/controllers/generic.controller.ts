
import { Request, Response, NextFunction } from 'express';
import * as genericService from '../services/generic.service';
import type { Model } from 'mongoose';

export interface IGenericController {
    getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
    getById(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    create(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    update(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
    delete(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
}

export const createGenericController = (model: Model<any>, modelName: string): IGenericController => {

    const getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const items = await genericService.findAll(model);
            res.json(items);
        } catch (error) {
            next(error);
        }
    };

    const getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const item = await genericService.findById(model, req.params.id);
            if (!item) {
                return res.status(404).json({ message: `${modelName} not found` });
            }
            res.json(item);
        } catch (error) {
            next(error);
        }
    };

    const create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newItem = await genericService.create(model, req.body);
            res.status(201).json(newItem);
        } catch (error: any) {
            if (error.code === 11000) {
                 return res.status(409).json({ message: `${modelName} with this identifier already exists.` });
            }
            next(error);
        }
    };

    const update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updatedItem = await genericService.update(model, req.params.id, req.body);
            if (!updatedItem) {
                return res.status(404).json({ message: `${modelName} not found` });
            }
            res.json(updatedItem);
        } catch (error) {
            next(error);
        }
    };

    const deleteFn = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deletedItem = await genericService.deleteById(model, req.params.id);
            if (!deletedItem) {
                return res.status(404).json({ message: `${modelName} not found` });
            }
            res.status(204).send();
        } catch (error) {
            next(error);
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
