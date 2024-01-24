/**
 * @swagger
 * /scara:
 *   get:
 *     tags:
 *      - AI API
 *     summary: A Mean AI.
 *     parameters:
 *       - in: query
 *         name: chat
 *         required: true
 *         schema:
 *           type: string
 *         description: CHAT parameter.
 *     responses:
 *       200:
 *         description: Successful response.
 *         content:
 *           application/json:
 *             example:
 *               text: "I'm about to lose my patience. Stop this at once!"
 */
