
import { Router } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as Models from '../models/models';

const router = Router();

// Generic CRUD factory
const createCrudRoutes = (model: mongoose.Model<any>, modelName: string) => {
    const crudRouter = Router();

    // Get all
    crudRouter.get('/', async (req, res) => {
        try {
            const items = await model.find({});
            res.json(items.map(item => ({...item.toObject(), id: item._id})));
        } catch (error: any) {
            res.status(500).json({ message: `Failed to fetch ${modelName}s`, error: error.message });
        }
    });

    // Get one
    crudRouter.get('/:id', async (req, res) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return res.status(400).json({ message: `Invalid ${modelName} ID` });
            }
            const item = await model.findById(req.params.id);
            if (!item) {
                return res.status(404).json({ message: `${modelName} not found` });
            }
            res.json({...item.toObject(), id: item._id});
        } catch (error: any) {
            res.status(500).json({ message: `Failed to fetch ${modelName}`, error: error.message });
        }
    });

    // Create
    crudRouter.post('/', async (req, res) => {
        try {
            // Special handling for user creation (password hashing)
            if (modelName === 'user' && req.body.password) {
                 const salt = await bcrypt.genSalt(10);
                 req.body.password = await bcrypt.hash(req.body.password, salt);
                 req.body.image = `https://avatar.vercel.sh/${req.body.email}`;
            }
            const newItem = new model(req.body);
            await newItem.save();
            res.status(201).json({...newItem.toObject(), id: newItem._id});
        } catch (error: any) {
             if (error.code === 11000) { // Handle duplicate key errors
                return res.status(409).json({ message: `${modelName} with this identifier already exists.` });
            }
            res.status(400).json({ message: `Failed to create ${modelName}`, error: error.message });
        }
    });

    // Update
    crudRouter.put('/:id', async (req, res) => {
        try {
             if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return res.status(400).json({ message: `Invalid ${modelName} ID` });
            }
            const updatedItem = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedItem) {
                return res.status(404).json({ message: `${modelName} not found` });
            }
            res.json({...updatedItem.toObject(), id: updatedItem._id});
        } catch (error: any) {
            res.status(400).json({ message: `Failed to update ${modelName}`, error: error.message });
        }
    });

    // Delete
    crudRouter.delete('/:id', async (req, res) => {
        try {
             if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return res.status(400).json({ message: `Invalid ${modelName} ID` });
            }
            const deletedItem = await model.findByIdAndDelete(req.params.id);
            if (!deletedItem) {
                return res.status(404).json({ message: `${modelName} not found` });
            }
            res.json({ message: `${modelName} deleted successfully`, id: req.params.id });
        } catch (error: any) {
            res.status(500).json({ message: `Failed to delete ${modelName}`, error: error.message });
        }
    });

    return crudRouter;
};

// Define CRUD routes for each model
router.use('/users', createCrudRoutes(Models.User, 'user'));
router.use('/clusters', createCrudRoutes(Models.Cluster, 'cluster'));
router.use('/services', createCrudRoutes(Models.Service, 'service'));
router.use('/hosts', createCrudRoutes(Models.Host, 'host'));
router.use('/alerts', createCrudRoutes(Models.Alert, 'alert'));
router.use('/alert-definitions', createCrudRoutes(Models.AlertDefinition, 'alert-definition'));
router.use('/tasks', createCrudRoutes(Models.Task, 'task'));
router.use('/activity', createCrudRoutes(Models.ActivityLog, 'activity-log'));
router.use('/logs', createCrudRoutes(Models.LogEntry, 'log-entry'));
router.use('/pricing', createCrudRoutes(Models.PricingTier, 'pricing-tier'));
router.use('/testimonials', createCrudRoutes(Models.Testimonial, 'testimonial'));
router.use('/faqs', createCrudRoutes(Models.FAQ, 'faq'));

// Special routes for Documentation (slug-based) and Legal
router.use('/documentation', (() => {
    const docRouter = Router();
    docRouter.get('/', async (req, res) => {
        try {
            const items = await Models.Documentation.find({});
            res.json(items.map(item => ({...item.toObject(), id: item._id})));
        } catch (e) { res.status(500).send(e); }
    });
    docRouter.post('/', async (req, res) => {
        try {
            const newItem = new Models.Documentation(req.body);
            await newItem.save();
            res.status(201).json({...newItem.toObject(), id: newItem._id});
        } catch (e: any) { 
             if (e.code === 11000) {
                return res.status(409).json({ message: 'Article with this slug already exists' });
            }
            res.status(400).send(e); 
        }
    });
     docRouter.put('/:slug', async (req, res) => {
        try {
            const item = await Models.Documentation.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true });
            if (!item) return res.status(404).send('Not found');
            res.json({...item.toObject(), id: item._id});
        } catch (e) { res.status(500).send(e); }
    });
    docRouter.delete('/:slug', async (req, res) => {
        try {
            const item = await Models.Documentation.findOneAndDelete({ slug: req.params.slug });
            if (!item) return res.status(404).send('Not found');
            res.json({ message: 'Document deleted successfully' });
        } catch (e) { res.status(500).send(e); }
    });
    return docRouter;
})());

router.use('/legal', (() => {
    const legalRouter = Router();
    legalRouter.get('/:type', async (req, res) => {
        try {
            const doc = await Models.Legal.findOne({ type: req.params.type });
            if (!doc) return res.status(404).send('Not found');
            res.json(doc);
        } catch (e) { res.status(500).send(e); }
    });
     legalRouter.put('/:type', async (req, res) => {
        try {
            const doc = await Models.Legal.findOneAndUpdate({ type: req.params.type }, req.body, { new: true, upsert: true });
            res.json(doc);
        } catch (e) { res.status(500).send(e); }
    });
    return legalRouter;
})());


// Search Route
router.get('/search', async (req, res) => {
    const q = req.query.q as string;
    if (!q) {
        return res.status(400).json({ message: 'Query parameter "q" is required' });
    }
    try {
        const regex = new RegExp(q, 'i');
        const [clusters, services, hosts] = await Promise.all([
            Models.Cluster.find({ name: regex }).limit(5).lean(),
            Models.Service.find({ name: regex }).limit(5).lean(),
            Models.Host.find({ name: regex }).limit(5).lean(),
        ]);
        const formatId = (item: any) => ({...item, id: item._id.toString() });
        res.json({
            clusters: clusters.map(formatId),
            services: services.map(formatId),
            hosts: hosts.map(formatId),
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Search failed', error: error.message });
    }
});


export default router;
