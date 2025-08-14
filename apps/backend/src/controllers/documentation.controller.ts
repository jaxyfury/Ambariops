
import { Request, Response } from 'express';
import * as documentationService from '../services/documentation.service';
import { handleServiceError } from '../utils/error-handler';

export const getAllArticles = async (req: Request, res: Response) => {
    try {
        const articles = await documentationService.findAllArticles();
        res.json(articles);
    } catch (error) {
        handleServiceError(error, res);
    }
};

export const createArticle = async (req: Request, res: Response) => {
    try {
        const newArticle = await documentationService.createArticle(req.body);
        res.status(201).json(newArticle);
    } catch (error) {
         handleServiceError(error, res);
    }
};

export const updateArticle = async (req: Request, res: Response) => {
    try {
        const updatedArticle = await documentationService.updateArticle(req.params.slug, req.body);
        if (!updatedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json(updatedArticle);
    } catch (error) {
        handleServiceError(error, res);
    }
};

export const deleteArticle = async (req: Request, res: Response) => {
    try {
        const result = await documentationService.deleteArticle(req.params.slug);
        if (!result) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json({ message: 'Document deleted successfully' });
    } catch (error) {
        handleServiceError(error, res);
    }
};
