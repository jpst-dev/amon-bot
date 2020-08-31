const { MessageEmbed, splitMessage, escapeMarkdown } = require("discord.js");

const execute = (bot, msg, args) => {
  const queue = bot.queues.get(msg.guild.id)
  if(!queue) {
    return msg.reply("Nenhuma música sendo reproduzida")
  }

  const description = queue.songs.map((song, index) => `${index + 1}. ${escapeMarkdown(song.title)}`);

  let queueEmbed = new MessageEmbed()
    .setTitle("Fila de Músicas")
    .setDescription(description)
    .setColor("#3d1e6d");

  const splitDescription = splitMessage(description, {
    maxLength: 2048,
    char: "\n",
    prepend: "",
    append: ""
  });

  splitDescription.forEach(async (m) => {
    queueEmbed.setDescription(m);
    msg.channel.send(queueEmbed);
  });
}

module.exports = {
  name: "queue",
  help: "Mostra a fila de músicas",
  execute
}