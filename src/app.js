import { RTMClient } from '@slack/rtm-api'
import { SLACK_OAUTH_TOKEN,BOT_SPAM_CHANNEL } from './constants'
// const tokens = require('./constants')
import { WebClient } from '@slack/web-api';

const packageJson = require('../package.json')

// const rtm = new RTMClient(tokens.SLACK_OAUTH_TOKEN);
// const web = new WebClient(tokens.SLACK_OAUTH_TOKEN);

const rtm = new RTMClient(SLACK_OAUTH_TOKEN);
const web = new WebClient(SLACK_OAUTH_TOKEN);

rtm.start()
    .catch(console.error);

rtm.on('ready', async () =>{
    console.log('bot andando')
    enviarMensaje(BOT_SPAM_CHANNEL, `Robot version ${packageJson.version} esta activo`)
});

rtm.on('slack_event', async (eventType, event) =>{

    // console.log(eventType)
    console.log(event)

    if( event && event.type === 'message'){
        if (event.text === 'hola'){
            hola(event.channel, event.user)
        }
    }

    if( event && event.type === 'message'){
        if (event.text === 'enlace'){
            enlace(event.channel, event.user)
        }
    }

    if( event && event.type === 'message'){
        if (event.text === 'lista'){
            hojaExcel(event.channel, event.user)
        }
    }

    if( event && event.type === 'message'){
        if (event.text === 'cuentame'){
            infocomandos(event.channel, event.user)
        }
    }

    if( event && event.type === 'message'){
        if (event.text === 'borrador'){
            hojaWord(event.channel, event.user)
        }
    }


})

function infocomandos(channelId, userId){
    enviarMensaje(channelId, 
        `<@${userId}> estos son 
        los comandos para informacion son: 
        enlace = reunion
        lista = documento excel para ver
        borrador = documento word para ver
        `)
}

function hojaWord(channelId, userId){
    enviarMensaje(channelId, `<@${userId}> aqui tienes el link para el word: https://docs.google.com/document/d/1QIBJAPubjxwyev3ZU6V3efrnFdAAb-IcKYEqtUwAJW0/edit?usp=sharing`)
}

function hojaExcel(channelId, userId){
    enviarMensaje(channelId, `<@${userId}> aqui tienes el link para el excel: https://docs.google.com/spreadsheets/d/10iUCFIqy5Sn7oFuuknc0z3ITooyTu80PEigWcTv3CaI/edit?usp=sharing`)
}

function enlace(channelId, userId){
    enviarMensaje(channelId, `<@${userId}>este es el link de la reunion: https://meet.google.com/udr-ytcx-tdj`)
    
}

function hola(channelId, userId){
    enviarMensaje(channelId, `que tal <@${userId}>`)
}


async function enviarMensaje(channel, message){
    await web.chat.postMessage({
        channel: channel,
        text: message,
    });
}
