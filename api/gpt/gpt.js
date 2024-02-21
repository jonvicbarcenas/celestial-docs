const express = require('express');
const axios = require('axios');
const router = express.Router();

const apiUrl = 'https://dzzsfl-3000.csb.app/';

router.get('/', async (req, res) => {
  try {
    const userPrompt = req.query.gpt;

    const response = await axios.get(`${apiUrl}?gpt=${userPrompt}`);

    const content = response.data.content;

    res.json({ content });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(200).json({ content: '!!ChatGPT ERR!!\nContact "JV Barcenas" on Facebook to fix this error' });
  }
});

module.exports = router;
