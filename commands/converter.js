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

const axios = require('axios')
const { sck1, tiny, fancytext, listall,cmd,ffmpeg } = require('../lib/')
const fs = require('fs-extra');
const { exec } = require('child_process')
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");

    //---------------------------------------------------------------------------
    cmd({
        pattern: "photo",
        desc: "Makes photo of replied sticker.",
        category: "converter",
        use: '<reply to any gif>',
        filename: __filename
    },
    async(Void, xstro, text) => {
        const getRandom = (ext) => {
            return `${Math.floor(Math.random() * 10000)}${ext}`
        }
        if (!xstro.quoted) return xstro.reply(`_Reply to Any Sticker._`)
        let mime = xstro.quoted.mtype
if (mime =="imageMessage" || mime =="stickerMessage")
{
        let media = await Void.downloadAndSaveMediaMessage(xstro.quoted);
        let name = await getRandom('.png')
        exec(`ffmpeg -i ${media} ${name}`, (err) => {
            let buffer = fs.readFileSync(media)
            Void.sendMessage(xstro.chat, { image: buffer }, { quoted: xstro })
          
         fs.unlink(media, (err) => {
         if (err) { return console.error('File Not Deleted from From TOPHOTO AT : ' , media,'\n while Error : ' , err);  }
         else return console.log('File deleted successfully in TOPHOTO  at : ' , media);
         });
         
        })
        
} else return xstro.reply ("```Uhh Please, Reply To A Non Animated Sticker```")
    }
)
//---------------------------------------------------------------------------

