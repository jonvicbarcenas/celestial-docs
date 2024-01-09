const express = require('express');
const { HfInference } = require('@huggingface/inference');

const router = express.Router();

const hf = new HfInference('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');

// Middleware function to log incoming requests
router.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

router.get('/', async (req, res) => {
  const prompt = req.query.prompt;

  if (!prompt) {
    return res.send('Prompt is required.');
  }

  try {
    const result = await hf.textGeneration({
      model: 'succinctly/text2image-prompt-generator',
      inputs: prompt,
    });

    // Assuming 'result' contains the content you want to output
    res.json(result);
  } catch (error) {
    res.status(500).send('Error processing the request');
  }
});

module.exports = router;
