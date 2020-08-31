const { canModifyQueue } = require("../utils/AmonbotUtils")

const execute = (bot, msg, args) => {
  const queue = bot.queues.get(msg.guild.id);
  if (!queue) {
    return msg.reply("Nenhuma música sendo reproduzida");
  }
  if (!canModifyQueue(msg.member)) return;

  let songs = queue.songs;
    for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    queue.songs = songs;
    bot.queue.set(msg.guild.id, queue);
    msg.channel.send(`${msg.author} 🔀 shuffled the queue`).catch(console.error);
};

module.exports = {
  name: "shuffle",
  help: "Mistura as músicas",
  execute,
};