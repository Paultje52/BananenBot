const command = require("bananenbase").command;
const os = require("os");

module.exports = class stats extends command {
  constructor(client) {
    super(client, {
      name: "stats",
      description: "Krijg mijn statistieken!",
      category: "Main",
      subCommands: ["stat", "botinfo"]
    });
  }

  async run(message) {  
    let model = os.cpus()[0].model;
    let speed = os.cpus()[0].speed;
    let total = 0;
    let free = 0;
    os.cpus().forEach(cpu => {
      free += cpu.times.idle;
      total += cpu.times.user + cpu.times.nice + cpu.times.sys + cpu.times.irq;
    });
    total += free;
    let emojis = 0;
    this.client.guilds.forEach(guild => {
      emojis += guild.emojis.size;
    });
    let textChannels = 0;
    let voiceChannels = 0;
    let categorys = 0;
    let totalChannels = this.client.channels.size;
    this.client.channels.forEach(channel => {
      if (channel.type === "text") textChannels++;
      else if (channel.type === "voice") voiceChannels++;
      else categorys++;
    });

    let totalSeconds = (this.client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600-days*24);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    let daysVervoeging = "dagen";
    if (days === 1) daysVervoeging = "dag";
    let hoursVervoeging = "uren";
    if (hours === 1) hoursVervoeging = "uur";
    let minutesVervoeging = "minuten";
    if (minutes === 1) minutesVervoeging = "minuut";
    let secondsVervoeging = "secondes";
    if (seconds === 1) secondsVervoeging = "seconde";

    let totalSSeconds = os.uptime();
    let sDays = Math.floor(totalSSeconds / 86400);
    let sHours = Math.floor(totalSSeconds / 3600-sDays*24);
    totalSSeconds %= 3600;
    let sMinutes = Math.floor(totalSSeconds / 60);
    let sSeconds = Math.floor(totalSSeconds % 60);
    let sDaysVervoeging = "dagen";
    if (sDays === 1) sDaysVervoeging = "dag";
    let sHoursVervoeging = "uren";
    if (sHours === 1) sHoursVervoeging = "uur";
    let sMinutesVervoeging = "minuten";
    if (sMinutes === 1) sMinutesVervoeging = "minuut";
    let sSecondsVervoeging = "secondes";
    if (sSeconds === 1) sSecondsVervoeging = "seconde";
    message.channel.send(message.embed()
      .setTitle("Bot stats")
      .setColor("#d60000")
      .setDescription("Bekijk mijn statistieken!\nIk ben gemaakt met de [bananebase](https://github.com/Paultje52/bananenbase), de beste discord bot framework!")
      .addField("Bot", `Server: **${this.client.guilds.size}**\nGebruikers: **${this.client.users.size}**\nEmojis: **${emojis}**\nCommands: **${this.client.commands.size}**`, true)
      .addField("Channels", `Tekst: **${textChannels}**\nSpraak: **${voiceChannels}**\nCategorieën: **${categorys}**\n**Totaal: ${totalChannels}**`, true)
      .addField("Online tijd", `${days} ${daysVervoeging}, ${hours} ${hoursVervoeging}, ${minutes} ${minutesVervoeging} en ${seconds} ${secondsVervoeging}.`)
      .addBlankField()
      .addField("Hostserver", `Type: **${os.type()} ${os.release()}**\nUser: **${os.hostname()}**`, true)
      .addField("Memory", `Gebruik: **${Math.round((os.totalmem()-os.freemem())/1000000000 * 1000) / 1000} GB**\nOver: **${Math.round(os.freemem()/1000000000 * 1000) / 1000} GB**\nTotaal: **${Math.round(os.totalmem()/1000000000 * 1000) / 1000} GB**`, true)
      .addField("CPU", `Model: **${model}**\nSnelheid: **${speed/1000} GHz**\nGebruik: **${Math.floor((total/free)*10)} %**`, true)
      .addField("Online tijd van de server", `${sDays} ${sDaysVervoeging}, ${sHours} ${sHoursVervoeging}, ${sMinutes} ${sMinutesVervoeging} en ${sSeconds} ${sSecondsVervoeging}.`, true)
    );
  }
}
