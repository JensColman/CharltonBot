// Doet een berekening.

module.exports = message => {
    const gotMessage = message.content.split(' ');
    const calculation = gotMessage[1];

    // if (!member) {
    //     return message.reply(`What do you want to calculate?`);
    // }

    function calculate(fn) {
        return new Function('return ' +fn)();
    }    

    return message.reply(`${calculation} = ${calculate(calculation)}`);
};