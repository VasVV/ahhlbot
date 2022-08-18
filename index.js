require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_API_KEY;

const bot = new TelegramBot(token, {polling: true});

bot.onText(/.+/gi, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[0].split('').map(letter => {
        if (letter.match(/в/i)) {
            return 'V'
        } else if (letter.match(/з/i)) {
            return 'Z'
        } else return letter;
    })
    .join('')
    bot.sendMessage(chatId, resp);
  });