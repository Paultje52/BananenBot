const command = require("bananenbase").command;
let emojis = global.emojis;

module.exports = class Zoek extends command {
  constructor(client) {
    super(client, {
      name: "zoek",
      description: "Zoek bananen!",
      category: "Economie",
      subCommands: ["search"]
    });
  }

  async run(message) {
    if (!message.author.settings.balance) message.author.settings = this.client.config.authorSettings;
    if (message.author.settings.next.search && message.author.settings.next.search > Date.now() && Math.round((message.author.settings.next.search-Date.now())/1000/60) >= 1) return message.channel.send(`Wacht ${Math.round((message.author.settings.next.search-Date.now())/1000/60)} minuten voordat je weer gaat zoeken!`);
    message.author.settings.next.search = Date.now()+1000*60*30;
    this.client.db.set(message.author.dbId, message.author.settings);
    let msg = await message.channel.send("Je begint met het zoeken naar bananen!");
    let object1 = emojis.buildings[Math.floor(Math.random() * emojis.buildings.length)];
    let object2 = emojis.buildings[Math.floor(Math.random() * emojis.buildings.length)];
    await wait(1000);
    msg.edit(`Je ziet twee objecten. Waar ga je kijken?`);
    msg.react(object1);
    msg.react(object2);
    let collector = msg.createReactionCollector((_reaction, user) => user.id === message.author.id, {time: 1000*60*60});
    collector.on("collect", async (reaction) => {
      msg.clearReactions();
      let change = Math.floor(Math.random()*6);
      collector.stop();
      if (change > 3) return msg.edit(`Helaas, er lag niets onder ${reaction._emoji.name}! Je hebt het zoeken opgegeven en je hebt niets gevonden!`);
      let amount = Math.floor(Math.random()*99)+1;
      await msg.edit(`Yes! Je hebt ${amount} bananen gevonden bij ${reaction._emoji.name}. Je gaat verder zoeken!`);
      await wait(2500);
      change = Math.floor(Math.random()*6);
      message.author.settings.balance += amount;
      this.client.db.set(message.author.dbId, message.author.settings);
      if (change > 3) return msg.edit(`Je hebt niets meer gevonden. Je hebt de ${amount} bananen megenomen en je bent terug gegaan.`);
      object1 = emojis.buildings[Math.floor(Math.random() * emojis.buildings.length)];
      object2 = emojis.buildings[Math.floor(Math.random() * emojis.buildings.length)];
      msg.edit(`Je hebt twee nieuwe objecten gevonden! Waar ga je nu kijken?`);
      msg.react(object1);
      msg.react(object2);
      collector = msg.createReactionCollector((_reaction, user) => user.id === message.author.id, {time: 1000*60*60});
      collector.on("collect", (reaction) => {
        msg.clearReactions();
        let change = Math.floor(Math.random()*6);
        collector.stop();
        if (change > 3) return msg.edit(`Helaas, er lag niets onder ${reaction._emoji.name}! Je hebt het zoeken opgegeven.\n> Totaal gevonden: ${amount} bananen.`);
        let secondAmount = Math.floor(Math.random()*99)+1;
        msg.edit(`Yes! Je hebt ${secondAmount} bananen gevonden bij ${reaction._emoji.name}. Je bent blij met wat je hebt gevonden en je stopt met zoeken!\n> Totaal gevonden: ${amount+secondAmount} bananen!`);
        message.author.settings.balance += secondAmount;
        this.client.db.set(message.author.dbId, message.author.settings);
      });
    });
  }
}

function wait(time) {
  return new Promise((res) => {
    setTimeout(res, time);
  });
}