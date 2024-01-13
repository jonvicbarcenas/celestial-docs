const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const fallbackToSecondApi = true;


const router = express.Router();

// Apply CORS to the router
router.use(cors());

router.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  console.log('Query Parameters:', req.query);
  next();
});

router.get('/', async (req, res) => {
  try {
    const { id, ask, image } = req.query;
    let url = `https://celestial-3ode.onrender.com/bard?id=${id}&ask=${encodeURIComponent(ask)}`;

    if (image) {
      url += `&image=${encodeURIComponent(image)}`;
    }

    let response;
    try {
      response = await axios.get(url);
    } catch (error) {
      if (fallbackToSecondApi) {
        const secondApiUrl = `https://celestial-3ode.onrender.com/gpt?gpt=${encodeURIComponent(ask)}`;
        const secondApiResponse = await axios.get(secondApiUrl);
        res.json(secondApiResponse.data);
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
      return;
    }

    function shouldFallback(responseData) {
      return (
        responseData.error &&
        responseData.error === "No response from Bard AI" ||
        responseData.content.includes("I am still working to learn more languages, so I can't do that just yet.") ||
        responseData.content.includes("I am an LLM trained to") ||
        responseData.content.includes("I am trained to understand and respond only to a subset of languages at this time and can't provide assistance with that") ||
        responseData.content.includes("Bard Help Center.") ||
        responseData.content.includes("I'm a text-based AI") ||
        responseData.content.includes("I'm just a language model, so I can't help you with that.") ||
        responseData.content.includes("I'm not able to help with that") ||
        responseData.content.includes("As a language model,") ||
        responseData.content.includes("I'm unable to help") ||
        responseData.content.includes("the capacity to help with that.") ||
        responseData.content.includes("Please refer to the Bard Help Center for a current list of supported languages.")
      );
    }

    if (shouldFallback(response.data)) {
      if (fallbackToSecondApi) {
        const secondApiUrl = `https://celestial-3ode.onrender.com/gpt?gpt=${encodeURIComponent(ask)}`;
        const secondApiResponse = await axios.get(secondApiUrl);

        res.json(secondApiResponse.data);
      } else {
        res.json(response.data);
      }
    } else {
      const { content, links } = response.data;
      res.json({ content, links });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
