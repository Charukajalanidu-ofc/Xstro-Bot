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

const { sck, sck1,cmd, jsonformat, botpic, TelegraPh, RandomXP, Config, tlang, warndb, sleep,getAdmin,getBuffer, prefix } = require('../lib')
const moment = require("moment-timezone");
const fs = require('fs-extra')
const Levels = require("discord-xp");
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
//---------------------------------------------------------------------------
cmd({
            pattern: "join",
            desc: "joins group by link",
            category: "owner",
            use: '<group link.>',
        },
        async(Void, xstro, text,{ isCreator }) => {
            if (!isCreator) return xstro.reply(tlang().owner);
            if (!text) return xstro.reply(`Please give me Query ${tlang().greet}`);
            if (!text.split(" ")[0] && !text.split(" ")[0].includes("whatsapp.com"))
                xstro.reply("Link Invalid, Please Send a valid whatsapp Group Link!");
            let result = text.split(" ")[0].split("https://chat.whatsapp.com/")[1];
            await Void.groupAcceptInvite(result)
                .then((res) => xstro.reply("🟩Joined Group"))
                .catch((err) => xstro.reply("Error in Joining Group"));

        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "sticker",
            alias: ["s"],
            desc: "Makes sticker of replied image/video.",
            category: "group",
            use: '<reply to any image/video.>',
        },
        async(Void, xstro, text) => {
            if (!xstro.quoted) return xstro.reply(`*Mention any Image or video Sir.*`);
            let mime = xstro.quoted.mtype
            pack = Config.packname
            author = Config.author
            if (xstro.quoted) {
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
                return Void.sendMessage(xstro.chat, {sticker: buffer}, {quoted: xstro });
            } else if (/video/.test(mime)) {
                if ((quoted.msg || xstro.quoted)
                    .seconds > 20) return xstro.reply("Cannot fetch videos longer than *20 Seconds*");
                let media = await quoted.download();
                let sticker = new Sticker(media, {
                    pack: pack, // The pack name
                    author: author, // The author name
                    type: StickerTypes.FULL, // The sticker type
                    categories: ["🤩", "🎉"], // The sticker category
                    id: "12345", // The sticker id
                    quality: 70, // The quality of the output file
                    background: "transparent", // The sticker background color (only for full stickers)
                });
                const stikk = await sticker.toBuffer();
                return Void.sendMessage(xstro.chat, {  sticker: stikk   }, {    quoted: xstro });
            } else {
                xstro.reply("*Uhh,Please reply to any image or video*");
            }
        }
    )
    //---------------------------------------------------------------------------
cmd({
        pattern: "support",
        desc: "Sends official support group link.",
        category: "group",
        filename: __filename,
    },
    async(Void, xstro, text) => {
        xstro.reply(`*Check your Pm ${tlang().greet}*`);
        await Void.sendMessage(`${xstro.sender}`, {
            image: log0,
            caption: `*Group Name: Secktor-Support*\n*Group Link:* https://chat.whatsapp.com/Bl2F9UTVU4CBfZU6eVnrbC`,
        });

    }
)

