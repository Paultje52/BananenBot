const Discord = require("discord.js");
const chalk = require("chalk");
const request = require("request");
exports.run = async (client) => {
  let data = client.data;
  let config = client.config;
  let message = client.message;
  let args = client.args;
  if (data.get(`plugin.main`) !== "true") return console.log(`${chalk.red(client.cmd.help.name)} staat uit voor ${chalk.cyan(message.guild.name)}!`);
let now = Date.now();
message.channel.send("Pinging...").then(msg => {
  let ping = {api: Math.floor(client.ping), message: Date.now()-now};
  now = Date.now();
  	   request({
      url: `https://discordians-api.herokuapp.com/translate/cursive?text=test`,
      json: true
    }, async function (err, response, body) {
    	ping.web = Date.now()-now;
    	now = Date.now();
    	 await message.channel.startTyping();
    	 await message.channel.stopTyping(true);
    	 ping.typing = Date.now()-now;
    	 	     let embed = new Discord.RichEmbed().setTitle("Ping").setDescription(`**API:** ${ping.api}ms\n**Sending:** ${Math.floor(ping.message)}ms\n**Typing: **${Math.floor(ping.typing)}ms\n**Web**: ${ping.web}ms`);
        if (data) {
          if (data.get("color") !== "none") embed.setColor(data.get("color"));
          else embed.setColor("#36393e");
          if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
        } else embed.setColor("#36393e");
        msg.edit(embed);
    });
  });
}
exports.help = {
  name: "ping",
  usage: "ping",
  description: "Test mijn snelheid!",
  category: "main",
  extraCommands: []
}
exports.config = {
  enable: true,
  guildPermission: 0,
  userPermission: 0,
  guildOnly: false
}