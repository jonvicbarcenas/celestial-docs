/* Importing The Package */
const express = require("express");
const { Hercai } = require('hercai');
const { promisify } = require("util");

const app = express();

const router = express.Router();

router.get("/", async (req, res) => {
  const { prompt } = req.query;

  if (!prompt) {
    res.status(400).json({ error: 'Please provide a valid "prompt" parameter.' });
    return;
  }

  const herc = new Hercai();

  /* Available Models */
  /* "v1" , "v2" , "v2-beta" , "v3" (DALL-E) , "lexica" , "prodia" */
  /* Default Model; "v2" */
  try {
    const response = await herc.drawImage({ model: "prodia", prompt: prompt });
    console.log(response.url);
    /* The module will reply based on the prompt! */
    res.status(200).json({ url: response.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
