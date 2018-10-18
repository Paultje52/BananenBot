const Discord = require("discord.js");
const util = require('util');
exports.run = async (client) => {
  let data = client.data;
  let config = client.config;
  let message = client.message;
  let args = client.args;
  let clean = client.function.clean;
  if (!args[0]) return message.reply("geef code op!");
  message.channel.send("**Bezig met uitvoeren...**").then(async msg => {
    let exec = util.promisify(require('child_process').exec);
    let {stdout, stderr} = await exec(args.join(" "));
    let ex;
    if (stderr) ex = stderr;
    else ex = stdout;
    let embed = new Discord.RichEmbed().setTitle("Execute").addField("📥Input", `\`\`\`bash\n${args.join(" ")}\`\`\``).addField("📤Output", `\`\`\`xl\n${ex}\`\`\``).setfooter(`Output type: ${typeof ex}`);
    if (data) {
      if (data.get("color") !== "none") embed.setColor(data.get("color"));
      else embed.setColor("#36393e");
      if (data.get("thumbnail") !== "none" && data.get("thumbnail").startsWith("http" || "https")) embed.setThumbnail(data.get("thumbnail"));
    } else embed.setColor("#36393e");
    msg.edit(embed);
  });
}
exports.help = {
  name: "exec",
  usage: "exec <code>",
  description: "Voer console commands uit met de bot!",
  category: "botOwner",
  extraCommands: ["execute"]
}
exports.config = {
  enable: true,
  guildPermission: 0,
  userPermission: 7,
  guildOnly: false
}
