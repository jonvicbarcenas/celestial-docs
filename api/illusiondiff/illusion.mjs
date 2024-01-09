//mjs

import express from "express";
import Replicate from "replicate";

const router = express.Router();

router.get("/", async (req, res) => {
  const replicate = new Replicate({
    auth: "r8_IdHoMc7m5mU29QALGpoogqyYLEaBAuN4adj7o",
  });

  const model = "lucataco/illusion-diffusion-hq:3c64e669051f9b358e748c8e2fb8a06e64122a9ece762ef133252e2c99da77c1";

  const imageUrl = req.query.image;
  if (!imageUrl) {
    return res.status(200).json({ error: "Missing 'image' & 'prompt' parameter" });
  }

  const input = {
    seed: 1057727382,
    image: imageUrl,
    width: 768,
    border: 1,
    height: 768,
    prompt: req.query.prompt || "(masterpiece:1.4), (best quality), (detailed), Map of an island with steampunk city to the east, medieval city west, small port town with a wizard tower in the south. Lots of open land with forest and ruins in between",
    num_outputs: 1,
    guidance_scale: 6.5,
    negative_prompt: "ugly, disfigured, low quality, blurry, nsfw",
    qr_code_content: "",
    qrcode_background: "gray",
    num_inference_steps: 40,
    controlnet_conditioning_scale: 1
  };

  try {
    const output = await replicate.run(model, { input });
    console.log("Output:", output);
    res.json({ output });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;