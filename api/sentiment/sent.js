const express = require("express");
const { gpt } = require("gpti");

const app = express();
const router = express.Router();

router.get("/", async (req, res) => {
  const gptQuery = req.query.sentiment;

  if (!gptQuery) {
    res.status(400).json({ error: 'Please provide a valid "sentiment" parameter.' });
    return;
  }

  try {
    const result = await chatGpt(gptQuery);
    res.json({ content: result });
  } catch (error) {
    console.error(error);
    const errorMessage = 'An error occurred while processing the request.';
    console.error(errorMessage);
    res.status(500).json({ content: errorMessage });
  }
});

function chatGpt(gptQuery) {
  return new Promise((resolve, reject) => {
    gpt({
      prompt: `act as sentiment analysis and respond using 1 (one) emoji only of what the text/message feels: "${gptQuery}"`,
      model: "gpt-4",
      type: "json",
    }, (err, data) => {
      if (err != null) {
        reject(err);
      } else {
        resolve(data.gpt);
      }
    });
  });
}

module.exports = router;
