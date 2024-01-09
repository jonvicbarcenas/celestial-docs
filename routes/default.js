const express = require('express');
const router = express.Router();

/*
 * @swagger
 * /:
 *   get:
 *     summary: Returns a simple "Hello World!" message.
 *     responses:
 *       200:
 *         description: Successful response.
 */
router.get('/', (req, res) => {
  res.send('Hello World!');
});