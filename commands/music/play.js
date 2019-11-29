const ytdl = require('ytdl-core');
// const YouTube = require('simple-youtube-api');
const queue = new Map();

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

	dispatcher.setVolumeLogarithmic(5 / 5);
}


module.exports = async message => {
    const args = message.content.split(' ');
    const url = args[1];
    const serverQueue = queue.get(message.guild.id);

    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.reply('You need to be in a voice channel to play music!');

    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
        return message.channel.send('I need the permissions to join and speak in your voice channel!');
    }

    if (!url) {
        return message.reply(' Please add the Youtube link of your song after the !play command, divided with a space.');
    }

    if (!voiceChannel) {
        return message.reply('You need to be in a voice channel to play music.');
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
        return message.channel.send(`'${song.title}' has been added to the queue.`);
    }

    return undefined;
};

// https://www.youtube.com/watch?v=4IcBdWOOsPo&list=PLVzaElkTvlQae8XJ0ujnEgz1GviufNx8h&index=2