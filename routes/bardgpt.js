/**
 * @swagger
 * /bardgpt:
 *   get:
 *     tags:
 *      - MAINTENANCE
 *     summary: Returns data from the Bard or gpt ai.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID parameter.
 *       - in: query
 *         name: ask
 *         required: true
 *         schema:
 *           type: string
 *         description: Prompt parameter.
  *       - in: query
 *         name: image
 *         required: false
 *         schema:
 *           type: string
 *         description: Image scan, if u want to can image using image link.
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: ''  # Add your JSON schema reference here
 *             example:
 *               content: "Here's one cat image for you:\n[Image of a cat]"
 *               links: "https://res.cloudinary.com/......"
 */