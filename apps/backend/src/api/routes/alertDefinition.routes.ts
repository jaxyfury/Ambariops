
import { createCrudRoutes } from '../crud.router';
import * as genericController from '../../controllers/generic.controller';
import { AlertDefinition } from '../../models/alertDefinition.model';

export default createCrudRoutes(
    'alert-definition',
    genericController.createGenericController(AlertDefinition, 'AlertDefinition')
);
