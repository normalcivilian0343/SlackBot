const axios = require("axios");


require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/normalsidekick-ping", async ({ ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `I'm awake! What do you need?\nLatency: ${latency}ms` });
});

app.command("/normalsidekick-help", async ({ ack, respond, command }) => {
  console.log("HELP COMMAND RECEIVED:", command);

  await ack();

  await respond({
    text:
`Available Commands:
/normalsidekick-ping - just saying hi!
/normalsidekick-help - ʕ/ •ᴥ• /ʔ bear give you all commands when needed
/normalsidekick-joke - @'-' snail will crack you up, 
/normalsidekick-randofact - get a random fact, courtesy of kitty (^..^)=~
/normalsidekick-mousy - <:3 )~~~~) mousy wants to say hi to you!`
  });
});

app.command("/normalsidekick-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      text:
`${response.data.setup}

${response.data.punchline}`
    });
  } catch (err) {
    await respond({ text: "snail is having some trouble with the jokes right now" });
  }
});




app.command("/normalsidekick-randofact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://uselessfacts.jsph.pl/random.json?language=en");
    await respond({ text: `Kitty (^..^)=~ says: Didya know?:\n${response.data.text}` });
  } catch (err) {
    await respond({ text: "*sad meow* no random fact found." });
  }
});

  

app.command("/normalsidekick-mousy", async ({ ack, respond }) => {
  await ack();

  try {
    const response = "Hi there! This is mousy *squeak squeak*! have a moustastic day! <3";
    await respond({ text: response });
  } catch (err) {
    await respond({ text: "mousy is unavailable at the moment :(" });
  }
});


(async () => {
  await app.start();
  console.log("normalsidekick is ready for work!");
})();