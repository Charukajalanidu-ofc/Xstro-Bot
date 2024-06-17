/**
 Copyright (C) 2022.
 Licensed under the  GPL-3.0 License;
 You may not use this file except in compliance with the License.
 It is supplied in the hope that it may be useful.
 * @project_name : Secktor-Md
 * @author : SamPandey001 <https://github.com/SamPandey001>
 * @description : Secktor,A Multi-functional whatsapp bot.
 * @version 0.0.6
 **/

const { addnote,cmd, sck1, delnote, allnotes, delallnote, tlang, botpic, runtime, prefix, Config ,sleep} = require('../lib')
const { TelegraPh } = require('../lib/scraper')   
const util = require('util')
//---------------------------------------------------------------------------
cmd({
            pattern: "addnote",
            category: "owner",
            desc: "Adds a note on db.",
            filename: __filename
        },
        async(Void, xstro, text,{ isCreator }) => {
            if (!isCreator) return xstro.reply(tlang().owner)
            if (!text) return xstro.reply("🔍 Please provide me a valid gist url.")
            await addnote(text)
            return xstro.reply(`New note ${text} added in mongodb.`)

        }
    )
 
    //---------------------------------------------------------------------------
cmd({
            pattern: "qr",
            category: "owner",
            filename: __filename,
            desc: "Sends xstrosVoid Qr code to scan and get your session id."
        },
        async(Void, xstro, text) => {
            if (text) {
                let h = await getBuffer(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${text}`)
                await Void.sendMessage(xstro.chat, { image: h })
                return
            }
            let buttonMessaged = {
                image: { url: 'https://xstro-x.herokuapp.com/session' },
                caption: `*_Scan Qr within 15 seconds_*\nYou'll get session id in your log number.`,
                footer: ` Session`,
                headerType: 4,
                contextInfo: {
                    externalAdReply: {
                        title: 'Secktor Session',
                        body: 'Get you Session ID',
                        thumbnail: log0,
                        mediaType: 2,
                        mediaUrl: ``,
                        sourceUrl: ``,
                    },

                },

            };
            await Void.sendMessage(xstro.chat, buttonMessaged, {
                quoted: xstro,

            });
            await sleep(20 * 1000)
            return xstro.reply('Your session is over now.')


        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "unban",
            category: "misc",
            filename: __filename,
            desc: "Unbans banned user (from using bot)."
        },
        async(Void, xstro, text,{ isCreator }) => {
            if (!isCreator) return xstro.reply("This command is onlt for my Owner")
            try {
                let users = xstro.mentionedJid ? xstro.mentionedJid[0] : xstro.msg.contextInfo.participant || false;
                if (!users) return xstro.reply("Please mention any user.❌")
                let pushnamer = Void.getName(users);
                sck1.findOne({ id: users }).then(async(usr) => {
                    if (!usr) {
                        console.log(usr.ban)
                        return xstro.reply(`${pushnamer} is unbanned.`)
                    } else {
                        console.log(usr.ban)
                        if (usr.ban !== "true") return xstro.reply(`${usr.name} is already unbanned.`)
                        await sck1.updateOne({ id: users }, { ban: "false" })
                        return xstro.reply(`${usr.name} is free as a bird now`)
                    }
                })
            } catch {
                return xstro.reply("Please mention any user.❌")
            }


        }
    )
    //---------------------------------------------------------------------------
    cmd({
        pattern: "url",
        alias : ['createurl'],
        category: "misc",
        filename: __filename,
        desc: "image to url."
    },
    async(Void, xstro, text) => {
        if (!xstro.quoted) return await xstro.reply(`*Reply To Any Image/Video To Get Url*`)
        let mime = xstro.quoted.mtype
        if(mime !='videoMessage' && mime !='imageMessage' ) return await xstro.reply("Uhh Please, Reply To An Image/Video")
        let media = await Void.downloadAndSaveMediaMessage(xstro.quoted);
        let anu = await TelegraPh(media);
        await xstro.reply('*Here is URL of your media.\n'+util.format(anu));
        return await fs.unlinkSync(media);
    })

    //---------------------------------------------------------------------------
//---------------------------------------------------------------------------
cmd({
    pattern: "trt",
    alias :['translate'],
    category: "misc",
    filename: __filename,
    desc: "Translate\'s given text in desird language."
},
async(Void, xstro, text) => {
    if(!text && !xstro.quoted) return await xstro.reply(`*Please Give Me Text. Example: _${prefix}trt en Who are you_*`);
    const translatte = require("translatte");
    let lang = text ? text.split(" ")[0].toLowerCase() : 'en';
    if (!xstro.quoted)  { text = text.replace( lang , "");  }
    else { text = xstro.quoted.text; }
    var whole = await translatte(text, { from:"auto",  to: lang , });
    if ("text" in whole) { return await xstro.reply('*Translated text:*\n'+whole.text); }
}
)
    //---------------------------------------------------------------------------
cmd({
            pattern: "shell",
            category: "owner",
            filename: __filename,
            desc: "Runs command in Heroku(server) shell."
        },
        async(Void, xstro, text,{ isCreator }) => {
            if (!isCreator) return xstro.reply(tlang().owner)
            const { exec } = require("child_process")
            exec(text, (err, stdout) => {
                if (err) return xstro.reply(`----${tlang().title}----\n\n` + err)
                if (stdout) {
                    return xstro.reply(`----${tlang().title}----\n\n` + stdout)
                }
            })
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "eval",
            category: "owner",
            filename: __filename,
            desc: "Runs js code on node server."
        },
        async(Void, xstro, text,{ isCreator }) => {
            if (!isCreator) return
            try {
                let resultTest = eval('const a = async()=>{\n' + text + '\n}\na()');
                if (typeof resultTest === "object")
                    xstro.reply(JSON.stringify(resultTest));
                else xstro.reply(resultTest.toString());
            } catch (err) {
                return  xstro.reply(err.toString());
            }
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "delnote",
            category: "owner",
            filename: __filename,
            desc: "Deletes note from db."
        },
        async(Void, xstro, text,{ isCreator }) => {
            const { tlang } = require('../lib/scraper')
            if (!isCreator) return xstro.reply(tlang().owner)
            await delnote(text.split(" ")[0])
             return xstro.reply(`Id: ${text.split(" ")[0]}\'s note has been deleted from mongodb.`)

        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "delallnotes",
            category: "owner",
            filename: __filename,
            desc: "Deletes all notes from db."
        },
        async(Void, xstro, text, isCreator) => {
            const { tlang } = require('../lib/scraper')
            if (!isCreator) return xstro.reply(tlang().owner)
            await delallnote()
             return xstro.reply(`All notes deleted from mongodb.`)

        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "ban",
            category: "owner",
            filename: __filename,
            desc: "Bans user from using bot."
        },
        async(Void, xstro, text,{ isCreator}) => {
            if (!isCreator) return xstro.reply(tlang().owner)
            try {
                let users = xstro.mentionedJid ? xstro.mentionedJid[0] : xstro.msg.contextInfo.participant || false;
                if (!users) return xstro.reply(`❌ Please mention any user ${tlang().greet}.`)
                let pushnamer = Void.getName(users);
                sck1.findOne({ id: users }).then(async(usr) => {
                    if (!usr) {
                        await new sck1({ id: users, ban: "true" }).save()
                        return xstro.reply(`_Banned ${usr.name} from Using Commands._`)
                    } else {
                        if (usr.ban == "true") return xstro.reply(`${pushnamer} is already Banned from Using Commands`)
                        await sck1.updateOne({ id: users }, { ban: "true" })
                        return xstro.reply(`_Successfully Banned ${usr.name} from Using Commands._`)
                    }
                })
            } catch (e) {
                console.log(e)
                return xstro.reply("Please mention any user.❌ ")
            }


        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "alive",
            category: "general",
            filename: __filename,
            desc: "is bot alive??"
        },
        async(Void, xstro, text, isAdmins) => {
            let alivemessage = Config.ALIVE_MESSAGE || `*A bot developed by SamPandey001.*`
            const alivtxt = `
*Hello, ${xstro.pushName},*
_This is  ${tlang().title}._
${alivemessage}

*Version:-* _0.0.7_
*Uptime:-* _${runtime(process.uptime())}_
*Owner:-* _${Config.ownername}_
*Branch:-* _${Config.BRANCH}_

_Type ${prefix}menu for my command list._

_Powered by ${Config.ownername}_
`;
            let aliveMessage = {
                image: {
                    url: await botpic(),
                },
                caption: alivtxt,
                footer: tlang().footer,
                headerType: 4,
            };
             return Void.sendMessage(xstro.chat, aliveMessage, {
                quoted: xstro,
            });

        }
    )
    //---------------------------------------------------------------------------
cmd({
        pattern: "allnotes",
        category: "owner",
        filename: __filename,
        desc: "Shows list of all notes."
    },
    async(Void, xstro, text,{ isCreator }) => {
        const { tlang } = require('../lib')
        if (!isCreator) return xstro.reply(tlang().owner)
        const note_store = new Array()
        let leadtext = `All Available Notes are:-\n\n`
        leadtext += await allnotes()
        return xstro.reply(leadtext)

    }
)
