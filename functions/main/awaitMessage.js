exports.run = async (message, del, vraag, type) => {
  if (!del) del = false;
  if (!vraag) return false;
  let msg;
  if (type === "reply") msg = await message.reply(vraag);
  else msg = await message.channel.send(vraag);
  let filter = m => m.author.id === message.author.id;
  let col = await message.channel.awaitMessages(filter, { max: 1, time: 3600000, errors: ["time"] });
  if (col) {
    if (col.first().content.toLowerCase().includes("stop" || "cancel")) return "stop";
    if (del === true) {
      msg.delete()
      col.first().delete();
    }
    return col.first();
  } else {
    return "NC";
  }
}
exports.help = {
  name: "awaitMessage",
  category: "main"
}
exports.config = {
  enable: true
}
