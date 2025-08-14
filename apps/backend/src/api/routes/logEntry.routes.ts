
import { createCrudRoutes } from '../crud.router';
import * as genericController from '../../controllers/generic.controller';
import { LogEntry } from '../../models/logEntry.model';

export default createCrudRoutes(
    'log-entry',
    genericController.createGenericController(LogEntry, 'LogEntry')
);
