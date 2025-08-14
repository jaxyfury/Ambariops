
import { createCrudRoutes } from '../crud.router';
import * as genericController from '../../controllers/generic.controller';
import { Testimonial } from '../../models/testimonial.model';

export default createCrudRoutes(
    'testimonial',
    genericController.createGenericController(Testimonial, 'Testimonial')
);
