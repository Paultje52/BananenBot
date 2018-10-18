const Discord = require("discord.js");
const chalk = require("chalk");
exports.run = async (client) => {
  const permChecker = require(`${client.dirname}/custom_modules/permChecker`);
  let data = client.data;
  let config = client.config;
  let message = client.message;
  let args = client.args;
  if (data.get(`plugin.main`) !== "true") return console.log(`${chalk.red(client.cmd.help.name)} staat uit voor ${chalk.cyan(message.guild.name)}!`);
  let embed = new Discord.RichEmbed().setTitle("Changelogs").setDescription(`Bekijk hieronder alle aanpassingen van versie **${client.version}**!`)
  .addField("Toevoegingen", "- Bug command\n- [Jensbot server](https://discord.gg/vQkyFch) is nu een developer server\n- Count", true)
  .addField("Aanpassingen", "- Bot heeft nu permissie checks voor sommige command\n- Help", true)
  .addField("Bug fixes", "- Zigzag\n- Piraat")
  if (data) {
    if (data.get("color") !== "none") embed.setColor(data.get("color"));
    else embed.setColor("#36393e");
    if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
  } else embed.setColor("#36393e");
  message.channel.send(embed);
}
exports.help = {
  name: "changelog",
  usage: "changelog",
  description: "Bekijk wat er is veranderd aan mij!",
  category: "main",
  extraCommands: ["changelogs", "veranderingen", "aanpassingen"]
}
exports.config = {
  enable: true,
  guildPermission: 0,
  userPermission: 0,
  guildOnly: false
}
