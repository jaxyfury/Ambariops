
import { createCrudRoutes } from '../crud.router';
import * as genericController from '../../controllers/generic.controller';
import { Cluster } from '../../models/cluster.model';

export default createCrudRoutes(
    'cluster',
    genericController.createGenericController(Cluster, 'Cluster')
);
