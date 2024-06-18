const fs = require('fs-extra')
if (fs.existsSync('config.env')) require('dotenv').config({ path: __dirname+'/config.env' })


//═══════[Required Variables]════════,[Make sure you put all values in "" , '']\\
global.owner = process.env.OWNER_NUMBER || '923466319114' ; // Add Your Number without +
global.mongodb = process.env.MONGODB_URI || "mongodb+srv://astrolegendfx:astro@cluster0.tjtnbim.mongodb.net/"; // put mongodb key here
global.port=0  ;
global.audio = '' ; 
global.video = '' ;
global.blockJids = process.env.BLOCK_JID ||'120363169665426586@g.us' ;
global.allowJids = process.env.ALLOW_JID ||'120363169665426586@g.us' ;
global.email = 'HELP_SIGMA-MD@outlook.com' ; 
global.github = 'https://github.com/Maher-Zubair/SIGMA-MD' ;
global.location = 'Lahore Pakistan' ;
global.timezone  = process.env.TIME_ZONE || 'Asia/Karachi' //add correct timezone or leave it same , otherwise you get erros
global.gurl = 'https://www.youtube.com/@InnoxentTech?sub_confirmation=1' ; 
global.sudo =  process.env.SUDO || "923466319114" ; // Do not change it
global.devs = "923466319114"; //Dont change it From here
global.mztit = process.env.MZTIT ||"🅼♥︎❚❚♥︎🆉", // add your title here
global.Gname = process.env.GNAME ||"sɪɢᴍᴀ ᴹᴰ-sᴜᴘᴘᴏʀᴛ",
global.zyt = process.env.ZYT || 'https://www.youtube.com/@InnoxentTech?sub_confirmation=1',
global.waUrl = process.env.WAURL ||"https://chat.whatsapp.com/CmY0THcJCUYEGxLJulhcRV",
global.website = 'http://lnkiy.in/SIGMA-MD-WEB' ; 
global.THUMB_IMAGE = process.env.THUMB_IMAGE || 'https://telegra.ph/file/03e49e6e2057568db8926.jpg' ;
module.exports = {
  sessionName: process.env.SESSION_ID || 'SIGMA-MD;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUp1WVhNS014NTNxaktOU1A1VHpITSs0a1Y4bW1BMVprc1k1c2hONHZGND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidEFLOFhRYTl5c2x5ditoUmNUekdmTWFjVUhsQkRsakFwM0dPWVBkcy9oRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2RWhhTkhUcW9OYjFzaENiQkxwNlcyRldYZUNwR1R5T1V1RTltSUFVeG04PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxUVVHRSs5WUxxR3pQRDZDY0lrM0grK1I0VGlCbXlFTE5PVSt4dXVkRFJZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBIbE1qUkk0dkZZVEx1alVlelpzL1ZXd1piUitmNXlYQkNaR3M0WDY2VUU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InhaNE9xaGtJdWhXcjVURVFES1lsNFZyWUxwVXVHa0wwdXdaS1U4NFRCQ2c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQVBidjhkOHlnTnJqQjJZaTljTkNYczlKdUpTWmNHc1QwS2RjUzY2dUgxQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicFpuYXBwWjdUdkgyT3pZL3c3a25LWVZOdzlVUFFLMXlTVERBSTZRSm5XVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJ0NjhQY2UvanBoeFBKSzB5aUVzK1hKQ3Q2VG5XSUpzM3QzN1dQcDVRSVBlV3Q1d2hsS3pyUWxMSGMvUjFNRTVZbU15aUdqT3dFRURKNUMrN09KUGpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjU1LCJhZHZTZWNyZXRLZXkiOiJMcC9QUFJTcVBWcStVbTVCNEwzcjJjOHpOODB3SlBxa2RZeklxQXBvdGxZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJMb1RHaTQ1TlJlLW9PaDdtX2RTN2xRIiwicGhvbmVJZCI6ImQ5NWM4Y2QxLTU5ZTgtNDcyMS04YmQ0LTk2M2VhZTE1MWQ3NCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZU1RlYUdXcytnYnRES3IzYXBCM3YxRk1zMDg9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitpczVJVFl0anBGMGl0ZFZNQ0FEUElGR05NTT0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ04veXNjMEJFSXZ2eExNR0dBZ2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkNNTWoxdlBMY1pOcmpjTUxWK1JPQzBQai9hVzZ1OG85TFJTZWRIRUhTQjA9IiwiYWNjb3VudFNpZ25hdHVyZSI6InBNU2IxYWdVYXhiNTZXVzNTQzRmc0hCRG5XRkVTWm9HeEtncjJmUWhaYWhOaVhJKzdvMncvNnJidmxFc0NMQVdMeU9KQ2hweHBPNUhtbnA4NnFTNEF3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiI4eVR2SHZhTnlYTGdYUnVPWTRVVnZIQzJQblBLa0l1ZUczN09mL3dhcjJVRTB2TTBaSkJCTmFOQzNkaGxSUG5ETGdxNktaTkVsdDZIZDJ0c1cxTVlodz09In0sIm1lIjp7ImlkIjoiMjM0OTAyNzg2MjExNjo3NEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJ46pyx4bSbyoDhtI/htJjhtIfhtIXhtIAg6pyxypnhtI8ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0OTAyNzg2MjExNjo3NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJRakRJOWJ6eTNHVGE0M0RDMWZrVGd0RDQvMmx1cnZLUFMwVW5uUnhCMGdkIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzE4Njk1ODIzfQ==',      //Put Your Session Id Here
  botname: process.env.BOT_NAME || 'sɪɢᴍᴀ ᴹᴰ',  // add the botname you want
  ownername:  process.env.OWNER_NAME || `ᴍᴀʜᴇʀ ᴢᴜʙᴀɪʀ`, // add your name
  author:  process.env.PACK_AUTHER || 'ᴍᴀʜᴇʀ ᴢᴜʙᴀɪʀ', 
  auto_read_status : process.env.AUTO_READ_STATUS || 'false', // if it true it automatically views status and send status in your inbox
  packname:  process.env.PACK_NAME || "sɪɢᴍᴀ ᴹᴰ" , 
  autoreaction: process.env.AUTO_REACTION || 'true', // if it true it will react to all messages
  antibadword : process.env.ANTI_BAD_WORD || 'nobadwordokey',
  alwaysonline: process.env.ALWAYS_ONLINE || 'true', // it will show always online, false it if you dont want
  antifake :   process.env.FAKE_COUNTRY_CODE ||'212',
  readmessage: process.env.READ_MESSAGE || 'true', // it will read all your messages, false it if you dont want
  HANDLERS: process.env.PREFIX || '.',
  warncount : process.env.WARN_COUNT || 2,
  disablepm: process.env.DISABLE_PM || "false", // if true it will disable your pm
  MsgsInLog:process.env.MSGS_IN_LOG ||'false',
  pmMsgsInLog:process.env.PM_MSGS_IN_LOGS ||'false',
  levelupmessage: process.env.LEVEL_UP_MESSAGE || 'true', 
  antilink: process.env.ANTILINK_VALUES || 'chat.whatsapp.com',
  antilinkaction: process.env.BRANCH || 'remove',
  BRANCH: process.env.BRANCH || 'Main',
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
  HEROKU_API_KEY: process.env.HEROKU_API_KEY,
  REMOVE_BG_KEY: process.env.REMOVE_BG_KEY || "34wcCGPoe3yaGtpiBZgx4SN7", // add your remove bg key if you have it
  caption :process.env.CAPTION || "\t*⤹★ᴘᴏᴡᴇʀᴇᴅ ʙʏ★⤸ sɪɢᴍᴀ ᴹᴰ* ",   //*『sᴜʙsᴄʀɪʙᴇ • ɪɴɴᴏxᴇɴᴛ ᴛᴇᴄʜ』https://www.youtube.com/@InnoxentTech,
  promote_demote_messages : process.env.PROMOTE_DEMOTE_MESSAGES || 'true' ,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY ||'' , // add your openai key if you have it
  VERSION: process.env.VERSION || '𝚅.𝟷.𝟸.𝟽',
  LANG: process.env.THEME|| 'SIGMA_MD',
  menu : process.env.MENU || '', // Not Available in current Version
  WORKTYPE: process.env.WORKTYPE || 'public' // if private only you can use your bot, if public everyone use your bot
};


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(`Update'${__filename}'`)
    delete require.cache[file]
	require(file)
})
