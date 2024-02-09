// main.mjs

import express from 'express';
import Bard from 'bard-ai';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path'; 


const app = express();

const router = express.Router();

const MY_COOKIE = {
    "SAPISID": "a-P85N4uWt2HkG77/A0zp7jg5x18c35moR",
    "__Secure-3PAPISID": "a-P85N4uWt2HkG77/A0zp7jg5x18c35moR",
    "_ga_WC57KJ50ZZ": "GS1.1.1707458538.1.1.1707458649.0.0.0",
    "NID": "511=AmSzSVhT9CNLZfuGArr5bEA30OX4QMeLNBiyDmNvcBu5NqgqiSmBWah-9xNdbs9aYeUAwxvLmJP5j1P3yqVBDOEWgqApy5Am1Nu9WgYHfa4s32iio27J7MaoHyLvUMTR9Pdot45gEXsEKPFzXnxtXmhf-EfxjbmlzIwQiypy44poRcYMsMMAx8ZjlBGbM1jeeycEl4o2O3CsIyfKRTa2juw7d5cQVuP2vhnTHg",
    "APISID": "f9_aYykFrURaIYBy/A5FhO564CL5NoApYQ",
    "__Secure-1PSIDTS": "sidts-CjEBPVxjSttA7gMfYR2Ne3b44hcvK6nrJfuCniaxadvmgdyVEWHWFkZ8mSCLW83Mp9_IEAA",
    "__Secure-1PAPISID": "a-P85N4uWt2HkG77/A0zp7jg5x18c35moR",
    "__Secure-3PSID": "g.a000gAgXtCgkDsxJcKMczbLz-DbI-EGszxUy_KhuDWIVOvwFlbbYsXe3VaGcbr0NWUitnekRxwACgYKAVoSAQASFQHGX2Mi1FsW0puoFxQ2OLgdEQbTBRoVAUF8yKqyzTG1m-ptN7q-ydUJ58Hv0076",
    "__Secure-1PSID": "g.a000gAgXtCgkDsxJcKMczbLz-DbI-EGszxUy_KhuDWIVOvwFlbbY0YbaA227tTkaJjtYgTffFgACgYKAQcSAQASFQHGX2MirVNiVyxMsoJ4dDbnvGwKIRoVAUF8yKoplmG1k6bFvuuaA1g2Anb00076",
    "__Secure-1PSIDCC": "ABTWhQEjwRHdtFuvBPhwuR4eqWfi3GNdV8FgCVP8wWAyq3EsZoP-IU4jsLQ59ST2mZ9WCfRf",
    "__Secure-3PSIDCC": "ABTWhQHosP60eF3uhT3CVQOURivaM5U4Dl5dYJCUDXCSc5RA_mTveEOORW0N_wUgUhRsQkYqaA",
    "__Secure-3PSIDTS": "sidts-CjEBPVxjSttA7gMfYR2Ne3b44hcvK6nrJfuCniaxadvmgdyVEWHWFkZ8mSCLW83Mp9_IEAA",
    "_ga": "GA1.1.460288566.1707458538",
    "HSID": "APiw3wxcpztXOmMHd",
    "SID": "g.a000gAgXtCgkDsxJcKMczbLz-DbI-EGszxUy_KhuDWIVOvwFlbbYkCBqrDkmOMoRzSgks_uRZgACgYKAWESAQASFQHGX2MiVToE2fqNwwZrCgIVdpwBNRoVAUF8yKr9-7_O2C2OmUu9nnHRp44s0076",
    "SIDCC": "ABTWhQEuIFzcrFrn8uQT4cEkXOv9zK2HV4SaDOU-bWicWIBj5RULVRvGKKA_xP6p8Cu5AM-O",
    "SSID": "AtPCcpotCl6TiZyvp"
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