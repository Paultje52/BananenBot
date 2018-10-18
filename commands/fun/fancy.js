const Discord = require("discord.js");
const chalk = require("chalk");
const request = require("request");
exports.run = async (client) => {
  let data = client.data;
  let config = client.config;
  let message = client.message;
  let args = client.args;
  if (data.get(`plugin.fun`) !== "true") return console.log(`${chalk.red(client.cmd.help.name)} staat uit voor ${chalk.cyan(message.guild.name)}!`);
  if (!args[0]) {
    let embed = new Discord.RichEmbed().setTitle("Fancy").setDescription("Error: Geef een tekst op!");
    if (data) {
      if (data.get("color") !== "none") embed.setColor(data.get("color"));
      else embed.setColor("#36393e");
      if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
    } else embed.setColor("#36393e");
    message.channel.send(embed);
  } else {
    await message.channel.startTyping();
    request({
      url: `https://discordians-api.herokuapp.com/translate/fancy?text=${args.join(" ")}`,
      json: true
    }, function (err, response, body) {
      if (err) {
        let embed = new Discord.RichEmbed().setTitle("Fancy").setDescription(`Er ging iets fout, meld dit aan een lead-developer in <https://bit.ly/bananendiscord>: \`\`\`${err}\`\`\``);
        if (data) {
          if (data.get("color") !== "none") embed.setColor(data.get("color"));
          else embed.setColor("#36393e");
          if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
        } else embed.setColor("#36393e");
        message.channel.stopTyping(true);
        return message.channel.send(embed);
      }
      let embed = new Discord.RichEmbed().setTitle("Fancy").setDescription(`Ik heb je tekst 𝔣𝔞𝔫𝔠𝔶 gemaakt: \`\`\`${body.message}\`\`\``);
      if (data) {
        if (data.get("color") !== "none") embed.setColor(data.get("color"));
        else embed.setColor("#36393e");
        if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
      } else embed.setColor("#36393e");
      message.channel.stopTyping(true);
      message.channel.send(embed);
    });
  }
}
exports.help = {
  name: "fancy",
  usage: "fancy <tekst>",
  description: "Laat mij je tekst 𝔣𝔞𝔫𝔠𝔶 maken!",
  category: "fun",
  extraCommands: ["ridder", "ridderachtig"]
}
exports.config = {
  enable: true,
  guildPermission: 0,
  userPermission: 0,
  guildOnly: false
}
