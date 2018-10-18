const os = require("os");
const Discord = require("discord.js");
const chalk = require("chalk");
exports.run = async (client) => {
  let data = client.data;
  let config = client.config;
  let message = client.message;
  let args = client.args;
  if (data.get(`plugin.main`) !== "true") return console.log(`${chalk.red(client.cmd.help.name)} staat uit voor ${chalk.cyan(message.guild.name)}!`);
  let msg = await message.channel.send("Ik ben bezig!");
  let uptime = client.uptime;
  let days = Math.floor(uptime / 24 / 60 / 60 / 1000);
  let hours = Math.floor((uptime / 60 / 60 / 1000) % 60);
  let minutes = Math.floor((uptime / 60 / 1000) % 60);
  let memory = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
  let usememory = Math.round(os.freemem() / 1000000);
  let totalmemory = Math.round(os.totalmem() / 1000000);
  let freememory = totalmemory - usememory;
  let ditisdeosuptimeinuren = os.uptime / 3600;
  let ditisdeosuptime = Math.round(ditisdeosuptimeinuren);
  let embed = new Discord.RichEmbed()
  .setTitle("Bot stats")
  .addField("Bot", `Uptime: **${days}** dagen, **${hours}** uren en **${minutes}** minuten\nMemory: **${memory}MB**\nNodeJS version: **${process.version}**\nDiscord Version: **${Discord.version}**\nBot version: **${client.version}**`, true)
  .addField("VPS", `Type: **${os.type}** (**${os.platform}**)\nBuild number: **${os.release}**\nUptime: **${ditisdeosuptime}** uur\nMemory: **${usememory}mb**/**${totalmemory}mb** (**${freememory}mb** over)`, true)
  if (!client.guildPermission1.includes(message.guild.id) && !client.guildPermission2.includes(message.guild.id) && !client.guildPermission3.includes(message.guild.id) && !client.guildPermission4.includes(message.guild.id) && !client.guildPermission5.includes(message.guild.id)) embed.setDescription("Hallo, ik ben de BananenBot! Ik ben een discord bot die bijna alles kan dat je wilt! Join mijn [support server](https://bit.ly/bananenserver) en [invite](https://bit.ly/bananeninvite) me!\nAls je premium of beta koopt, kan je meer settings aanpassen en krijg je updates eerder, maar je kunt de bot ook altijd free inviten!");
  if (data) {
    if (data.get("color") !== "none") embed.setColor(data.get("color"));
    else embed.setColor("#36393e");
    if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
  } else embed.setColor("#36393e");

  msg.edit(embed);
}
exports.help = {
  name: "botinfo",
  usage: "botinfo",
  description: "Kijk hoe goed ik ben!",
  category: "main",
  extraCommands: ["stats"]
}
exports.config = {
  enable: true,
  guildPermission: 0,
  userPermission: 0,
  guildOnly: false
}
