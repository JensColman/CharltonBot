const Discord = require('discord.js');

module.exports = message => {
    const gotMessage = message.content.split(' ');
    const specificCommand = gotMessage[1];

    const helpPage = [
        { command: "!help", discription: "This command gives an overview on the available commands. If you type a command behind !help you can get information on a specific command.", usage: "Type !help for a list with all the commands available. \nType !help [command] to get a short description of the command and how to use it."},
        { command: "!kick", discription: "If you want to kick a user from the server; this is the command you can use.", usage: "Type !kick @[user] to kick a user from the server." },
        { command: "!calc", discription: "There is a time when you quickly want to calculate something. Since we're all too lazy to search for a calculator, you can simply use this command.", usage: "Type !calc [the calculation] to calculate." },
        { command: "!play", discription: "tbd", usage: "Type !play [Link to the Youtube video] to play this song in the voice channel." },
        { command: "!stop", discription: "tbd", usage: "Type !stop to stop the music that is currently is playing." },
        { command: "!skip", discription: "tbd", usage: "tbd" }
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