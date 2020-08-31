const execute = (bot, msg, args) => {
  msg.member.voice.channel.join();
}

module.exports = {
  name: "join",
  help: "Faz o bot entrar na sala.",
  execute,
};