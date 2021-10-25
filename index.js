const Discord = require("discord.js");
const client = new Discord.Client();
const fetch = require('node-fetch');
const usetube = require('usetube');
const ytdl = require("ytdl-core");
require("ffmpeg-static");
require("@discordjs/opus");
require("dotenv").config();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Global Variables
//***************
let dispatcher;
let currentConnection;
let musicQueue = [];
//***************

function playMusic(connection, songUrl, msg) {
  dispatcher = connection.play(ytdl(songUrl, { filter: "audioonly" }));


  function dispatcherNext() {
    console.log("sidhiyo muji");
    musicQueue.shift();
    musicQueue.shift();
    if (musicQueue.length>0) {
	    playMusic(connection, musicQueue[1], msg);
    }

    dispatcher = undefined;
  }
  dispatcher.on("finish", dispatcherNext);

	console.log(musicQueue);
	if(musicQueue.length){
	embed = new Discord.MessageEmbed().setTitle("NOW PLAYING").setDescription(`[${musicQueue[0]}](${musicQueue[1]})`);
		msg.channel.send(embed);
	}else{
		msg.channel.send(new Discord.MessageEmbed().setTitle("QUEUE ENDED!").setDescription("`Add songs to play.`"));
	}

  console.log("inside");
}

gifs = {
  greet: [
    "https://tenor.com/view/khatey-bahun-khate-bahun-bahun-khasi-bahun-ko-khasi-gif-21553749",
    "https://media.discordapp.net/attachments/783000095171543070/848589526196813854/image0.gif",
    "https://media.discordapp.net/attachments/783000095171543070/848591249648910356/image0.gif",
    "https://media.discordapp.net/attachments/783000095171543070/848589608773222420/image0.gif",
  ],
  pat: [
    "https://cdn.discordapp.com/attachments/786196386445000737/868100202098216970/pat.gif",
    "https://cdn.discordapp.com/attachments/786196386445000737/868100519145656370/pat.gif",
    "https://cdn.discordapp.com/attachments/786196386445000737/868100877104336936/pat.gif",
    "https://cdn.discordapp.com/attachments/786196386445000737/868101173159288842/pat.gif",
  ],
  bonk: [
    "https://tenor.com/view/rikkabonk-gif-19587130",
    "https://tenor.com/view/toradora-taiga-good-morning-window-smack-gif-21310705",
    "https://i.waifu.pics/35fhCi8.gif",
    "https://i.waifu.pics/UhbtpTF.gif",
    "https://i.waifu.pics/XCxAgkz.gif",
  ],
};

