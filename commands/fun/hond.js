const Discord = require("discord.js");
const chalk = require("chalk");
const request = require("request");
exports.run = async (client) => {
  let data = client.data;
  let config = client.config;
  let message = client.message;
  let args = client.args;
  if (data.get(`plugin.fun`) !== "true") return console.log(`${chalk.red(client.cmd.help.name)} staat uit voor ${chalk.cyan(message.guild.name)}!`);
  await message.channel.startTyping();
  getDog("https://random.dog/woof");
  function getDog(dog) {
    request({
      url: dog,
      json: true
    }, function (err, response, body) {
      if (err) {
        let embed = new Discord.RichEmbed().setTitle("Hond").setDescription(`Er ging iets fout, meld dit aan een lead-developer in <https://bit.ly/bananendiscord>: \`\`\`${err}\`\`\``);
        if (data) {
          if (data.get("color") !== "none") embed.setColor(data.get("color"));
          else embed.setColor("#36393e");
          if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
        } else embed.setColor("#36393e");
        message.channel.stopTyping(true);
        return message.channel.send(embed);
      }
      if (body.toLowerCase().endsWith(".gif") || body.toLowerCase().endsWith(".mp4")) return getDog("https://random.dog/woof");
      let embed = new Discord.RichEmbed().setTitle("Hond").setDescription("Kijk!").setImage(`https://random.dog/${body}`);
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
  name: "hond",
  usage: "hond",
  description: "Bekijk een afbeelding van een hond!",
  category: "fun",
  extraCommands: ["dog"]
}
exports.config = {
  enable: true,
  guildPermission: 0,
  userPermission: 0,
  guildOnly: false
}
