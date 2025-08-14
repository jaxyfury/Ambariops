
import { createCrudRoutes } from '../crud.router';
import * as genericController from '../../controllers/generic.controller';
import { ActivityLog } from '../../models/activityLog.model';

export default createCrudRoutes(
    'activity-log',
    genericController.createGenericController(ActivityLog, 'ActivityLog')
);
