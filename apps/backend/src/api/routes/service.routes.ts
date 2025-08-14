
import { createCrudRoutes } from '../crud.router';
import * as genericController from '../../controllers/generic.controller';
import { Service } from '../../models/service.model';

export default createCrudRoutes(
    'service',
    genericController.createGenericController(Service, 'Service')
);
