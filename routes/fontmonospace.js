/**
 * @swagger
 * /monospace:
 *   get:
 *     tags:
 *      - Font Generation
 *     summary: Turn your font into monospace.
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
 *               transformedText: "𝚠𝚑𝚊𝚝 𝚒𝚜 𝚕𝚒𝚏𝚎?"
 */
