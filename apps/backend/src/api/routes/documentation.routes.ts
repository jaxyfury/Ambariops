
import { Router } from 'express';
import * as documentationController from '../../controllers/documentation.controller';

const router = Router();

router.get('/', documentationController.getAllArticles);
router.post('/', documentationController.createArticle);
router.put('/:slug', documentationController.updateArticle);
router.delete('/:slug', documentationController.deleteArticle);

export default router;
