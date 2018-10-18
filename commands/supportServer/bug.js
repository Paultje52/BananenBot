const Discord = require("discord.js");
const chalk = require("chalk");
exports.run = async (client) => {
  let data = client.data;
  let config = client.config;
  let message = client.message;
  let args = client.args;
  let am = client.function.awaitMessage;
  if (!message.channel.permissionsFor(message.guild.me).has("MANAGE_MESSAGES")) return message.channel.send("Ik kan geen berichten verwijderen!");
  let antwoord1 = await am.run(message, true, "Wat is het type? (**command** of **overige**)");
  let antwoord2;
  if (antwoord1.content === "command") antwoord2 = await am.run(message, true, "bij welk command heb je de bug?", "reply");
  else antwoord2 = await am.run(message, true, "waar heb je de bug bij", "reply");
  let antwoord3 = await am.run(message, true, "Leg de bug duidelijk uit");
  let antwoord4 = await am.run(message, true, "Hoeveel spoed heeft dit (1 (weinig) tot 10 (veel))?");
  let guild = await client.guilds.find("id", "393475468508004364");
  let channel = await client.channels.find("id", "461239334889193494");
  let bugEmbed = new Discord.RichEmbed().setTitle(`Bug report van ${message.author.username}`).setDescription(`Type: **${antwoord1.content}**\nWaar: **${antwoord2.content}**\nUitleg: **${antwoord3.content}**\nSpoed: **${antwoord4.content}**`).setColor("#36393e");
  channel.send(bugEmbed);
  let embed = new Discord.RichEmbed().setTitle("Bug").setDescription("De bug is gerapporteerd!\nBedankt!");
  if (data) {
    if (data.get("color") !== "none") embed.setColor(data.get("color"));
    else embed.setColor("#36393e");
    if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
  } else embed.setColor("#36393e");
  message.channel.send(embed);
}
exports.help = {
  name: "bug",
  usage: "bug",
  description: "Rapporteer een bug op de support server!",
  category: "supportServer",
  extraCommands: ["reportbug"]
}
exports.config = {
  enable: true,
  guildPermission: 4,
  userPermission: 0,
  guildOnly: true
}
