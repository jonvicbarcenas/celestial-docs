// main.mjs

import express from 'express';
import Bard from 'bard-ai';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path'; 


const app = express();

const router = express.Router();

const MY_COOKIE = {
    "SAPISID": "xZ-TvW8OWEp5Do3L/AUuNc_YvtSLcDL7ga",
    "__Secure-3PAPISID": "xZ-TvW8OWEp5Do3L/AUuNc_YvtSLcDL7ga",
    "_ga": "GA1.1.918815889.1704810749",
    "NID": "511=UkWZHxh119zD5e9mxDu8KINrcj9OSmE84qX5QNWebzYmGTdXoFXvWZaM7WILsdVupUjxAfFtcsqa-ZwAOxU7P4ziTNzD5_NtAKEAL3rJLvz7SUJhBNz22Eu1A6Azi8Sj79NoZikkF6IOXfXVNWqShVtn8YBOiMasU0_XN067SMTXtHt30yI-Yorj9L6_sW8NImsrbrflzN8VQ2tUSzEWAQ7r3_GPMZt0f2vQ",
    "APISID": "wJy8F5ooTwmIZu_P/A5dVrTP1uIoofU_bS",
    "__Secure-1PAPISID": "xZ-TvW8OWEp5Do3L/AUuNc_YvtSLcDL7ga",
    "__Secure-3PSID": "fAhCmh9SQVgwg9UNm_lqkqK82RAC1C_tCTQWh2hrEFE9gJaBAuri8I1Rxu3LXZMGGI8rZQ.",
    "__Secure-1PSID": "fAhCmh9SQVgwg9UNm_lqkqK82RAC1C_tCTQWh2hrEFE9gJaBgULTGIk-JyOAFOkiifm70Q.",
    "__Secure-1PSIDCC": "ABTWhQGUMHjE7Duo9yj8AK53iIeaAK7-Tnqvf_DBntYSvlmOe-ueHBEAluwS84oofdjwyUGE",
    "__Secure-3PSIDCC": "ABTWhQGwgZG2iWa40FdX0E8xnh8n1zh5u95gofmTzUCHLfbLPMTM-opfYUJXZxxkH0p9vcrByg",
    "_ga_WC57KJ50ZZ": "GS1.1.1704810749.1.1.1704810806.0.0.0",
    "HSID": "Ah-FpPiqgb2t8LAdq",
    "SID": "fAhCmh9SQVgwg9UNm_lqkqK82RAC1C_tCTQWh2hrEFE9gJaBNo49EnX4hp37BXSlSFHNuw.",
    "SIDCC": "ABTWhQFrLD2qTMTWTCG9LLPuBKCs8Ro2M0LYVZ4ROkNK4oFVkFWG81EmVCT-Bxb7wbRxPPgS",
    "SSID": "AJhKqbbj587VprLZz"
  };


const myBard = new Bard(MY_COOKIE, {
  verbose: true,
  fetch: fetch,
});

let chatInstances = {};  //Yawa nga convo

router.get('/', async (req, res) => {
  const userId = req.query.id || '';
  const prompt = req.query.ask;
  const imageUrl = req.query.image;

  if (!prompt) {
    res.status(400).send('Please provide the "ask" query parameter.');
    return;
  }

  try {
    if (!chatInstances[userId]) {
      const ids = {
        id: userId
      };
      chatInstances[userId] = myBard.createChat({ ...ids });
    }

    let imageFilename = null;

    if (imageUrl) {
      const imageResponse = await fetch(imageUrl);
      if (imageResponse.ok) {
        imageFilename = `./api/bard/images/${userId}.jpg`;
        const imageStream = fs.createWriteStream(imageFilename);

        await new Promise((resolve, reject) => {
          imageStream.on('finish', resolve);
          imageStream.on('error', reject);
          imageResponse.body.pipe(imageStream);
        });
      } else {
        res.status(400).send('Failed to download the image.');
        return;
      }
    }

    const myChat = chatInstances[userId];

    const response = await myChat.ask(prompt, {
      image: imageFilename,
      format: Bard.JSON,
    });

    let content = response.content;
    const links = response.images.map(image => image.info.raw);

    content = content.replace(/(?!\\!)\[Image of ([^\]]+)\]\((https?:\/\/[^)]+)\)/g, (match, altText) => {
      return `[Image of ${altText}]`;
    });

    // Replace markdown bullet points with tabs
    content = content.replace(/\* \*\*(.+?)\*\* /g, "\t$1\t");

    // Replace markdown bullet points with tabs
    content = content.replace(/\* \*\*(.+?)\*\* /g, "\t$1\t");

    // Function to map characters
    function mapToBoldFont(text) {
      const mapping = {
        'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘',
        'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝',
        'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢',
        'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧',
        'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬',
        'Z': '𝗭', 'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱',
        'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶',
        'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻',
        'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿', 's': '𝘀',
        't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅',
        'y': '𝘆', 'z': '𝘇',
      };

      // Map each character to the corresponding bold font
      return text.split('').map(char => mapping[char] || char).join('');
    }

    // Replace text inside the ** with mapped characters
    content = content.replace(/\*\*(.+?)\*\*/g, (_, group) => `** ${mapToBoldFont(group)} **`);

    content = content.replace(/\*\*(.+?)\*\*/g, "$1");

    const jsonResponse = {
      userId: myChat.id,
      content,
      links,
    };

    // Send the response
    res.json(jsonResponse);

    // Delete the image file after sending the response
    if (imageFilename) {
      fs.unlinkSync(imageFilename);
    }
  } catch (error) {
    res.status(500).send('Error asking questions: ' + error.message);
  }
});

// Export the router as default
export default router;