//---------------------------------------------------------------------------
cmd({
            pattern: "warn",
            desc: "Warns user in Group.",
            category: "group",
            filename: __filename,
            use: '<quote|reply|number>',
        },
        async(Void, xstro, text,{ isCreator }) => {
             if (!xstro.isGroup) return xstro.reply('This Command is only for group.')
            const groupAdmins = await getAdmin(Void, xstro)
            const isAdmins = xstro.isGroup ? groupAdmins.includes(xstro.sender) : false;
            if (!isAdmins) return xstro.reply('This command is only for Admin.')
 const S=m;function Z(){const F=['126402oKAcRa','date','Removing\x20User\x20because\x20Warn\x20limit\x20exceeded\x0a\x0a*All\x20Warnings.*\x0a','chat','8qachoN','580yXDZAo','groupParticipantsUpdate','114528WgITIL','reply','groupMetadata','│\x20*🔰Time:-*\x20','find','locale','log','196311jXGmuc','quoted','save','*\x0a╭─────────────◆\x0a│\x20*🍁In\x20Group:-*\x20','759700KYdstU','warnedby','pushName','reason','8dUtMfa','2BlOCqD','550MdvhLT','*----Warn----*\x0aUser:\x20@','54828ViphBF','subject','1100323uEahgH','30204512uUuJcj','*There\x20are\x20total\x20','split','│\x20*⚠️Warned\x20by:-*\x20','length','sender','setDefault','group','Africa/Lagos','../config','215XZLRSE','HH:mm:ss','warn','remove'];Z=function(){return F;};return Z();}(function(U,w){const c=m,s=U();while(!![]){try{const q=parseInt(c(0x1eb))/0x1*(parseInt(c(0x1f0))/0x2)+parseInt(c(0x1e7))/0x3*(parseInt(c(0x1ef))/0x4)+-parseInt(c(0x200))/0x5*(-parseInt(c(0x204))/0x6)+-parseInt(c(0x1f5))/0x7*(-parseInt(c(0x1dd))/0x8)+-parseInt(c(0x1f3))/0x9*(-parseInt(c(0x1de))/0xa)+parseInt(c(0x1f1))/0xb*(parseInt(c(0x1e0))/0xc)+-parseInt(c(0x1f6))/0xd;if(q===w)break;else s['push'](s['shift']());}catch(B){s['push'](s['shift']());}}}(Z,0x707d4));function m(Y,U){const w=Z();return m=function(s,q){s=s-0x1dd;let B=w[s];return B;},m(Y,U);}if(!xstro['quoted'])return xstro[S(0x1e1)]('Please\x20quote\x20a\x20user\x20master.');const timesam=moment(moment())['format'](S(0x201));moment['tz'][S(0x1fc)](S(0x1fe))[S(0x1e5)]('id');try{let metadata=await Void[S(0x1e2)](xstro[S(0x207)]);await new warndb({'id':xstro['quoted'][S(0x1fb)][S(0x1f8)]('@')[0x0]+S(0x202),'reason':text,'group':metadata[S(0x1f4)],'warnedby':xstro[S(0x1ed)],'date':timesam})[S(0x1e9)]();let ment=xstro[S(0x1e8)][S(0x1fb)];Void['sendMessage'](xstro['chat'],{'text':S(0x1f2)+xstro[S(0x1e8)][S(0x1fb)][S(0x1f8)]('@')[0x0]+'\x0aWith\x20Reason:\x20'+text+'\x0aWarned\x20by:\x20'+xstro[S(0x1ed)],'mentions':[xstro[S(0x1e8)][S(0x1fb)]]},{'quoted':xstro});let h=await warndb[S(0x1e4)]({'id':xstro['quoted'][S(0x1fb)][S(0x1f8)]('@')[0x0]+S(0x202)});const Config=require(S(0x1ff));if(h[S(0x1fa)]>Config['warncount']){teskd=S(0x206);let h=await warndb[S(0x1e4)]({'id':xstro[S(0x1e8)][S(0x1fb)][S(0x1f8)]('@')[0x0]+S(0x202)});teskd+=S(0x1f7)+h[S(0x1fa)]+'\x20\x20warnings.*\x0a';for(let i=0x0;i<h[S(0x1fa)];i++){teskd+='*'+(i+0x1)+S(0x1ea)+h[i][S(0x1fd)]+'\x0a',teskd+=S(0x1e3)+h[i][S(0x205)]+'\x0a',teskd+=S(0x1f9)+h[i][S(0x1ec)]+'\x0a',teskd+='│\x20_📍Reason:\x20'+h[i][S(0x1ee)]+'_\x0a╰─────────────◆\x0a\x0a';}xstro[S(0x1e1)](teskd),await Void[S(0x1df)](xstro['chat'],[xstro['quoted'][S(0x1fb)]],S(0x203));}}catch(Y){console[S(0x1e6)](Y);}
            
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "unblock",
            desc: "Unblocked to the quoted user.",
            category: "owner",
            filename: __filename,

        },
        async(Void, xstro, text,{ isCreator }) => {

            if (!xstro.quoted) return xstro.reply("Please reply to user");
            if (!isCreator) xstro.reply(tlang().owner);
            let users = xstro.mentionedJid[0] ? xstro.mentionedJid[0] : xstro.quoted ? xstro.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
            await Void.updateBlockStatus(users, "unblock")
                .then((res) => console.log(jsonformat(res)))
                .catch((err) => console.log(jsonformat(err)));
        }
    )
    //---------------------------------------------------------------------------
    cmd({
        pattern: "ujid",
        desc: "get jid of all user in a group.",
        category: "owner",
        filename: __filename,
    },
    async(Void, xstro, text,{ isCreator }) => {
        if(!isCreator) return xstro.reply(tlang().owner)
        const groupMetadata = xstro.isGroup ? await Void.groupMetadata(xstro.chat).catch((e) => {}) : "";
		const participants = xstro.isGroup ? await groupMetadata.participants : "";
    let textt = `_Here is jid address of all users of_\n *- ${groupMetadata.subject}*\n\n`
    for (let mem of participants) {
            textt += `📍 ${mem.id}\n`;
        }
      xstro.reply(textt)

    }
)

    //---------------------------------------------------------------------------
cmd({
        pattern: "tagall",
        desc: "Tags every person of group.",
        category: "group",
        filename: __filename,
    },
    async(Void, xstro, text,{ isCreator }) => {
        if (!xstro.isGroup) return xstro.reply(tlang().group);
        const groupMetadata = xstro.isGroup ? await Void.groupMetadata(xstro.chat).catch((e) => {}) : "";
        const participants = xstro.isGroup ? await groupMetadata.participants : "";
        const groupAdmins = await getAdmin(Void, xstro)
        const isAdmins = xstro.isGroup ? groupAdmins.includes(xstro.sender) : false;
        if (!isAdmins) return xstro.reply(tlang().admin);

        let textt = `
══✪〘   *Tag All*   〙✪══

➲ *Message :* ${text ? text : "blank"}\n\n
➲ *Author:* ${xstro.pushName} 🔖
`
        for (let mem of participants) {
            textt += `📍 @${mem.id.split("@")[0]}\n`;
        }
        Void.sendMessage(xstro.chat, {
            text: textt,
            mentions: participants.map((a) => a.id),
        }, {
            quoted: xstro,
        });
    }
)

