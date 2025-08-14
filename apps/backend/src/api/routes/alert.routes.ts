
import { createCrudRoutes } from '../crud.router';
import * as genericController from '../../controllers/generic.controller';
import { Alert } from '../../models/alert.model';

export default createCrudRoutes(
    'alert',
    genericController.createGenericController(Alert, 'Alert')
);
