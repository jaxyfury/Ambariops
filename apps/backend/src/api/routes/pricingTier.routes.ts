
import { createCrudRoutes } from '../crud.router';
import * as genericController from '../../controllers/generic.controller';
import { PricingTier } from '../../models/pricingTier.model';

export default createCrudRoutes(
    'pricingtiers',
    genericController.createGenericController(PricingTier, 'PricingTier')
);
