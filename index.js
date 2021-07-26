const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');
var YoutubeMp3Downloader = require("youtube-mp3-downloader");
var yd = new YoutubeMp3Downloader({
  "ffmpegPath" : "/usr/bin/ffmpeg",
  "outputPath" : "/home/notfamous/Music/bot"
});
var opts = {maxResults : 2, key : 'AIzaSyBv3bSM1x9GMCl_HkB_hd2VrJeSWU02FfQ'};
const search = require('youtube-search');
require('ffmpeg-static');
require('@discordjs/opus');
require('dotenv').config();

client.on('ready', () => { console.log(`Logged in as ${client.user.tag}!`); });

gifs = {
  "greet" : [
    "https://tenor.com/view/khatey-bahun-khate-bahun-bahun-khasi-bahun-ko-khasi-gif-21553749",
    "https://media.discordapp.net/attachments/783000095171543070/848589526196813854/image0.gif",
    "https://media.discordapp.net/attachments/783000095171543070/848591249648910356/image0.gif",
    "https://media.discordapp.net/attachments/783000095171543070/848589608773222420/image0.gif"
  ],
  "pat" : [
    "https://cdn.discordapp.com/attachments/786196386445000737/868100202098216970/pat.gif",
    "https://cdn.discordapp.com/attachments/786196386445000737/868100519145656370/pat.gif",
    "https://cdn.discordapp.com/attachments/786196386445000737/868100877104336936/pat.gif",
    "https://cdn.discordapp.com/attachments/786196386445000737/868101173159288842/pat.gif"
  ],
  "bonk" : [
    "https://tenor.com/view/rikkabonk-gif-19587130",
    "https://tenor.com/view/toradora-taiga-good-morning-window-smack-gif-21310705",
    "https://i.waifu.pics/35fhCi8.gif", "https://i.waifu.pics/UhbtpTF.gif",
    "https://i.waifu.pics/XCxAgkz.gif"
  ]
}

       client.on('message', msg => {
         if (msg.content === '*ping') {
           msg.reply('`pong`');
         }
       });

client.on('message',
          msg => {console.log(
              `(${msg.guild}) (${msg.author.tag}) (${msg.content})`)});

client.on('message', msg => {
  if (msg.content.startsWith('*avatar')) {
    const user = msg.mentions.users.first();
    if (user) {
      user == msg.guild.member(user);
      embed =
          new Discord.MessageEmbed()
              .setTitle('Avatar')
              .setImage(user.displayAvatarURL({format : 'png', size : 2048}))
              .setFooter('command triggered by ' + msg.author.tag);
    } else {
      embed = new Discord.MessageEmbed()
                  .setTitle('Avatar')
                  .setImage(msg.author.displayAvatarURL(
                      {format : 'png', size : 2048}))
                  .setFooter('command triggered by ' + msg.author.tag,
                             msg.author.displayAvatarURL());
    }

    msg.channel.send(embed);
  }
});

client.on('message', msg => {
  if (msg.content.startsWith('*greet')) {
    user = msg.mentions.users.first();
    if (user === msg.author) {
      msg.reply("`You cannot greet yourself you lonely bastard`");
    }

    else if (user) {
      gifNo = Math.floor(Math.random() * 4);
      embed =
          new Discord.MessageEmbed()
              .setDescription(`<@!${msg.author.id}> is greeting <@!${user.id}>`)
              .setImage(`${gifs.greet[gifNo]}`)
              .setFooter(`commmand triggerred by ${msg.author.tag}`,
                         msg.author.displayAvatarURL())
      msg.channel.send(embed);
    }

    else {
      msg.reply("`Select someone to greet you stupid bitch`");
    }
  }
});

client.on('message', msg => {
  if (msg.content.startsWith('kick')) {
    const user = msg.mentions.users.first();
    if (user === msg.author) {
      msg.channel.send('`You cannot kick yourself retard`');
    } else {
      if (user) {
        const member = msg.guild.member(user);
        if (member) {
          member.kick('Optional text to show up at audit log')
              .then(() => {
                msg.channel.send(`${user.tag} was kicked successfully`);
              })
              .catch(err => {
                msg.channel.send(`Unable to kick ${user.tag}`);
                console.error(err);
              });
        } else {
          msg.reply("The user is not in this server");
        }
      } else {
        msg.reply("`No user mentioned`");
      }
    }
  }
});

