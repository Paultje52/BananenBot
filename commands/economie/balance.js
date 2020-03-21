const command = require("bananenbase").command;

module.exports = class Balance extends command {
  constructor(client) {
    super(client, {
      name: "bananen",
      description: "Bekijk hoeveel bananen je hebt!",
      category: "Economie",
      subCommands: ["bal", "buildings", "building", "gebouw", "gebouwen", "balance"],
      args: ["@gebruiker: optional"]
    });
  }

  async run(message, args) {
    if (!message.author.settings.balance) message.author.settings = this.client.config.authorSettings;
    if (!args[0]) {
      let buildingsTotal = 0;
      let buildings = [];
      for (let i in message.author.settings.buildings) {
        buildingsTotal += message.author.settings.buildings[i];
        buildings.push(`${message.author.settings.buildings[i]}x ${i}`);
      }
      message.channel.send(message.embed()
        .setTitle("Balance")
        .setDescription(`Hallo, ${message.author.username}! Je hebt op dit moment ${message.author.settings.balance} bananen!\nJe verdient op dit moment ${message.author.settings.perMinute} bananen per minuut.`)
        // .addField("Gebouwen", `> Aantal: ${buildingsTotal}\n${buildings.join("\n")}`)
      );
    } else {
      let member = message.mentions.members.first() || message.guild.members.get(args[0]);
      if (!member) return message.error("Gebruiker niet gevonden!");
      member.user.settings = await this.client.db.get(`author-${message.author.id}`);
      if (!member.user.settings) member.user.settings = this.client.config.authorSettings;
      if (!member.user.settings.balance) member.user.settings = this.client.config.authorSettings;

      let buildingsTotal = 0;
      let buildings = [];
      for (let i in member.user.settings.economy.buildings) {
        buildingsTotal += member.user.settings.economy.buildings[i];
        buildings.push(`${member.user.settings.economy.buildings[i]}x ${i}`);
      }
      message.channel.send(message.embed()
        .setTitle(`Balance van ${member.user.username}`)
        .setDescription(`${member.user.username} heeft op dit moment ${member.user.settings.economy.balance} bananen!\n${member.user.username} verdient op dit moment ${member.user.settings.economy.perMinute} bananen per minuut.`)
        // .addField("Gebouwen", `> Aantal: ${buildingsTotal}\n${buildings.join("\n")}`)
      );
    }
  }
}
