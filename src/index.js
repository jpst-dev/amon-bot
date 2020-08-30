const Discord = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.queues = new Map()


dotenv.config();
bot.login(process.env.TOKEN);

const commandFiles = fs
  .readdirSync(path.join(__dirname, "/commands"))
  .filter((filename) => filename.endsWith(".js"));

for (filename of commandFiles) {
  const command = require(`./commands/${filename}`);

  bot.commands.set(command.name, command);
}

bot.on("ready", () => {
  console.log("fino do fino");
});

bot.on("message", (msg) => {
  if (!msg.content.startsWith(process.env.PREFIX) || msg.author.bot) return;

  if (msg.content.toLowerCase().startsWith(process.env.PREFIX)) {

    const args = msg.content.slice(process.env.PREFIX.length).split(" ");
    const command = args.shift();

    try {
      bot.commands.get(command).execute(bot, msg, args);
    } catch (e) {
      return msg.reply("Comando Inválido");
    }
  }
});
