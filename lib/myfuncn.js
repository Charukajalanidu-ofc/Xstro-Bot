const { proto, delay, getContentType } = require("@sampandey001/baileys");
const fs = require("fs-extra");
const { unlink } = require("fs").promises;
const axios = require("axios");
const { writeExifWebp } = require("../lib/exif");
const moment = require("moment-timezone");
const { sizeFormatter } = require("human-readable");
const Config = require("../config");
const util = require("util");
const child_process = require("child_process");

const unixTimestampSeconds = (date = new Date()) => Math.floor(date.getTime() / 1000);
const sleep = ms => {
 return new Promise(resolve => {
  setTimeout(resolve, ms);
 });
};
exports.unixTimestampSeconds = unixTimestampSeconds;

exports.generateMessageTag = message => {
 let tag = (0, exports.unixTimestampSeconds)().toString();
 if (message) tag += ".--" + message; // attach epoch if provided
 return tag;
};

exports.processTime = (timestamp, now) => {
 return moment.duration(now - moment(timestamp * 1000)).asSeconds();
};
exports.getBuffer = async (url, options) => {
 try {
  options ? options : {};
  const res = await axios({
   method: "get",
   url,
   headers: {
    DNT: 1,
    "Upgrade-Insecure-Request": 1,
   },
   ...options,
   responseType: "arraybuffer",
  });
  return res.data;
 } catch (err) {
  return err;
 }
};

exports.fetchJson = async (url, options) => {
 try {
  options ? options : {};
  const res = await axios({
   method: "GET",
   url: url,
   headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
   },
   ...options,
  });
  return res.data;
 } catch (err) {
  return err;
 }
};

exports.runtime = function (seconds) {
 seconds = Number(seconds);
 var d = Math.floor(seconds / (3600 * 24));
 var h = Math.floor((seconds % (3600 * 24)) / 3600);
 var m = Math.floor((seconds % 3600) / 60);
 var s = Math.floor(seconds % 60);
 var dDisplay = d > 0 ? d + (d == 1 ? " d, " : " d, ") : "";
 var hDisplay = h > 0 ? h + (h == 1 ? " h, " : " h, ") : "";
 var mDisplay = m > 0 ? m + (m == 1 ? " m, " : " m, ") : "";
 var sDisplay = s > 0 ? s + (s == 1 ? " s" : " s") : "";
 return dDisplay + hDisplay + mDisplay + sDisplay;
};

exports.clockString = function (seconds) {
 let h = isNaN(seconds) ? "--" : Math.floor((seconds % (3600 * 24)) / 3600);
 let m = isNaN(seconds) ? "--" : Math.floor((seconds % 3600) / 60);
 let s = isNaN(seconds) ? "--" : Math.floor(seconds % 60);
 return [h, m, s].map(v => v.toString().padStart(2, 0)).join(":");
};

exports.sleep = async ms => {
 return new Promise(resolve => setTimeout(resolve, ms));
};

exports.isUrl = url => {
 return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, "gi"));
};

exports.getTime = (format, date) => {
 if (date) {
  return moment(date).locale("id").format(format);
 } else {
  return moment.tz("Asia/Jakarta").locale("id").format(format);
 }
};

exports.formatDate = (n, locale = "id") => {
 let d = new Date(n);
 return d.toLocaleDateString(locale, {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
 });
};

exports.formatp = sizeFormatter({
 std: "JEDEC", //'SI' = default | 'IEC' | 'JEDEC'
 decimalPlaces: 2,
 keepTrailingZeroes: false,
 render: (literal, symbol) => `${literal} ${symbol}B`,
});

exports.jsonformat = string => {
 return JSON.stringify(string, null, 2);
};

function format(...args) {
 return util.format(...args);
}

exports.logic = (check, inp, out) => {
 if (inp.length !== out.length) throw new Error("Input and Output must have same length");
 for (let i in inp) if (util.isDeepStrictEqual(check, inp[i])) return out[i];
 return null;
};

