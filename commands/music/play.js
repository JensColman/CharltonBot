const ytdl = require('ytdl-core');
// const YouTube = require('simple-youtube-api');
const queue = new Map();
const prefix = '!';
const Discord = require('discord.js');

function playMusic(guild, song) {
    const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
    }
    
    console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection
		.playStream(ytdl(song.url))
		.on('end', () => {
			console.log('Song ended.');
			serverQueue.songs.shift();
			playMusic(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.log(error));

    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    
    serverQueue.textChannel.send(`Now playing: '${song.title}'`);
}


module.exports = async message => {
    const args = message.content.split(' ');
    const url = args[1];
    const serverQueue = queue.get(message.guild.id);
    const voiceChannel = message.member.voiceChannel;

    if (message.content.startsWith(`${prefix}play`)) {
		if (!voiceChannel)
			return message.reply(
				'You need to be in a voice channel to play music!'
			);

		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
			return message.channel.send(
				'I need the permissions to join and speak in your voice channel!'
			);
		}

		if (!url) {
			return message.reply(
				' Please add the Youtube link of your song after the !play command, divided with a space.'
			);
		}

		if (!voiceChannel) {
			return message.reply(
				'You need to be in a voice channel to play music.'
			);
		}

		const songInfo = await ytdl.getInfo(args[1]);
		const song = {
			title: songInfo.title,
			url: songInfo.video_url
		};
		console.log(songInfo.baseUrl);

		if (!serverQueue) {
			const queueContruct = {
				textChannel: message.channel,
				voiceChannel: voiceChannel,
				connection: null,
				songs: [],
				volume: 5,
				playing: true
			};
			queue.set(message.guild.id, queueContruct);

			queueContruct.songs.push(song);

			try {
				var connection = await voiceChannel.join();
				queueContruct.connection = connection;
				playMusic(message.guild, queueContruct.songs[0]);
			} catch (err) {
				console.log(`I could not join the voice channel: ${err}`);
				queue.delete(message.guild.id);
				return message.reply('I could not join the voice channel.');
			}
		} else {
			serverQueue.songs.push(song);
			console.log(serverQueue.songs);
			return message.reply(
				`'${song.title}' has been added to the queue.`
			);
		}

        return undefined;
        
    } else if (message.content.startsWith(`${prefix}skip`)) {
        if (!message.member.voiceChannel) return message.reply('You are not in a voice channel.');
        if (!serverQueue) return message.reply('There is nothing playing that I could skip for you.');
		serverQueue.connection.dispatcher.end();
        return undefined;
        
    } else if (message.content.startsWith(`${prefix}stop`)) {
        if (!message.member.voiceChannel) return message.reply('You are not in a voice channel.');
        if (!serverQueue) return message.reply('There is nothing playing that I could stop for you.');
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
		// message.member.voiceChannel.leave();
        return undefined;
        
    } else if (message.content.startsWith(`${prefix}volume`)) {
        if (!message.member.voiceChannel) return message.reply('You are not in a voice channel.');
        if (!serverQueue) return message.reply('There is nothing playing.');
        if (!args[1]) return message.reply(`The current volume is: ${serverQueue.volume}`);
        serverQueue.volume = args[1];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
        return message.reply(`The volume is set to: ${args[1]}`);

    } else if (message.content.startsWith(`${prefix}nowPlaying`)) {
        if (!serverQueue) return message.reply('There is nothing playing.');
        return message.reply(`Now playing: '${serverQueue.songs[0].title}'`);

    } else if (message.content.startsWith(`${prefix}queue`)) {
        if (!serverQueue) return message.reply('There is nothing playing.');
        return message.reply(
            new Discord.RichEmbed()
            .setColor("#ff33e6")
            .setTitle("Song queue")
            .addField("Now playing:", serverQueue.songs[0].title, false)
            .addField("Playing next:", serverQueue.songs[1] ? serverQueue.songs.map(song => song === serverQueue.songs[0] ? null : song.title) : 'Nothing', false)
        );

    } else if (message.content.startsWith(`${prefix}pause`)) {
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return message.reply('Paused the music.');
        }
        return message.reply('There is nothing playing.');

    } else if (message.content.startsWith(`${prefix}resume`)) {
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return message.reply('Resumed the music.');
        }
        return message.reply('There is nothing playing.');

    }

    return undefined;
		
};

// https://www.youtube.com/watch?v=4IcBdWOOsPo&list=PLVzaElkTvlQae8XJ0ujnEgz1GviufNx8h&index=2