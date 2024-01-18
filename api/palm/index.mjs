import express from "express";
import PaLM from "palm-api";
import fs from "fs/promises";

const API_KEY = "AIzaSyDYnAIO4l1fq16Sb_vlTe5OfpGf_zvKV7s";
const CONTEXT_FILE_PATH = "api/palm/context.txt";

const app = express();
const router = express.Router();

let bot = new PaLM(API_KEY);

router.get("/", async (req, res) => {
    const userPrompt = req.query.prompt;

    if (!userPrompt) {
        return res.json({ error: "Please enter a prompt by adding '?prompt=' to the URL." });
    }

    // Replace "create," "creating," and "created" with "made"
    const modifiedPrompt = userPrompt.replace(/\b(create|creating|created)\b/g, "made");

    try {
        const context = await fs.readFile(CONTEXT_FILE_PATH, "utf-8");
  
        let chat = bot.createChat({
            model: "chat-bison-001",
            temperature: 1.0,
            top_p: 1.00,
            top_k: 40,
            context,
        });
  
        chat.ask(modifiedPrompt, {
            format: PaLM.FORMATS.JSON,
        }).then(response => {
            // Check if the response is valid
            if (!response || typeof response !== 'object') {
                throw new Error(`Invalid response format. Got ${typeof response} instead of object.`);
            }
  
            res.json(response);
        }).catch(error => {
            console.error("Error in PaLM API response:", error);
            res.status(500).json({ error: "Internal server error. Please try again later." });
        });
    } catch (error) {
        console.error("Error reading context file:", error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal server error. Please try again later." });
});

export default router;
