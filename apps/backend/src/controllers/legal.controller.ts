
import { Request, Response } from 'express';
import * as legalService from '../services/legal.service';
import { handleServiceError } from '../utils/error-handler';

export const getLegalDocument = async (req: Request, res: Response) => {
    try {
        const doc = await legalService.findLegalDocument(req.params.type as 'terms' | 'privacy');
        if (!doc) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.json(doc);
    } catch (error) {
        handleServiceError(error, res);
    }
};

export const updateLegalDocument = async (req: Request, res: Response) => {
    try {
        const doc = await legalService.updateLegalDocument(req.params.type as 'terms' | 'privacy', req.body);
        res.json(doc);
    } catch (error) {
        handleServiceError(error, res);
    }
};
