const Discord = require('discord.js');

module.exports = message => {
    const gotMessage = message.content.split(' ');
    const specificCommand = gotMessage[1];

    const helpPage = [
        { command: "!help", discription: "This command gives an overview on the available commands. If you type a command behind !help you can get information on a specific command.", usage: "Type !help for a list with all the commands available. \nType !help [command] to get a short description of the command and how to use it."},
        { command: "!kick", discription: "If you want to kick a user from the server; this is the command you can use.", usage: "Type !kick @[user] to kick a user from the server." },
        { command: "!calc", discription: "There is a time when you quickly want to calculate something. Since we're all too lazy to search for a calculator, you can simply use this command.", usage: "Type !calc [the calculation] to calculate." },
        { command: "!play", discription: "Is it to sing along with your friends, or do you you want some background music? This command gives you all the music you need.", usage: "Type !play [Link to the Youtube video] to play this song in the voice channel." },
        { command: "!stop", discription: "Tired of the music? Just say stop and the music will be gone.", usage: "Type !stop to stop the queue and the music that is currently playing." },
        { command: "!skip", discription: "Use this command if you want to skip a song.", usage: "Type !skip to stop the current song and go to the next one." },
        { command: "!volume", discription: "Is the music too loud? Or is it too low? This command will let you decide the volume that is just right for you!", usage: "Type !volume to check the current volume. \nType !volume [Number] to change the volume of the music." },
        { command: "!nowPlaying", discription: "Want to know what song is playing right now? Just use me!", usage: "Type !nowPlaying to check what song is currently playing." },
        { command: "!queue", discription: "So you added a song to the queue, but you are unsure when the song is going to be heard? By using this command you can see all the songs that are in the queue.", usage: "Type !queue to see all the songs that are in the queue." },
        { command: "!pause", discription: "You can't hear you friends, you say? Just pause the music.", usage: "Type !pause to pause the music." },
        { command: "!resume", discription: "Where has the music been? Just resume the song that has been paused.", usage: "Type !resume to resume the paused audio." },
    ];

    let findCommand = object => {
        let arrayIndex = undefined;
        helpPage.map((obj, index) => obj.command === object ? arrayIndex = index : false);
        return arrayIndex === undefined ? false : helpPage[arrayIndex];
    };

    if (!specificCommand) {
        return message.reply(
            new Discord.RichEmbed()
            .setColor("#ff33e6")
            .setTitle("All available commands")
            .addField("Commands:", helpPage.map(obj => obj.command), false)
        );
    } else {
        if (findCommand(specificCommand) === false) {
            return message.reply(`'${specificCommand}' is not a command.`);
        } else {
            return message.reply(
                new Discord.RichEmbed()
                    .setColor("#ff33e6")
                    .setTitle(findCommand(specificCommand).command)
                    .addField("Description:", findCommand(specificCommand).discription, false)
                    .addField("Usage:", findCommand(specificCommand).usage, false)
                    .setFooter("Have fun!")
            );
        }
    } 
};