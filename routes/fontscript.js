/**
 * @swagger
 * /script:
 *   get:
 *     tags:
 *      - Font Generation
 *     summary: Turn your font into script.
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
 *               transformedText: "𝔀𝓱𝓪𝓽 𝓲𝓼 𝓵𝓲𝓯𝓮"
 */