exports.generateProfilePicture = async buffer => {
 const jimp = await jimp_1.read(buffer);
 const min = jimp.getWidth();
 const max = jimp.getHeight();
 const cropped = jimp.crop(0, 0, min, max);
 return {
  img: await cropped.scaleToFit(720, 720).getBufferAsync(jimp_1.MIME_JPEG),
  preview: await cropped.scaleToFit(720, 720).getBufferAsync(jimp_1.MIME_JPEG),
 };
};

exports.bytesToSize = (bytes, decimals = 2) => {
 if (bytes === 0) return "0 Bytes";

 const k = 1024;
 const dm = decimals < 0 ? 0 : decimals;
 const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

 const i = Math.floor(Math.log(bytes) / Math.log(k));

 return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

exports.getSizeMedia = path => {
 return new Promise((resolve, reject) => {
  if (/http/.test(path)) {
   axios.get(path).then(res => {
    let length = parseInt(res.headers["content-length"]);
    let size = exports.bytesToSize(length, 3);
    if (!isNaN(length)) resolve(size);
   });
  } else if (Buffer.isBuffer(path)) {
   let length = Buffer.byteLength(path);
   let size = exports.bytesToSize(length, 3);
   if (!isNaN(length)) resolve(size);
  } else {
   reject("error gatau apah");
  }
 });
};

exports.parseMention = (text = "") => {
 return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + "@s.whatsapp.net");
};

exports.GIFBufferToVideoBuffer = async image => {
 const filename = `${Math.random().toString(36)}`;
 await fs.writeFileSync(`./${filename}.gif`, image);
 child_process.exec(`ffmpeg -i ./${filename}.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ./${filename}.mp4`);
 await sleep(8000);

 var buffer5 = await fs.readFileSync(`./${filename}.mp4`);
 Promise.all([unlink(`./${filename}.mp4`), unlink(`./${filename}.gif`)]);
 return buffer5;
};
/**
 * Serialize Message
 * @param {WAConnection} botto
 * @param {Object} m
 * @param {store} store
 */
