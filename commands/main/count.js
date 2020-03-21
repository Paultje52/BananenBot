const command = require("bananenbase").command;
const os = require("os");

module.exports = class stats extends command {
  constructor(client) {
    super(client, {
      name: "count",
      description: "Bekijk de nummers van deze server!",
      category: "Main",
      subCommands: []
    });
  }

  async run(message) {
    message.channel.send(message.embed()
      .setTitle("Count")
      .setColor("#d60000")
      .setDescription(`**${message.guild.name}** heeft **${message.guild.channels.size}** channels, **${message.guild.members.size}** members, **${message.guild.roles.size}** rollen en **${message.guild.emojis.size}** emojis.`)
    );
  }
}
