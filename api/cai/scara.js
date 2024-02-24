const express = require('express');
const axios = require('axios');
const router = express.Router();

const apiUrl = 'https://cai-jesus.onrender.com/?chat=';

router.get('/', async (req, res) => {
  try {
    const userPrompt = req.query.chat;

    const response = await axios.get(`${apiUrl}${userPrompt}`);
    const text = response.data.text;
    
    //res.json({ name, text });
    res.json({ text });
  } catch (error) {
    console.error('Error fetching data:', error);

    res.status(200).json({ text: '!!ERR!!\nContact "JV Barcenas" on Facebook to fix this error' });
  }
});

module.exports = router;
