const prefix = '!';

const kick = require('../commands/kick');
const calc = require('../commands/calculator');
const play = require('../commands/music/play');
const stop = require('../commands/music/stop');
// const queue = require('../commands/music/queue');

module.exports = (client, message) => {
    if (message.author.bot) {
        return undefined;
    }

    if (message.content.startsWith(`${prefix}kick`)) {
        return kick(message);
    }

    if (message.content.startsWith(`${prefix}calc`)) {
        return calc(message);
    }

    if (message.content.startsWith(`${prefix}musicPlay`)) {
        return play(message);
    }

    if (message.content.startsWith(`${prefix}musicStop`)) {
        return stop(message);
    }

    // if (message.content.startsWith(`${prefix}musicQueue`)) {
    //     return queue(message);
    // }
};