const command = require("bananenbase").command;
const util = require("util");

module.exports = class _eval extends command {
  constructor(client) {
    super(client, {
      name: "eval",
      description: "Run code!",
      category: "Bot owner",
      subCommands: ["e", "ev"],
      args: ["code: required"]
    }, {
      permLevel: 3
    });
  }

  async run(message, args) {
    if (!args[0]) return message.reply("you didn't give up code!");
    if (args.join(" ").length > 1000) return message.reply("the input can't be more than 1000 characters.");
    try {
      let ev = await eval(args.join(" "));
      let output = await util.inspect(ev, {depth: 0});
      message.channel.send(message.embed()
        .setTitle("Eval")
        .setDescription(`Output type: **${typeof output}**`)
        .addField("📥 Input", `\`\`\`js\n${args.join(" ")}\`\`\``)
        .addField("📤 Output", `\`\`\`js\n${output}\`\`\``)
      );
    } catch(err) {
      message.channel.send(message.embed()
        .setTitle("Eval")
        .setColor("#ff0000")
        .setDescription(`Output type: **ERROR**`)
        .addField("📥 Input", `\`\`\`js\n${args.join(" ")}\`\`\``)
        .addField("📤 Output", `\`\`\`js\n${err}\`\`\``)
      );
    }
  }
}
