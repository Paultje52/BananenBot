const Discord = require("discord.js");
const chalk = require("chalk");
exports.run = async (client) => {
  let data = client.data;
  let config = client.config;
  let message = client.message;
  let args = client.args;
  if (data.get(`plugin.fun`) !== "true") return console.log(`${chalk.red(client.cmd.help.name)} staat uit voor ${chalk.cyan(message.guild.name)}!`);
  if (!args[0] || !args[1] || !args[2]) {
    let embed = new Discord.RichEmbed().setTitle("8ball").setDescription("Error: Geef een vraag op van minimaal 3 woorden!");
    if (data) {
      if (data.get("color") !== "none") embed.setColor(data.get("color"));
      else embed.setColor("#36393e");
      if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
    } else embed.setColor("#36393e");
    return message.channel.send(embed);
  }
  let antwoorden = ["Zeker weten!", "Ja", "Yes", "Ja zeker!", "Ik denk het", "Misschien", "Ik denk het niet", "Nee", "Nope", "Zeker weten niet!"];
  let embed = new Discord.RichEmbed().setTitle("8ball").setAuthor(args.join(" ")).setDescription(antwoorden[Math.floor(Math.random() * antwoorden.length)]);
  if (data) {
    if (data.get("color") !== "none") embed.setColor(data.get("color"));
    else embed.setColor("#36393e");
    if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
  } else embed.setColor("#36393e");
  message.channel.send(embed);
}
exports.help = {
  name: "8ball",
  usage: "8ball <vraag>",
  description: "Vraag iets aan de bot!",
  category: "fun",
  extraCommands: ["vraag"]
}
exports.config = {
  enable: true,
  guildPermission: 0,
  userPermission: 0,
  guildOnly: false
}
