
import { Request, Response } from 'express';
import * as searchService from '../services/search.service';
import { handleServiceError } from '../utils/error-handler';

export const search = async (req: Request, res: Response) => {
    const q = req.query.q as string;
    if (!q) {
        return res.status(400).json({ message: 'Query parameter "q" is required' });
    }
    try {
        const results = await searchService.performSearch(q);
        res.json(results);
    } catch (error) {
        handleServiceError(error, res, 'Search failed');
    }
};
