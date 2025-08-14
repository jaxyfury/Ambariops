
import { Response } from 'express';

export const handleServiceError = (error: any, res: Response, message = 'An unexpected error occurred') => {
    console.error(error);
    if (error instanceof Error) {
        res.status(500).json({ message: message, error: error.message });
    } else {
        res.status(500).json({ message: message, error: String(error) });
    }
};
