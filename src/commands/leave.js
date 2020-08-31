const execute = (bot, msg, args) => {
  let queue = bot.queues.get(msg.member.guild.id);

  if(queue){
    queue.connection.disconnect();
    return bot.queues.delete(msg.member.guild.id);
  }
  msg.member.voice.channel.leave();
}

module.exports = {
  name: "leave",
  help: "Faz o bot sair da sala.",
  execute,
};