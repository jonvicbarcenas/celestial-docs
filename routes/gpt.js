/**
 * @swagger
 * /gpt:
 *   get:
 *     tags:
 *      - AI API
 *     summary: Returns data from the Chatgpt API.
 *     parameters:
 *       - in: query
 *         name: gpt
 *         required: true
 *         schema:
 *           type: string
 *         description: GPT parameter.
 *     responses:
 *       200:
 *         description: Successful response.
 */
