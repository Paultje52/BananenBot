const command = require("bananenbase").command;
const request = require("request");

module.exports = class MemeCommand extends command {
  constructor(client){
    super(client, {
      name: "meme",
      description: "Bekijk leuke memes!",
      category: "Fun"
    });
  }

  async run(message) {
    let msg = await message.channel.send("Ik zoek naar een meme voor je!");
    request({
      url: "https://meme-api.herokuapp.com/gimme/memes",
      json: true
    }, (_err, _req, body) => {
      msg.edit(message.embed()
        .setTitle("Meme")
        .setImage(body.url)  
      );
    });
  }
}
