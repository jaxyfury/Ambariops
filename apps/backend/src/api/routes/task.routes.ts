
import { createCrudRoutes } from '../crud.router';
import * as genericController from '../../controllers/generic.controller';
import { Task } from '../../models/task.model';

export default createCrudRoutes(
    'task',
    genericController.createGenericController(Task, 'Task')
);
