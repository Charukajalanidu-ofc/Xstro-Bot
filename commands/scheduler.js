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

 const { tlang,sck,prefix,cmd } = require('../lib')
 cmd({
     pattern: "amute",
     desc: "sets auto mute time in group.",
     category: "moderation",
 },
 async(Void, xstro, text,{ isCreator }) => {
     if (!isCreator) return xstro.reply(tlang().owner)
     if(!xstro.isGroup) return xstro.reply(tlang().group)
     if(!text.split(':')[1]) return xstro.reply(`Please provide correct form.\nEg: setmute ${prefix}22:00`)
     //if(!Number.isInteger(text.split(':')[0])) return xstro.reply(`Please provide correct form.\nEg: setmute ${prefix}22:00`);
     //if(!Number.isInteger(text.split(':')[1])) return xstro.reply(`Please provide correct form.\nEg: setmute ${prefix}22:00`)
           let Group = await sck.findOne({ id: xstro.chat })
             if (!Group) {
                 await new sck({ id: xstro.chat, mute: text }).save()
                 return xstro.reply('Mute added.')
             } else {
                 await await sck.updateOne({ id: xstro.chat }, { mute:text })
                 return xstro.reply(`_Mute added for ${text} successfully._`)     
             }      
 }
 )

 //--------------------------------------------------------------------------------
 cmd({
    pattern: "aunmute",
    desc: "sets unmute time in group.",
    category: "moderation",
},
async(Void, xstro, text,{ isCreator }) => {
    if (!isCreator) return xstro.reply(tlang().owner)
    if(!xstro.isGroup) return xstro.reply(tlang().group)
    if(!text.split(':')[0]) return xstro.reply(`Please provide correct form.\nEg: setmute ${prefix}22:00`)
   // if(!Number.isInteger(text.split(':')[0])) return xstro.reply(`Please provide correct form.\nEg: setmute ${prefix}22:00`);
   // if(!Number.isInteger(text.split(':')[1])) return xstro.reply(`Please provide correct form.\nEg: setmute ${prefix}22:00`)
          let Group = await sck.findOne({ id: xstro.chat })
            if (!Group) {
                await new sck({ id: xstro.chat, unmute: text }).save()
                return xstro.reply('Mute added.')
            } else {
                await await sck.updateOne({ id: xstro.chat }, { unmute:text })
                return xstro.reply(`_Unmute updated for ${text} successfully._`)
                
            }      
}
)
 //--------------------------------------------------------------------------------
 cmd({
    pattern: "dunmute",
    desc: "Delete unmute from group.",
    category: "moderation",
},
async(Void, xstro, text,{ isCreator }) => {
    if (!isCreator) return xstro.reply(tlang().owner)
    if(!xstro.isGroup) return xstro.reply(tlang().group)
          let Group = await sck.findOne({ id: xstro.chat })
            if (!Group) {
                return xstro.reply('There\'s no unmute set in group.')
            } else {
                await await sck.updateOne({ id: xstro.chat }, { unmute:'false' })
                return xstro.reply('Unmute deleted successfully.')
                
            }      
}
)
 //--------------------------------------------------------------------------------
 cmd({
    pattern: "dmute",
    desc: "Delete mute from group.",
    category: "moderation",
},
async(Void, xstro, text,{ isCreator }) => {
    if (!isCreator) return xstro.reply(tlang().owner)
    if(!xstro.isGroup) return xstro.reply(tlang().group)
          let Group = await sck.findOne({ id: xstro.chat })
            if (!Group) {
                return xstro.reply('There\'s no mute set in group.')
            } else {
                await await sck.updateOne({ id: xstro.chat }, { mute:'false' })
                return xstro.reply('Mute deleted successfully.')
                
            }      
}
)
 //--------------------------------------------------------------------------------
