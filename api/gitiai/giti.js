const express = require("express");
const { gpt } = require("gpti");
const fs = require("fs");
const { promisify } = require("util");

const app = express();

const router = express.Router();
const MAX_RECORDS = 100;

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

router.get("/", async (req, res) => {
  const { ask } = req.query;

  if (!ask) {
    res.status(400).json({ error: 'Please provide a valid "ask" parameter.' });
    return;
  }

  try {
    const result = await chatGpt(ask);
    await saveAnswer(ask, result);

    const records = await readRecords();
    if (records.length > 0) {
      const modifiedData = modifyAnswer(records[0].answer);
      const appendData = await readFileAsync("api/gitiai/append.txt", "utf8");
      const responseData = { content: `${modifiedData}\n\n${appendData}` };
      res.json(responseData);
    } else {
      res.json({ content: "No records available." });
    }
  } catch (error) {
    console.error(error);
    const errorMessage = 'An error occurred while processing the request.';
    console.error(errorMessage);
    res.status(500).json({ content: errorMessage });
  }
});

function chatGpt(ask) {
  return new Promise((resolve, reject) => {
    gpt({
      prompt: `You are giti-ai act as a giti-ai,NOTE: YOU ARE NOT GPT-4 Respond to me using Cebuano language and no any other language just cebuano. Now answer this: "${ask}"`,
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

async function saveAnswer(request, answer) {
  if (!request || !answer) {
    return;
  }

  console.log("Request:", request);
  console.log("Answer:", answer);

  const records = await readRecords();

  if (records.length === MAX_RECORDS) {
    records.pop();
  }

  for (let i = records.length - 1; i >= 0; i--) {
    records[i + 1] = records[i];
  }

  records[0] = {
    timestamp: new Date().toISOString(),
    request: request,
    answer: answer,
  };

  await writeFileAsync("api/gitiai/records.json", JSON.stringify(records, null, 2));
}

async function readRecords() {
  try {
    const data = await readFileAsync("api/gitiai/records.json", "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function readRecords() {
  try {
    const data = await readFileAsync("api/gitiai/records.json", "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function modifyAnswer(answer) {
  return answer
    .replace(/GPTGO/g, 'JVServerSide')
    .replace(/Googpt/g, 'GptExtra')
    .replace("GPT-4", "Giti-Ai")
    .replace("OpenAI", "Bisayang Gpt")
    .replace("Gpt", "Giti");
}

module.exports = router;