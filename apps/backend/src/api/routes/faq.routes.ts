
import { createCrudRoutes } from '../crud.router';
import * as genericController from '../../controllers/generic.controller';
import { FAQ } from '../../models/faq.model';

export default createCrudRoutes(
    'faq',
    genericController.createGenericController(FAQ, 'FAQ')
);
