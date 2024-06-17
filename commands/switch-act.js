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

const { cmd,sck,sck1, getAdmin, tlang, prefix } = require('../lib')
const Config = require('../config')
    //---------------------------------------------------------------------------
cmd({
        pattern: "act",
        desc: "Switches for varios works.",
        category: "group",
        filename: __filename,
    },
    async(Void, xstro, text,{ isCreator }) => {
        //-----------------------------------------
        if (!xstro.isGroup) return xstro.reply(tlang().group);
        const groupAdmins = await getAdmin(Void, xstro)
        const botNumber = await Void.decodeJid(Void.user.id)
        const isBotAdmins = xstro.isGroup ? groupAdmins.includes(botNumber) : false;
        const isAdmins = xstro.isGroup ? groupAdmins.includes(xstro.sender) : false;
        //-----------------------------------------
        if (!xstro.isGroup) return xstro.reply("This command is only for group")
        if (!text) return xstro.reply(`❌ Please provide me term like like\n1-events\n2-antilink\n3-nsfw\n4-cardgame\n5-bot`)
        if (!isAdmins) return xstro.reply("❌ This command is only for admin")
        switch (text.split(" ")[0]) {
            case 'antilink':
                {
                    let checkgroup = await sck.findOne({ id: xstro.chat })
                    if (!checkgroup) {
                        await new sck({ id: xstro.chat, antilink: "true" })
                            .save()
                        return xstro.reply(' Antilink Enabled Successfully')
                    } else {
                        if (checkgroup.antilink == "true") return xstro.reply("Antilink was alredy  enabled here.")
                        await sck.updateOne({ id: xstro.chat }, { antilink: "true" })
                        xstro.reply('Enabled antilink in current chat.')
                        return
                    }
                }
                break
          
                      case 'economy':
                {
                    let checkgroup = await sck.findOne({ id: xstro.chat })
                    if (!checkgroup) {
                        await new sck({ id: xstro.chat, economy: "true" })
                            .save()
                        return xstro.reply(' Economy Enabled Successfully')
                    } else {
                        if (checkgroup.economy == "true") return xstro.reply("Economy was alredy enabled.")
                        await sck.updateOne({ id: xstro.chat }, { economy: "true" })
                        xstro.reply('Economy enabled in current chat.')
                        return
                    }
                }
                break
            case 'events':
                {
                    let checkgroup = await sck.findOne({ id: xstro.chat })
                    if (!checkgroup) {
                        await new sck({ id: xstro.chat, events: "true" })
                            .save()
                        return xstro.reply("Successfully Enabled *Events*")
                    } else {
                        if (checkgroup.events == "true") return xstro.reply("*Events* are already enabled")
                        await sck.updateOne({ id: xstro.chat }, { events: "true" })
                        return xstro.reply("Successfully Enabled *Events*")
                    }
                }
                break
            case 'cardgame':
                {
                    let checkgroup = sck.findOne({ id: xstro.chat })
                    if (!checkgroup) {
                        await new sck({ id: xstro.chat, cardgame: "active" })
                            .save()
                        return xstro.reply("Successfully Enabled *Card Game*")
                    } else {
                        if (checkgroup.cardgame == "active") return xstro.reply("*Card Game* was already enabled")
                        await sck.updateOne({ id: xstro.chat }, { cardgame: "active" })
                        return xstro.reply("Successfully Enabled *Card Game.*")
                    }
                }
                break
            case 'nsfw':
                {
                    let checkgroup = await sck.findOne({ id: xstro.chat })
                    if (!checkgroup) {
                        await new sck({ id: xstro.chat, nsfw: "true" })
                            .save()
                        return xstro.reply("Successfully Enabled *NSFW*")
                    } else {
                        if (checkgroup.nsfw == "true") return xstro.reply("*NSFW* is already enabled")
                        await sck.updateOne({ id: xstro.chat }, { nsfw: "true" })
                        xstro.reply("Successfully Enabled *NSFW*")
                        return
                    }
                }
                break
            default:
                {
                    xstro.reply("Please provide me term like.\n1-events\n2-antilink\n3-nsfw\n4-economy")
                }
        }
    }
)
