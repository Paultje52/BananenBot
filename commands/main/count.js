const Discord = require("discord.js");
exports.run = async (client) => {
  let data = client.data;
  let config = client.config;
  let message = client.message;
  let args = client.args;
  if (!args[0]) {
    let embed = new Discord.RichEmbed().setTitle("Count").setDescription(`Error: Kies uit **server** of **bot**!`);
    if (data) {
      if (data.get("color") !== "none") embed.setColor(data.get("color"));
      else embed.setColor("#36393e");
      if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
    } else embed.setColor("#36393e");
    return message.channel.send(embed)
  }
  if (args[0].toLowerCase() === "server") {
    if (message.channel.type === "dm") {
      let embed = new Discord.RichEmbed().setTitle("Count").setDescription(`Error: Je kan alleen server stats zien in een server!`);
      if (data) {
        if (data.get("color") !== "none") embed.setColor(data.get("color"));
        else embed.setColor("#36393e");
        if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
      } else embed.setColor("#36393e");
      return message.channel.send(embed);
    }
    let c = {};
    c.text = 0;
    c.voice = 0;
    c.category = 0;
    let m = {};
    m.bot = 0;
    m.user = 0;
    await message.guild.channels.forEach(channel => {
      if (channel.type === "text") c.text++;
      else if (channel.type === "voice") c.voice++;
      else if (channel.type === "category") c.category++;
    });
    await message.guild.members.forEach(member => {
      if (member.user.bot) m.bot++;
      else m.user++;
    });
    let embed = new Discord.RichEmbed().setTitle("Server count").setDescription(`Rollen: ${message.guild.roles.size}\nCustom emojis: ${message.guild.emojis.size}`).addField("Channels", `Totaal: ${message.guild.channels.size}\nText: ${c.text}\nVoice: ${c.voice}\nCategorieën: ${c.category}`, true).addField("Users", `Totaal: ${message.guild.members.size}\nBots: ${m.bot}\nMembers: ${m.user}`, true);
    if (data) {
      if (data.get("color") !== "none") embed.setColor(data.get("color"));
      else embed.setColor("#36393e");
      if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
    } else embed.setColor("#36393e");
    message.channel.send(embed);
  } else if (args[0].toLowerCase() === "bot") {
    let c = {};
    c.text = 0;
    c.voice = 0;
    c.category = 0;
    let m = {};
    m.bot = 0;
    m.user = 0;
    let r = 0;
    let e = 0;
    await client.channels.forEach(channel => {
      if (channel.type === "text") c.text++;
      else if (channel.type === "voice") c.voice++;
      else if (channel.type === "category") c.category++;
    });
    await client.users.forEach(member => {
      if (member.bot) m.bot++;
      else m.user++;
    });
    await client.guilds.forEach(async guild => {
      await guild.emojis.forEach(emoji => {e++});
      await guild.roles.forEach(role => {r++});
    })
    let embed = new Discord.RichEmbed().setTitle("Bot count").setDescription(`Servers: ${client.guilds.size}\nRollen: ${r}\nCustom emojis: ${e}`).addField("Channels", `Totaal: ${client.channels.size}\nText: ${c.text}\nVoice: ${c.voice}\nCategorieën: ${c.category}`, true).addField("Users", `Totaal: ${client.users.size}\nBots: ${m.bot}\nMembers: ${m.user}`, true);
    if (data) {
      if (data.get("color") !== "none") embed.setColor(data.get("color"));
      else embed.setColor("#36393e");
      if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
    } else embed.setColor("#36393e");
    message.channel.send(embed);
  }
}
exports.help = {
  name: "count",
  usage: "count <server/bot>",
  description: "Bekijk mijn count!",
  category: "main",
  extraCommands: []
}
exports.config = {
  enable: true,
  guildPermission: 0,
  userPermission: 0,
  guildOnly: false
}
