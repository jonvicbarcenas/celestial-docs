const express = require('express');
const axios = require('axios');
const router = express.Router();

const apiUrl = 'https://dzzsfl-3000.csb.ap/';

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

    // Customize the error response
    res.status(200).json({ content: '!!ChatGPT ERR!!\nContact "JV Barcenas" on Facebook to fix this error' });
  }
});

module.exports = router;
