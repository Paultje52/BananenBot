const Discord = require("discord.js");
exports.run = async (client) => {
  const permChecker = require(`${client.dirname}/custom_modules/permChecker`);
  let data = client.data;
  let config = client.config;
  let message = client.message;
  let args = client.args;
  let capitalizeFirstLetter = client.function.capitalizeFirstLetter;
  let cmds = "";
  let i;
  let prefix;
  if (client.guild === false) prefix = config.main.prefix;
  else prefix = data.get("prefix");
  if (!args[0]) {
    let cmdDingen = {};
    cmdDingen.name = {};
    cmdDingen.data = {};
    cmdDingen.overige = [];
    await client.commands.forEach(async (command) => {
      client.message = message;
      client.cmd = command;
      let value = await permChecker.check("help", client);
      if (value !== true) return;
      cmdDingen.name[command.help.category] = command.help.category;
      if (!cmdDingen.data[command.help.category]) {
        cmdDingen.data[command.help.category] = `\`${prefix}${command.help.name}\`\n`;
        cmdDingen.overige.push(command.help.category);
      } else {
        cmdDingen.data[command.help.category] += `\`${prefix}${command.help.name}\`\n`;
      }
    });
    let embed = new Discord.RichEmbed().setTitle("Help").setDescription(`**${client.commands.size}** commands in **${cmdDingen.overige.length}** categorieën!`).setFooter(`${prefix}help <command/plugin> voor specefieke hulp!`);
    for (i = 0; i < Object.keys(cmdDingen.data).length; i++) {
      if (cmdDingen.overige[i] === "fun" && data.get("plugin.fun") === "false") {
      } else if (cmdDingen.overige[i] === "main" && data.get("plugin.main") === "false") {
        embed.addField(`__Main__`, `\`${prefix}help\`\n\`${prefix}invite\``, true);
      } else {
        let name = await capitalizeFirstLetter.run(client, cmdDingen.overige[i]);
        let commands = await capitalizeFirstLetter.run(client, cmdDingen.data[cmdDingen.overige[i]]);
        if (commands === false) return;
        embed.addField(`__${name}__`, commands, true);
      }
    }
    if (data) {
      if (data.get("color") !== "none") embed.setColor(data.get("color"));
      else embed.setColor("#36393e");
      if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
    } else embed.setColor("#36393e");
    message.channel.send(embed);
  } else {
    let cmd = client.commands.get(args[0]);
    if (cmd === undefined) cmd = client.subCommands.get(args[0]);
    if (cmd) {
      for (i = 0; i < cmd.help.extraCommands.length; i++) {
        cmds += `**- **\`${cmd.help.extraCommands[i]}\`\n`;
      }
      let embed = new Discord.RichEmbed().setTitle("Help");
      if (cmd.help.extraCommands.length === 0) embed.setDescription(`**<>** is verpicht. **[]** is optioneel.\nHelp voor het command **${args[0]}**:\n**Naam:** ${cmd.help.name}\n**Gebruik:** \`${prefix}${cmd.help.usage}\`\n**Beschrijving:** ${cmd.help.description}\n**Categorie:** ${cmd.help.category}\n**Geen extra commands!**`);
      else embed.setDescription(`**<>** is verpicht. **[]** is optioneel.\nHelp voor het command **${args[0]}**:\n**Naam:** ${cmd.help.name}\n**Gebruik:** \`${prefix}${cmd.help.usage}\`\n**Beschrijving:** ${cmd.help.description}\n**Categorie:** ${cmd.help.category}\n**Extra commands (${cmd.help.extraCommands.length}):** \n${cmds}`);
      if (data) {
        if (data.get("color") !== "none") embed.setColor(data.get("color"));
        else embed.setColor("#36393e");
        if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
      } else embed.setColor("#36393e");
      message.channel.send(embed);
    } else {
      await client.commands.filter(c => args[0].toLowerCase() === c.help.category.toLowerCase()).forEach(async (command) => {
        client.message = message;
        client.cmd = command;
        let value = await permChecker.check("help", client);
        if (value !== true) return;
        cmds += `\`${prefix}${command.help.usage}\` - **${command.help.description}**\n`;
      });
      if (cmds === "") return message.reply("geen command/category gevonden!");
      let embed = new Discord.RichEmbed().setTitle("Help").setDescription(`**<>** is verpicht. **[]** is optioneel.\nHelp voor de categorie **${args[0]}**:\n\n${cmds}`);
      if (data) {
        if (data.get("color") !== "none") embed.setColor(data.get("color"));
        else embed.setColor("#36393e");
        if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
      } else embed.setColor("#36393e");
      message.channel.send(embed);
    }
  }
}
exports.help = {
  name: "help",
  usage: "help <command>",
  description: "Krijg hulp met de bot!",
  category: "main",
  extraCommands: ["?"]
}
exports.config = {
  enable: true,
  guildPermission: 0,
  userPermission: 0,
  guildOnly: false
}
