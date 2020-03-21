const event = require("bananenbase").event;
const discord = require("discord.js");

module.exports = class JoinLeave extends event {
  constructor(client) {
    super(client, {
      name: "guildMemberAdd"
    });
  }

  async run(member) {
    if (member.guild.id !== "393475468508004364") return; 
    
    let channel = member.guild.channels.find(c => c.id === "679355936393134120");
    if (channel) {
      channel.send(new discord.RichEmbed()
        .setTitle(`Welkom, ${member.user.username}`)
        .setColor("#00ff00")
        .setDescription(`Veel plezier in **${member.guild.name}**.\nEr zijn nu ${member.guild.members.size} members!`)
        .setThumbnail(member.user.displayAvatarURL)
      );
    }
  }
}