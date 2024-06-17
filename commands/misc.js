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

 const { tlang, getAdmin, prefix, Config, sck, fetchJson, runtime,cmd,getBuffer } = require('../lib')
 let { dBinary, eBinary } = require("../lib/binary");
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
 const fs = require('fs')
 const axios = require('axios')
  //---------------------------------------------------------------------------
 cmd({
    pattern: "setwelcome",
    desc: "sets welcome message in specific group.",
    category: "misc",
},
async(Void, xstro, text,{ isCreator }) => {
    if (!isCreator) return xstro.reply(tlang().owner)
          let Group = await sck.findOne({ id: xstro.chat })
            if (!Group) {
                await new sck({ id: xstro.chat, welcome: text,events:'true' }).save()
                return xstro.reply('Welcome added added for this group.')
            } else {
                await await sck.updateOne({ id: xstro.chat }, { welcome:text ,events:'true'})
                return xstro.reply('Welcome updated successfully.')
                
            }      
}
)
 //---------------------------------------------------------------------------
cmd({
    pattern: "setgoodbye",
    desc: "sets goodbye message in specific group.",
    category: "misc",
},
async(Void, xstro, text,{ isCreator }) => {
    if (!isCreator) return xstro.reply(tlang().owner)
          let Group = await sck.findOne({ id: xstro.chat })
            if (!Group) {
                await new sck({ id: xstro.chat, goodbye: text,events:'true' }).save()
                return xstro.reply('Goodbye added for this group.');
            } else {
                await await sck.updateOne({ id: xstro.chat }, { goodbye:text,events:'true' })
                return xstro.reply('Goodbye updated successfully.');     
            }      
}
)
 //---------------------------------------------------------------------------
 cmd({
             pattern: "attp",
             desc: "Makes glowing sticker of text.",
             category: "sticker",
             filename: __filename,
         },
         async(Void, xstro, text) => {
let a = await getBuffer(`https://xstro-x.herokuapp.com/attp/${text}`)
 return xstro.reply(a,{packname:'Secktor',author:'ATTP'},"sticker") 
         }
     )
 cmd({
             pattern: "ttp",
             desc: "Makes static sticker of text.",
             category: "sticker",
             filename: __filename,
         },
         async(Void, xstro, text) => {
let a = await getBuffer(`https://xstro-x.herokuapp.com/ttp/${text}`)
 return xstro.reply(a,{packname:'Secktor',author:'TTP'},"sticker") 
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "exec",
             desc: "Evaluates quoted code with given language.",
             category: "misc",
             filename: __filename,
         },
         async(Void, xstro, text) => {
             try {
                 const code = {
                     script: xstro.quoted.text,
                     language: text[1],
                     versionIndex: "0",
                     stdin: text.slice(2).join(" "),
                     clientId: '694805244d4f825fc02a9d6260a54a99',
                     clientSecret: '741b8b6a57446508285bb5893f106df3e20f1226fa3858a1f2aba813799d4734'
                 };
                 request({
                     url: "https://api.jdoodle.com/v1/execute",
                     method: "POST",
                     json: code
                 }, function(_error, _response, body) {
                    return xstro.reply("> " + text[1] + "\n\n" + "```" + body.output + "```");
                 });
             } catch (error) {
                 console.log(error);
             }
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "readmore",
             desc: "Adds *readmore* in given text.",
             category: "misc",
             filename: __filename,
         },
         async(Void, xstro, text) => {
            return await xstro.reply(text.replace(/\+/g, (String.fromCharCode(8206)).repeat(4001)))
 
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "steal",
             desc: "Makes sticker of replied image/video.",
             category: "sticker",
             filename: __filename,
         },
         async(Void, xstro, text) => {
             if (!xstro.quoted) return xstro.reply(`*Mention any Image or video Sir.*`);
             let mime = xstro.quoted.mtype
             var pack;
             var author;
             if (text) {
                 anu = text.split("|");
                 pack = anu[0] !== "" ? anu[0] : xstro.pushName + '♥️';
                 author = anu[1] !== "" ? anu[1] : Config.author;
             } else {
                 pack = xstro.pushName;
                 author = "♥️";
             }
                 let media = await xstro.quoted.download();
                 xstro.reply("*Processing Your request*");
                let sticker = new Sticker(media, {
                    pack: pack, // The pack name
                    author: author, // The author name
                    type: text.includes("--crop" || '-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
                    categories: ["🤩", "🎉"], // The sticker category
                    id: "12345", // The sticker id
                    quality: 75, // The quality of the output file
                    background: "transparent", // The sticker background color (only for full stickers)
                });
                const buffer = await sticker.toBuffer();
                return Void.sendMessage(xstro.chat, {sticker: buffer }, {quoted: xstro });
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "uptime",
             alias: ["runtime"],
             desc: "Tells runtime/uptime of bot.",
             category: "misc",
             filename: __filename,
         },
         async(Void, xstro, text) => {
             const upt = runtime(process.uptime())
             return xstro.reply(`Uptime of ${tlang().title}: ${upt}`)
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "wm",
             desc: "Makes wa.me of quoted or mentioned user.",
             category: "misc",
             filename: __filename,
         },
         async(Void, xstro, text) => {
             let users = xstro.mentionedJid ? xstro.mentionedJid[0].split('@')[0] : xstro.quoted ? xstro.quoted.sender.split('@')[0] : text.replace('@')[0]
            return xstro.reply(`https://wa.me/${users}`)
 
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "pick",
             desc: "Pics random user from Group",
             category: "misc",
             filename: __filename,
         },
         async(Void, xstro, match) => {
             if (!match) return xstro.reply("*Which type of User you want?*");
             const groupMetadata = xstro.isGroup ? await Void.groupMetadata(xstro.chat)
                 .catch((e) => {}) : "";
             const participants = xstro.isGroup ? await groupMetadata.participants : "";
             let member = participants.map((u) => u.id);
             let me = xstro.sender;
             let pick = member[Math.floor(Math.random() * member.length)];
             Void.sendMessage(xstro.chat, {
                 text: `The most ${match} around us is *@${pick.split("@")[0]}*`,
                 mentions: [pick],
             }, {
                 quoted: xstro,
             });
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "npm",
             desc: "download mp4 from url.",
             category: "search",
             use: '<package name>',
             filename: __filename,
         },
         async(Void, xstro, text) => {
             if (!text) return xstro.reply('Please give me package name.📦')
             axios.get(`https://api.npms.io/v2/search?q=${text}`).then(({ data }) => {
                 let txt = data.results.map(({ package: pkg }) => `*${pkg.name}* (v${pkg.version})\n_${pkg.links.npm}_\n_${pkg.description}_`).join('\n\n')
                 xstro.reply(txt)
             }).catch(e => console.log(e))
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "fliptext",
             desc: "Flips given text.",
             category: "misc",
             use: '<query>',
             filename: __filename,
         },
         async(Void, xstro, text) => {
             if (!text) return xstro.reply(`Example : ${prefix}fliptext Back in black`)
             flipe = text.split('').reverse().join('')
             xstro.reply(`\`\`\`「  Text Flipper Tool  」\`\`\`\n*IGiven text :*\n${text}\n*Fliped text :*\n${flipe}`)
 
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "mp4fromurl",
             desc: "download mp4 from url.",
             category: "misc",
             use: '<url>',
             filename: __filename,
         },
         async(Void, xstro, text) => {
             if (!text) return xstro.reply(`Where's the link ?`);
             Void.sendMessage(xstro.chat, {
                 video: {
                     url: text.split(" ")[0],
                 },
                 caption: "*HERE WE GO*",
                 contextInfo: {
                     externalAdReply: {
                         title: tlang().title,
                         body: `${xstro.pushName}`,
                         thumbnail: log0,
                         mediaType: 2,
                         mediaUrl: ``,
                         sourceUrl: ``,
                     },
                 },
             }, {
                 quoted: xstro,
             });
 
         }
     )
     //---------------------------------------------------------------------------
 
 cmd({
             pattern: "emix",
             desc: "Mixes two emojies.",
             category: "misc",
             use: '<query>',
             filename: __filename,
         },
         async(Void, xstro, text,{ isCreator }) => {
             if (!text) return xstro.reply(`Example : ${prefix}emix 😅,🤔`);
             let [emoji1, emoji2] = text.split `,`;
             let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1 )}_${encodeURIComponent(emoji2)}`);
             for (let res of anu.results) {
                 let encmedia = await Void.sendImageAsSticker(xstro.chat, res.url, xstro, {
                     packname: global.packname,
                     author: global.author,
                     categories: res.tags,
                 });
                 await fs.unlinkSync(encmedia);
             }
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "chatbot",
             desc: "activates and deactivates chatbot.\nuse buttons to toggle.",
             category: "misc",
             filename: __filename
         },
         async(Void, xstro, text,{ isCreator }) => {
             if (!isCreator) return xstro.reply(tlang().owner)
             const { chatbot } = require('../lib/');
             switch (text.split(" ")[0]) {
                 case "on":
                     {
                      let chatbott= await chatbot.findOne({ id: 'chatbot' })
                     if (!chatbott) {
                         await new chatbot({ id: 'chatbot', worktype: "true" }).save()
                         return xstro.reply('Chatbot activated successfully.')
                     } else {
                         if (chatbott.worktype == "true") return xstro.reply("Chatbot was already enabled.")
                         await chatbot.updateOne({ id: 'chatbot' }, { worktype: "true" })
                         xstro.reply('Enabled chatbot successfully.')
                         return
                     }      
                     }
                     break
                 case "off":
                     {
                      let chatbott= await chatbot.findOne({ id: 'chatbot' })
                     if (!chatbott) {
                         await new chatbot({ id: 'chatbot', worktype: "false" }).save()
                         return xstro.reply('Chatbot deactivated successfully.')
                     } else {
                         if (chatbott.worktype == "false") return xstro.reply("Chatbot was already disabled.")
                         await chatbot.updateOne({ id: 'chatbot' }, { worktype: "false" })
                         xstro.reply('Disabled chatbot successfully.')
                         return
                     }
                     }
                     break
                 default:
                     {
                         let buttons = [{
                                 buttonId: `${prefix}chatbot on`,
                                 buttonText: {
                                     displayText: "Turn On",
                                 },
                                 type: 1,
                             },
                             {
                                 buttonId: `${prefix}chatbot off`,
                                 buttonText: {
                                     displayText: "Turn Off",
                                 },
                                 type: 1,
                             },
                         ];
                         let chatbott= await chatbot.findOne({ id: 'chatbot' })
                         await Void.sendButtonText(xstro.chat, buttons, `Chatbot Status: ${chatbott.worktype} `, 'Secktor-Md', xstro);
                        xstro.reply(`Chatbot Status: ${chatbott.worktype} \n*Use:* ${prefix}chatbot on\n${prefix}chatbot off`)
                        }
             }
 
 
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "ebinary",
             desc: "encode binary",
             category: "misc",
             use: '<query>',
             filename: __filename,
         },
         async(Void, xstro, text,{ isCreator }) => {
             try {
                 if (!text) return xstro.reply(`Send text to be encoded.`);
 
                 let textt = text || xstro.quoted.text
                 let eb = await eBinary(textt);
                 xstro.reply(eb);
             } catch (e) {
                 console.log(e)
             }
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "dbinary",
             desc: "decode binary",
             category: "misc",
             use: '<query>',
             filename: __filename,
         },
         async(Void, xstro, text,{ isCreator }) => {
             try {
                 if (!text) return xstro.reply(`Send text to be decoded.`);
                 let eb = await dBinary(text);
                 xstro.reply(eb);
             } catch (e) {
                 console.log(e)
             }
         }
     )
cmd({
  pattern: "bot",
  desc: "activates and deactivates bot.\nuse buttons to toggle.",
  category: "misc",
  filename: __filename,
},
async(Void, xstro, text,{isCreator}) => {
  if (!xstro.isGroup) return xstro.reply(tlang().group);
  if(!isCreator) return //xstro.reply(tlang().owner)
switch (text.split(" ")[0]) {
 case 'on':{
         let checkgroup = await sck.findOne({ id: xstro.chat })
         if (!checkgroup) {
             await new sck({ id: xstro.chat, botenable: "true" }).save()
             return xstro.reply(`Successfully Enabled *${tlang().title}*`)
         } else {
             if (checkgroup.botenable == "true") return xstro.reply("*Bot* was already enabled")
             await sck.updateOne({ id: xstro.chat }, { botenable: "true" })
             return xstro.reply(`Successfully Enabled *${tlang().title}*`)
         }
     }
  
 break
case 'off':{
            {
             let checkgroup = await sck.findOne({ id: xstro.chat })
             if (!checkgroup) {
                 await new sck({ id: xstro.chat, botenable: "false" })
                     .save()
                 return xstro.reply(`Successfully disabled *${tlang().title}*`)
             } else {
                 if (checkgroup.botenable == "false") return xstro.reply("*Bot* was already disabled")
                 await sck.updateOne({ id: xstro.chat }, { botenable: "false" })
                 return xstro.reply(`Successfully disabled *${tlang().title}*`)
             }
         }
}
break
default:{
let checkgroup = await sck.findOne({ id: xstro.chat })
let buttons = [{
          buttonId: `${prefix}bot on`,
          buttonText: {
              displayText: "Turn On",
          },
          type: 1,
      },
      {
          buttonId: `${prefix}bot off`,
          buttonText: {
              displayText: "Turn Off",
          },
          type: 1,
      },
  ];
  await Void.sendButtonText(xstro.chat, buttons, `Bot Status in Group: ${checkgroup.botenable}`, Void.user.name, xstro);
}
}
})   
         
     //---------------------------------------------------------------------------
 cmd({
             pattern: "antilink",
             desc: "activates and deactivates antilink.\nuse buttons to toggle.",
             category: "group",
             filename: __filename,
         },
         async(Void, xstro, text) => {
             if (!xstro.isGroup) return xstro.reply(tlang().group);
             const groupAdmins = await getAdmin(Void, xstro)
             const botNumber = await Void.decodeJid(Void.user.id)
             const isBotAdmins = xstro.isGroup ? groupAdmins.includes(botNumber) : false;
             const isAdmins = xstro.isGroup ? groupAdmins.includes(xstro.sender) : false;
             if (!isAdmins) return xstro.reply(tlang().admin)
             if (!isBotAdmins) return xstro.reply(tlang().botadmin)
             let buttons = [{
                     buttonId: `${prefix}act antilink`,
                     buttonText: {
                         displayText: "Turn On",
                     },
                     type: 1,
                 },
                 {
                     buttonId: `${prefix}deact antilink`,
                     buttonText: {
                         displayText: "Turn Off",
                     },
                     type: 1,
                 },
             ];
             await Void.sendButtonText(xstro.chat, buttons, `Activate antilink:Deletes Link + kick`, Void.user.name, xstro);
         }
     )
     cmd({
        pattern: 'ss',
        alias :['webss' , 'fullss'],
        category: "search",
        desc: "Provides screenshot of given url",
        use: '<text>',
        filename: __filename,
    },
    async(Void, xstro, text) => {
let limit = 5;
try {
if (!text) return xstro.reply("```Uhh Please, Give me Url!```");
let urll = `https://s.vercel.app/api?url=${text.match(/\bhttps?:\/\/\S+/gi)[0]}&width=1280&height=720`
let media  = await getBuffer(urll)
return await Void.sendMessage(xstro.chat ,{image : media } , {quoted:xstro} )
}
catch (err) { return xstro.reply("```Error While Fetching Snapshot```")}
    }
)


     //---------------------------------------------------------------------------
 cmd({ on: "body" }, async(Void, xstro) => {
     if (Config.autoreaction === 'true' && xstro.text.startsWith(prefix)) {
         const emojis = ['❤', '💕', '😻', '🧡', '💛', '💚', '💙', '💜', '🖤', '❣', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥', '💌', '🙂', '🤗', '😌', '😉', '🤗', '😊', '🎊', '🎉', '🎁', '🎈', '👋']
         const emokis = emojis[Math.floor(Math.random() * (emojis.length))]
         Void.sendMessage(xstro.chat, {
             react: {
                 text: emokis,
                 key: xstro.key
             }
         })
     }
 })
