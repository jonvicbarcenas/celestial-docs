/**
 * @swagger
 * /prompter:
 *   get:
 *     tags:
 *      - AI API
 *     summary: Auto complete a prompt for you.
 *     parameters:
 *       - in: query
 *         name: prompt
 *         required: true
 *         schema:
 *           type: string
 *         description: parameter.
 *     responses:
 *       200:
 *         description: Successful response.
 *         content:
 *           application/json:
 *             example:
 *               generated_text: "medieval city skyline made of multiple concentric circles with the central square in the center of the circle, symmetrical, unreal engine,8k, high quality, photobash --uplight"
 */
