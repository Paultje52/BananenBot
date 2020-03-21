const command = require("bananenbase").command;
const request = require("request");

module.exports = class Fun extends command {
  constructor(client) {
    super(client, {
      name: "tekst",
      description: "Transformeer tekst!",
      category: "Fun",
      subCommands: ["text", "changetext", "transform", "transformtext"]
    });
  }

  async run(message, args) {
    if (!args[0]) return message.error("Je hebt geen tekst opgegeven om te veranderen!");
    let msg = await message.channel.send(message.embed()
      .setTitle("Laden")
      .setDescription("Even geduld aub...")
    );
    request({
      uri: `https://discordians-api.herokuapp.com/translate/cursive?text=${args.join(" ")}`,
      json: true
    }, (_err, _req, body) => {
      let cursief = body.message;
        request({
          uri: `https://discordians-api.herokuapp.com/translate/fancy?text=${args.join(" ")}`,
          json: true
        }, (_err, _req, body) => {
          let fancy = body.message;
            request({
              uri: `https://discordians-api.herokuapp.com/translate/fancy2?text=${args.join(" ")}`,
              json: true
            }, (_err, _req, body) => {
              let fancy2 = body.message;
                request({
                  uri: `https://discordians-api.herokuapp.com/translate/leet?text=${args.join(" ")}`,
                  json: true
                }, (_err, _req, body) => {
                  let leet = body.message;
                    request({
                      uri: `https://discordians-api.herokuapp.com/translate/pirate?text=${args.join(" ")}`,
                      json: true
                    }, (_err, _req, body) => {
                      let pirate = body.message;
                        request({
                          uri: `https://discordians-api.herokuapp.com/translate/zalgolize?text=${args.join(" ")}`,
                          json: true
                        }, (_err, _req, body) => {
                          let zalgolize = body.message;
                            msg.edit(message.embed()
                              .setTitle("Tekst Transformatie")
                              .setColor("#f6ff00")
                              .addField("Cursief", `\`\`\`${cursief}\`\`\``, true)
                              .addField("Fancy", `\`\`\`${fancy}\`\`\``, true)
                              .addField("Fancy2", `\`\`\`${fancy2}\`\`\``, true)
                              .addField("Leet", `\`\`\`${leet}\`\`\``, true)
                              .addField("Zalgolize", `\`\`\`${zalgolize}\`\`\``, true)
                            );
                        });
                    });
                });
            });
        });
    });
  }
}
