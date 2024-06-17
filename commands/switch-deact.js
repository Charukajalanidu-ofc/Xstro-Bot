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

 const { sck,sck1,cmd, getAdmin, tlang, prefix } = require('../lib')
 const Config = require('../config')
 
     //---------------------------------------------------------------------------
 cmd({
         pattern: "deact",
         desc: "Switches for varios works.",
         category: "group",
         filename: __filename
     },
     async(Void, xstro, text,{ isCreator }) => {
         //-----------------------------------------	
         if (!xstro.isGroup) return xstro.reply(tlang().group);
         const groupAdmins = await getAdmin(Void, xstro)
         const botNumber = await Void.decodeJid(Void.user.id)
         const isBotAdmins = xstro.isGroup ? groupAdmins.includes(botNumber) : false;
         const isAdmins = xstro.isGroup ? groupAdmins.includes(xstro.sender) : false;
         //-----------------------------------------  
         if (!xstro.isGroup) return xstro.reply("This feature in only for Group.")
         if (!text) return xstro.reply(`❌ Please provide me term like like\n1-events\n2-antilink\n3-nsfw\n4-cardgame\n5-bot`)
         if (!isAdmins) return xstro.reply("❌ This Command is only for Admin")
         switch (text.split(" ")[0]) {
            case 'antilink':
                {
                    let checkgroup = await sck.findOne({ id: xstro.chat })
                    if (!checkgroup) {
                        await new sck({ id: xstro.chat, antilink: "false" })
                            .save()
                        return xstro.reply(' Antilink disabled Successfully')
                    } else {
                        if (checkgroup.antilink == "false") return xstro.reply("Antilink was alredy disabled.")
                        await sck.updateOne({ id: xstro.chat }, { antilink: "false" })
                        xstro.reply('disabled antilink in current chat.')
                        return
                    }
                }
                break
                       case 'economy':
                {
                    let checkgroup = await sck.findOne({ id: xstro.chat })
                    if (!checkgroup) {
                        await new sck({ id: xstro.chat, economy: "false" })
                            .save()
                        return xstro.reply(' Economy disabled Successfully')
                    } else {
                        if (checkgroup.economy == "false") return xstro.reply("Economy was alredy disabled.")
                        await sck.updateOne({ id: xstro.chat }, { economy: "false" })
                        xstro.reply('disabled Economy in current chat.')
                        return
                    }
                }
                break
                case 'events':
                    {
                        let checkgroup = await sck.findOne({ id: xstro.chat })
                        if (!checkgroup) {
                            await new sck({ id: xstro.chat, events: "false" })
                                .save()
                            return xstro.reply("Successfully disabled *Events*")
                        } else {
                            if (checkgroup.events == "false") return xstro.reply("*Events* are already disabled")
                            await sck.updateOne({ id: xstro.chat }, { events: "false" })
                            return xstro.reply("Successfully disabled *Events*")
                        }
                    }
                    break
                case 'cardgame':
                    {
                        let checkgroup = sck.findOne({ id: xstro.chat })
                        if (!checkgroup) {
                            await new sck({ id: xstro.chat, cardgame: "deactive" })
                                .save()
                            return xstro.reply("Successfully disabled *Card Game*")
                        } else {
                            if (checkgroup.cardgame == "deactive") return xstro.reply("*Card Game* was already disabled")
                            await sck.updateOne({ id: xstro.chat }, { cardgame: "deactive" })
                            return xstro.reply("Successfully disabled *Card Game.*")
                        }
                    }
                    break
                case 'nsfw':
                    {
                        let checkgroup = await sck.findOne({ id: xstro.chat })
                        if (!checkgroup) {
                            await new sck({ id: xstro.chat, nsfw: "false" })
                                .save()
                            return xstro.reply("Successfully disabled *NSFW*")
                        } else {
                            if (checkgroup.nsfw == "false") return xstro.reply("*NSFW* is already disabled")
                            await sck.updateOne({ id: xstro.chat }, { nsfw: "false" })
                            xstro.reply("Successfully disabled *NSFW*")
                            return
                        }
                    }
                    break
                default:
                    {
                        xstro.reply("Please provide me term like.\n1-events\n2-antilink\n3-nsfw\n4-cardgame")
                    }
         }
     }
 )
