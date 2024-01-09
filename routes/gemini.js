/**
 * @swagger
 * /gemini:
 *   get:
 *     tags:
 *       - AI API
 *     summary: Chat with Gemini.
 *     parameters:
 *       - in: query
 *         name: gemini
 *         required: true
 *         schema:
 *           type: string
 *         description: Gemini parameter.
 *     responses:
 *       200:
 *         description: Successful response.
 *         content:
 *           application/json:
 *             example:
 *               content: "Hello! How can I help you today?\n"
 *       500:
 *         description: An error occurred.
 *         content:
 *           application/json:
 *             example:
 *               content: "An error occurred while processing the request."
 */
