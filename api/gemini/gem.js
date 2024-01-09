const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const { promisify } = require("util");

const router = express.Router();

const MAX_RECORDS = 100;

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const apiKey = "AIzaSyCmlXDPtPluIyFJtbp-l9Oek-S5nfC38L4";

const genAI = new GoogleGenerativeAI(apiKey);

router.get("/", async (req, res) => {
  const geminiQuery = req.query.gemini; // Get the "gemini" query parameter from the URL

  if (!geminiQuery) {
    res.status(200).json({ error: 'Please provide a valid "gemini" parameter.' });
    return;
  }

  try {
    const result = await chatGemini(geminiQuery); // Use geminiQuery as the input
    await saveAnswer(geminiQuery, result); // Use geminiQuery as the input

    const records = await readRecords();
    if (records.length > 0) {
      const modifiedData = modifyAnswer(records[0].answer);
      const appendData = await readFileAsync("./api/gemini/append.txt", "utf8");
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

function chatGemini(geminiQuery) {
  return new Promise(async (resolve, reject) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(geminiQuery);
      const response = await result.response;
      const text = response.text();
      resolve(text);
    } catch (error) {
      reject(error);
    }
  });
}

async function saveAnswer(request, answer) {
  if (!request || !answer) {
    return;
  }

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

  await writeFileAsync("./api/gemini/records.json", JSON.stringify(records, null, 2));
  console.log("Answer saved to records.json");
}

async function readRecords() {
  try {
    const data = await readFileAsync("./api/gemini/records.json", "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function modifyAnswer(answer) {
  return answer
    .replace(/GPTGO/g, 'JVServerSide')
    .replace(/Googpt/g, 'GptExtra')
    .replace("https://gptgo.ai", "https://bulaga.marok85067.repl.co/");
}

module.exports = router;
