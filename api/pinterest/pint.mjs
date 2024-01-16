import express from "express";
import * as Pinterest from "@myno_21/pinterest-scraper";

const app = express();
const router = express.Router();

router.get("/", async (req, res) => {
  const searchQuery = req.query.pinte;

  if (!searchQuery) {
    res.send("Please input a keyword using the parameter '?pinte='.");
    return;
  }

  try {
    const response = await Pinterest.searchPins(searchQuery);
    res.json(response);
  } catch (error) {
    res.status(500).send("Error fetching Pinterest data.");
  }
});

// Export the router as default
export default router;