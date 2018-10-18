exports.run = async (client, message) => {
  if (message.channel.type === "dm") {
    return false;
  } else {
    const data = new client.dataModule({path: `${client.dirname}/guildSettings`, name: `${message.guild.id}.json`});

    //Guild Information
    data.set(`information.name`, `${message.guild.name}`);
    data.set(`information.id`, `${message.guild.id}`);
    data.set(`information.channels`, `${message.guild.channels.size}`);
    data.set(`information.users`, `${message.guild.members.size}`);
    data.set(`information.createdat`, `${message.guild.createdAt}`);
    data.set(`information.region`, `${message.guild.region}`);
    data.set(`information.roles`, `${message.guild.roles.size}`);
    data.set(`information.ownerid`, `${message.guild.owner.id}`);

    //Main data
    if (!data.get(`prefix`)) data.set(`prefix`, client.config.main.prefix);
    if (!data.get(`color`)) data.set(`color`, `none`);
    if (!data.get(`thumbnail`)) data.set(`thumbnail`, `none`);

    //Plugins
    if (!data.get(`plugin.main`)) data.set(`plugin.main`, "true");
    if (!data.get(`plugin.fun`)) data.set(`plugin.fun`, "true");
    if (!data.get(`plugin.moderator`)) data.set(`plugin.moderator`, "true");
    if (!data.get(`pluginview.main`)) data.set(`pluginview.main`, ":white_check_mark:");
    if (!data.get(`pluginview.fun`)) data.set(`pluginview.fun`, ":white_check_mark:");
    if (!data.get(`pluginview.moderator`)) data.set(`pluginview.moderator`, ":white_check_mark:");

    //Rollen
    if (!data.get(`role.member`)) data.set(`role.member`, `member`);
    if (!data.get(`role.dj`)) data.set(`role.dj`, `dj`);
    if (!data.get(`role.color`)) data.set(`role.color`, `color`);
    if (!data.get(`role.moderator`)) data.set(`role.moderator`, `moderator`);
    if (!data.get(`role.admin`)) data.set(`role.admin`, `admin`);
    client.data = data;
    return true;
  }
}
