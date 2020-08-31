const search = require("yt-search");
const playSong = require("./play").playSong;

const { MessageEmbed } = require("discord.js");

const execute = (bot, msg, args) => {
  const s = args.join(" ");

  search(s, (err, result) => {
    let queue = bot.queues.get(msg.member.guild.id);

    if (err) {
      console.log(err);
    } else if (result && result.videos.length > 0) {
      
      let video = [
        result.videos[0],
        result.videos[1],
        result.videos[2],
        result.videos[3],
        result.videos[4],
      ];

      let list = [
        `1 - ${result.videos[0].title}`,
        `2 - ${result.videos[1].title}`,
        `3 - ${result.videos[2].title}`,
        `4 - ${result.videos[3].title}`,
        `5 - ${result.videos[4].title}`,
      ];

      let resultsEmbed = new MessageEmbed()
        .setTitle(`**Toca a música que você escolher**`)
        .setDescription(`Resultados para: **${s}**`)
        .setColor("#3d1e6d")
        .addField(`${"\n\n"} ${list.join("\n")}`, "Escolha o número da música que deseja ouvir");

      msg.channel.send(resultsEmbed).then(function () {
        msg.channel
          .awaitMessages((response) => msg.content, {
            max: 1,
            time: 30000,
            errors: ["time"],
          })
          .then((collected) => {
            const collect = collected.first().content;
            if (collect == 1) {
              if (queue) {
                queue.songs.push(video[0]);
                bot.queues.set(msg.guild.id, queue);
              } else playSong(bot, msg, video[0]);
            }
            if (collect == 2) {
              if (queue) {
                queue.songs.push(video[1]);
                bot.queues.set(msg.guild.id, queue);
              } else playSong(bot, msg, video[1]);
            }
            if (collect == 3) {
              if (queue) {
                queue.songs.push(video[2]);
                bot.queues.set(msg.guild.id, queue);
              } else playSong(bot, msg, video[2]);
            }
            if (collect == 4) {
              if (queue) {
                queue.songs.push(video[3]);
                bot.queues.set(msg.guild.id, queue);
              } else playSong(bot, msg, video[3]);
            }
            if (collect == 5) {
              if (queue) {
                queue.songs.push(video[4]);
                bot.queues.set(msg.guild.id, queue);
              } else playSong(bot, msg, video[4]);
            }  
          });
      });
    }
  });
};

module.exports = {
  name: "search",
  help: "Mostra uma lista de músicas relacionada a sua pesquisa",
  execute,
};
