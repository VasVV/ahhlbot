require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_API_KEY;

const bot = new TelegramBot(token, {polling: true});

const hohloImgsArray = ['./hohloimgs/img1.jpg', './hohloimgs/img2.jpg', './hohloimgs/img3.jpg', './hohloimgs/img4.jpg', './hohloimgs/img5.jpg', './hohloimgs/img6.jpg', './hohloimgs/img7.jpg'];

const hohloPacksArray = ['CAACAgIAAxkBAAEFmmBi_syEZgmfO7QCGdZsF8oNHM5HCAACngAD4GSOEU4BGWipn4MaKQQ', 'CAACAgIAAxkBAAEFmmJi_syNoWOnXT-Js9S4zPqps6t8AgACphkAAvYQ6Ep15Rf7Ky5lFSkE', 'CAACAgIAAxkBAAEFmmRi_sybzynsjXDTh9NmZmT4KPIAARYAAi8AAzO01hmId8E_ZDCYNSkE', 'CAACAgQAAxkBAAEFmmZi_syqa99dca-bHTvLkgcv_pmdGAACFQ0AAstECVETIDXCt8d-QykE', 'CAACAgIAAxkBAAEFmmhi_syxzluyZJg5T69zp4rMaVEPpAACphgAAqYf6EmDpcqZLPN7XykE', 'CAACAgIAAxkBAAEFmmpi_sy_sazBOq8iH7MlUedU81_OoQAC1AoAAvkd4Et4dsoF76Fu_ikE', 'CAACAgIAAxkBAAEFmmxi_szRDZ2rH9wGUOi1gbfmwHaMbQACpwAD4GSOEWRCuwABptXMaSkE']

const keyboard = [
    [
      {
        text: '💤ПатриотиZатор текста', 
        callback_data: 'patriotText' 
      }
    ],
    [
      {
        text: '🐖Стикерпаки для киберVоинов',
        callback_data: 'hohloPacks'
      }
    ],
    [
      {
        text: '🐽Vеселые картинки',
        callback_data: 'hohloImgs'
      }
    ],
    [
        {
            text: '🇷🇺Тест на патриотиZм',
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
  ];

const hohloPacksKeyboard = [
    [
        {
            text: 'Понадусеровые каклошвайны',
            callback_data: 0
        }
    ],
    [
        {
            text: 'Хохлы говноеды',
            callback_data: 1
        }
    ],
    [
        {
            text: 'Понадусеровые каклошвайны 2',
            callback_data: 2
        }
    ],
    [
        {
            text: 'Еще не сдохла Украина',
            callback_data: 3
        }
    ],
    [
        {
            text: 'Понадусеровые каклошвайн i его друзья',
            callback_data: 4
        }
    ],
   [ 
        {
            text: 'Хохлы пидорасы',
            callback_data: 5
        }
    ],
    [
        {
            text: 'Хохлы сосут',
            callback_data: 6
        }
    ],
    [
        {
            text: 'Все паки',
            callback_data: 'ALL'
        }
    ]
];


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
    bot.onText(/.+/gi, async (msg, match) => {
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
        .join('');
        await bot.sendMessage(chatId, resp);
        
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

const genericKeyboardCall = (chatId, resp, inline_keyboard) => {
        bot.sendMessage(chatId, resp, { 
            reply_markup: {
                inline_keyboard
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

bot.on('message', (msg) => {
    const chatId = msg.chat.id; 
    const text = msg.text;
    if (text === '/start') {
        genericKeyboardCall(chatId, 'ZдароVa, что выберешь?', keyboard)
    }
  });
  

bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    if ( /[0-7]/.test(query.data) ) {
        bot.sendSticker(chatId, hohloPacksArray[query.data]);
        genericKeyboardCall(chatId, 'ZдароVa, что выберешь?', keyboard)
    } else if (query.data === 'ALL') {
        await Promise.all(hohloPacksArray.map(async hohloPack => await bot.sendSticker(chatId, hohloPack)));
        genericKeyboardCall(chatId, 'ZдароVa, что выберешь?', keyboard);
    } else {
        switch(query.data) {
            case 'patriotText': 
                bot.sendMessage(chatId, 'Vvеди любой текст и ты получишь его патриотичную Vерсию:');
                patriotText(chatId);
                //keyboardCall(chatId);
                break;
            case 'hohloPacks':
                genericKeyboardCall(chatId, 'Какой пак выберешь?', hohloPacksKeyboard);
                
                break;
            case 'hohloImgs':
                hohloImgs(chatId);
                break;
            case 'patriotTest':
                patriotTest(chatId);
                break;
        }
    }
  });