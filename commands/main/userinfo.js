const command = require("bananenbase").command;
const moment = require("moment");

module.exports = class UserTracking extends command {
  constructor(client) {
    super(client, {
      name: "userinfo",
      description: "Bekijk de gebruikersinformatie van iemand!",
      category: "Main",
      subCommands: ["info"]
    });
  }

  async run(message, args) {
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) member = message.member;

    let invites = 0;
    let guildInvites = await member.guild.fetchInvites();
    guildInvites.forEach(invite => {
      if (invite.inviter.id === member.user.id) invites += invite.uses;
    });

    message.channel.send(message.embed()
      .setTitle(`Userinfo - ${member.user.username}`)
      .setColor("#d60000")
      .setThumbnail(member.user.avatarURL)
      .setDescription(`Volledige Discord Naam: **${member.user.tag}**\nHoogste rol: **${member.highestRole.name}**\nGejoint op: **${moment(member.joinedTimestamp).format("DD-MM-YYYY [om] HH:mm")}**\nBot: **${isBot(member)}**\nInvites: **${invites}**`)
    );
  }
}

function isBot(member) {
  if (member.user.bot) return "ja";
  return "nee";
}
