const Discord = require("discord.js");
const chalk = require("chalk");
exports.run = async (client) => {
  let data = client.data;
  let config = client.config;
  let message = client.message;
  let args = client.args;
  if (data.get(`plugin.fun`) !== "true") return console.log(`${chalk.red(client.cmd.help.name)} staat uit voor ${chalk.cyan(message.guild.name)}!`);
  let antwoorden = ["Kop", "Munt"];
  let embed = new Discord.RichEmbed().setTitle("Ik gooi een coin!").setDescription(`Het is **${antwoorden[Math.floor(Math.random() * antwoorden.length)]}**`);
  if (data) {
    if (data.get("color") !== "none") embed.setColor(data.get("color"));
    else embed.setColor("#36393e");
    if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
  } else embed.setColor("#36393e");
  message.channel.send(embed);
}
exports.help = {
  name: "munt",
  usage: "munt",
  description: "Laat mij een munt gooien!",
  category: "fun",
  extraCommands: ["coin", "kopofmunt"]
}
exports.config = {
  enable: true,
  guildPermission: 0,
  userPermission: 0,
  guildOnly: false
}
