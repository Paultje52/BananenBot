const command = require("bananenbase").command;
let emojis = global.emojis;

module.exports = class Steel extends command {
  constructor(client) {
    super(client, {
      name: "steel",
      description: "Steel bananen van andere mensen!",
      category: "Economie",
      subCommands: ["steal"]
    });
  }

  async run(message, args) {
    if (!message.author.settings.balance) message.author.settings = this.client.config.authorSettings;
    if (message.author.settings.next.steal && message.author.settings.next.steal > Date.now() && Math.round((message.author.settings.next.steal-Date.now())/1000/60) >= 1) return message.channel.send(`Wacht ${Math.round((message.author.settings.next.steal-Date.now())/1000/60)} minuten voordat je weer iemand gaat beroven!`);
    message.author.settings.next.steal = Date.now()+1000*60*30;
    this.client.db.set(message.author.dbId, message.author.settings);
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.error("Gebruiker niet gevonden!");
    member.user.settings = await this.client.db.get(`author-${message.author.id}`);
    if (!member.user.settings) member.user.settings = this.client.config.authorSettings;
    if (!member.user.settings.balance) member.user.settings = {
      balance: 1000,
      next: {},
      buildings: {},
      perMinute: 0,
      lastMoneyGive: Date.now()
    };

    let change = Math.floor(Math.random()*6);
    if (change >= 3) {
      message.author.settings.balance -= 150;
      this.client.db.set(message.author.dbId, message.author.settings);
      member.user.settings.balance += 150;
      this.client.db.set(`author-${member.id}`, member.user.settings);
      return message.channel.send(`Je bent betrapt tijdens het inbreken bij ${member.user.username}. Je moet 150 bananen boete betalen aan ${member.user.username}.`);
    }

    let msg = await message.channel.send(`Je begint met het zoeken naar bananen bij ${member.user.username}!`);
    let object1 = emojis.buildings[Math.floor(Math.random() * emojis.buildings.length)];
    let object2 = emojis.buildings[Math.floor(Math.random() * emojis.buildings.length)];
    await wait(1000);
    msg.edit(`Je ziet twee objecten in de tuin van ${member.user.username}. Waar ga je kijken?`);
    msg.react(object1);
    msg.react(object2);
    let collector = msg.createReactionCollector((_reaction, user) => user.id === message.author.id, {time: 1000*60*60});
    collector.on("collect", async (reaction) => {
      msg.clearReactions();
      let change = Math.floor(Math.random()*6);
      collector.stop();
      if (change > 3) return msg.edit(`Helaas, er lag niets onder ${reaction._emoji.name}! Je hoort ${member.user.username} aankomen en je rent weg. Je hebt niets kunnen stelen.`);
      let amount = Math.floor(Math.random()*49)+1;
      await msg.edit(`Yes! Je hebt ${amount} bananen gestolen bij ${reaction._emoji.name}. Je gaat verder zoeken!`);
      await wait(2500);
      change = Math.floor(Math.random()*6);
      message.author.settings.balance += amount;
      this.client.db.set(message.author.dbId, message.author.settings);
      member.user.settings.balance -= amount;
      this.client.db.set(`author-${member.id}`, member.user.settings);
      if (change >= 3) return msg.edit(`Je hebt niets meer gevonden. Je hebt de ${amount} bananen meegenomen.`);
      object1 = emojis.buildings[Math.floor(Math.random() * emojis.buildings.length)];
      object2 = emojis.buildings[Math.floor(Math.random() * emojis.buildings.length)];
      msg.edit(`Je hebt twee nieuwe objecten gevonden in de tuin van ${member.user.username}! Waar ga je nu kijken?`);
      msg.react(object1);
      msg.react(object2);
      collector = msg.createReactionCollector((_reaction, user) => user.id === message.author.id, {time: 1000*60*60});
      collector.on("collect", (reaction) => {
        msg.clearReactions();
        let change = Math.floor(Math.random()*6);
        collector.stop();
        if (change >= 3) return msg.edit(`Helaas, er lag niets onder ${reaction._emoji.name}! Je hoort ${member.user.username} aankomen en je besluit weg te gaan voordat je wordt gepakt.\n> Totaal gestolen: ${amount} bananen.`);
        let secondAmount = Math.floor(Math.random()*49)+1;
        msg.edit(`Yes! Je hebt ${secondAmount} bananen gestolen bij ${reaction._emoji.name}. Je bent blij met wat je hebt gestolen en je stopt met zoeken omdat het risico te groot is!\n> Totaal getolen: ${amount+secondAmount} bananen!`);
        message.author.settings.balance += secondAmount;
        this.client.db.set(message.author.dbId, message.author.settings);
        member.user.settings.balance -= secondAmount;
        this.client.db.set(`author-${member.id}`, member.user.settings);
      });
    });
  }
}

function wait(time) {
  return new Promise((res) => {
    setTimeout(res, time);
  });
}