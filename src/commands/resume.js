const execute = (bot, msg, args) => {
  const queue = bot.queues.get(msg.guild.id)
  if(!queue) {
    return msg.reply("Nenhuma música sendo reproduzida")
  }
  queue.dispatcher.resume()
}

module.exports = {
  name: "resume",
  help: "Despausa a música atual",
  execute
}