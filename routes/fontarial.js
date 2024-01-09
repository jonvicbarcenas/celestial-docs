/**
 * @swagger
 * /arial:
 *   get:
 *     tags:
 *      - Font Generation
 *     summary: Turn your font into arial font.
 *     parameters:
 *       - in: query
 *         name: text
 *         required: true
 *         schema:
 *           type: string
 *         description: Font parameter.
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: ''  # Add your JSON schema reference here
 *             example:
 *               originalText: "what is life?"
 *               transformedText: "𝖂𝖍𝖆𝖙 𝖎𝖘 𝖑𝖎𝖋𝖊?"
 */