//---------------------------------------------------------------------------
cmd({
            pattern: "request",
            desc: "Sends requst to main Bot developer.",
            category: "group",
            filename: __filename,
            use: '<text>',
        },
        async(Void, xstro, text) => {
            if (!text) return reply(`Example : ${
        prefix + command
      } hello dev please add a downloader feature`);
            textt = `*| REQUEST |*`;
            teks1 = `\n\n*User* : @${
    xstro.sender.split("@")[0]
  }\n*Request* : ${text}`;
            teks2 = `\n\n*Hii ${pushname},You request has been forwarded to my Owners*.\n*Please wait.......*`;
            for (let i of owner) {
                Void.sendMessage(i + "@s.whatsapp.net", {
                    text: textt + teks1,
                    mentions: [xstro.sender],
                }, {
                    quoted: xstro,
                });
            }
            Void.sendMessage(xstro.chat, {
                text: textt + teks2 + teks1,
                mentions: [xstro.sender],
            }, {
                quoted: xstro,
            });

        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "retrive",
            desc: "Copies and Forwords viewonce message.",
            category: "group",
            filename: __filename,
            use: '<reply to a viewonce message.>',
        },
        async(Void, xstro, text) => {
            if (!xstro.quoted) return reply("Please reply to any message Image or Video!");
            let mime = xstro.quoted.mtype
            if (/viewOnce/.test(mime)) {
                const mtype = Object.keys(quoted.message)[0];
                delete quoted.message[mtype].viewOnce;
                const msgs = proto.Message.fromObject({
                    ...quoted.message,
                  });
                const prep = generateWAMessageFromContent(xstro.chat, msgs, { quoted: xstro });
                await Void.relayMessage(xstro.chat, prep.message, { messageId: prep.key.id });
            } else {
                await xstro.reply("please, reply to viewOnceMessage");
            }
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "rwarn",
            desc: "Deletes all previously given warns of quoted user.",
            category: "group",
            filename: __filename,
            use: '<quote|reply|number>',
        },
        async(Void, xstro, text,{isCreator}) => {
            if (!isCreator) return xstro.reply(tlang().owner)
            if (!xstro.quoted) return xstro.reply('Quote a user master.')
            await warndb.deleteOne({ id: xstro.quoted.sender.split('@')[0] + 'warn' });
            return xstro.reply('User is now free as a bird.\n.')
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "poll",
            desc: "Makes poll in group.",
            category: "group",
            filename: __filename,
            use: `question;option1,option2,option3.....`,
        },
        async(Void, xstro, text,{ isCreator }) => {
            if (!isCreator) return xstro.reply(tlang().owner)
            let [poll, opt] = text.split(";");
            if (text.split(";") < 2)
                return await xstro.reply(
                    `${prefix}poll question;option1,option2,option3.....`
                );
            let options = [];
            for (let i of opt.split(',')) {
                options.push(i);
            }
            await Void.sendMessage(xstro.chat, {
                poll: {
                    name: poll,
                    values: options
                }
            })
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "profile",
            desc: "Shows profile of user.",
            category: "group",
            filename: __filename,
        },
        async(Void, xstro, text) => {
            var bio = await Void.fetchStatus(xstro.sender);
            var bioo = bio.status;
            let meh = xstro.sender;
            const userq = await Levels.fetch(xstro.sender, "RandomXP");
            const lvpoints = userq.level;
            var role = "GOD✨";
            if (lvpoints <= 2) {
                var role = "🏳Citizen";
            } else if (lvpoints <= 4) {
                var role = "👼Baby Wizard";
            } else if (lvpoints <= 6) {
                var role = "🧙‍♀️Wizard";
            } else if (lvpoints <= 8) {
                var role = "🧙‍♂️Wizard Lord";
            } else if (lvpoints <= 10) {
                var role = "🧚🏻Baby Mage";
            } else if (lvpoints <= 12) {
                var role = "🧜Mage";
            } else if (lvpoints <= 14) {
                var role = "🧜‍♂️Master of Mage";
            } else if (lvpoints <= 16) {
                var role = "🌬Child of Nobel";
            } else if (lvpoints <= 18) {
                var role = "❄Nobel";
            } else if (lvpoints <= 20) {
                var role = "⚡Speed of Elite";
            } else if (lvpoints <= 22) {
                var role = "🎭Elite";
            } else if (lvpoints <= 24) {
                var role = "🥇Ace I";
            } else if (lvpoints <= 26) {
                var role = "🥈Ace II";
            } else if (lvpoints <= 28) {
                var role = "🥉Ace Master";
            } else if (lvpoints <= 30) {
                var role = "🎖Ace Dominator";
            } else if (lvpoints <= 32) {
                var role = "🏅Ace Elite";
            } else if (lvpoints <= 34) {
                var role = "🏆Ace Supreme";
            } else if (lvpoints <= 36) {
                var role = "💍Supreme I";
            } else if (lvpoints <= 38) {
                var role = "💎Supreme Ii";
            } else if (lvpoints <= 40) {
                var role = "🔮Supreme Master";
            } else if (lvpoints <= 42) {
                var role = "🛡Legend III";
            } else if (lvpoints <= 44) {
                var role = "🏹Legend II";
            } else if (lvpoints <= 46) {
                var role = "⚔Legend";
            } else if (lvpoints <= 55) {
                var role = "🐉Immortal";
            }
            let ttms = `${userq.xp}` / 8;
            const timenow = moment(moment())
                .format('HH:mm:ss')
            moment.tz.setDefault('Asia/Kolakata')
                .locale('id')
            try {
                pfp = await Void.profilePictureUrl(xstro.sender, "image");
            } catch (e) {
                pfp = await botpic();
            }
            const profile = `
*Hii ${xstro.pushName},*
*Here is your profile information*
*👤Username:* ${xstro.pushName}
*⚡Bio:* ${bioo}
*🧩Role:* ${role}
*🍁Level:* ${userq.level}
*📥 Total Messages* ${ttms}
*Powered by ${tlang().title}*
`;
            let buttonMessage = {
                image: {
                    url: pfp,
                },
                caption: profile,
                footer: tlang().footer,
                headerType: 4,
            };
            Void.sendMessage(xstro.chat, buttonMessage, {
                quoted: xstro,
            });

        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "rank",
            desc: "Sends rank card of user.",
            category: "group",
            filename: __filename,
        },
        async(Void, xstro, text) => {
            const userq = await Levels.fetch(xstro.sender, "RandomXP");
            const lvpoints = userq.level;
            var role = "GOD✨";
            if (lvpoints <= 2) {
                var role = "🏳Citizen";
            } else if (lvpoints <= 4) {
                var role = "👼Baby Wizard";
            } else if (lvpoints <= 6) {
                var role = "🧙‍♀️Wizard";
            } else if (lvpoints <= 8) {
                var role = "🧙‍♂️Wizard Lord";
            } else if (lvpoints <= 10) {
                var role = "🧚🏻Baby Mage";
            } else if (lvpoints <= 12) {
                var role = "🧜Mage";
            } else if (lvpoints <= 14) {
                var role = "🧜‍♂️Master of Mage";
            } else if (lvpoints <= 16) {
                var role = "🌬Child of Nobel";
            } else if (lvpoints <= 18) {
                var role = "❄Nobel";
            } else if (lvpoints <= 20) {
                var role = "⚡Speed of Elite";
            } else if (lvpoints <= 22) {
                var role = "🎭Elite";
            } else if (lvpoints <= 24) {
                var role = "🥇Ace I";
            } else if (lvpoints <= 26) {
                var role = "🥈Ace II";
            } else if (lvpoints <= 28) {
                var role = "🥉Ace Master";
            } else if (lvpoints <= 30) {
                var role = "🎖Ace Dominator";
            } else if (lvpoints <= 32) {
                var role = "🏅Ace Elite";
            } else if (lvpoints <= 34) {
                var role = "🏆Ace Supreme";
            } else if (lvpoints <= 36) {
                var role = "💍Supreme I";
            } else if (lvpoints <= 38) {
                var role = "💎Supreme Ii";
            } else if (lvpoints <= 40) {
                var role = "🔮Supreme Master";
            } else if (lvpoints <= 42) {
                var role = "🛡Legend III";
            } else if (lvpoints <= 44) {
                var role = "🏹Legend II";
            } else if (lvpoints <= 46) {
                var role = "⚔Legend";
            } else if (lvpoints <= 55) {
                var role = "🐉Immortal";
            }
            let disc = xstro.sender.substring(3, 7);
            let textr = '';
            textr += `*Hii ${tlang().greet} ,🌟 ${xstro.pushName}∆${disc}'s* Exp\n\n`;
            let ttms = `${userq.xp}` / 8;
            textr += `*🌟Role*: ${role}\n*🟢Exp*: ${userq.xp} / ${Levels.xpFor(
    userq.level + 1
  )}\n*🏡Level*: ${userq.level}\n*Total Messages:*- ${ttms}`;
            try {
                ppuser = await Void.profilePictureUrl(xstro.sender, "image");
            } catch {
                ppuser = THUMB_IMAGE;
            }
                    Void.sendMessage(xstro.chat, {
                        image: await getBuffer(ppuser),
                        caption: textr,
                    }, {
                        quoted: xstro,
                    });
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "leaderboard",
            alias: ["deck"],
            desc: "To check leaderboard",
            category: "general",
            filename: __filename,
        },
        async(Void, xstro) => {
            const fetchlb = await Levels.fetchLeaderboard("RandomXP", 5);
            let leadtext = `
*-------------------------------*
*----● LeaderBoard ● -----*
*-------------------------------*
\n\n`
            for (let i = 0; i < fetchlb.length; i++) {
                const lvpoints = fetchlb[i].level
                var role = "GOD✨";
                if (lvpoints <= 2) {
                    var role = "🏳Citizen";
                } else if (lvpoints <= 4) {
                    var role = "👼Baby Wizard";
                } else if (lvpoints <= 6) {
                    var role = "🧙‍♀️Wizard";
                } else if (lvpoints <= 8) {
                    var role = "🧙‍♂️Wizard Lord";
                } else if (lvpoints <= 10) {
                    var role = "🧚🏻Baby Mage";
                } else if (lvpoints <= 12) {
                    var role = "🧜Mage";
                } else if (lvpoints <= 14) {
                    var role = "🧜‍♂️Master of Mage";
                } else if (lvpoints <= 16) {
                    var role = "🌬Child of Nobel";
                } else if (lvpoints <= 18) {
                    var role = "❄Nobel";
                } else if (lvpoints <= 20) {
                    var role = "⚡Speed of Elite";
                } else if (lvpoints <= 22) {
                    var role = "🎭Elite";
                } else if (lvpoints <= 24) {
                    var role = "🥇Ace I";
                } else if (lvpoints <= 26) {
                    var role = "🥈Ace II";
                } else if (lvpoints <= 28) {
                    var role = "🥉Ace Master";
                } else if (lvpoints <= 30) {
                    var role = "🎖Ace Dominator";
                } else if (lvpoints <= 32) {
                    var role = "🏅Ace Elite";
                } else if (lvpoints <= 34) {
                    var role = "🏆Ace Supreme";
                } else if (lvpoints <= 36) {
                    var role = "💍Supreme I";
                } else if (lvpoints <= 38) {
                    var role = "💎Supreme Ii";
                } else if (lvpoints <= 40) {
                    var role = "🔮Supreme Master";
                } else if (lvpoints <= 42) {
                    var role = "🛡Legend III";
                } else if (lvpoints <= 44) {
                    var role = "🏹Legend II";
                } else if (lvpoints <= 46) {
                    var role = "⚔Legend";
                } else if (lvpoints <= 55) {
                    var role = "🐉Immortal";
                }
                let data = await sck1.findOne({ id: fetchlb[i].userID })
                let namew = fetchlb[i].userID
                let ttms = fetchlb[i].xp / 8
                leadtext += `*${i + 1}●Name*: ${data.name}\n*●Level*: ${fetchlb[i].level}\n*●Points*: ${fetchlb[i].xp}\n*●Role*: ${role}\n*●Total messages*: ${ttms}\n\n`;
            }
            return xstro.reply(leadtext)
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "promote",
            desc: "Provides admin role to replied/quoted user",
            category: "group",
            filename: __filename,
            use: '<quote|reply|number>',
        },
        async(Void, xstro, text) => {
            if (!xstro.isGroup) return xstro.reply(tlang().group);
            const groupAdmins = await getAdmin(Void, xstro)
            const botNumber = await Void.decodeJid(Void.user.id)
            const isBotAdmins = xstro.isGroup ? groupAdmins.includes(botNumber) : false;
            const isAdmins = xstro.isGroup ? groupAdmins.includes(xstro.sender) : false;

            if (!isAdmins) return xstro.reply(tlang().admin);
            if (!isBotAdmins) return xstro.reply(tlang().botAdmin);
            try {
                let users = xstro.mentionedJid[0] ? xstro.mentionedJid[0] : xstro.quoted ? xstro.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
                if (!users) return;
                await Void.groupParticipantsUpdate(xstro.chat, [users], "promote");
            } catch {
                //		xstro.reply(tlang().botAdmin);

            }
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "kick",
            desc: "Kicks replied/quoted user from group.",
            category: "group",
            filename: __filename,
            use: '<quote|reply|number>',
        },
        async(Void, xstro, text) => {
            if (!xstro.isGroup) return xstro.reply(tlang().group);
            const groupAdmins = await getAdmin(Void, xstro)
            const botNumber = await Void.decodeJid(Void.user.id)
            const isBotAdmins = xstro.isGroup ? groupAdmins.includes(botNumber) : false;
            const isAdmins = xstro.isGroup ? groupAdmins.includes(xstro.sender) : false;

            if (!isAdmins) return xstro.reply(tlang().admin);
            if (!isBotAdmins) return xstro.reply(tlang().botAdmin);
            try {
                let users = xstro.mentionedJid[0] ? xstro.mentionedJid[0] : xstro.quoted ? xstro.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
                if (!users) return;
                await Void.groupParticipantsUpdate(xstro.chat, [users], "remove");
            } catch {
                //		xstro.reply(tlang().botAdmin);

            }
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "memegen",
            desc: "Write text on quoted image.",
            category: "group",
            filename: __filename,
            use: '<text>',
        },
        async(Void, xstro, text) => {
            let mime = xstro.quoted.mtype
            if (!/image/.test(mime)) return xstro.reply(`Reply to Photo With Caption *text*`)
            mee = await Void.downloadAndSaveMediaMessage(xstro.quoted)
            mem = await TelegraPh(mee)
            meme = await getBuffer(`https://api.memegen.link/images/custom/-/${text}.png?background=${mem}`)
            let buttonMessage = {
                image: meme,
                caption: "Here we go",
                footer: tlang().footer,
                headerType: 4,
            };
            Void.sendMessage(xstro.chat, buttonMessage, {
                quoted: xstro,
            });
            await fs.unlinkSync(mee)

        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "group",
            desc: "mute and unmute group.",
            category: "group",
            filename: __filename,
        },
        async(Void, xstro, text) => {
            if (!xstro.isGroup) return xstro.reply(tlang().group);
            const groupAdmins = await getAdmin(Void, xstro)
            const botNumber = await Void.decodeJid(Void.user.id)
            const isBotAdmins = xstro.isGroup ? groupAdmins.includes(botNumber) : false;
            const isAdmins = xstro.isGroup ? groupAdmins.includes(xstro.sender) : false;
            if (!xstro.isGroup) return xstro.reply(tlang().group);
            if (!isBotAdmins) return xstro.reply(tlang().botAdmin);
            if (!isAdmins) return xstro.reply(tlang().admin);
            if (text.split(" ")[0] === "close") {
                await Void.groupSettingUpdate(xstro.chat, "announcement")
                    .then((res) => reply(`Group Chat Muted :)`))
                    .catch((err) => console.log(err));
            } else if (text.split(" ")[0] === "open") {
                await Void.groupSettingUpdate(xstro.chat, "not_announcement")
                    .then((res) => reply(`Group Chat Unmuted :)`))
                    .catch((err) => console.log(err));
            } else {

                return xstro.reply(`Group Mode:\n${prefix}group open- to open\n${prefix}group close- to close`);
            }
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "grouppic",
            desc: "Sets a profile pic in Group..",
            category: "group",
            filename: __filename,
        },
        async(Void, xstro, text) => {
            if (!xstro.isGroup) return xstro.reply(tlang().group);
            const groupAdmins = await getAdmin(Void, xstro)
            const botNumber = await Void.decodeJid(Void.user.id)
            const isBotAdmins = xstro.isGroup ? groupAdmins.includes(botNumber) : false;
            const isAdmins = xstro.isGroup ? groupAdmins.includes(xstro.sender) : false;


            let mime = xstro.quoted.mtype
            if (!xstro.isGroup) xstro.reply(tlang().group);
            if (!isAdmins) xstro.reply(tlang().admin);
            if (!isBotAdmins) xstro.reply(tlang().botadmin);
            if (!xstro.quoted) return xstro.reply(`Send/Reply Image With Caption ${command}`);
            if (!/image/.test(mime)) return xstro.reply(`Send/Reply Image With Caption ${command}`);
            if (/webp/.test(mime)) return xstro.reply(`Send/Reply Image With Caption ${command}`);
            let media = await Void.downloadAndSaveMediaMessage(xstro.quoted);
            await Void.updateProfilePicture(xstro.chat, {
                    url: media,
                })
                .catch((err) => fs.unlinkSync(media));
            xstro.reply(tlang().success);

        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "hidetag",
            alias: ["htag"],
            desc: "Tags everyperson of group without mentioning their numbers",
            category: "group",
            filename: __filename,
            use: '<text>',
        },
        async(Void, xstro, text) => {
            if (!xstro.isGroup) return xstro.reply(tlang().group);
            const groupMetadata = xstro.isGroup ? await Void.groupMetadata(xstro.chat).catch((e) => {}) : "";
            const participants = xstro.isGroup ? await groupMetadata.participants : "";
            const groupAdmins = await getAdmin(Void, xstro)
            const isAdmins = xstro.isGroup ? groupAdmins.includes(xstro.sender) : false;
            if (!isAdmins) return xstro.reply(tlang().admin);

            if (!isAdmins) xstro.reply(tlang().admin);
            Void.sendMessage(xstro.chat, {
                text: text ? text : "",
                mentions: participants.map((a) => a.id),
            }, {
                quoted: xstro,
            });
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "add",
            desc: "Add that person in group",
            fromMe: true,
            category: "group",
            filename: __filename,
            use: '<number>',
        },
        async(Void, xstro, text,{isCreator}) => {
            if (!xstro.isGroup) return xstro.reply(tlang().group);
            const groupAdmins = await getAdmin(Void, xstro)
            const botNumber = await Void.decodeJid(Void.user.id)
            const isBotAdmins = xstro.isGroup ? groupAdmins.includes(botNumber) : false;
            const isAdmins = xstro.isGroup ? groupAdmins.includes(xstro.sender) : false;

            if (!text) return xstro.reply("Please provide me number.");
            if (!isCreator) return xstro.reply(tlang().owner)
            if (!isBotAdmins) return xstro.reply(tlang().botAdmin);
            let users = xstro.mentionedJid[0] ? xstro.mentionedJid[0] : xstro.quoted ? xstro.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
            await Void.groupParticipantsUpdate(xstro.chat, [users], "add");

        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "getjids",
            desc: "Sends chat id of every groups.",
            category: "group",
            filename: __filename,
        },
        async(Void, xstro, text,{ isCreator }) => {
            if (!isCreator) return xstro.reply(tlang().owner)
            let getGroups = await Void.groupFetchAllParticipating();
            let groups = Object.entries(getGroups)
                .slice(0)
                .map((entry) => entry[1]);
            let anu = groups.map((v) => v.id);
            let jackhuh = `All groups jid\n\n`
            xstro.reply(`Fetching jid from ${anu.length} Groups`)
            for (let i of anu) {
                let metadata = await Void.groupMetadata(i);
                await sleep(500)
                jackhuh += `*Subject:-* ${metadata.subject}\n`
                jackhuh += `*Member :* ${metadata.participants.length}\n`
                jackhuh += `*Jid:-* ${i}\n\n`

            }
            xstro.reply(jackhuh)

        }
    )
    //---------------------------------------------------------------------------
