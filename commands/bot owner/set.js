const command = require("bananenbase").command;

module.exports = class setBananen extends command {
  constructor(client) {
    super(client, {
      name: "setbananen",
      description: "Set Bananen to users!",
      category: "Bot owner",
      args: ["@member: required", "amount: required"]
    }, {
      permLevel: 3
    });
  }

  async run(message, args) {
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.error("Member not found!");
    member.user.dbId = `author-${member.id}`;
    member.user.settings = await this.client.db.get(member.user.dbId);
    if (!member.user.settings) member.user.settings = await this.client.config.authorSettings;

    let number = Number(args[1]);
    if (number != 0 && (!number || isNaN(number))) return message.error("Number not found!");

    member.user.settings.balance = number;
    await this.client.db.set(member.user.dbId, member.user.settings);
    message.channel.send("Done!");
  }
}
