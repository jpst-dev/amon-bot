const { canModifyQueue } = require('../utils/AmonbotUtils')

const execute = (bot, msg, args) => {
  if (!args.length)
      return msg
        .reply(`Usage: ${msg.client.prefix}${module.exports.name} <Queue Number>`)
        .catch(console.error);

    if (isNaN(args[0]))
      return msg
        .reply(`Usage: ${msg.client.prefix}${module.exports.name} <Queue Number>`)
        .catch(console.error);

    const queue = bot.queues.get(msg.member.guild.id);

    if (!queue) return msg.reply("Não tem nenhuma fila.").catch(console.error);
    if (!canModifyQueue(msg.member)) return;

    if (args[0] > queue.songs.length)
      return msg.reply(`A fila é somente ${queue.songs.length} songs long!`).catch(console.error);

    queue.playing = true;
    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }
    queue.connection.dispatcher.end();
    //msg.channel.send(`${msg.author} ⏭ skipped ${args[0] - 1} songs`).catch(console.error);
}

module.exports = {
  name: "skipto",
  help: "Pula para a música selecionada",
  execute
}
 