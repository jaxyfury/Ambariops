
import { Router } from 'express';
import * as legalController from '../../controllers/legal.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Legal
 *   description: Legal document management (Terms of Service, Privacy Policy)
 */

/**
 * @swagger
 * /legal/{type}:
 *   get:
 *     summary: Get a legal document by type
 *     tags: [Legal]
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *           enum: [terms, privacy]
 *         required: true
 *         description: The type of the legal document
 *     responses:
 *       200:
 *         description: The requested legal document.
 */
router.get('/:type', legalController.getLegalDocument);

/**
 * @swagger
 * /legal/{type}:
 *   put:
 *     summary: Update a legal document by type
 *     tags: [Legal]
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *           enum: [terms, privacy]
 *         required: true
 *         description: The type of the legal document
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The new HTML content of the document.
 *     responses:
 *       200:
 *         description: The updated legal document.
 */
router.put('/:type', legalController.updateLegalDocument);

export default router;
