
import { Router } from 'express';
import type { IGenericController } from '../controllers/generic.controller';

export const createCrudRoutes = (modelName: string, controller: IGenericController) => {
    const router = Router();

    router.get('/', controller.getAll);
    router.get('/:id', controller.getById);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.delete);

    return router;
};
