// Doet een berekening.

module.exports = message => {
    const gotMessage = message.content.split(' ');
    const calculation = gotMessage[1];

    if (!calculation) {
        return message.reply(' Please add your calculation after the !calc command, divided with a space.');
    }

    function calculate(fn) {
        return new Function('return ' +fn)();
    }    

    return message.reply(` ${calculation} = ${calculate(calculation)}`);
};