// Berichten in de chat.

// Kick
const kick = require('../commands/kick');
module.exports = (client, message) => {
    if (message.content.startsWith('!kick')) {
        return kick(message);
    }
};

// Calculator
const calc = require('../commands/calculator');
module.exports = (client, message) => {
    if (message.content.startsWith('!calc')) {
        return calc(message);
    }
};

// Music
const music = require('../commands/music');
module.exports = (client, message) => {
    if (message.content.startsWith('!play')) {
        return music(message);
    }
};