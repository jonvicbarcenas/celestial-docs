/**
 * @swagger
 * /illusion:
 *   get:
 *     tags:
 *      - Imagen API
 *     summary: Generate Images with illusion
 *     parameters:
 *       - in: query
 *         name: image
 *         required: true
 *         schema:
 *           type: string
 *         description: input image url.
 *       - in: query
 *         name: prompt
 *         required: false
 *         schema:
 *           type: string
 *         description: input prompts.
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 output:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     -"https://replicate.delivery/pbxt/ofR5N6KDfFhXfINOTuwgjxSY78uGKaYTz9rKUeuqIpjOOlAIB/output-0.png"
 */
