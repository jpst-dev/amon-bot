const { MessageEmbed } = require("discord.js");

const execute = (bot, msg, args) => {
  let string = "";
  bot.commands.forEach((command) => {
    if (command.help) {
      string += `**${process.env.PREFIX}${command.name}**: ${command.help}\n`;
    }
  });
  let commandEmbed = new MessageEmbed()
    .setTitle("Lista de Comandos")
    .setDescription(string)
    .setColor("#3d1e6d");
  msg.channel.send(commandEmbed);
};

module.exports = {
  name: "help",
  execute,
};
