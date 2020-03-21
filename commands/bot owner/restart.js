const command = require("bananenbase").command;
const dir = require("fsscanner");

module.exports = class restart extends command {
  constructor(client) {
    super(client, {
      name: "restart",
      description: "Restart the bot",
      category: "Bot owner",
      subCommands: ["reboot"]
    }, {
      permLevel: 3
    });
  }

  async run(message) {
    if (message.flags.includes("force")) {
      let msg = await message.channel.send("Force restarting the bot...");
      await this.client.db.set("restart", {date: Date.now(), channel: message.channel.id, message: msg.id});
      console.log("Bot restarting...");
      process.exit();
      return;
    }
    
    let msg = await message.channel.send("Prepairing for restart: waiting until minigames are over.");
    this.client.restarting = true;
    msg.edit(`Restarting in 15 seconds`);
    await wait(5000);
    msg.edit(`Restarting in 10 seconds`);
    await wait(5000);
    msg.edit(`Restarting in 5 seconds`);
    await wait(5000);
    await msg.edit("Restarting...");
    await this.client.db.set("restart", {date: Date.now(), channel: message.channel.id, message: msg.id});
    console.log("Bot restarting...");
    process.exit();
  }
}

function wait(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}
