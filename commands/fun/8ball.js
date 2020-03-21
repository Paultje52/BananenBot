const command = require("bananenbase").command;

module.exports = class ball extends command {
  constructor(client) {
    super(client, {
      name: "8ball",
      description: "Stel een vraag aan mij!",
      category: "Fun",
      subCommands: ["8bal"],
      args: ["vraag: required"]
    });
  }

  async run(message, args) {
    if (!args[0]) return message.error("Je hebt geen vraag gestelt!");
    let answers = [
      // Ja
      "Het is zeker",
      "Jesse zegt van wel",
      "Ja maar, ehmm, ja...",
      "Er wordt \"JA\" geroepen vanuit de ruimte...",
      "Het is beslist zo",
      "Zonder twijfel",
      "Zeer zeker",
      "Je kunt er op vertrouwen",
      "Volgens mij wel",
      "Zeer waarschijnlijk",
      "Goed vooruitzicht",
      "Ja",
      "Alles wijst naar een ja",
      
      // Neutraal
      "Probeer opnieuw",
      "Vraag het later nog een keer",
      "Niet te voorspellen",
      ":zzz: Wat!? Kan je de vraag opnieuw stellen, ik lag weer te slapen...",
      
      // Nee
      "Reken er niet op",
      "Reken er maar niet op",
      "Ik denk van niet",
      "Nope",
      "No!!!",
      "Ik denk toch nee",
      "Mijn bronnen zeggen nee",
      "Het vooruitzicht zegt van niet",
      "Het vooruitzicht is niet zo goed",
      "Ik zou er niet aan denken! Doe maar niet.",
      "NEIN!!!"
    ];

    message.channel.send(message.embed()
      .setTitle("8ball")
      .setColor("#f6ff00")
      .setDescription(answers[Math.floor(Math.random() * answers.length)])
    );
  }
}
