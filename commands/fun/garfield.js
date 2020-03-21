const command = require("bananenbase").command;
const request = require("request");

module.exports = class Fun extends command {
  constructor(client) {
    super(client, {
      name: "garfield",
      description: "Bekijk een garfield stripje (Engels)!",
      category: "Fun"
    });
  }

  async run(message) {
    let msg = await message.channel.send("Ik zoek naar een garfield stripje...");
    request({
      uri: "https://discordians-api.herokuapp.com/comic/garfield",
      json: true
    }, (_err, _req, body) => {
      msg.edit(message.embed()
        .setTitle("Garfield")
        .setColor("#f6ff00")                   
        .setImage(body.image)
      );
    });
  }
}
