
import { Router } from 'express';
import userRoutes from './routes/user.routes';
import clusterRoutes from './routes/cluster.routes';
import serviceRoutes from './routes/service.routes';
import hostRoutes from './routes/host.routes';
import alertRoutes from './routes/alert.routes';
import alertDefinitionRoutes from './routes/alertDefinition.routes';
import taskRoutes from './routes/task.routes';
import activityLogRoutes from './routes/activityLog.routes';
import logEntryRoutes from './routes/logEntry.routes';
import pricingTierRoutes from './routes/pricingTier.routes';
import testimonialRoutes from './routes/testimonial.routes';
import faqRoutes from './routes/faq.routes';
import documentationRoutes from './routes/documentation.routes';
import legalRoutes from './routes/legal.routes';
import searchRoutes from './routes/search.routes';


const router = Router();

router.use('/users', userRoutes);
router.use('/clusters', clusterRoutes);
router.use('/services', serviceRoutes);
router.use('/hosts', hostRoutes);
router.use('/alerts', alertRoutes);
router.use('/alert-definitions', alertDefinitionRoutes);
router.use('/tasks', taskRoutes);
router.use('/activity', activityLogRoutes);
router.use('/logs', logEntryRoutes);
router.use('/pricing', pricingTierRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/faqs', faqRoutes);
router.use('/documentation', documentationRoutes);
router.use('/legal', legalRoutes);
router.use('/search', searchRoutes);

export default router;
