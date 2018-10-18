const Discord = require("discord.js");
const chalk = require("chalk");
exports.run = async (client) => {
  let data = client.data;
  let config = client.config;
  let message = client.message;
  let args = client.args;
  if (data.get(`plugin.fun`) !== "true") return console.log(`${chalk.red(client.cmd.help.name)} staat uit voor ${chalk.cyan(message.guild.name)}!`);
  let embed;
  if (!args[0] || isNaN(Number(args[0]))) {
    embed = new Discord.RichEmbed().setTitle("Dobbelsteen").setDescription("Ik gooi een dobbelsteen...");
    if (data) {
      if (data.get("color") !== "none") embed.setColor(data.get("color"));
      else embed.setColor("#36393e");
      if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
    } else embed.setColor("#36393e");
    message.channel.send(embed).then(msg => {
      setTimeout(function(){
        embed = new Discord.RichEmbed().setTitle("Dobbelsteen").setDescription(`Hij komt op **${Math.floor(Math.random() * 5 + 1)}**`);
        if (data) {
          if (data.get("color") !== "none") embed.setColor(data.get("color"));
          else embed.setColor("#36393e");
          if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
        } else embed.setColor("#36393e");
        msg.edit(embed);
      }, Math.floor(Math.random() * 500));
    });
  } else {
  if (args[0].length >= 4) {
  	let embed = new Discord.RichEmbed().setTitle("Error!").setDescription("Ik kan maximaal 999 dobbelstenen gooien!");
  	    if (data) {
      		if (data.get("color") !== "none") embed.setColor(data.get("color"));
      		else embed.setColor("#36393e");
      		if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
    		} else embed.setColor("#36393e");
    	return message.channel.send(embed);
    }
    let embed = new Discord.RichEmbed().setTitle("Dobbelsteen").setDescription(`Ik gooi **${Number(args[0])}** dobbelstenen!`);
    if (data) {
      if (data.get("color") !== "none") embed.setColor(data.get("color"));
      else embed.setColor("#36393e");
      if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
    } else embed.setColor("#36393e");
    message.channel.send(embed).then(msg => {
      setTimeout(async function(){
        let i;
        let count = 0;
        let number = Number(args[0]);
        for (i = 0; i < number; i++) {
          count += Math.floor(Math.random() * 6);
        }
        let embed = new Discord.RichEmbed().setTitle("Dobbelsteen").setDescription(`Ik heb **${Number(args[0])}** dobbelstenen gegooit en bij elkaar opgetelt! Ze kwamen in totaal op **${count}**!`);
        if (data) {
          if (data.get("color") !== "none") embed.setColor(data.get("color"));
          else embed.setColor("#36393e");
          if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
        } else embed.setColor("#36393e");
        msg.edit(embed);
      }, Math.floor(Math.random() * 200)*Number(args[0]));
    });
  }
}
exports.help = {
  name: "dobbel",
  usage: "dobbel [aantal dobbelstenen]",
  description: "Laat mij een dobbelsteen gooien!",
  category: "fun",
  extraCommands: ["dobbelsteen", "dice"]
}
exports.config = {
  enable: true,
  guildPermission: 4,
  userPermission: 6,
  guildOnly: false
}
