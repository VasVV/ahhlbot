require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_API_KEY;

const bot = new TelegramBot(token, {polling: true});

const hohloImgsArray = ['./hohloimgs/img1.jpg', './hohloimgs/img2.jpg', './hohloimgs/img3.jpg', './hohloimgs/img4.jpg', './hohloimgs/img5.jpg', './hohloimgs/img6.jpg', './hohloimgs/img7.jpg'];

const hohloPacksArray = ['CAACAgIAAxkBAAEFmmBi_syEZgmfO7QCGdZsF8oNHM5HCAACngAD4GSOEU4BGWipn4MaKQQ', 'CAACAgIAAxkBAAEFmmJi_syNoWOnXT-Js9S4zPqps6t8AgACphkAAvYQ6Ep15Rf7Ky5lFSkE', 'CAACAgIAAxkBAAEFmmRi_sybzynsjXDTh9NmZmT4KPIAARYAAi8AAzO01hmId8E_ZDCYNSkE', 'CAACAgQAAxkBAAEFmmZi_syqa99dca-bHTvLkgcv_pmdGAACFQ0AAstECVETIDXCt8d-QykE', 'CAACAgIAAxkBAAEFmmhi_syxzluyZJg5T69zp4rMaVEPpAACphgAAqYf6EmDpcqZLPN7XykE', 'CAACAgIAAxkBAAEFmmpi_sy_sazBOq8iH7MlUedU81_OoQAC1AoAAvkd4Et4dsoF76Fu_ikE', 'CAACAgIAAxkBAAEFmmxi_szRDZ2rH9wGUOi1gbfmwHaMbQACpwAD4GSOEWRCuwABptXMaSkE']

const keyboard = [
    [
      {
        text: 'ПатриотиZатор текста', 
        callback_data: 'patriotText' 
      }
    ],
    [
      {
        text: 'Стикерпаки для киберVоинов',
        callback_data: 'hohloPacks'
      }
    ],
    [
      {
        text: 'Vеселые картинки',
        callback_data: 'hohloImgs'
      }
    ],
    [
        {
            text: 'Тест на патриотиZм',
            callback_data: 'patriotTest'
        }
    ]
  ];

  const patriotTestKeyboard = [
    [
        {
            text: 'Русский',
            callback_data: 'RU'
    }
    ],
    [
        {
            text: 'Не русский',
            callback_data: 'hohol'
        }
    ]
  ]


const patriotTest = (chatId) => {
    bot.sendPhoto(chatId, 'crimea.jpg', {
        reply_markup: {
            inline_keyboard: patriotTestKeyboard
        }
    });

    bot.on('callback_query', (query) => {
        if (query.data === 'RU') {
            bot.sendPhoto(chatId, 'patriot.jpg');
            keyboardCall(chatId);
        } else if (query.data === 'hohol')  {
            hohloImgs(chatId);
        }
        
    })
}  


const patriotText = (chatId) => {
    bot.onText(/.+/gi, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[0]
    .split('')
    .map(letter => {
        if (letter.match(/в/i)) {
            return 'V'
        } else if (letter.match(/з/i)) {
            return 'Z'
        } else return letter;
    })
    .join('')
    bot.sendMessage(chatId, resp);
  });
};

const hohloImgs = (chatId) => {
    const rndInt = Math.floor(Math.random() * 7);
    const pic = hohloImgsArray[rndInt];
    bot.sendPhoto(chatId, pic, { 
        reply_markup: {
          inline_keyboard: keyboard
        }
      });
};

const keyboardCall = (chatId) => {
    bot.sendMessage(chatId, 'Привет, Друг! чего хочешь?', { 
        reply_markup: {
            inline_keyboard: keyboard
        }
    });
}

const hohloPacks = async chatId => {
    await Promise.all(hohloPacksArray.map(async hohloPack => await bot.sendSticker(chatId, hohloPack)))
    keyboardCall(chatId)
}

bot.on('message', (msg) => {
    const chatId = msg.chat.id; 
    keyboardCall(chatId);
  });
  

bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    switch(query.data) {
        case 'patriotText': 
            bot.sendMessage(chatId, 'Vvеди любой текст и ты получишь его патриотичную Vерсию:');
            patriotText(chatId);
            break;
        case 'hohloPacks':
            hohloPacks(chatId);
            break;
        case 'hohloImgs':
            hohloImgs(chatId);
            break;
        case 'patriotTest':
            patriotTest(chatId);
            break;
    }
  });