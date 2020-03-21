const command = require("bananenbase").command;
const os = require("os");

module.exports = class stats extends command {
  constructor(client) {
    super(client, {
      name: "serverinfo",
      description: "Krijg de server info!",
      category: "Main",
      subCommands: []
    });
  }

  async run(message) {
    message.channel.send(message.embed()
      .setTitle("Serverinfo")
      .setColor("#d60000")
      .setDescription(`Naam: **${message.guild.name}**\nEmojis: **${message.guild.emojis.size}**\nOwner: **<@${message.guild.ownerID}>**\nRegio: **${message.guild.region}**\nChannels: **${message.guild.channels.size}**\nUsers: **${message.guild.members.size}**\nRollen: **${message.guild.roles.size}**`)
    );
  }
}