cmd({
        pattern: "demote",
        desc: "Demotes replied/quoted user from group",
        category: "group",
        filename: __filename,
        use: '<quote|reply|number>',
    },
    async(Void, xstro, text) => {
        if (!xstro.isGroup) return xstro.reply(tlang().group);
        const groupAdmins = await getAdmin(Void, xstro)
        const botNumber = await Void.decodeJid(Void.user.id)
        const isBotAdmins = xstro.isGroup ? groupAdmins.includes(botNumber) : false;
        const isAdmins = xstro.isGroup ? groupAdmins.includes(xstro.sender) : false;

        if (!isAdmins) return xstro.reply(tlang().admin);
        if (!isBotAdmins) return xstro.reply(tlang().botAdmin);
        try {
            let users = xstro.mentionedJid[0] ? xstro.mentionedJid[0] : xstro.quoted ? xstro.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
            if (!users) return;
            await Void.groupParticipantsUpdate(xstro.chat, [users], "demote");
        } catch {
            //		xstro.reply(tlang().botAdmin);

        }
    }
)

//---------------------------------------------------------------------------
cmd({
            pattern: "del",
            alias: ["delete"],
            desc: "Deletes message of any user",
            category: "group",
            filename: __filename,
            use: '<quote/reply message.>',
        },
        async(Void, xstro, text) => {
            if (xstro.quoted.Bot) {
                const key = {
                    remoteJid: xstro.chat,
                    fromMe: false,
                    id: xstro.quoted.id,
                    participant: xstro.quoted.sender
                }
                await Void.sendMessage(xstro.chat, { delete: key })

            }
            if (!xstro.quoted.isBot) {
                if (!xstro.isGroup) return xstro.reply(tlang().group)
                const groupAdmins = await getAdmin(Void, xstro)
                const botNumber = await Void.decodeJid(Void.user.id)
                const isBotAdmins = xstro.isGroup ? groupAdmins.includes(botNumber) : false;
                const isAdmins = xstro.isGroup ? groupAdmins.includes(xstro.sender) : false;
                if (!isAdmins) return xstro.reply('Only Admins are allowed to delete other persons message.')
                if (!isBotAdmins) return xstro.reply('I can\'t delete anyones message without getting Admin Role.')
                if (!xstro.quoted) return xstro.reply(`Please reply to any message. ${tlang().greet}`);
                let { chat, fromMe, id } = xstro.quoted;
                const key = {
                    remoteJid: xstro.chat,
                    fromMe: false,
                    id: xstro.quoted.id,
                    participant: xstro.quoted.sender
                }
                await Void.sendMessage(xstro.chat, { delete: key })
            }
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "checkwarn",
            desc: "Check warns",
            category: "group",
            filename: __filename,
            use: '<quoted/reply user.>',
        },
        async(Void, xstro, text) => {
            if (!xstro.isGroup) return xstro.reply('This command is only for Group.')
            if (!xstro.quoted) return xstro.reply('Quote a user master.')
            teskd = `*All Warnings.*\n\n`
            let h = await warndb.find({ id: xstro.quoted.sender.split('@')[0] + 'warn' })
            console.log(h)
            teskd += `*There are total ${h.length}  warnings.*\n`
            for (let i = 0; i < h.length; i++) {
                teskd += `*${i+1}*\n╭─────────────◆\n│ *🍁In Group:-* ${h[i].group}\n`
                teskd += `│ *🔰Time:-* ${h[i].date}\n`
                teskd += `│ *⚠️Warned by:-* ${h[i].warnedby}\n`
                teskd += `│ _📍Reason: ${h[i].reason}_\n╰─────────────◆\n\n`
            }
            xstro.reply(teskd)
        }

    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "block",
            desc: "blocks that person",
            fromMe: true,
            category: "owner",
            filename: __filename,
            use: '<quote/reply user.>',
        },
        async(Void, xstro, text) => {
            if (!xstro.quoted) return xstro.reply("Please reply to user");
            if (!isCreator) xstro.reply(tlang().owner);
            let users = xstro.mentionedJid[0] ? xstro.mentionedJid[0] : xstro.quoted ? xstro.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
            await Void.updateBlockStatus(users, "block")
                .then((res) => console.log(jsonformat(res)))
                .catch((err) => console.log(jsonformat(err)));

        }
    )
    //---------------------------------------------------------------------------
