const ytdl = require('ytdl-core');
const fs = require('fs');
// require('./play.js')();
// include(play.js);
// const queue = new Map();

module.exports = message => {
    // const serverQueue = queue.get(message.guild.id);
    if (!serverQueue) return message.reply('There is nothing playing that I could skip for you.');
    serverQueue.connection.dispatcher.end();
    return undefined;
    
};