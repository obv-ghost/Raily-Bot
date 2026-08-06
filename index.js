require("dotenv").config();

const axios = require("axios");
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

// Hello Command
app.command("/raily-hello", async ({ ack, respond }) => {
  const start = Date.now();
  await ack();

  const latency = Date.now() - start;

  await respond({
    text: `Pong!\nLatency: ${latency}ms`,
  });
});

// Cat Fact Command
app.command("/raily-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");

    await respond({
      text: `🐱 Cat Fact:\n${response.data.fact}`,
    });
  } catch (err) {
    await respond({
      text: "❌ Failed to fetch a cat fact.",
    });
  }
});

// Joke Command
app.command("/raily-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get(
      "https://official-joke-api.appspot.com/random_joke"
    );

    await respond({
      text: `${response.data.setup}\n\n${response.data.punchline}`,
    });
  } catch (err) {
    await respond({
      text: "❌ Failed to fetch a joke.",
    });
  }
});

// Start the Bot
(async () => {
  await app.start();
  console.log("🤖 Bot is running!");
})();