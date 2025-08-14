
import { Router } from 'express';
import * as legalController from '../../controllers/legal.controller';

const router = Router();

router.get('/:type', legalController.getLegalDocument);
router.put('/:type', legalController.updateLegalDocument);

export default router;
