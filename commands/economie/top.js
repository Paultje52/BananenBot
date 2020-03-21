const command = require("bananenbase").command;

module.exports = class Top extends command {
  constructor(client) {
    super(client, {
      name: "top",
      description: "Bekijk de top 10 gebruikers!",
      category: "Economie",
      subCommands: ["leader", "leaderboard"]
    });
  }

  async run(message) {
    if (!message.author.settings.balance) message.author.settings = this.client.config.authorSettings;
    if (!global.leaderboard) return message.channel.send("Sorry, ik ben nog aan het opstarten! Over ongeveer een halve minuut kan je het leaderboard command gebruiken!");
    global.leaderboard = await global.leaderboard.sort(async (a, b) => {
      a.settings = await this.client.db.get(`author-${a.id}`);
      b.settings = await this.client.db.get(`author-${b.id}`);
      if (!a.settings) a.settings = this.client.config.authorSettings;
      if (!b.settings) b.settings = this.client.config.authorSettings;
      if (!a.settings.balance) a.settings = this.client.config.authorSettings;
      if (!b.settings.balance) b.settings = this.client.config.authorSettings;
      return b.settings.balance-a.settings.balance;
    }).splice(0, 10);
    let msg = [];
    let done = 0;
    global.leaderboard.forEach(async (u, i) => {
      let bananen = await this.client.db.get(`author-${u.id}`);
      if (!bananen) return done++;
      if (!bananen.balance) bananen.balance = 1000;
      bananen = bananen.balance;
      msg.push(`${msg.length+1}. <@${u.id}> - ${bananen} bananen`);
      done++;
    });
    let i = setInterval(() => {
      if (done !== global.leaderboard.length) return;
      clearInterval(i);
      message.channel.send(message.embed()
        .setTitle("Top")
        .setDescription(msg.join("\n"))
      );
    });
  }
}
