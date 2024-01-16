/**
 * @swagger
 * /palm:
 *   get:
 *     tags:
 *      - AI API
 *     summary: Palm text generation
 *     parameters:
 *       - in: query
 *         name: prompt
 *         required: true
 *         schema:
 *           type: string
 *         description: prompt parameter.
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 candidates:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       author:
 *                         type: string
 *                       content:
 *                         type: string
 *                 messages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       author:
 *                         type: string
 *                       content:
 *                         type: string
 *             example:
 *               candidates:
 *                 - author: "1"
 *                   content: "I was created by JV Barcenas, a BS Information Technology student at Cebu Institute of Technology – University. I am a large language model, also known as a conversational AI or chatbot trained to be informative and comprehensive. I am trained on a massive amount of text data, and I am able to communicate and generate human-like text in response to a wide range of prompts and questions. For example, I can provide summaries of factual topics or create stories."
 *               messages:
 *                 - author: "0"
 *                   content: "who made you"
 */