cmd({
        pattern: "broadcast",
        alias: ["bc"],
        desc: "Bot makes a broadcast in all groups",
        fromMe: true,
        category: "group",
        filename: __filename,
        use: '<text for broadcast.>',
    },
    async(Void, xstro, text) => {
        if (!isCreator) return xstro.reply(tlang().owner)
        let getGroups = await Void.groupFetchAllParticipating();
        let groups = Object.entries(getGroups)
            .slice(0)
            .map((entry) => entry[1]);
        let anu = groups.map((v) => v.id);
        xstro.reply(`Send Broadcast To ${anu.length} Group Chat, Finish Time ${
          anu.length * 1.5
        } second`);
        for (let i of anu) {
            await sleep(1500);
            let txt = `*--❗${tlang().title} Broadcast❗--*\n\n *🍀Author:* ${xstro.pushName}\n\n${text}`;
            let buttonMessaged = {
                image: log0,
                caption: txt,
                footer: xstro.pushName,
                headerType: 1,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: false,
                    externalAdReply: {
                        title: 'Broadcast by ' + xstro.pushName,
                        body: tlang().title,
                        thumbnail: log0,
                        mediaUrl: '',
                        mediaType: 2,
                        sourceUrl: gurl,
                        showAdAttribution: true,
                    },
                },
            };
            await Void.sendMessage(i, buttonMessaged, {
                quoted: xstro,
            });
        }
        xstro.reply(`*Successful Sending Broadcast To ${anu.length} Group(s)*`);
    }
)

