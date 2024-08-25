/**
 * @swagger
 * /gem:
 *   get:
 *     tags:
 *       - AI API
 *     summary: Chat with Gemini.
 *     parameters:
 *       - in: query
 *         name: chat
 *         required: true
 *         schema:
 *           type: string
 *         description: Chat parameter.
 *       - in: query
 *         name: id
 *         required: true
 *         schema:  
 *           type: string
 *         description: ID parameter.
 * 
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
