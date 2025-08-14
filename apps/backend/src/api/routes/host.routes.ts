
import { createCrudRoutes } from '../crud.router';
import * as genericController from '../../controllers/generic.controller';
import { Host } from '../../models/host.model';

export default createCrudRoutes(
    'host',
    genericController.createGenericController(Host, 'Host')
);
