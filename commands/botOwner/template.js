const Discord = require("discord.js");
const chalk = require("chalk");
exports.run = async (client) => {
  let data = client.data;
  let config = client.config;
  let message = client.message;
  let args = client.args;
  if (data.get(`plugin.main`) !== "true") return console.log(`${chalk.red(client.command)} staat uit voor ${chalk.cyan(message.guild.name)}!`);
  message.channel.send("template");
  let embed = new Discord.RichEmbed().setTitle("TITEL").setDescription("BESCHRIJVING");
  if (data) {
    if (data.get("color") !== "none") embed.setColor(data.get("color"));
    else embed.setColor("#36393e");
    if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
  } else embed.setColor("#36393e");
  message.channel.send(embed);
}
exports.help = {
  name: "template",
  usage: "template",
  description: "template!",
  category: "botOwner",
  extraCommands: []
}
exports.config = {
  enable: true,
  guildPermission: 5,
  userPermission: 7,
  guildOnly: false
}
