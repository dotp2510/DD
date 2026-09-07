const OpenAI = require("openai");

async function metaAi() {
  const openai = new OpenAI({
    apiKey: process.env.NVIDIA_API_KEY,
    baseURL: 'https://integrate.api.nvidia.com/v1',
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "meta/muse-glimmer-30b",
      messages: [{ role: "user", content: "Which number is larger, 9.11 or 9.8?" }],
      temperature: 1,
      top_p: 0.95,
      max_tokens: 8192,
      stream: false
    });

    console.log(completion.choices[0]?.message?.content);
  } catch (err) {
    console.error("metaAi failed:", err.message);
  }
}

 // <-- actually call it

module.exports = metaAi;