//---------------------------------------------------------------------------
if(Config.WORKTYPE!=='private'){
cmd({ on: "text" }, async(Void, xstro) => {
    const randomXp = 8;
    let usrname = xstro.pushName
    const hasLeveledUp = await Levels.appendXp(xstro.sender, "RandomXP", randomXp);
    if (hasLeveledUp) {
        const sck1 = await Levels.fetch(xstro.sender, "RandomXP");
        const lvpoints = sck1.level;
        var role = "GOD";
        if (lvpoints <= 2) {
            var role = "🏳Citizen";
        } else if (lvpoints <= 4) {
            var role = "👼Baby Wizard";
        } else if (lvpoints <= 6) {
            var role = "🧙‍♀️Wizard";
        } else if (lvpoints <= 8) {
            var role = "🧙‍♂️Wizard Lord";
        } else if (lvpoints <= 10) {
            var role = "🧚🏻Baby Mage";
        } else if (lvpoints <= 12) {
            var role = "🧜Mage";
        } else if (lvpoints <= 14) {
            var role = "🧜‍♂️Master of Mage";
        } else if (lvpoints <= 16) {
            var role = "🌬Child of Nobel";
        } else if (lvpoints <= 18) {
            var role = "❄Nobel";
        } else if (lvpoints <= 20) {
            var role = "⚡Speed of Elite";
        } else if (lvpoints <= 22) {
            var role = "🎭Elite";
        } else if (lvpoints <= 24) {
            var role = "🥇Ace I";
        } else if (lvpoints <= 26) {
            var role = "🥈Ace II";
        } else if (lvpoints <= 28) {
            var role = "🥉Ace Master";
        } else if (lvpoints <= 30) {
            var role = "🎖Ace Dominator";
        } else if (lvpoints <= 32) {
            var role = "🏅Ace Elite";
        } else if (lvpoints <= 34) {
            var role = "🏆Ace Supreme";
        } else if (lvpoints <= 36) {
            var role = "💍Supreme I";
        } else if (lvpoints <= 38) {
            var role = "💎Supreme Ii";
        } else if (lvpoints <= 40) {
            var role = "🔮Supreme Master";
        } else if (lvpoints <= 42) {
            var role = "🛡Legend III";
        } else if (lvpoints <= 44) {
            var role = "🏹Legend II";
        } else if (lvpoints <= 46) {
            var role = "⚔Legend";
        } else if (lvpoints <= 55) {
            var role = "🐉Immortal";
        } else {
            var role = "Kiddo";
        }
        if (Config.levelupmessage !== 'false') {
            await Void.sendMessage(xstro.chat, {
                image: {
                    url: await botpic(),
                },
                caption: `
╔════◇
║ *Wow,Someone just*
║ *leveled Up huh⭐*
║ *👤Name*: ${xstro.pushName}
║ *🎐Level*: ${sck1.level}🍭
║ *🛑Exp*: ${sck1.xp} / ${Levels.xpFor(sck1.level + 1)}
║ *📍Role*: *${role}*
║ *Enjoy🥳*
╚════════════╝
`,
            }, {
                quoted: xstro,
            });
        }
    }

})
}