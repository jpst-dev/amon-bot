const createBar = require("string-progressbar");
const { MessageEmbed } = require("discord.js");

const execute = (bot, msg, args) => {
  const queue = bot.queues.get(msg.guild.id);

  if (!queue) {
    return msg.reply("Nenhuma música sendo reproduzida");
  }

  const song = queue.songs[0];
  const seek =
    (queue.connection.dispatcher.streamTime -
      queue.connection.dispatcher.pausedTime) /
    1000;
  const left = song.duration.seconds - seek;
  let nowPlaying = new MessageEmbed()
    .setTitle("Tocando agora")
    .setDescription(`${song.title}\n${song.url}`)
    .setColor("#3d1e6d")
    .setAuthor("AmonBot")
    .addField(
      "\u200b",
      new Date(seek * 1000).toISOString().substr(11, 8) +
        "[" +
        createBar(
          song.duration.seconds == 0 ? seek : song.duration.seconds,
          seek,
          20
        )[0] +
        "]" +
        (song.duration.seconds == 0
          ? " ◉ LIVE"
          : new Date(song.duration.seconds * 1000).toISOString().substr(11, 8)),
      false
    );

  if (song.duration.seconds > 0)
    nowPlaying.setFooter(
      "Time Remaining: " + new Date(left * 1000).toISOString().substr(11, 8)
    );
  return msg.channel.send(nowPlaying);
};

module.exports = {
  name: "np",
  help: "Mostra a música atual",
  execute,
};