client.on("message", async (msg) => {
  if (msg.content === "*ping") {
    msg.reply("`pong`");
  }

  console.log(`(${msg.guild}) (${msg.author.tag}) (${msg.content})`);

  if (msg.content.startsWith("*avatar")) {
    const user = msg.mentions.users.first();
    if (user) {
      user == msg.guild.member(user);
      embed = new Discord.MessageEmbed()
        .setTitle("Avatar")
        .setImage(user.displayAvatarURL({ format: "png", size: 2048 }))
        .setFooter("command triggered by " + msg.author.tag);
    } else {
      embed = new Discord.MessageEmbed()
        .setTitle("Avatar")
        .setImage(msg.author.displayAvatarURL({ format: "png", size: 2048 }))
        .setFooter(
          "command triggered by " + msg.author.tag,
          msg.author.displayAvatarURL()
        );
    }

    msg.channel.send(embed);
  }

  if (msg.content.startsWith("*greet")) {
    user = msg.mentions.users.first();
    if (user === msg.author) {
      msg.reply("`You cannot greet yourself you lonely bastard`");
    } else if (user) {
      gifNo = Math.floor(Math.random() * 4);
      embed = new Discord.MessageEmbed()
        .setDescription(`<@!${msg.author.id}> is greeting <@!${user.id}>`)
        .setImage(`${gifs.greet[gifNo]}`)
        .setFooter(
          `commmand triggerred by ${msg.author.tag}`,
          msg.author.displayAvatarURL()
        );
      msg.channel.send(embed);
    } else {
      msg.reply("`Select someone to greet you stupid bitch`");
    }
  }

  if (msg.content == "*c19") {
    fetch("https://coronavirus-19-api.herokuapp.com/countries/nepal")
      .then((res) => res.json())
      .then((json) => {
        embed = new Discord.MessageEmbed()
          .setTitle("Covid Data For Nepal")
          .addField("Total Cases:", `\`${json.cases}\``)
          .addField("Total Recovered:", `\`${json.recovered}\``)
          .addField("Total Deaths:", `\`${json.deaths}\``)
          .addField(" New Cases:", `\`${json.todayCases}\``)
          .addField(" New Deaths:", `\`${json.todayDeaths}\``)
          .addField(" Active Cases:", `\`${json.active}\``)
          .setThumbnail(
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Flag_of_Nepal.svg/840px-Flag_of_Nepal.svg.png"
          );
        msg.channel.send(embed);
      });
  }

  if (msg.content.startsWith("*delete")) {
    let num = msg.content.trim().split(" ");
    if (num[1] >= 2 && num[1] <= 100) {
      msg.channel.bulkDelete(num[1]);
      console.log(parseInt(num[1]) + 2);
      msg.channel.send(`\`clearing ${num[1]} messages\``);
    } else {
      msg.reply(`enter a number between 2 and 100`);
      msg.delete({ timeout: 200 });
    }
  }

  if (msg.content.startsWith("*196")) {
    randomNum = Math.floor(Math.random() * 101);
    fetch("https://reddit.com/r/196.json?limit=100")
      .then((res) => res.json())
      .then((json) => {
        embed = new Discord.MessageEmbed()
          .setTitle("Random meme from r/196")
          .setImage(json.data.children[randomNum].data.url)
          .setFooter(
            `command triggered by ${msg.author.tag}`,
            msg.author.displayAvatarURL()
          );
        msg.channel.send(embed);
      });
  }

  if (msg.content.startsWith("*r")) {
    subreddit = msg.content.trim().split(" ");
    if (subreddit[1]) {
      fetch(`https://reddit.com/r/${subreddit[1]}.json?limit=100`)
        .then((res) => res.json())
        .then((json) => {
          if (json.data.children.length >= 100) {
            randomNum = Math.floor(Math.random() * 101);
          } else {
            randomNum = Math.floor(Math.random() * json.data.children.length);
          }
          embed = new Discord.MessageEmbed()
            .setTitle(`here's a random image from r/${subreddit[1]}`)
            .setImage(json.data.children[randomNum].data.url)
            .setFooter(
              `command triggered by ${msg.author.tag}`,
              msg.author.displayAvatarURL()
            );
          msg.channel.send(embed);
        });
    } else {
      msg.channel.send("The correct usage is `*r <subreddit_name>`");
    }
  }

  /*client.on('message', msg => {
  if (msg.content === '*p') {
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
*/
  if (msg.content.startsWith("*pat")) {
    let randomNum = Math.floor(Math.random() * 4);
    const user = msg.mentions.users.first();
    const embed = new Discord.MessageEmbed()
      .setDescription(`${msg.author} is patting ${user}`)
      .setImage(`${gifs.pat[randomNum]}`)
      .setFooter(
        `command triggered by ${msg.author.tag}`,
        msg.author.displayAvatarURL()
      );
    msg.channel.send(embed);
  }

  if (msg.content === "*join") {
    if (msg.member.voice.channel) {
      const connection = msg.member.voice.channel.join();
    } else {
      msg.channel.send("`you need to join a vc first`");
    }
  }

  if (msg.content === "*aaija muji") {
    var voiceChannel = msg.member.voice.channel;
    voiceChannel.join();
  }
  if (msg.content === "*skip" || msg.content === "*s") {
    musicQueue.shift();
    musicQueue.shift();
	playMusic(currentConnection, musicQueue[1], msg);
  }
  if (msg.content === "*queue" || msg.content === "*q") {
	  embed = new Discord.MessageEmbed()
      .setTitle("MUSIC QUEUE")
      .setDescription(`SEX`)
      .setFooter(
        `command triggered by ${msg.author.tag}`,
        msg.author.displayAvatarURL()
      );
    let i = 0;
    let j = 1;
    let embedDescription = "";
	  if(!musicQueue.length){ embedDescription = "`Nothing in Queue`"
	  }else{
	  embed.addField("NOW PLAYING :",`[${musicQueue[0]}](${musicQueue[1]})`);
	  }
    musicQueue.forEach((item) => {
      if (i % 2 === 0) {
        embedDescription = embedDescription + `${j}: ` + `[${item}]`;
        j++;
      } else {
        embedDescription = embedDescription + `(${item})` + `\n`;
      }
      i++;
    });
    embed.setDescription(embedDescription);
    msg.channel.send(embed);
  }

  if (msg.content.startsWith("*plei") || msg.content.startsWith("*p")) {
    var song = "";
    let songTitle;
    var voiceChannel = msg.member.voice.channel;
    let playing;
    musicQueue.length ? (playing = false) : (playing = true);
    if (!msg.member.voice.channel) {
      msg.channel.send("`you need to join a vc first`");
      return;
    }
    // getting the song name combined if spaces
    msgcontent = msg.content.trim().split(" ");
    if (msgcontent[1]) {
      var i;
      for (i = 1; i <= msgcontent.length - 1; i++) {
        var song = song + `${msgcontent[i]} `;
      }
      console.log(song);

      if (ytdl.validateURL(song)) {
        let vidInfo = await ytdl.getInfo(song);
        songTitle = vidInfo.player_response.videoDetails.title;
        queueStart();
      } else {
        const videos = await usetube.searchVideo(song);
        console.log(videos);
        songTitle = videos.videos[0].original_title;
        song = "https://www.youtube.com/watch?v=" + videos.videos[0].id;
        queueStart();
      }

      function queueStart() {
        musicQueue.push(songTitle);
        musicQueue.push(song);
        embed = new Discord.MessageEmbed()
          .setTitle("Song Queued!")
          .setDescription(`[${songTitle}](${song})`);
        msg.channel.send(embed);
        if (playing) {
          voiceChannel.join().then(async (connection) => {
            /*embed = new Discord.MessageEmbed()
            .setTitle("NOW PLAYING")
            .setDescription(`${results[0].title}`)
            .setFooter(
              `command triggered by ${msg.author.tag}`,
              msg.author.displayAvatarURL()
            );
          msg.channel.send(embed);
        */
            currentConnection = connection;
            console.log("sex");
            playMusic(connection, musicQueue[1], msg);
          });
        }
      }
    } else {
      msg.channel.send(`Please give a song name to play`);
    }
  }

  if (msg.content === "*disconnect" || msg.content === "*dc") {
    if (msg.member.voice.channel) {
      msg.member.voice.channel.leave();
    } else {
      msg.reply("`you need to be in the same vc as the bot`");
    }
  }

  if (msg.content === "*help") {
    let embed = new Discord.MessageEmbed().setTitle("Help");
    msg.channel.send(embed);
  }
});

client.on("voiceStateUpdate", (oldState, newState) => {
  // check if someone connects or disconnects
  if (oldState.channelID === null || typeof oldState.channelID == "undefined")
    return;
  // check if the bot is disconnecting
  if (newState.id !== client.user.id) return;
  // clear the queue
  musicQueue = [];
});

client.login(process.env["DISCORD_API_KEY"]);
