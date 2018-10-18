const moment = require('moment');
const chalk = require('chalk');
const wait = new Set();
const Discord = require("discord.js");

exports.run = async (client, message) => {
  const permChecker = require(`${client.dirname}/custom_modules/permChecker`);
  if (message.author.bot) return;

  const settingsBestand = require("../guildSettings.js");
  client.guild = await settingsBestand.run(client, message);
  let data = client.data;

  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);

  if (client.guild === true && !command.toLowerCase().startsWith(client.data.get(`prefix`))) return;
  if (client.guild === false && !command.toLowerCase().startsWith(client.config.main.prefix)) return;

  if (client.guild === true) {
    let cmd1 = client.commands.get(command.slice(client.data.get(`prefix`).length).toLowerCase());
    let cmd2 = client.subCommands.get(command.slice(client.data.get(`prefix`).length).toLowetCase());
    if (cmd1 || cmd2) {
      if (!message.channel.permissionsFor(message.guild.me).has("EMBED_LINKS")) return message.channel.send("Ik kan geen embeds versturen!");
      client.message = message;
      client.args = args;
      client.cmd = cmd1;
      if (client.cmd === undefined) client.cmd = cmd2;
      let cmd = client.cmd;
      if (wait.has(message.author.id)) {
        console.log(`[${chalk.green(moment().format("HH:mm:ss MM-DD-YYYY"))}]: Command ${chalk.blue(cmd.help.name)} met ${chalk.magenta(args.length)} (${chalk.red(args.join(", "))}) argumenten kan niet uitgevoerd worden door ${chalk.yellow(message.author.username)} in ${chalk.cyan(message.guild.name)} omdat er nog een delay op zit!`);
        if (client.guildPermission1.includes(message.guild.id)) {
          let embed = new Discord.RichEmbed().setTitle("Niet zo snel!").setDescription(`Gebruik het command **${cmd.help.name}** maar om de **2,5 secondes**! Upgade je server naar **beta** om een delay van **1,5 seconde** te krijgen!`);
          if (data.get("color") !== "none") embed.setColor(data.get("color"));
          else embed.setColor("#36393e");
          if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
          return message.channel.send(embed);
          wait.add(message.author.id)
          setTimeout(function(){wait.delete(message.author.id)}, 2500);
        } else if (client.guildPermission2.includes(message.guild.id)) {
          let embed = new Discord.RichEmbed().setTitle("Niet zo snel!").setDescription(`Gebruik het command **${cmd.help.name}** maar om de **1,5 seconde**! Wordt **developer** om een delay van **1 seconde** te krijgen!`);
          if (data.get("color") !== "none") embed.setColor(data.get("color"));
          else embed.setColor("#36393e");
          if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
          return message.channel.send(embed);
          wait.add(message.author.id)
          setTimeout(function(){wait.delete(message.author.id)}, 1500);
        } else if (client.guildPermission3.includes(message.guild.id)) {
          let embed = new Discord.RichEmbed().setTitle("Niet zo snel!").setDescription(`Gebruik het command **${cmd.help.name}** maar om de **seconde**! Alleen op de Officiële server is er een delay van een halve seconde!`);
          if (data.get("color") !== "none") embed.setColor(data.get("color"));
          else embed.setColor("#36393e");
          if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
          return message.channel.send(embed);
          wait.add(message.author.id)
          setTimeout(function(){wait.delete(message.author.id)}, 1000);
        } else if (client.guildPermission4.includes(message.guild.id)) {
          let embed = new Discord.RichEmbed().setTitle("Niet zo snel!").setDescription(`Gebruik het command **${cmd.help.name}** maar om de **halve secondes**!`);
          if (data.get("color") !== "none") embed.setColor(data.get("color"));
          else embed.setColor("#36393e");
          if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
          return message.channel.send(embed);
          wait.add(message.author.id)
          setTimeout(function(){wait.delete(message.author.id)}, 500);
        } else {
          let embed = new Discord.RichEmbed().setTitle("Niet zo snel!").setDescription(`Gebruik het command **${cmd.help.name}** maar om de **5 secondes**! Upgade je server naar **premium** om een delay van **2,5 secondes** te krijgen!`);
          if (data.get("color") !== "none") embed.setColor(data.get("color"));
          else embed.setColor("#36393e");
          if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
          return message.channel.send(embed);
          wait.add(message.author.id);
          setTimeout(function(){wait.delete(message.author.id)}, 5000);
        }
      }
      if (cmd.help.name === "ping") {
        wait.add(message.author.id)
        setTimeout(function(){wait.delete(message.author.id)}, 10000);
      } else {
        if (client.guildPermission1.includes(message.guild.id)) {
          wait.add(message.author.id)
          setTimeout(function(){wait.delete(message.author.id)}, 2500);
        } else if (client.guildPermission2.includes(message.guild.id)) {
          wait.add(message.author.id)
          setTimeout(function(){wait.delete(message.author.id)}, 1500);
        } else if (client.guildPermission3.includes(message.guild.id)) {
          wait.add(message.author.id)
          setTimeout(function(){wait.delete(message.author.id)}, 1000);
        } else if (client.guildPermission4.includes(message.guild.id)) {
          wait.add(message.author.id)
          setTimeout(function(){wait.delete(message.author.id)}, 500);
        } else if (!client.guildPermission5.includes(message.guild.id)) {
          wait.add(message.author.id);
          setTimeout(function(){wait.delete(message.author.id)}, 5000);
        }
      }
      console.log(`[${chalk.green(moment().format("HH:mm:ss MM-DD-YYYY"))}]: Command ${chalk.blue(cmd.help.name)} met ${chalk.magenta(args.length)} (${chalk.red(args.join(", "))}) argumenten uitgevoerd door ${chalk.yellow(message.author.username)} in ${chalk.cyan(message.guild.name)}`);
      permChecker.check("run", client);
    }
  } else {
    let cmd1 = client.commands.get(command.slice(2).toLowerCase());
    let cmd2 = client.subCommands.get(command.slice(client.config.main.prefix).toLowerCase());
    if (cmd1 || cmd2) {
      client.message = message;
      client.args = args;
      client.cmd = cmd1;
      if (client.cmd === undefined) client.cmd = cmd2;
      let cmd = client.cmd;
      if (wait.has(message.author.id)) {
        let embed = new Discord.RichEmbed().setTitle("Niet zo snel!").setDescription(`Gebruik het command **${cmd.help.name}** maar om de **5 secondes**! Upgade je server naar **premium** om een delay van **2,5 secondes** te krijgen!`);
        if (data) {
          if (data.get("color") !== "none") embed.setColor(data.get("color"));
          else embed.setColor("#36393e");
          if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
        } else embed.setColor("#36393e");
        return message.channel.send(embed);
      }
      if (cmd.help.name === "ping") {
        wait.add(message.author.id);
        setTimeout(function(){wait.delete(message.author.id)}, 10000);
      } else {
        wait.add(message.author.id);
        setTimeout(function(){wait.delete(message.author.id)}, 5000);
      }
      console.log(`[${chalk.green(moment().format("HH:mm:ss MM-DD-YYYY"))}]: Command ${chalk.blue(cmd.help.name)} uitgevoerd door ${chalk.yellow(message.author.username)} in ${chalk.cyan("pm")}`);
      permChecker.check("run", client);
    }
  }
}
exports.config = {
  enable: true
}
