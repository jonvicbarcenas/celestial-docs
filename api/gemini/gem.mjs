// main.mjs
import express from 'express';
import Gemini from 'gemini-ai';
const router = express.Router();

const API_KEY = "AIzaSyBFKuDXsiaMXalfSmRuo5MQlyMWHUMrztE";
const gemini = new Gemini(API_KEY);

const conversations = {};

function replaceBulletPoints(content) {
    return content.replace(/\* \*\*(.+?)\*\* /g, "\t$1\t");
}
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

    return text.split('').map(char => mapping[char] || char).join('');
}

function processContent(content) {
    content = replaceBulletPoints(content);
    content = content.replace(/\*\*(.+?)\*\*/g, (_, group) => `** ${mapToBoldFont(group)} **`);
    return content.replace(/\*\*(.+?)\*\*/g, "$1");
}

router.get('/', async (req, res) => {
    const { chat, id } = req.query;

    if (!chat || !id) {
        return res.status(400).json({ error: 'Missing chat or id parameter' });
    }

    if (!conversations[id]) {
        conversations[id] = gemini.createChat();
    }

    try {
        const response = await conversations[id].ask(chat);
        const processedContent = processContent(response);
        res.json({ content: processedContent });
    } catch (error) {
        res.status(500).json({ error: 'Error processing request' });
    }
});


// Export the router as default
export default router;