cmd({
         pattern: "vv",
         alias : ['viewonce','retrive'],
         desc: "Flips given text.",
         category: "misc",
         use: '<query>',
         filename: __filename
     },
     async(Void, xstro, text) => {
try {
const quot = xstro.msg.contextInfo.quotedMessage.viewOnceMessageV2;
if(quot)
{
if(quot.message.imageMessage) 
{ console.log("Quot Entered") 
   let cap =quot.message.imageMessage.caption;
   let anu = await Void.downloadAndSaveMediaMessage(quot.message.imageMessage)
   return Void.sendMessage(xstro.chat,{image:{url : anu},caption : cap })
}
if(quot.message.videoMessage) 
{
   let cap =quot.message.videoMessage.caption;
   let anu = await Void.downloadAndSaveMediaMessage(quot.message.videoMessage)
   return Void.sendMessage(xstro.chat,{video:{url : anu},caption : cap })
}
 
}
//else xstro.reply("```This is Not A ViewOnce Message```") 
       
}  
     
catch(e) {  console.log("error" , e ) }     

       
if(!xstro.quoted) return xstro.reply("```Uh Please Reply A ViewOnce Message```")           
if(xstro.quoted.mtype === "viewOnceMessage")
{ console.log("ViewOnce Entered") 
 if(xstro.quoted.message.imageMessage )
{ 
  let cap =xstro.quoted.message.imageMessage.caption;
  let anu = await Void.downloadAndSaveMediaMessage(xstro.quoted.message.imageMessage)
  Void.sendMessage(xstro.chat,{image:{url : anu},caption : cap })
}
else if(xstro.quoted.message.videoMessage )
{
  let cap =xstro.quoted.message.videoMessage.caption;
  let anu = await Void.downloadAndSaveMediaMessage(xstro.quoted.message.videoMessage)
  Void.sendMessage(xstro.chat,{video:{url : anu},caption : cap })
}

}
else return xstro.reply("```This is Not A ViewOnce Message```")

})    //---------------------------------------------------------------------------
cmd({
            pattern: "quotely",
            desc: "Makes Sticker of quoted text.",
            alias: ["q"],
            category: "converter",
            use: '<reply to any message.>',
            filename: __filename
        },
        async(Void, xstro, text) => {
            if (!xstro.quoted) return xstro.reply("Please quote/reply to any message");
            let textt = xstro.quoted.text;
            let pfp;
            try {
                pfp = await Void.profilePictureUrl(xstro.quoted.sender, "image");
            } catch (e) {
                pfp = THUMB_IMAGE;
            }
            let todlinkf = ["#FFFFFF", "#000000"];
            let todf = todlinkf[Math.floor(Math.random() * todlinkf.length)];
            let username = await sck1.findOne({ id: xstro.quoted.sender })
            var tname;
            if (username.name && username.name !== undefined) {
                tname = username.name
            } else {
                tname = Void.getName(xstro.quoted.sender)
            }
            let body = {
                type: "quote",
                format: "png",
                backgroundColor: todf,
                width: 512,
                height: 512,
                scale: 3,
                messages: [{
                    avatar: true,
                    from: {
                        first_name: tname,
                        language_code: "en",
                        name: tname,
                        photo: {
                            url: pfp,
                        },
                    },
                    text: textt,
                    replyMessage: {},
                }, ],
            };
            let res = await axios.post("https://bot.lyo.su/quote/generate", body);
            let img = Buffer.alloc(res.data.result.image.length, res.data.result.image, "base64");
            return xstro.reply(img,{packname:'Secktor',author:'Quotely'},"sticker")

        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "fancy",
            desc: "Makes stylish/fancy given text",
            category: "converter",
            use: '56 Secktor',
            react: "✅",
            filename: __filename
        },
        async(Void, xstro, text) => {
            if (isNaN(text.split(" ")[0]) || !text) {
                let text = tiny(
                    "Fancy text generator\n\nExample: .fancy 32 Secktor\n\n"
                );
                listall("Secktor Bot").forEach((txt, num) => {
                    text += `${(num += 1)} ${txt}\n`;
                });
                return await xstro.reply(text);
            }

            let fancytextt = await fancytext(`${text.slice(2)}`, text.split(" ")[0])
            xstro.reply(fancytextt)

        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "tiny",
            desc: "Makes url tiny.",
            category: "converter",
            use: '<url>',
            react: "✅",
            filename: __filename
        },
        async(Void, xstro, text) => {
            if (!text) return xstro.reply('Provide me a link')
            try {
                link = text.split(" ")[0];
                anu = await axios.get(`https://tinyurl.com/api-create.php?url=${link}`);
                xstro.reply(`*🛡️Your Shortened URL*\n\n${anu.data}`);
            } catch (e) {
                console.log(e);
            }
        }
    )
    //---------------------------------------------------------------------------
    cmd({
        pattern: "circle",
        alias: ["circlestic","circlesticker","cs"],
        desc: "Makes sticker of replied image/video.",
        category: "sticker",
filename: __filename,
        use: '<reply to any image/video.>'
    },
    async(Void, xstro, text) => {
        if (!xstro.quoted) return xstro.reply(`*Reply To any Image or video Sir.*`);
      //console.log("Quoted Data here : ",xstro.quoted);
        let mime = xstro.quoted.mtype
        pack = Config.packname
        author = Config.author
       if (mime =="imageMessage" || mime =="stickerMessage") {
            let media = await xstro.quoted.download();
            //xstro.reply("*Processing Your request*");
            let sticker = new Sticker(media, {
                pack: pack, // The pack name
                author: author, // The author name
                type: StickerTypes.CIRCLE ,
                categories: ["🤩", "🎉"], // The sticker category
                id: "12345", // The sticker id
                quality: 75, // The quality of the output file
            });
            const buffer = await sticker.toBuffer();
            return Void.sendMessage(xstro.chat, {sticker: buffer}, {quoted: xstro });
        }else return xstro.reply("*Uhh,Please reply to any image*");

    }
)
//---------------------------------------------------------------------------
cmd({
        pattern: "crop",
        alias: ["cropstic","csticker","cropsticker"],
        desc: "Makes sticker of replied image/video.",
        category: "sticker",
filename: __filename,
        use: '<reply to any image/video.>'
    },
    async(Void, xstro, text) => {
        if (!xstro.quoted) return xstro.reply(`*Reply To any Image or video Sir.*`);
      //console.log("Quoted Data here : ",xstro.quoted);
        let mime = xstro.quoted.mtype
        pack = Config.packname
        author = Config.author
        if (mime =="imageMessage"  || mime =="stickerMessage") {
            let media = await xstro.quoted.download();
            //xstro.reply("*Processing Your request*");
            let sticker = new Sticker(media, {
                pack: pack, // The pack name
                author: author, // The author name
                type: StickerTypes.CROPPED,
                categories: ["🤩", "🎉"], // The sticker category
                id: "12345", // The sticker id
                quality: 75, // The quality of the output file
            });
            const buffer = await sticker.toBuffer();
            return Void.sendMessage(xstro.chat, {sticker: buffer}, {quoted: xstro });
        }else return xstro.reply("*Uhh,Please reply to any image*");

    }
)
//---------------------------------------------------------------------------
cmd({
        pattern: "round",
        alias: ["roundstic","roundsticker"],
        desc: "Makes sticker of replied image/video.",
        category: "sticker",
filename: __filename,
        use: '<reply to any image/video.>'
    },
    async(Void, xstro, text) => {
        if (!xstro.quoted) return xstro.reply(`*Reply To any Image or video Sir.*`);
      //console.log("Quoted Data here : ",xstro.quoted);
        let mime = xstro.quoted.mtype
        pack = Config.packname
        author = Config.author
       if (mime =="imageMessage" || mime =="stickerMessage") {
            let media = await xstro.quoted.download();
            //xstro.reply("*Processing Your request*");
            let sticker = new Sticker(media, {
                pack: pack, // The pack name
                author: author, // The author name
                type: StickerTypes.ROUNDED ,
                categories: ["🤩", "🎉"], // The sticker category
                id: "12345", // The sticker id
                quality: 75, // The quality of the output file
            });
            const buffer = await sticker.toBuffer();
            return Void.sendMessage(xstro.chat, {sticker: buffer}, {quoted: xstro });
        }else return xstro.reply("*Uhh,Please reply to any image*");

    }
)
cmd({
    pattern: "toaudio",
    alias:['mp3','tomp3'],
    desc: "changes type to audio.",
    category: "converter",
    use: '<reply to any Video>',
    filename: __filename
},
async(Void, xstro, text) => {
    if (!xstro.quoted) return xstro.reply(`_Reply to Any Video_`);
    let mime = xstro.quoted.mtype
if (mime =="audioMessage" || mime =="videoMessage")
{
    let media = await Void.downloadAndSaveMediaMessage(xstro.quoted);
     const { toAudio } = require('../lib');
     let buffer = fs.readFileSync(media);
    let audio = await toAudio(buffer);
    Void.sendMessage(xstro.chat, { audio: audio, mimetype: 'audio/mpeg' }, { quoted: xstro });
 

fs.unlink(media, (err) => {
if (err) { return console.error('File Not Deleted from From TOAUDIO AT : ' , media,'\n while Error : ' , err);  }
else return console.log('File deleted successfully in TOAUDIO MP3 at : ' , media);
});

}
else return xstro.reply ("```Uhh Please, Reply To A video Message```")
}
)