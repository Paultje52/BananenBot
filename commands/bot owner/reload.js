const command = require("bananenbase").command;
const dir = require("fsscanner");

module.exports = class reload extends command {
  constructor(client) {
    super(client, {
      name: "reload",
      description: "Reload a command",
      category: "Bot owner",
      subCommands: ["rl"]
    }, {
      permLevel: 3
    });
  }

  async run(message, args, client) {
    if (!args[0]) return message.error("Command not found!");
    let start = Date.now();
    if (args[0].toLowerCase() === "all") {
      let msg = await message.channel.send(`Reloading...`);
      let client = this.client;
      client.commands.forEach(command => {
        delete require.cache[require.resolve(command.help.dir)];
      });
      client.commands = new Map();
      client.subCommands = new Map();

      dir.scan(`${process.cwd()}/commands`, [dir.criteria.pattern(".js"), dir.criteria.type("F")], (err, results) => {
        if (err) throw err;
        if (!results || results.length === 0) throw new Error("No events found!");
        let i = 0;
        results.forEach(result => {
          let c = require(result);
          c = new c(client);
          if (!c.enabled) return i++;
          c.help.dir = result;
          client.commands.set(c.help.name, c);

          c.help.subCommands.forEach(subCommand => {
            client.subCommands.set(subCommand, c);
          });
          i++;
        });
        let total = results.length;
        for (let i in this.client._events) {
          if (!i.includes("self")) delete this.client._events[i];
        }
        dir.scan(`${process.cwd()}/events`, [dir.criteria.pattern(".js"), dir.criteria.type("F")], (err, results) => { // Search for commands
          if (err) throw err;
          if (!results || results.length === 0) return;
          total += results.length;
          results.forEach(result => {
            let c = require(result);
            try {
              c = new c(client);
            } catch (e) {
              console.log(e);
              c.setClient(client);
            }
            if (!c.enabled) return i++;
            c.dir = result;
            client.on(c.name, (...args) => c.run(...args));
            i++;
          });
          let interval = setInterval(() => {
            if (i === total) {
              clearInterval(interval);
              msg.edit(`**${results.length}** events, **${client.commands.size}** commands and **${client.subCommands.size}** subCommands reloaded in **${Date.now() - start}ms**!`);
            }
          });
        });
      });
    } else if (args[0].toLowerCase() === "events") {
      let msg = await message.channel.send("Reloading...");
      for (let i in this.client._events) {
        if (!i.includes("self")) delete this.client._events[i];
      }
      dir.scan(`${process.cwd()}/events`, [dir.criteria.pattern(".js"), dir.criteria.type("F")], (err, results) => { // Search for commands
        if (err) throw err;
        if (!results || results.length === 0) return;
        let i = 0;
        results.forEach(result => {
          let c = require(result);
          try {
            c = new c(client);
          } catch (e) {
            console.log(e);
            c.setClient(client);
          }
          if (!c.enabled) return i++;
          c.dir = result;
          client.on(c.name, (...args) => c.run(...args));
          i++;
        });
        let interval = setInterval(() => {
          if (i === results.length) {
            clearInterval(interval);
            msg.edit(`**${results.length}** events reloaded in **${Date.now() - start}ms**!`);
          }
        });
      });
    } else {
      if (!client.commands.get(args[0].toLowerCase()) && !client.subCommands.get(args[0].toLowerCase())) return message.reply("command not found!");
      let cmd = client.commands.get(args[0].toLowerCase()) || client.subCommands.get(args[0].toLowerCase());
      let dir = cmd.help.dir;
      delete require.cache[require.resolve(cmd.help.dir)];
      client.commands.delete(cmd.help.name);
      cmd.help.subCommands.forEach(subCommand => {
        client.subCommands.delete(subCommand);
      });
      cmd = require(cmd.help.dir);
      cmd = new cmd(client);
      cmd.help.dir = dir;
      client.commands.set(cmd.help.name, cmd);
      cmd.help.subCommands.forEach(subCommand => {
        client.subCommands.set(subCommand, cmd);
      });
      message.channel.send(`**${cmd.help.name}** reloaded.`);
    }
  }
}
