const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /imagenv3:
 *   get:
 *     tags:
 *      - Imagen API
 *     summary: GENerate images v3
 *     parameters:
 *       - in: query
 *         name: prompt
 *         required: true
 *         schema:
 *           type: string
 *         description: generate params.
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: ''  # Add your JSON schema reference here
 *             example:
 *               url: "https://oaidalleapiprodscus.blob.core.windows.net/........"
 */
router.get('/imagenv3', (req, res) => {
  const prompt = req.query.gpt;
  res.json({ prompt });
});

//prodia

/**
 * @swagger
 * /prodia:
 *   get:
 *     tags:
 *      - Imagen API
 *     summary: Generate Images using prodia
 *     parameters:
 *       - in: query
 *         name: prompt
 *         required: true
 *         schema:
 *           type: string
 *         description: generate params.
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: ''  # Add your JSON schema reference here
 *             example:
 *               url: "https://images.prodia.xyz/cfbc8cbb-6dfe-44b5-96f3-d5dc6359b493.png"
 */
router.get('/prodia', (req, res) => {
  const prompt = req.query.gpt;
  res.json({ prompt });
});

module.exports = router;