client.on('message', msg => {
  if (msg.content == "*c19") {
    fetch("https://coronavirus-19-api.herokuapp.com/countries/nepal")
        .then(res => res.json())
        .then(json => {
          embed =
              new Discord.MessageEmbed()
                  .setTitle("Covid Data For Nepal")
                  .addField("Total Cases:", `\`${json.cases}\``)
                  .addField("Total Recovered:", `\`${json.recovered}\``)
                  .addField("Total Deaths:", `\`${json.deaths}\``)
                  .addField(" New Cases:", `\`${json.todayCases}\``)
                  .addField(" New Deaths:", `\`${json.todayDeaths}\``)
                  .addField(" Active Cases:", `\`${json.active}\``)
                  .setThumbnail(
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Flag_of_Nepal.svg/840px-Flag_of_Nepal.svg.png")
          msg.channel.send(embed);
        });
  }
});

client.on('message', msg => {
  if (msg.content.startsWith('*delete')) {
    let num = msg.content.trim().split(" ");
    if (num[1] >= 2 && num[1] <= 100) {
      msg.channel.bulkDelete(num[1]);
      console.log(parseInt(num[1]) + 2);
      msg.channel.send(`\`clearing ${num[1]} messages\``);
    } else {
      msg.reply(`enter a number between 2 and 100`);
      msg.delete({timeout : 200})
    }
  }
});

client.on('message', msg => {
  if (msg.content.startsWith('*196')) {
    randomNum = Math.floor(Math.random() * 101);
    fetch("https://reddit.com/r/196.json?limit=100")
        .then(res => res.json())
        .then(json => {
          embed = new Discord.MessageEmbed()
                      .setTitle("Random meme from r/196")
                      .setImage(json.data.children[randomNum].data.url)
                      .setFooter(`command triggered by ${msg.author.tag}`,
                                 msg.author.displayAvatarURL())
          msg.channel.send(embed);
        });
  }
});

client.on('message', msg => {
  if (msg.content.startsWith('*r')) {
    subreddit = msg.content.trim().split(" ");
    if (subreddit[1]) {

      fetch(`https://reddit.com/r/${subreddit[1]}.json?limit=100`)
          .then(res => res.json())
          .then(json => {
            if (json.data.children.length >= 100) {
              randomNum = Math.floor(Math.random() * 101);
            } else {
              randomNum = Math.floor(Math.random() * json.data.children.length);
            }
            embed =
                new Discord.MessageEmbed()
                    .setTitle(`here's a random image from r/${subreddit[1]}`)
                    .setImage(json.data.children[randomNum].data.url)
                    .setFooter(`command triggered by ${msg.author.tag}`,
                               msg.author.displayAvatarURL())
            msg.channel.send(embed);
          });
    } else {
      msg.channel.send("The correct usage is `*r <subreddit_name>`");
    }
  }
});

client.on('message', msg => {
  if (msg.content.startsWith('*p')) {
    msgcontent = msg.content.trim().split(" ");
    let i = 0;
    const user = msg.mentions.users.first()
    if (user) {
      for (i = 1; i <= msgcontent[2]; i++) {
        msg.channel.send(`${user}`);
      }
    }
  }
});

client.on('message', msg => {
  if (msg.content.startsWith("*pat")) {
    let randomNum = Math.floor(Math.random() * 4);
    const user = msg.mentions.users.first();
    const embed = new Discord.MessageEmbed()
                      .setDescription(`${msg.author} is patting ${user}`)
                      .setImage(`${gifs.pat[randomNum]}`)
                      .setFooter(`command triggered by ${msg.author.tag}`,
                                 msg.author.displayAvatarURL())
    msg.channel.send(embed);
  }
});

client.on('message', msg => {
  if (msg.content === '*join') {
    if (msg.member.voice.channel) {
      const connection = msg.member.voice.channel.join();
    } else {
      msg.channel.send('`you need to join a vc first`');
    }
  }
});

client.on('message', msg => {
  if (msg.content === '*play') {
    var voiceChannel = msg.member.voice.channel;
    voiceChannel.join().then(connection => {
      const dispatcher =
          connection.play('/home/notfamous/Music/Leat’eq - Tokyo.mp3');
      dispatcher.on("end", end => { voiceChannel.leave(); });
    });
  }
});

client.on('message', msg => {
  if (msg.content.startsWith('*plei')) {
    var song = "";
    var voiceChannel = msg.member.voice.channel;
    // getting the song name combined if spaces
    msgcontent = msg.content.trim().split(" ");
    async if (msgcontent[1]) {
      var i;
      for (i = 1; i <= msgcontent.length - 1; i++) {
        var song = song + `${msgcontent[i]} `;
      }
      console.log(song);
        search(`${song}`, opts, function(err, results) {
        if (err) {
          return console.log(err);
          msg.channel.send(`sorry there was some error playing that song`);
        }
        url = results[1].id;
        yd.download(url);
        voiceChannel.join().then(connection => {
          msg.channel.send(`Now playing ${results[1].title}`);
            const dispatcher = await connection.play(
              `/home/notfamous/Music/bot/${results[1].title}.mp3`);
        });
      });
    } else {
      msg.channel.send(`Please give a song name to play`);
    }
  }
});

/*client.on('message', msg => {
    if (msg.content === '*dc') {
        if (msg.member.voice.channel) {
            msg.member.voice.channel.leave();
        } else {
            msg.reply("`you need to be in the same vc as the bot`");
        }
    }
});*/

client.login(process.env.DISCORD_API_KEY);
