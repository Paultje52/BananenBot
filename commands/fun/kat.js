const Discord = require("discord.js");
const chalk = require("chalk");
const request = require("request");
exports.run = async (client) => {
  let data = client.data;
  let config = client.config;
  let message = client.message;
  let args = client.args;
  if (data.get(`plugin.fun`) !== "true") return console.log(`${chalk.red(client.cmd.help.name)} staat uit voor ${chalk.cyan(message.guild.name)}!`);
  console.log("hallo");
  await message.channel.startTyping();
  getCat("https://aws.random.cat/meow");
  function getCat(cat) {
    request({
      url: cat,
      json: true
    }, function (err, response, body) {
      if (err) {
        let embed = new Discord.RichEmbed().setTitle("Kat").setDescription(`Er ging iets fout, meld dit aan een lead-developer in <https://bit.ly/bananendiscord>: \`\`\`${err}\`\`\``);
        if (data) {
          if (data.get("color") !== "none") embed.setColor(data.get("color"));
          else embed.setColor("#36393e");
          if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
        } else embed.setColor("#36393e");
        message.channel.stopTyping(true);
        return message.channel.send(embed);
      }
      if (body.file.toLowerCase().endsWith(".gif") || body.file.toLowerCase().endsWith(".mp4")) return getCat("https://aws.random.cat/meow");
      let embed = new Discord.RichEmbed().setTitle("Kat").setDescription("Schattig!").setImage(body.file);
      if (data) {
        if (data.get("color") !== "none") embed.setColor(data.get("color"));
        else embed.setColor("#36393e");
      } else embed.setColor("#36393e");
      message.channel.stopTyping(true);
      message.channel.send(embed);
    })
  }
}
exports.help = {
  name: "kat",
  usage: "kat",
  description: "Bekijk een afbeelding van een kat!",
  category: "fun",
  extraCommands: ["cat"]
}
exports.config = {
  enable: true,
  guildPermission: 0,
  userPermission: 0,
  guildOnly: false
}
