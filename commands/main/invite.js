const Discord = require("discord.js");
exports.run = async (client) => {
  let data = client.data;
  let config = client.config;
  let message = client.message;
  let args = client.args;
  if (!args[0]) {
    let embed = new Discord.RichEmbed().setTitle("Invite").setDescription("Wat leuk dat je mij wilt inviten! Druk hieronder op een link om mij te inviten!\n\n[Bot](https://bit.ly/bananeninvite)\n[Support server](https://bit.ly/bananendiscord)\n[BananenBoy](https://discordapp.com/oauth2/authorize?client_id=440863212880134144&scope=bot&permissions=-1)\n[BananenMusic](https://discordapp.com/oauth2/authorize?client_id=440168114315984896&scope=bot&permissions=-1)\n[BananenGiveaway](https://discordapp.com/oauth2/authorize?client_id=450748832335265812&scope=bot&permissions=-1)");
    if (data) {
      if (data.get("color") !== "none") embed.setColor(data.get("color"));
      else embed.setColor("#36393e");
      if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
    } else embed.setColor("#36393e");
    message.channel.send(embed);
  } else if (args[0].toLowerCase() === "bot") {
    let embed = new Discord.RichEmbed().setTitle("Invite").setDescription("Druk [hier](https://bit.ly/bananeninvite) om mij te inviten!");
    if (data) {
      if (data.get("color") !== "none") embed.setColor(data.get("color"));
      else embed.setColor("#36393e");
      if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
    } else embed.setColor("#36393e");
    message.channel.send(embed);
  } else if (args[0].toLowerCase() === "support") {
    let embed = new Discord.RichEmbed().setTitle("Invite").setDescription("Druk [hier](https://bit.ly/bananendiscord) om in mijn support server te komen!");
    if (data) {
      if (data.get("color") !== "none") embed.setColor(data.get("color"));
      else embed.setColor("#36393e");
      if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
    } else embed.setColor("#36393e");
    message.channel.send(embed);
  } else if (args[0].toLowerCase() === "bananenmusic") {
    let embed = new Discord.RichEmbed().setTitle("Invite").setDescription("Druk [hier](https://discordapp.com/oauth2/authorize?client_id=440168114315984896&scope=bot&permissions=-1) om in mijn support server te komen!");
    if (data) {
      if (data.get("color") !== "none") embed.setColor(data.get("color"));
      else embed.setColor("#36393e");
      if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
    } else embed.setColor("#36393e");
    message.channel.send(embed);
  } else if (args[0].toLowerCase() === "bananenboy") {
    let embed = new Discord.RichEmbed().setTitle("Invite").setDescription("Druk [hier](https://discordapp.com/oauth2/authorize?client_id=440863212880134144&scope=bot&permissions=-1) om in mijn support server te komen!");
    if (data) {
      if (data.get("color") !== "none") embed.setColor(data.get("color"));
      else embed.setColor("#36393e");
      if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
    } else embed.setColor("#36393e");
    message.channel.send(embed);
  } else if (args[0].toLowerCase() === "bananengiveaway") {
    let embed = new Discord.RichEmbed().setTitle("Invite").setDescription("Druk [hier](https://discordapp.com/oauth2/authorize?client_id=450748832335265812&scope=bot&permissions=-1) om in mijn support server te komen!");
    if (data) {
      if (data.get("color") !== "none") embed.setColor(data.get("color"));
      else embed.setColor("#36393e");
      if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
    } else embed.setColor("#36393e");
    message.channel.send(embed);
  } else {
    let embed = new Discord.RichEmbed().setTitle(":x: Error :x:").setDescription("Er ging iets fout: Kies uit **bot**, **support server**, **bananenmusic**, **bananenboy** of **bananengiveaway**!");
    if (data) {
      if (data.get("color") !== "none") embed.setColor(data.get("color"));
      else embed.setColor("#36393e");
      if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
    } else embed.setColor("#36393e");
    message.channel.send(embed);
  }
}
exports.help = {
  name: "invite",
  usage: "invite [bot]",
  description: "Invite mij of een andere bot!",
  category: "main",
  extraCommands: []
}
exports.config = {
  enable: true,
  guildPermission: 0,
  userPermission: 0,
  guildOnly: false
}
