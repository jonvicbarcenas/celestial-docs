/**
 * @swagger
 * /sentiment:
 *   get:
 *     tags:
 *      - AI API
 *     summary: Sentiment your message with emoji.
 *     parameters:
 *       - in: query
 *         name: iyot
 *         required: true
 *         schema:
 *           type: string
 *         description: sentiment parameter.
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: ''  # Add your JSON schema reference here
 *             example:
 *               content: "😊"
 */
