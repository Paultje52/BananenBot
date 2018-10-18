const Discord = require("discord.js");
const chalk = require("chalk");
exports.run = async (client) => {
  let data = client.data;
  let config = client.config;
  let message = client.message;
  let args = client.args;
  if (data.get(`plugin.main`) !== "true") return console.log(`${chalk.red(client.cmd.help.name)} staat uit voor ${chalk.cyan(message.guild.name)}!`);
  let embed = new Discord.RichEmbed().setTitle("Serverinfo").addField("Naam:", `${message.guild.name}` , true).addField("Eigenaar", `${message.guild.owner}`, true).addField("Regio:", `${message.guild.region}`, true).addField("ID:", `${message.guild.id}`, true).addField("Gemaakt op:", `${message.guild.createdAt}`, true).addField("Leden:", `${message.guild.members.size}`, true).addField("Rollen:", `${message.guild.roles.size}`, true).setThumbnail(message.guild.iconURL);
  if (data.get("color") !== "none") embed.setColor(data.get("color"));
  else embed.setColor("#36393e");
  if (data.get("color") !== "none") embed.addField("Kleur:", data.get("color"), true);
  else embed.addField("Kleur:", "#36393e", true);
  if (data.get("thumbnail") !== "none") embed.addField("thumbnail:", data.get("thumbnail"), true);
  message.channel.send(embed);
}
exports.help = {
  name: "serverinfo",
  usage: "serverinfo",
  description: "Bekijk informatie over de server!",
  category: "main",
  extraCommands: []
}
exports.config = {
  enable: true,
  guildPermission: 0,
  userPermission: 0,
  guildOnly: true
}
