const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '!ping') {
    msg.reply('`pong`');
  }
});

client.on('message', msg => {
	if (msg.content.startsWith('!avatar')) {
		const user = msg.mentions.users.first();
		if (user) {
			user == msg.guild.member(user);
			embed = new Discord.MessageEmbed()
				.setTitle('Avatar')
				.setImage(user.displayAvatarURL({ format:'png', size:2048 }))
				.setFooter('command triggered by '+ msg.author.tag);
		}
		else {
			embed = new Discord.MessageEmbed()
				.setTitle('Avatar')
				.setImage(msg.author.displayAvatarURL({ format:'png', size:2048 }))
				.setFooter('command triggered by '+ msg.author.tag);
		}

		msg.channel.send(embed);
	}
});
	


client.login('ODI2NDE5MDQyNDEwNTYxNTQ2.YGMMtQ.SfSjP90vTzFpD34w8nXHi4kDGas');
