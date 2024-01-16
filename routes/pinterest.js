/**
 * @swagger
 * /pinterest:
 *   get:
 *     tags:
 *      - Imagen API
 *     summary: Get images from pinterest
 *     parameters:
 *       - in: query
 *         name: pinte
 *         required: true
 *         schema:
 *           type: string
 *         description: input prompts.
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 output:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - title: "Pikachu Graph Pattern - Etsy | Pikachu, Pikachu tattoo, Pikachu drawing"
 *                       image: "https://i.pinimg.com/originals/f9/f8/76/f9f876d2684bd05bae05c6fbfb399292.jpg"
 *                       url: "https://www.pinterest.com/pin/pikachu-graph-pattern-etsy--732820170630622203/"
 *                     - title: "Pikachu Png Transparent Image - Pikachu Png, Png Download is free transparent png image. To explore more similar hd image on PN… | Pikachu,  Pikachu drawing, Pokemon"
 *                       image: "https://i.pinimg.com/736x/bf/95/34/bf953419d76bf747cba69b55e6e03957.jpg"
 *                       url: "https://www.pinterest.com/pin/pikachu-png-transparent-image-pikachu-png-png-download-is-free-transparent-png-image-to-explore-more-similar-hd-image-on-p--843580573959850609/"
 */
