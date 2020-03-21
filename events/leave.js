const event = require("bananenbase").event;
const discord = require("discord.js");

module.exports = class JoinLeave extends event {
  constructor(client) {
    super(client, {
      name: "guildMemberRemove"
    });
  }

  async run(member) {
    if (member.guild.id !== "393475468508004364") return; 
    
    let channel = member.guild.channels.find(c => c.id === "679355936393134120");
    if (channel) {
      channel.send(new discord.RichEmbed()
        .setTitle(`Doei doei, ${member.user.username}`)
        .setColor("#ff0000")
        .setDescription(`Hopelijk zien we je snel terug!\nEr zijn nog ${member.guild.members.size} members in ${member.guild.name}.`)
        .setThumbnail(member.user.displayAvatarURL)
      );
    }
  }
}