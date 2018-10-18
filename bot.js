//Eerst zeggen wij in de console dat we gaan opstarten. Ook zetten we de variable 'start' naar de datum dat het op het moment dat de bot wordt gerunt is!
console.log("Ik start op!");
let start = Date.now();

//Nu gaan we de packages inladen!
const Discord = require("discord.js"),
      consoleCommands = require("./consoleCommands.js"),
      loader = require("./custom_modules/loader"),
      dataModule = require("./custom_modules/data");

//Ook maken wij de discord client aan en maken we een command variable!
const client = new Discord.Client({autoReconnect: true});
client.commands = new Discord.Collection();
client.subCommands = new Discord.Collection();
client.functions = new Discord.Collection();

//En dan nu de variables in client, zodat de bot sneller is en alle variables worden meegenomen!
client.queue = {}; //Queue
client.dataModule = dataModule; //Datamodule
client.start = start; //Start
client.data = undefined; //Data
client.dirname = __dirname; //Dirname
client.startType = "startup"; //Start type
client.guildPermission1 = ["362871251221610496", "361922496460488705", "285398417226596353"]; //Premium servers
client.guildPermission2 = []; //Beta servers
client.guildPermission3 = ["448887372944506882", "419908422109102080", "456477444027711488", "451016023827677194", "394856513765769216"]; //Developer servers
client.guildPermission4 = ["393475468508004364", "446381065867755522"]; //Officiële servers
client.guildPermission5 = ["425643727953068042"]; //Test servers
client.version = "3.0.5"; //Versie
client.plugins = 2; //Aantal plugins
client.rollen = 5; //Aantal rollen die er bestaan voor settings

//We laden de console commands in!
consoleCommands.run(client);

//We hebben ook events, die worden hier goed uitgevoerd!
loader.load("event", client);

//Nu laden wij de commands in!
setTimeout(function() {
  loader.load("command", client);
}, 1000);

//Als je een nodejs app runt, heb je ook process events, zoals 'exit'. Die worden er hier gebruikt!
setTimeout(function() {
  loader.load("process_event", client);
}, 2000);

//Je kan ook functies aanmaken die je overal kan gebruiken met 'client.FUNCTIENAAM.run(client)'!
setTimeout(function() {
  loader.load("function", client);
}, 3000);

//Als je meerdere configs wilt hebben, gaat dat ook!
setTimeout(function() {
  loader.load("config", client);
}, 4000);

//Als alles gedaan is, start de bot op!
setTimeout(function() {
  client.login(client.config.main.token);
}, 5000);
