const lyricsFinder = require("lyrics-finder");
const { MessageEmbed } = require("discord.js");

const execute = async (bot, msg, args) => {
  const queue = bot.queues.get(msg.guild.id)
  if(!queue) {
    return msg.reply("Nenhuma música sendo reproduzida")
  }

  let lyrics = null

  try {
    lyrics = await lyricsFinder(queue.songs[0].title, "");
    if (!lyrics) lyrics = `Nenhuma letra encontrada para: ${queue.songs[0].title}.`;
  } catch (error) {
    lyrics = `Nenhuma letra encontrada para: ${queue.songs[0].title}.`;
  }

  let lyricsEmbed = new MessageEmbed()
      .setTitle("Lyrics")
      .setDescription(lyrics)
      .setColor("#3d1e6d")
      .setTimestamp();

  if (lyricsEmbed.description.length >= 2048)
    lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
  return msg.channel.send(lyricsEmbed).catch(console.error);

}

module.exports = {
  name: "ly",
  help: "Mostra a letra da música atual.",
  execute
}