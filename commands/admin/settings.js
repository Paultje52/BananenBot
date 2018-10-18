const Discord = require("discord.js");
exports.run = async (client) => {
  let data = client.data;
  let config = client.config;
  let message = client.message;
  let args = client.args;
  let am = client.function.awaitMessage;
  let rollen = "";
  if (!args[0]) {
    let embed = new Discord.RichEmbed().setTitle("Settings").setDescription(`Doe **${data.get("prefix")}settings <gedeelte> <setting>** om een setting aan te passen! Vervolgens moet je in een **nieuw** bericht opgeven wat de nieuwe value moet zijn!`)
    .addField("Main", `Prefix: **${data.get("prefix")}**\n:moneybag: Kleur: **${data.get("color")}**\n:moneybag: Thumbnail: **${data.get("thumbnail")}**`, true)
    .addField("Plugins", `Main: ${data.get("pluginview.main")}\nFun: ${data.get("pluginview.fun")}\nModerator: **#soon**`, true)
    .addField("Rollen", `Admin: **${data.get("role.admin")}**`, true)
    .setFooter("💰 = Donator only!");
    if (data) {
      if (data.get("color") !== "none") embed.setColor(data.get("color"));
      else embed.setColor("#36393e");
      if (data.get("thumbnail") !== "none") embed.setThumbnail(data.get("thumbnail"))
    } else embed.setColor("#36393e");
    message.channel.send(embed);
  } else {
    if (!message.channel.permissionsFor(message.guild.me).has("MANAGE_MESSAGES")) return message.channel.send("Ik kan geen berichten verwijderen!");
    if (args[0].toLowerCase() === "main") {
      if (!args[1]) {
        let embed = new Discord.RichEmbed().setTitle("Settings").setDescription(`Settings van **${args[0]}**:`)
        .addField("Main", `Prefix: **${data.get("prefix")}**\n:moneybag: Kleur: **${data.get("color")}**\n:moneybag: Thumbnail: **${data.get("thumbnail")}**`)
        .setFooter("💰 = Donator only!")
        if (data) {
          if (data.get("color") !== "none") embed.setColor(data.get("color"));
          else embed.setColor("#36393e");
          if (data.get("thumbnail") !== "none") embed.setThumbnail(data.get("thumbnail"))
        } else embed.setColor("#36393e");
        message.channel.send(embed);
      } else {
        if (args[1].toLowerCase() === "prefix") {
          let antwoord = await am.run(message, true, "wat moet de nieuwe prefix zijn?", "reply");
          data.set("prefix", antwoord.content);
          let embed = new Discord.RichEmbed().setTitle("Settings").setDescription(`De prefix is nu **${antwoord.content}**!`);
          if (data) {
            if (data.get("color") !== "none") embed.setColor(data.get("color"));
            else embed.setColor("#36393e");
            if (data.get("thumbnail") !== "none") embed.setThumbnail(data.get("thumbnail"))
          } else embed.setColor("#36393e");
          message.channel.send(embed);
        } else if (args[1].toLowerCase() === "kleur") {
          if (!client.guildPermission1.includes(message.guild.id) && !client.guildPermission2.includes(message.guild.id) && !client.guildPermission3.includes(message.guild.id) && !client.guildPermission4.includes(message.guild.id) && !client.guildPermission5.includes(message.guild.id) && !client.config.main.ownerId.includes(message.author.id)) {
            let embed = new Discord.RichEmbed().setTitle("Settings").setDescription(`Error: Deze server moet donator of hoger zijn om deze setting aan te passen!\nKoop donator of hoger op de [support server](https://bit.ly/bananendiscord) om deze setting aan te kunnen passen!`);
            if (data) {
              if (data.get("color") !== "none") embed.setColor(data.get("color"));
              else embed.setColor("#36393e");
              if (data.get("thumbnail") !== "none") embed.setThumbnail(data.get("thumbnail"))
            } else embed.setColor("#36393e");
            return message.channel.send(embed);
          }
          await getAntwoord1();
          async function getAntwoord1() {
            let antwoord1 = await am.run(message, true, "**standaardkleur** of **hex**?", "reply");
            if (antwoord1.content.toLowerCase().includes("stop")) {
              antwoord1.delete();
              return message.channel.send("Ik stop!");
            }
            if (!antwoord1.content.toLowerCase().includes("standaardkleur") && !antwoord1.content.toLowerCase().includes("hex")) return await getAntwoord1();
            if (antwoord1.content.toLowerCase().includes("standaardkleur")) {
              await getStandaardKleur();
              async function getStandaardKleur() {
                setTimeout(async function(){
                  await am.run(message, true, "Welke standaardkleur? Kies uit: **none**, **rood**, **oranje**, **geel**, **groen**, **lichtblauw**, **donkerblauw**, **roze** of **paars**?").then(async (standaardkleur) => {
                    if (standaardkleur.content.includes("stop")) {
                      standaardkleur.delete();
                      return message.channel.send("Ik stop!");
                    }
                    if (!standaardkleur.content.includes("none") && !standaardkleur.content.includes("rood") && !standaardkleur.content.includes("oranje") && !standaardkleur.content.includes("geel") && !standaardkleur.content.includes("groen") && !standaardkleur.content.includes("lichtblauw") && !standaardkleur.content.includes("donkerblauw") && !standaardkleur.content.includes("roze") && !standaardkleur.content.includes("paars")) return getStandaardKleur();
                    let content = standaardkleur.content;
                    if (content.includes("none")) data.set("color", "none");
                    if (content.includes("rood")) data.set("color", "#ff0000");
                    if (content.includes("oranje")) data.set("color", "#ff9d00");
                    if (content.includes("geel")) data.set("color", "#faff00");
                    if (content.includes("groen")) data.set("color", "#00ff00");
                    if (content.includes("lichtblauw")) data.set("color", "#00ffff");
                    if (content.includes("donkerblauw")) data.set("color", "#0000ff");
                    if (content.includes("roze")) data.set("color", "#ff00e5");
                    if (content.includes("paars")) data.set("color", "#cb00ff");
                    let embed = new Discord.RichEmbed().setTitle("Settings").setDescription(`De serverkleur is nu **${content}**!`);
                    if (data) {
                      if (data.get("color") !== "none") embed.setColor(data.get("color"));
                      else embed.setColor("#36393e");
                      if (data.get("thumbnail") !== "none") embed.setThumbnail(data.get("thumbnail"))
                    } else embed.setColor("#36393e");
                    message.channel.send(embed);
                  });
                }, 100);
              }
            } else {
              await getHEX();
              async function getHEX() {
                let hex = await am.run(message, true, "Welke hex? Ga naar de [color picker](https://www.google.nl/search?q=color+picker&oq=color+picker&aqs=chrome..69i57j69i60j35i39j0l3.2583j1j7&sourceid=chrome&ie=UTF-8) en kies een kleur uit. Vervolgens kan je de hex (# en dan 6 cijfers) links zien. Die vul je hier onder in:");
                if (hex.content.toLowerCase().includes("stop")) {
                  hex.delete();
                  return message.channel.send("Ik stop!");
                }
                if (!hex.content.startsWith("#")) return await getHEX();
                data.set("color", `${hex.content}`);
                let embed = new Discord.RichEmbed().setTitle("Settings").setDescription(`De serverkleur is nu **${hex.content}**!`);
                if (data) {
                  if (data.get("color") !== "none") embed.setColor(data.get("color"));
                  else embed.setColor("#36393e");
                  if (data.get("thumbnail") !== "none") embed.setThumbnail(data.get("thumbnail"))
                } else embed.setColor("#36393e");
                message.channel.send(embed);
              }
            }
          }
        } else if (args[1].toLowerCase() === "thumbnail") {
          if (!client.guildPermission1.includes(message.guild.id) && !client.guildPermission2.includes(message.guild.id) && !client.guildPermission3.includes(message.guild.id) && !client.guildPermission4.includes(message.guild.id) && !client.guildPermission5.includes(message.guild.id) && !client.config.main.ownerId.includes(message.author.id)) {
            let embed = new Discord.RichEmbed().setTitle("Settings").setDescription(`Error: Deze server moet donator of hoger zijn om deze setting aan te passen!\nKoop donator of hoger op de [support server](https://bit.ly/bananendiscord) om deze setting aan te kunnen passen!`);
            if (data) {
              if (data.get("color") !== "none") embed.setColor(data.get("color"));
              else embed.setColor("#36393e");
              if (data.get("thumbnail") !== "none") embed.setThumbnail(data.get("thumbnail"))
            } else embed.setColor("#36393e");
            return message.channel.send(embed);
          }
          await getThumbnail();
          async function getThumbnail() {
            let thumbnail = await am.run(message, true, "Wat moet de serverthumbnail zijn? Het moet een link zijn, of het moet 'none' zijn als je geen server thumbnail wilt!");
            if (thumbnail.content.toLowerCase().includes("stop")) {
              thumbnail.delete();
              return message.channel.send("Ik stop!");
            }
            if (!thumbnail.content.toLowerCase().startsWith("http" || "https") && !thumbnail.content.toLowerCase().includes("none")) return await getThumbnail();
            if (thumbnail.content.toLowerCase().includes("none")) data.set("thumbnail", "none");
            else data.set("thumbnail", `${thumbnail.content}`);
            let embed = new Discord.RichEmbed().setTitle("Settings").setDescription(`De serverthumbnail is nu **${thumbnail.content}**!`);
            if (data) {
              if (data.get("color") !== "none") embed.setColor(data.get("color"));
              else embed.setColor("#36393e");
              if (data.get("thumbnail") !== "none") embed.setThumbnail(data.get("thumbnail"))
            } else embed.setColor("#36393e");
            message.channel.send(embed);
          }
        } else {
          let embed = new Discord.RichEmbed().setTitle("Settings").setDescription(`Error: Kies uit **prefix** en voor donators **kleur** en **thumbnail**!`);
          if (data) {
            if (data.get("color") !== "none") embed.setColor(data.get("color"));
            else embed.setColor("#36393e");
            if (data.get("thumbnail") !== "none") embed.setThumbnail(data.get("thumbnail"))
          } else embed.setColor("#36393e");
          message.channel.send(embed);
        }
      }
    } else if (args[0].toLowerCase() === "plugins" || args[0].toLowerCase() === "plugin") {
      if (!args[1]) {
        let embed = new Discord.RichEmbed().setTitle("Settings").setDescription(`Settings van **${args[0]}**:`)
        .addField("Plugins", `Main: ${data.get("pluginview.main")}\nFun: ${data.get("pluginview.fun")}\nModerator: **#soon**`, true)
        .setFooter("💰 = Donator only!")
        if (data) {
          if (data.get("color") !== "none") embed.setColor(data.get("color"));
          else embed.setColor("#36393e");
          if (data.get("thumbnail") !== "none") embed.setThumbnail(data.get("thumbnail"))
        } else embed.setColor("#36393e");
        message.channel.send(embed);
      } else if (args[1].toLowerCase() === "main") {
        let antwoord = await am.run(message, true, "wil je de **main** plugin **aan** of **uit** zetten?", "reply");
        if (antwoord.content.toLowerCase().includes("stop")) {
          antwoord.delete();
          return message.channel.send("Ik stop!");
        }
        if (antwoord.content === "aan") {
          data.set("plugin.main", "true");
          data.set("pluginview.main", ":white_check_mark:");
          let embed = new Discord.RichEmbed().setTitle("Settings").setDescription(`De plugin **main** staat nu **aan**!`);
          if (data) {
            if (data.get("color") !== "none") embed.setColor(data.get("color"));
            else embed.setColor("#36393e");
            if (data.get("thumbnail") !== "none") embed.setThumbnail(data.get("thumbnail"))
          } else embed.setColor("#36393e");
          message.channel.send(embed);
        } else if (antwoord.content === "uit") {
          data.set("plugin.main", "false");
          data.set("pluginview.main", ":x:");
          let embed = new Discord.RichEmbed().setTitle("Settings").setDescription(`De plugin **main** staat nu **uit**!`);
          if (data) {
            if (data.get("color") !== "none") embed.setColor(data.get("color"));
            else embed.setColor("#36393e");
            if (data.get("thumbnail") !== "none") embed.setThumbnail(data.get("thumbnail"))
          } else embed.setColor("#36393e");
          message.channel.send(embed);
        }
      } else if (args[1].toLowerCase() === "fun") {
        let antwoord = await am.run(message, true, "wil je de **fun** plugin **aan** of **uit** zetten?", "reply");
        if (antwoord.content.toLowerCase().includes("stop")) {
          antwoord.delete();
          return message.channel.send("Ik stop!");
        }
        if (antwoord.content === "aan") {
          data.set("plugin.fun", "true");
          data.set("pluginview.fun", ":white_check_mark:");
          let embed = new Discord.RichEmbed().setTitle("Settings").setDescription(`De plugin **fun** staat nu **aan**!`);
          if (data) {
            if (data.get("color") !== "none") embed.setColor(data.get("color"));
            else embed.setColor("#36393e");
            if (data.get("thumbnail") !== "none") embed.setThumbnail(data.get("thumbnail"))
          } else embed.setColor("#36393e");
          message.channel.send(embed);
        } else if (antwoord.content === "uit") {
          data.set("plugin.fun", "false");
          data.set("pluginview.fun", ":x:");
          let embed = new Discord.RichEmbed().setTitle("Settings").setDescription(`De plugin **fun** staat nu **uit**!`);
          if (data) {
            if (data.get("color") !== "none") embed.setColor(data.get("color"));
            else embed.setColor("#36393e");
            if (data.get("thumbnail") !== "none") embed.setThumbnail(data.get("thumbnail"))
          } else embed.setColor("#36393e");
          message.channel.send(embed);
        }
      } else if (args[1].toLowerCase() === "moderator") {
        let embed = new Discord.RichEmbed().setTitle("Settings").setDescription(`Moderator is binnenkort beschikbaar!`);
        if (data) {
          if (data.get("color") !== "none") embed.setColor(data.get("color"));
          else embed.setColor("#36393e");
          if (data.get("thumbnail") !== "none") embed.setThumbnail(data.get("thumbnail"))
        } else embed.setColor("#36393e");
        message.channel.send(embed);
      } else {
        let embed = new Discord.RichEmbed().setTitle("Settings").setDescription(`Error: Plugin niet gevonden! Kies uit **main**, **fun** of **moderator**`);
        if (data) {
          if (data.get("color") !== "none") embed.setColor(data.get("color"));
          else embed.setColor("#36393e");
          if (data.get("thumbnail") !== "none") embed.setThumbnail(data.get("thumbnail"))
        } else embed.setColor("#36393e");
        message.channel.send(embed);
      }
    } else if (args[0].toLowerCase() === "rol" || args[0].toLowerCase() === "role" || args[0].toLowerCase() === "rollen") {
      if (!args[1]) {
        let embed = new Discord.RichEmbed().setTitle("Settings").setDescription(`Settings van **${args[0]}**:`)
        .addField("Rollen", `Admin: **${data.get("role.admin")}**`, true)
        .setFooter("💰 = Donator only!");
        if (data) {
          if (data.get("color") !== "none") embed.setColor(data.get("color"));
          else embed.setColor("#36393e");
          if (data.get("thumbnail") !== "none") embed.setThumbnail(data.get("thumbnail"))
        } else embed.setColor("#36393e");
        message.channel.send(embed);
      } else if (args[1].toLowerCase() === "admin" || args[1].toLowerCase() === "administrator") {
        let antwoord = await am.run(message, true, `wat moet de ${args[1].toLowerCase()} rol worden? **Mention de rol!**`, "reply");
        if (antwoord.content.toLowerCase().includes("stop")) {
          antwoord.delete();
          return message.channel.send("Ik stop!");
        }
        try {
          antwoord.content.split("<@&")[1].split(">")[0];
        } catch(err) {
          let embed = new Discord.RichEmbed().setTitle("Settings").setDescription(`Error: Je moet de **${args[1].toLowerCase()}** rol mentionen!`)
          if (data) {
            if (data.get("color") !== "none") embed.setColor(data.get("color"));
            else embed.setColor("#36393e");
            if (data.get("thumbnail") !== "none") embed.setThumbnail(data.get("thumbnail"))
          } else embed.setColor("#36393e");
          message.channel.send(embed);
        }
        data.set("role.admin", antwoord.content);
        let embed = new Discord.RichEmbed().setTitle("Settings").setDescription(`De admin rol is nu **${antwoord.content}**!`);
        if (data) {
          if (data.get("color") !== "none") embed.setColor(data.get("color"));
          else embed.setColor("#36393e");
          if (data.get("thumbnail") !== "none") embed.setThumbnail(data.get("thumbnail"))
        } else embed.setColor("#36393e");
        message.channel.send(embed);
      } else {
        let embed = new Discord.RichEmbed().setTitle("Settings").setDescription(`Error: Rol niet gevonden! Kies uit **admin**!`);
        if (data) {
          if (data.get("color") !== "none") embed.setColor(data.get("color"));
          else embed.setColor("#36393e");
          if (data.get("thumbnail") !== "none") embed.setThumbnail(data.get("thumbnail"))
        } else embed.setColor("#36393e");
        message.channel.send(embed);
      }
    } else {
      let embed = new Discord.RichEmbed().setTitle("Settings").setDescription(`Error: Kies uit **main**, **plugins** of **rollen** en daar zit **${args[0]}** niet tussen!`);
      if (data) {
        if (data.get("color") !== "none") embed.setColor(data.get("color"));
        else embed.setColor("#36393e");
        if (data.get("thumbnail") !== "none") embed.setThumbnail(data.get("thumbnail"))
      } else embed.setColor("#36393e");
      message.channel.send(embed);
    }
  }
}
exports.help = {
  name: "settings",
  usage: "settings [gedeelte] [setting]",
  description: "Verander de server instellingen!",
  category: "admin",
  extraCommands: ["set", "setting", "serversettings", "ss"]
}
exports.config = {
  enable: true,
  guildPermission: 0,
  userPermission: 5,
  guildOnly: true
}
