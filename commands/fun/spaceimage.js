const command = require("bananenbase").command;
const request = require("request");

module.exports = class Fun extends command {
  constructor(client) {
    super(client, {
      name: "spaceimage",
      description: "Een foto van de ruimte!",
      category: "Fun",
      subCommands: ["ruimtefoto"]
    });
  }

  async run(message) {
    let msg = await message.channel.send("Ik ga naar de ruimte om een foto te maken...");
    request({
      url: "https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo",
      json: true
    }, (_err, _req, body) => {
      msg.edit(message.embed()
        .setTitle("RuimteFoto")
        .setColor("#f6ff00")
        .setDescription(body.explanation || "")
        .setImage(body.url)
        .setFooter(`Op ${body.date || "het universum"} door ${body.copyright || "mijzelf"}`)
      );
    });
  }
}
