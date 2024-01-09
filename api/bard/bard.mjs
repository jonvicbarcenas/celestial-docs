// main.mjs

import express from 'express';
import Bard from 'bard-ai';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path'; 


const app = express();

const router = express.Router();

const MY_COOKIE = {
  "SAPISID": "fRWsdXWt8nzitO0Q/A-fzmiHVdmbDSvSgV",
  "__Secure-3PAPISID": "fRWsdXWt8nzitO0Q/A-fzmiHVdmbDSvSgV",
  "_ga": "GA1.1.113706786.1700824333",
  "NID": "511=dCAVUACL-nOaF9LJbScyF-Y3XLp1pMryZSNA6jGS3mno7Gor1pIEcbxKOQIdd5eSSIezPfe_Q_ciKKjA_uJMmMcv1NP8o6NeaUG_YIwckpOxtrUjTvSAv1cZBlb617l2ToCZ-lWqCVZsoXZhFMVjDEcXqjFngM8XaBzOnI__qQkAznDdlfChUuO6JLIlrPD1uPsdZ9awzCHz7-T9NF-8i4gKeTQpv49TCFkGboSIQ4gqPA",
  "APISID": "zujnpau-YFR1fVR6/AK19K2Vzz8_GyH3PG",
  "__Secure-1PAPISID": "fRWsdXWt8nzitO0Q/A-fzmiHVdmbDSvSgV",
  "__Secure-3PSID": "dQhgDS90ceNUc1ebY-7-LXGVVNK3pf6mI9Jt7fLwPBUOk9XXcnNAanw6B19MpjzA6h6tbg.",
  "__Secure-1PSID": "dQhgDS90ceNUc1ebY-7-LXGVVNK3pf6mI9Jt7fLwPBUOk9XXKHX4F1m83-0AEKB7V0sOjg.",
  "__Secure-1PSIDCC": "ACA-OxMHQcbkfhWi6PKAhjQztLJUpXUVkJ_lv7v8XEHZbkqZ2QkzL6_vcZTKamISKTJl1Rz8Rw",
  "__Secure-3PSIDCC": "ACA-OxNlyrfd3hzcK-vufQZjTI8-J_Pvz713C8_ofzh9zOSn56gVXq7kgEQiqJAcLscQhXnZ",
  "_ga_WC57KJ50ZZ": "GS1.1.1700824332.1.1.1700824364.0.0.0",
  "HSID": "Al3_P5wQ43Px_h4Wx",
  "SID": "dQhgDS90ceNUc1ebY-7-LXGVVNK3pf6mI9Jt7fLwPBUOk9XXug6oZbrOzQorBNHRP20I1Q.",
  "SIDCC": "ACA-OxPqvFleqoFuq8r1BjW34if1P2XbqiYDXcJIRMTbliwqYAGtyDouiVfSMpOEGq1yiVLM",
  "SSID": "A5-poxkwN8WO4JQq1"
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