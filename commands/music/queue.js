const ytdl = require('ytdl-core');

const streamOptions = {seek: 0, volume: 1};

module.exports = message => {
    var queueList = new Map();
    const serverQueue = queueList.get(message.guild.id);
    const songInfo = ytdl.getInfo(url);
    const song = {
        title: songInfo.title,
        url: songInfo.video_url
    };
    console.log(songInfo.baseUrl);
    

    if (!serverQueue) {
        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        };

        queueList.set(message.guild.id, queueConstruct);
        
        try {
            var connection = voiceChannel.join();
        } catch (error) {
            console.error(`I could not join the voice channel ${error}`);
        }
    } else {

    }
};


// module.exports = message => {
//     const queue = new Map();
//     async function execute(message, serverQueue) {
//         const args = message.content.split(' ');
//         const voiceChannel = message.member.voiceChannel;

//         if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');
        
//         const permissions = voiceChannel.permissionsFor(message.client.user);
//         if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
//             return message.channel.send('I need the permissions to join and speak in your voice channel!');
//         }

//         const songInfo = await ytdl.getInfo(args[1]);
//         const song = {
//             title: songInfo.title,
//             url: songInfo.video_url,
//         };

//         if (!serverQueue) {

//         } else {
//             serverQueue.songs.push(song);
//             console.log(serverQueue.songs);
//             return message.channel.send(`${song.title} has been added to the queue!`);
//         }

//         // Creating the contract for our queue
//         const queueContruct = {
//             textChannel: message.channel,
//             voiceChannel: voiceChannel,
//             connection: null,
//             songs: [],
//             volume: 5,
//             playing: true,
//         };

//         // Setting the queue using our contract
//         queue.set(message.guild.id, queueContruct);
//         // Pushing the song to our songs array
//         queueContruct.songs.push(song);

//         try {
//             // Here we try to join the voicechat and save our connection into our object.
//             var connection = await voiceChannel.join();
//             queueContruct.connection = connection;
//             // Calling the play function to start a song
//             play(message.guild, queueContruct.songs[0]);
//         } catch (err) {
//             // Printing the error message if the bot fails to join the voicechat
//             console.log(err);
//             queue.delete(message.guild.id);
//             return message.channel.send(err);
//         }

//         function play(guild, song) {
//             const serverQueue = queue.get(guild.id);
//             if (!song) {
//                 serverQueue.voiceChannel.leave();
//                 queue.delete(guild.id);
//                 return;
//             }
//         }

//         const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
//             .on('end', () => {
//                 console.log('Music ended!');
//                 // Deletes the finished song from the queue
//                 serverQueue.songs.shift();
//                 // Calls the play function again with the next song
//                 play(guild, serverQueue.songs[0]);
//             })
//             .on('error', error => {
//                 console.error(error);
//             });
//         dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);






//      }
// };