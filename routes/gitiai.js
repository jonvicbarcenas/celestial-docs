const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /gitiai:
 *   get:
 *     tags:
 *      - AI API
 *     summary: BISAYA (cebuano) version of chatgpt.
 *     parameters:
 *       - in: query
 *         name: ask
 *         required: true
 *         schema:
 *           type: string
 *         description: GPT parameter.
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: ''  # Add your JSON schema reference here
 *             example:
 *               content: "Kumusta! Unsa inyong pangalan? \n\n"
 */
router.get('/gitiai', (req, res) => {
  const prompt = req.query.gpt;
  res.json({ prompt });
});

module.exports = router;
