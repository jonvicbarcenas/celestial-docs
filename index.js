const express = require('express');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = require('./option/option');

//text generation
const gitiRouter = require('./api/gitiai/giti');
const gptRouter = require('./api/gpt/gpt');
const bardRouterPromise = import('./api/bard/bard.mjs');
const bardgptRouter = require('./api/bard-gpt/bardgpt');
const monoFontRouter = require('./api/fontgen/monospace');
const arialFontRouter = require('./api/fontgen/arial');
const scriptFontRouter = require('./api/fontgen/script');
const promptgen = require('./api/promptgen/prompter');
const gemini = require('./api/gemini/gem.js');
const sentiment = require('./api/sentiment/sent');

//image generation const define
const generateRouter = require('./api/imagen/generatev3');
const prodiaRouter = require('./api/imagen/prodia');


//image api rest
const progMemeRouter = require('./api/programmingMeme/memepic');

const app = express();
const port = 3000;

const specs = swaggerJsdoc(options);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { 
    explorer: false,
    customSiteTitle: "Dainsleif API UI"
  })
);

/* Define your routes here */


//text generation
app.use('/gitiai', gitiRouter)
app.use('/gpt', gptRouter)
app.use('/bardgpt', bardgptRouter)
app.use('/monospace', monoFontRouter)
app.use('/arial', arialFontRouter)
app.use('/script', scriptFontRouter)
app.use('/prompter', promptgen)
app.use('/gemini', gemini)
app.use('/sentiment', sentiment)

import('./api/bard/bard.mjs').then((module) => {
  try {
    const bardRouter = module.default;
    app.use('/bard', bardRouter);
  } catch (error) {
    console.error('Error initializing Bard AI module:', error.message);
  }
});




//image generation
app.use('/imagenv3', generateRouter)
app.use('/prodia', prodiaRouter)
import('./api/illusiondiff/illusion.mjs').then((module) => {
  try {
    const illusionRouter = module.default;
    app.use('/illusion', illusionRouter);
  } catch (error) {
    console.error('Error initializing Bard AI module:', error.message);
  }
});




//image rest api
app.use('/programeme', progMemeRouter)
















app.use('/', express.static(path.join(__dirname, 'home')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});