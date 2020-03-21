const BananenBase = require("bananenbase");
global.emojis = {
  buildings: ["🎄", "🌳", "🌴", "🛁", "🛏️", "🏠", "🏚️", "🏡", "🗿", "🏦", "🏟️", "⛰️", "🏗️", "🏛️"]
};

new BananenBase({
  clientSettings: {
    disabledEvents: ["PRESENCE_UPDATE", "TYPING_START"],
    disableEveryone: true,
    messageCacheMaxSize: 100,
    messageCacheLifetime: 240,
    messageSweepInterval: 300,
    autoReconnect: true
  },
  token: "TOKEN",
  botConfig: {
    guildSettings: {
      embed: {
        color: "#34363c",
        footerText: "© BananenBot",
        footerImage: "BOTAVATAR",
        time: true
      },
      prefix: "!",
      dj: "dj"
    },
    authorSettings: {
      balance: 1000,
      next: {},
      buildings: {},
      perMinute: 0,
      lastMoneyGive: Date.now()
    },
    botOwners: ["327462385361092621"]
  },
  keepTrackOfDatabase: true,
  database: {
    package: "keyv",
    name: "storage.json",
    type: "sqlite",
    code: `${process.cwd()}/database.sqlite`
  },
  permissionLevels: [
    (client, message, args) => { // Permission level 0
      return true;
      // return message.channel.name.toLowerCase().includes("bot") || message.channel.parent.name.toLowerCase().includes("staff") || message.channel.parent.name.toLowerCase().includes("ticket") || message.channel.name.toLowerCase().includes("meme");
    }, (client, message, args) => { // Permission level 1
      if (message.member.roles.some(r => ["「」Moderator", "mod", "Mod", "noAutoMod"].includes(r.name))) return true;
      return false;
    }, (client, message, args) => { // Permission level 2
      if (message.member.roles.some(r => ["Giveaway", "giveaway", "admin"].includes(r.name)) || message.member.roles.some(r => r.name.toLowerCase().includes("staff") || r.name.toLowerCase().includes("developer"))) return true;
      return false;
    }, (client, message, args) => { // Permission level 3
      if (client.config.botOwners.includes(message.author.id)) return true; // A bot owner
      else return false; // No bot owner
    }
  ],
  ignore: {
    pm: true
  },
  language: "NL",
  bot: async (client) => {
    if (await client.db.get("restart")) {
      let restart = await client.db.get("restart");
      let channel = client.channels.find("id", restart.channel);
      let message = await channel.fetchMessage(restart.message);
      await client.db.delete("restart");
      console.log(`Bot successfull restarted! Took ${(Date.now()-restart.date)/1000} seconds.`);
      message.edit(`Restart compleat: took **${(Date.now()-restart.date)/1000} seconds**.`);
    }

    setInterval(() => {
      client.user.setPresence({ game: { name: `op ${client.guilds.size} servers`, type: "playing"}}); 
    }, 15000);
    calculateLeaderboard(client)
  }
});

function calculateLeaderboard(client) {
  let users = [];
  let done = 0;
  client.users.forEach(async (user) => {
    if (!user.settings) user.settings = await client.db.get(`author-${user.id}`);
    if (user.settings) {
      if (!user.settings.balance) user.settings.balance = client.config.authorSettings;
      users.push(user);
    }
    done++;
  });
  let i = setInterval(() => {
    if (done !== client.users.size) return;
    clearInterval(i);
    global.leaderboard = users.sort((a, b) => b.settings.balance-a.settings.balance).splice(0, 10);
    setTimeout(() => {
      calculateLeaderboard(client);
    }, 1000);
  });
}