const chalk = require('chalk');
module.exports.check = (type, client) => {
  if (type === "run") {
    let message = client.messsage;
    let args = client.args;
    let cmd = client.cmd;
    let config = client.config.main;
    let data = client.data;
    let dirname = client.dirname;
    let cat = cmd.help.category;
    try {
      const command = require(`${dirname}/commands/${cat}/${cmd.help.name}.js`);
    } catch(err) {
      try {
        const command = require(`${dirname}/commands/${cmd.help.name}.js`);
      } catch(err2) {
        console.log(err);
        if (err2) throw chalk.red("Command niet kunnen vinden!");
      }
      const command = require(`${dirname}/commands/${cmd.help.name}.js`);
    }
    const command = require(`${dirname}/commands/${cat}/${cmd.help.name}.js`);
    try {
      let enable = command.help.enable;
      let guildPermission = command.help.guildPermission;
      let userPermission = command.help.userPermission;
      let guildOnly = command.config.guildOnly;
    } catch(err) {
      if (err) throw chalk.red(`${cmd} heeft geen complete config!`);
    }
    let enable = command.config.enable;
    let guildPermission = command.config.guildPermission;
    let userPermission = command.config.userPermission;
    let guildOnly = command.config.guildOnly;
    if (enable !== true) return;
    if (guildOnly === true && client.guild === false) return client.message.channel.send(`Je kunt het command **${command.help.name}** niet uitvoeren in PM!\nReden: **Is disabled in PM**`);
    if (client.guild === false && guildPermission !== 0) return client.message.channel.send(`Je kunt het command **${command.help.name}** niet uitvoeren in PM!\nReden: **Heeft guild permissions**`);
    if (client.guild === false && userPermission !== 0) return client.message.channel.send(`Je kunt het command **${command.help.name}** niet uitvoeren in PM!\nReden: **Heeft user permissions**`);
    if (client.guild === true) {
      if (guildPermission === 1 && !config.ownerId.includes(client.message.author.id) && !client.guildPermission4.includes(client.message.guild.id) && !client.guildPermission5.includes(client.message.guild.id) && !client.guildPermission3.includes(client.message.guild.id) && !client.guildPermission2.includes(client.message.guild.id) && !client.guildPermission1.includes(client.message.guild.id)) return;
      if (guildPermission === 2 && !config.ownerId.includes(client.message.author.id) && !client.guildPermission4.includes(client.message.guild.id) && !client.guildPermission5.includes(client.message.guild.id) && !client.guildPermission3.includes(client.message.guild.id) && !client.guildPermission2.includes(client.message.guild.id)) return;
      if (guildPermission === 3 && !config.ownerId.includes(client.message.author.id) && !client.guildPermission4.includes(client.message.guild.id) && !client.guildPermission5.includes(client.message.guild.id) && !client.guildPermission3.includes(client.message.guild.id)) return;
      if (guildPermission === 4 && !config.ownerId.includes(client.message.author.id) && !client.guildPermission4.includes(client.message.guild.id) && !client.guildPermission5.includes(client.message.guild.id)) return;
      if (guildPermission === 5 && !config.ownerId.includes(client.message.author.id) && !client.guildPermission5.includes(client.message.guild.id)) return;
      if (userPermission === 1 && !config.ownerId.includes(client.message.author.id) && !client.message.member.roles.some(r => [data.get(`role.member`)].includes(r.name)) && client.message.author.id !== client.message.guild.owner.id) return client.message.reply(`je moet de rol **${data.get(`role.member`)}** hebben om het command **${cmd.help.name}** uit te voeren!`);
      if (userPermission === 2 && !config.ownerId.includes(client.message.author.id) && !client.message.member.roles.some(r => [data.get(`role.dj`)].includes(r.name)) && client.message.author.id !== client.message.guild.owner.id) return client.message.reply(`je moet de rol **${data.get(`role.dj`)}** hebben om het command **${cmd.help.name}** uit te voeren!`);
      if (userPermission === 3 && !config.ownerId.includes(client.message.author.id) && !client.message.member.roles.some(r => [data.get(`role.color`)].includes(r.name)) && client.message.author.id !== client.message.guild.owner.id) return client.message.reply(`je moet de rol **${data.get(`role.color`)}** hebben om het command **${cmd.help.name}** uit te voeren!`);
      if (userPermission === 4 && !config.ownerId.includes(client.message.author.id) && !client.message.member.roles.some(r => [data.get(`role.moderator`)].includes(r.name)) && client.message.author.id !== client.message.guild.owner.id) return client.message.reply(`je moet de rol **${data.get(`role.moderator`)}** hebben om het command **${cmd.help.name}** uit te voeren!`);
      if (userPermission === 5 && !config.ownerId.includes(client.message.author.id) && !client.message.member.roles.some(r => [data.get(`role.admin`)].includes(r.name)) && client.message.author.id !== client.message.guild.owner.id) return client.message.reply(`je moet de rol **${data.get(`role.admin`)}** hebben om het command **${cmd.help.name}** uit te voeren!`);
      if (userPermission === 6 && !config.ownerId.includes(client.message.author.id) && client.message.author.id !== client.message.guild.owner.id) return client.message.reply(`je moet de owner van deze server zijn om het command **${cmd.help.name}** uit te voeren!`);
      if (userPermission === 7 && !config.ownerId.includes(client.message.author.id)) return;
      command.run(client);
    } else {
      command.run(client);
    }
  } else if (type === "help") {
    let message = client.messsage;
    let args = client.args;
    let cmd = client.cmd;
    let config = client.config.main;
    let data = client.data;
    let dirname = client.dirname;
    let cat = cmd.help.category;
    try {
      const command = require(`${dirname}/commands/${cat}/${cmd.help.name}.js`);
    } catch(err) {
      try {
        const command = require(`${dirname}/commands/${cmd.help.name}.js`);
      } catch(err2) {
        console.log(err);
        if (err) throw chalk.red("Command niet kunnen vinden!");
      }
      const command = require(`${dirname}/commands/${cmd.help.name}.js`);
    }
    const command = require(`${dirname}/commands/${cat}/${cmd.help.name}.js`);
    let enable = command.config.enable;
    let guildPermission = command.config.guildPermission;
    let userPermission = command.config.userPermission;
    let guildOnly = command.config.guildOnly;
    if (enable !== true) return false;
    if (guildOnly === true && client.guild === false) return false;
    if (client.guild === false && guildPermission !== 0) return false;
    if (client.guild === false && userPermission !== 0) return false;
    if (client.guild === true) {
      if (guildPermission === 1 && !config.ownerId.includes(client.message.author.id) && !client.guildPermission4.includes(client.message.guild.id) && !client.guildPermission5.includes(client.message.guild.id) && !client.guildPermission3.includes(client.message.guild.id) && !client.guildPermission2.includes(client.message.guild.id) && !client.guildPermission1.includes(client.message.guild.id)) return false;
      if (guildPermission === 2 && !config.ownerId.includes(client.message.author.id) && !client.guildPermission4.includes(client.message.guild.id) && !client.guildPermission5.includes(client.message.guild.id) && !client.guildPermission3.includes(client.message.guild.id) && !client.guildPermission2.includes(client.message.guild.id)) return false;
      if (guildPermission === 3 && !config.ownerId.includes(client.message.author.id) && !client.guildPermission4.includes(client.message.guild.id) && !client.guildPermission5.includes(client.message.guild.id) && !client.guildPermission3.includes(client.message.guild.id)) return false;
      if (guildPermission === 4 && !config.ownerId.includes(client.message.author.id) && !client.guildPermission4.includes(client.message.guild.id) && !client.guildPermission5.includes(client.message.guild.id)) return false;
      if (guildPermission === 5 && !config.ownerId.includes(client.message.author.id) && !client.guildPermission5.includes(client.message.guild.id)) return false;
      if (userPermission === 1 && !config.ownerId.includes(client.message.author.id) && !client.message.member.roles.some(r => [data.get(`role.member`)].includes(r.name)) && client.message.author.id !== client.message.guild.owner.id) return false;
      if (userPermission === 2 && !config.ownerId.includes(client.message.author.id) && !client.message.member.roles.some(r => [data.get(`role.dj`)].includes(r.name)) && client.message.author.id !== client.message.guild.owner.id) return false;
      if (userPermission === 3 && !config.ownerId.includes(client.message.author.id) && !client.message.member.roles.some(r => [data.get(`role.color`)].includes(r.name)) && client.message.author.id !== client.message.guild.owner.id) return false;
      if (userPermission === 4 && !config.ownerId.includes(client.message.author.id) && !client.message.member.roles.some(r => [data.get(`role.moderator`)].includes(r.name)) && client.message.author.id !== client.message.guild.owner.id) return false;
      if (userPermission === 5 && !config.ownerId.includes(client.message.author.id) && !client.message.member.roles.some(r => [data.get(`role.admin`)].includes(r.name)) && client.message.author.id !== client.message.guild.owner.id) return false;
      if (userPermission === 6 && !config.ownerId.includes(client.message.author.id) && client.message.author.id !== client.message.guild.owner.id) return false;
      if (userPermission === 7 && !config.ownerId.includes(client.message.author.id)) return false;
      return true;
    } else return true;
  } else throw chalk.red(`Type ${type} is niet geldig! Kies uit HELP of RUN!`);
}