exports.smsg = (botto, xstro, store) => {
 if (!xstro) return xstro;
 let M = proto.WebMessageInfo;
 if (xstro.key) {
  xstro.id = xstro.key.id;
  xstro.isBot = xstro.id.startsWith("BAES") && xstro.id.length === 16;
  xstro.isBaileys = xstro.id.startsWith("BAE5") && xstro.id.length === 16;
  xstro.chat = xstro.key.remoteJid;
  xstro.fromMe = xstro.key.fromMe;
  xstro.isGroup = xstro.chat.endsWith("@g.us");
  xstro.sender = botto.decodeJid((xstro.fromMe && botto.user.id) || xstro.participant || xstro.key.participant || xstro.chat || "");
  if (xstro.isGroup) xstro.participant = botto.decodeJid(xstro.key.participant) || "";
 }
 if (xstro.message) {
  xstro.mtype = getContentType(xstro.message);
  xstro.msg = xstro.mtype == "viewOnceMessage" ? xstro.message[xstro.mtype].message[getContentType(xstro.message[xstro.mtype].message)] : xstro.message[xstro.mtype];
  try {
   xstro.body =
    xstro.mtype === "conversation"
     ? xstro.message.conversation
     : xstro.mtype == "imageMessage" && xstro.message.imageMessage.caption != undefined
     ? xstro.message.imageMessage.caption
     : xstro.mtype == "videoMessage" && xstro.message.videoMessage.caption != undefined
     ? xstro.message.videoMessage.caption
     : xstro.mtype == "extendedTextMessage" && xstro.message.extendedTextMessage.text != undefined
     ? xstro.message.extendedTextMessage.text
     : xstro.mtype == "buttonsResponseMessage"
     ? xstro.message.buttonsResponseMessage.selectedButtonId
     : xstro.mtype == "listResponseMessage"
     ? xstro.message.listResponseMessage.singleSelectReply.selectedRowId
     : xstro.mtype == "templateButtonReplyMessage"
     ? xstro.message.templateButtonReplyMessage.selectedId
     : xstro.mtype === "messageContextInfo"
     ? xstro.message.buttonsResponseMessage?.selectedButtonId || xstro.message.listResponseMessage?.singleSelectReply.selectedRowId || xstro.text
     : "";
  } catch {
   xstro.body = false;
  }
  let quoted = (xstro.quoted = xstro.msg.contextInfo ? xstro.msg.contextInfo.quotedMessage : null);
  xstro.mentionedJid = xstro.msg.contextInfo ? xstro.msg.contextInfo.mentionedJid : [];

  if (xstro.quoted) {
   let type = getContentType(quoted);
   xstro.quoted = xstro.quoted[type];
   if (["productMessage"].includes(type)) {
    type = getContentType(xstro.quoted);
    xstro.quoted = xstro.quoted[type];
   }
   if (typeof xstro.quoted === "string") xstro.quoted = { text: xstro.quoted };

   if (quoted.viewOnceMessageV2) {
    console.log("entered ==================================== ");
   } else {
    xstro.quoted.mtype = type;
    xstro.quoted.id = xstro.msg.contextInfo.stanzaId;
    xstro.quoted.chat = xstro.msg.contextInfo.remoteJid || xstro.chat;
    xstro.quoted.isBot = xstro.quoted.id ? xstro.quoted.id.startsWith("BAES") && xstro.quoted.id.length === 16 : false;
    xstro.quoted.isBaileys = xstro.quoted.id ? xstro.quoted.id.startsWith("BAE5") && xstro.quoted.id.length === 16 : false;
    xstro.quoted.sender = botto.decodeJid(xstro.msg.contextInfo.participant);
    xstro.quoted.fromMe = xstro.quoted.sender === (botto.user && botto.user.id);
    xstro.quoted.text = xstro.quoted.text || xstro.quoted.caption || xstro.quoted.conversation || xstro.quoted.contentText || xstro.quoted.selectedDisplayText || xstro.quoted.title || "";
    xstro.quoted.mentionedJid = xstro.msg.contextInfo ? xstro.msg.contextInfo.mentionedJid : [];
    xstro.getQuotedObj = xstro.getQuotedMessage = async () => {
     if (!xstro.quoted.id) return false;
     let q = await store.loadMessage(xstro.chat, xstro.quoted.id, botto);
     return exports.smsg(botto, q, store);
    };
    let vM = (xstro.quoted.fakeObj = M.fromObject({
     key: {
      remoteJid: xstro.quoted.chat,
      fromMe: xstro.quoted.fromMe,
      id: xstro.quoted.id,
     },
     message: quoted,
     ...(xstro.isGroup ? { participant: xstro.quoted.sender } : {}),
    }));
    /**
     *
     * @returns
     */
    let { chat, fromMe, id } = xstro.quoted;
    const key = {
     remoteJid: xstro.chat,
     fromMe: false,
     id: xstro.quoted.id,
     participant: xstro.quoted.sender,
    };
    xstro.quoted.delete = async () => await botto.sendMessage(xstro.chat, { delete: key });

    /**
     *
     * @param {*} jid
     * @param {*} forceForward
     * @param {*} options
     * @returns
     */
    xstro.forwardMessage = (jid, forceForward = true, options = {}) => botto.copyNForward(jid, vM, forceForward, { contextInfo: { isForwarded: false } }, options);

    /**
     *
     * @returns
     */
    xstro.quoted.download = () => botto.downloadMediaMessage(xstro.quoted);
   }
  }
 }
 if (xstro.msg.url) xstro.download = () => botto.downloadMediaMessage(xstro.msg);
 xstro.text = xstro.msg.text || xstro.msg.caption || xstro.message.conversation || xstro.msg.contentText || xstro.msg.selectedDisplayText || xstro.msg.title || "";
 /**
  * Reply to this message
  * @param {String|Object} text
  * @param {String|false} chatId
  * @param {Object} options
  */

 /**
  * Copy this message
  */
 xstro.copy = () => exports.smsg(botto, M.fromObject(M.toObject(m)));
 /**
  *
  * @param {*} jid
  * @param {*} forceForward
  * @param {*} options
  * @returns
  */
 xstro.copyNForward = (jid = xstro.chat, forceForward = false, options = {}) => botto.copyNForward(jid, xstro, forceForward, options);
 xstro.sticker = (stik, id = xstro.chat, option = { mentions: [xstro.sender] }) => botto.sendMessage(id, { sticker: stik, contextInfo: { mentionedJid: option.mentions } }, { quoted: xstro });
 xstro.replyimg = (img, teks, id = xstro.chat, option = { mentions: [xstro.sender] }) =>
  botto.sendMessage(id, { image: img, caption: teks, contextInfo: { mentionedJid: option.mentions } }, { quoted: xstro });
 xstro.imgurl = (img, teks, id = xstro.chat, option = { mentions: [xstro.sender] }) =>
  botto.sendMessage(id, { image: { url: img }, caption: teks, contextInfo: { mentionedJid: option.mentions } }, { quoted: xstro });
 xstro.reply = async (content, opt = { packname: "Xstro", author: "Astro" }, type = "text") => {
  switch (type.toLowerCase()) {
   case "text":
    {
     return await botto.sendMessage(xstro.chat, { text: content }, { quoted: xstro });
    }
    break;
   case "image":
    {
     if (Buffer.isBuffer(content)) {
      return await botto.sendMessage(xstro.chat, { image: content, ...opt }, { ...opt });
     } else if (isUrl(content)) {
      return botto.sendMessage(xstro.chat, { image: { url: content }, ...opt }, { ...opt });
     }
    }
    break;
   case "video": {
    if (Buffer.isBuffer(content)) {
     return await botto.sendMessage(xstro.chat, { video: content, ...opt }, { ...opt });
    } else if (isUrl(content)) {
     return await botto.sendMessage(xstro.chat, { video: { url: content }, ...opt }, { ...opt });
    }
   }
   case "audio":
    {
     if (Buffer.isBuffer(content)) {
      return await botto.sendMessage(xstro.chat, { audio: content, ...opt }, { ...opt });
     } else if (isUrl(content)) {
      return await botto.sendMessage(xstro.chat, { audio: { url: content }, ...opt }, { ...opt });
     }
    }
    break;
   case "template":
    let optional = await generateWAMessage(xstro.chat, content, opt);
    let message = { viewOnceMessage: { message: { ...optional.message } } };
    await botto.relayMessage(xstro.chat, message, { messageId: optional.key.id });
    break;
   case "sticker":
    {
     let { data, mime } = await botto.getFile(content);
     if (mime == "image/webp") {
      let buff = await writeExifWebp(data, opt);
      await botto.sendMessage(xstro.chat, { sticker: { url: buff }, ...opt }, opt);
     } else {
      mime = await mime.split("/")[0];
      if (mime === "video") {
       await botto.sendImageAsSticker(xstro.chat, content, opt);
      } else if (mime === "image") {
       await botto.sendImageAsSticker(xstro.chat, content, opt);
      }
     }
    }
    break;
  }
 };
 xstro.senddoc = (
  doc,
  type,
  id = xstro.chat,
  option = {
   mentions: [xstro.sender],
   filename: Config.ownername,
   mimetype: type,
   externalAdRepl: {
    title: Config.ownername,
    body: " ",
    thumbnailUrl: ``,
    thumbnail: log0,
    mediaType: 1,
    mediaUrl: "",
    sourceUrl: gurl,
   },
  }
 ) =>
  botto.sendMessage(
   id,
   {
    document: doc,
    mimetype: option.mimetype,
    fileName: option.filename,
    contextInfo: {
     externalAdReply: option.externalAdRepl,
     mentionedJid: option.mentions,
    },
   },
   { quoted: xstro }
  );

 xstro.sendcontact = (name, info, number) => {
  var vcard = "BEGIN:VCARD\n" + "VERSION:3.0\n" + "FN:" + name + "\n" + "ORG:" + info + ";\n" + "TEL;type=CELL;type=VOICE;waid=" + number + ":+" + number + "\n" + "END:VCARD";
  botto.sendMessage(xstro.chat, { contacts: { displayName: name, contacts: [{ vcard }] } }, { quoted: xstro });
 };
 xstro.react = emoji => botto.sendMessage(xstro.chat, { react: { text: emoji, key: xstro.key } });

 return xstro;
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
 fs.unwatchFile(file);
 console.log(`Update ${__filename}`);
 delete require.cache[file];
 require(file);
});
