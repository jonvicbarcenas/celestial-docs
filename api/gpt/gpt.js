const express = require('express');
const axios = require('axios');
const router = express.Router();

const apiUrl = 'https://chatgayfeyti.archashura.repl.co/';


router.get('/', async (req, res) => {
  try {
    // Assuming userPrompt is a query parameter in the request
    const userPrompt = req.query.gpt;

    // Fetch data from the specified API
    const response = await axios.get(`${apiUrl}?gpt=${userPrompt}`);

    // Extract content from the API response
    const content = response.data.content;

    // Send the content as a response
    res.json({ content });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
