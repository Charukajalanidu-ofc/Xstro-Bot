const {
    sck,
    sck1,
    Module_Exports,
    jsonformat,
    botpic,
    fancytext,
    name,
    tlang,
    warndb,
    sleep,
    getAdmin,
    getBuffer,
    prefix,
    parsedJid
  } = require("../lib");
  const moment = require("moment-timezone");
  const Levels = require("discord-xp");
  const fs = require("fs-extra");
  const Jimp = require("jimp");
  const sɪɢᴍᴀ_ᴍᴅ = require("../lib/sigma_plugins");
  
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "join",
    infocmd: "joins group by link",
    kingclass: "owner",
    kingpath: __filename,
    use: "group link"
  }, async (Void, citel, text, {
    isCreator
  }) => {
    if (!isCreator) {
      return citel.reply(tlang().owner);
    }
    if (!text) {
      return citel.reply(`*_Provide me a Group Link_*`);
    }
    if (!text.split(" ")[0] && !text.split(" ")[0].includes("whatsapp.com")) {
      return await citel.reply("*_Link Invalid, Please Send a valid whatsapp Group Link!_*");
    }
    let result = text.split(" ")[0].split("https://chat.whatsapp.com/")[1];
    await Void.groupAcceptInvite(result).then(res => citel.reply("*_Group Joined_*")).catch(err => citel.reply("Error in Joining Group"));
  });
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "support",
    shortcut: ["sgc"],
    infocmd: "Sends official support group link.",
    kingclass: "developer",
    use: ""
  }, async (sigma, man, text) => {
    const slog = await getBuffer(global.slogo);
    await sigma.sendMessage(man.chat, {
      image: slog,
      text: "┏━━⟪⟪ 🅼♥︎❚❚♥︎🆉 ⟫━⦿\n┃✗ *_•ɢʀᴏᴜᴘ ɴᴀᴍᴇ•_* \n┃✗ *•sɪɢᴍᴀ ᴹᴰ-sᴜᴘᴘᴏʀᴛ•* \n┃✗ *_•ɢʀᴏᴜᴘ ʟɪɴᴋ•_* " + sgc + "\n┃✗ *_•ᴅᴇᴠᴇʟᴏᴘᴇʀ•_* 𝐌𝐚𝐡𝐞𝐫 𝐙𝐮𝐛𝐚𝐢𝐫\n┗━━━━━━━━━━⦿",
      contextInfo: {
        externalAdReply: {
          title: "sɪɢᴍᴀ ᴹᴰ-sᴜᴘᴘᴏʀᴛ",
          body: "Easy to Use",
          thumbnail: slog,
          mediaType: 4,
          mediaUrl: "",
          sourceUrl: sgc
        }
      }
    });
  });
  //===========================================================================
  Module_Exports({
    kingcmd: "editdesc",
    infocmd: "Set Description of Group",
    kingclass: "group",
    kingpath: __filename,
    use: "enter Description Text"
  }, async (Void, citel, text, {
    isCreator
  }) => {
    if (!citel.isGroup) {
      return citel.reply(tlang().group);
    }
    if (!text) {
      return await citel.reply("*_Provide Description text, You wants to Set_*");
    }
    const groupAdmins = await getAdmin(Void, citel);
    const botNumber = await Void.decodeJid(Void.user.id);
    const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isBotAdmins) {
      return await citel.reply(tlang().botAdmin);
    }
    if (!isAdmins) {
      return citel.reply(tlang().admin);
    }
    try {
      await Void.groupUpdateDescription(citel.chat, text);
      citel.reply("*_Group description Updated Successfuly!_*");
      return await Void.sendMessage(citel.chat, {
        react: {
          text: "",
          key: citel.key
        }
      });
    } catch (e) {
      return await Void.sendMessage(users, {
        text: "Error While Updating Group Description\nReason : " + e
      }, {
        quoted: citel
      });
    }
  });
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "editname",
    infocmd: "Set name of Group",
    kingclass: "group",
    kingpath: __filename,
    use: "enter Description Text"
  }, async (Void, citel, text, {
    isCreator
  }) => {
    if (!citel.isGroup) {
      return citel.reply(tlang().group);
    }
    if (!text) {
      return await citel.reply("*_Provide Text To Update Group Name_*");
    }
    const groupAdmins = await getAdmin(Void, citel);
    const botNumber = await Void.decodeJid(Void.user.id);
    const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isBotAdmins) {
      return await citel.reply(tlang().botAdmin);
    }
    if (!isAdmins) {
      return citel.reply(tlang().admin);
    }
    try {
      await Void.groupUpdateSubject(citel.chat, text);
      citel.reply("*_Group Name Updated Successfuly!_*");
      return await Void.sendMessage(citel.chat, {
        react: {
          text: "",
          key: citel.key
        }
      });
    } catch (e) {
      return await Void.sendMessage(users, {
        text: "_Error While Updating Group Name_\nReason : " + e
      }, {
        quoted: citel
      });
    }
  });
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "antifake",
    infocmd: "Allow  to Join Group For Specific Country Code",
    kingclass: "group",
    kingpath: __filename
  }, async (Void, citel, text, {
    isCreator
  }) => {
    const _0x3d53e3 = _0x4d30;
    (function (_0x3289e8, _0x35a484) {
      const _0x3f55e9 = _0x4d30;
      const _0x4c3533 = _0x3289e8();
      while (true) {
        try {
          const _0x57c2cd = -parseInt(_0x3f55e9(351)) / 1 + -parseInt(_0x3f55e9(340)) / 2 * (-parseInt(_0x3f55e9(346)) / 3) + -parseInt(_0x3f55e9(355)) / 4 * (parseInt(_0x3f55e9(325)) / 5) + -parseInt(_0x3f55e9(323)) / 6 * (-parseInt(_0x3f55e9(332)) / 7) + -parseInt(_0x3f55e9(329)) / 8 + -parseInt(_0x3f55e9(322)) / 9 + parseInt(_0x3f55e9(335)) / 10;
          if (_0x57c2cd === _0x35a484) {
            break;
          } else {
            _0x4c3533.push(_0x4c3533.shift());
          }
        } catch (_0x3b6134) {
          _0x4c3533.push(_0x4c3533.shift());
        }
      }
    })(_0x4e47, 171724);
    if (!citel[_0x3d53e3(330)]) {
      return citel[_0x3d53e3(326)](tlang().group);
    }
    const groupMetadata = citel[_0x3d53e3(330)] ? await Void[_0x3d53e3(337)](citel.chat)[_0x3d53e3(319)](_0x315e70 => {}) : "";
    const participants = citel[_0x3d53e3(330)] ? await groupMetadata[_0x3d53e3(320)] : "";
    const groupAdmins = await getAdmin(Void, citel);
    const isAdmins = citel[_0x3d53e3(330)] ? groupAdmins[_0x3d53e3(328)](citel[_0x3d53e3(345)]) : false;
    if (!isAdmins && !isCreator) {
      return citel[_0x3d53e3(326)](tlang().admin);
    }
    function _0x4d30(_0x518d0a, _0x4df86b) {
      const _0x4e47ac = _0x4e47();
      _0x4d30 = function (_0x4d308, _0x5dbaea) {
        _0x4d308 = _0x4d308 - 318;
        let _0x3f5c8a = _0x4e47ac[_0x4d308];
        return _0x3f5c8a;
      };
      return _0x4d30(_0x518d0a, _0x4df86b);
    }
    let checkinfo = (await sck[_0x3d53e3(321)]({
      id: citel[_0x3d53e3(354)]
    })) || (await new sck({
      id: citel[_0x3d53e3(354)]
    })[_0x3d53e3(331)]());
    if (text[_0x3d53e3(347)]()[_0x3d53e3(353)](_0x3d53e3(338)) || text[_0x3d53e3(347)]()[_0x3d53e3(353)](_0x3d53e3(344)) || text[_0x3d53e3(347)]()[_0x3d53e3(353)](_0x3d53e3(324))) {
      if (checkinfo[_0x3d53e3(349)] == _0x3d53e3(341)) {
        return await citel[_0x3d53e3(350)](_0x3d53e3(327));
      }
      await sck[_0x3d53e3(334)]({
        id: citel[_0x3d53e3(354)]
      }, {
        antifake: "false"
      });
      return await citel[_0x3d53e3(350)]("*Anti_Fake Disable Succesfully!*");
    } else if (!text) {
      return await citel[_0x3d53e3(350)]("*_Antifake " + (checkinfo[_0x3d53e3(349)] === _0x3d53e3(341) ? _0x3d53e3(342) : _0x3d53e3(336) + checkinfo.antifake + "\"") + _0x3d53e3(352));
    }
    function _0x4e47() {
      const _0x1417c1 = ["sender", "1119OfZcoi", "toLowerCase", "antifake 92_*", "antifake", "send", "95149nQhOqw", `\x20Country\x20Code!_*\x0a\x20*Provide\x20Country\x20code\x20to\x20Update\x20Antifake\x20Status*\x0a*Ex:\x20_${prefix}antifake\x2092_*`, "startsWith", "chat", "4OBMwaq", "*Anti_Fake Succesfully set to \"", "catch", "participants", "findOne", "803394fyIvKZ", "1356612CgXDOm", "disable", "319485kWURrN", "reply", "*Anti_Fake Already Disabled In Current Chat!*", "includes", "2030144kUUVSD", "isGroup", "save", "7OpPQtf", "*_Please provide a country code First_*\n *_Only numbers to join this group._*\n*_eg: ", "updateOne", "4462100VzFSpa", "set to \"", "groupMetadata", "off", "split", "8ZBiSLh", "false", "Not set to any", "\"!*\n*_Now People Joined Group Who's Number Start With ", "deact"];
      _0x4e47 = function () {
        return _0x1417c1;
      };
      return _0x4e47();
    }
    let country_code = text ? parseInt(text[_0x3d53e3(339)](" ")[0]) : false;
    if (!text || !country_code || isNaN(country_code) || country_code === 0) {
      return await citel[_0x3d53e3(350)](_0x3d53e3(333) + prefix + _0x3d53e3(348));
    } else if (country_code) {
      await sck[_0x3d53e3(334)]({
        id: citel.chat
      }, {
        antifake: "" + country_code
      });
      return await citel.send(_0x3d53e3(318) + country_code + _0x3d53e3(343) + country_code + "_*");
    } else {
      return await citel.send("*_Please provide a Valid country code First_*\n *_Only numbers to join this group._*\n*_Ex: " + prefix + _0x3d53e3(348));
    }
  });
  
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "antidemote",
    shortcut: ["antidm"],
    infocmd: "Detects Promote and Automaticaly demote promoted person.",
    kingclass: "group",
    kingpath: __filename
  }, async (Void, citel, text, {
    isCreator
  }) => {
    if (!citel.isGroup) {
      return citel.reply(tlang().group);
    }
    const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch(e => {}) : "";
    const participants = citel.isGroup ? await groupMetadata.participants : "";
    const groupAdmins = await getAdmin(Void, citel);
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isAdmins && !isCreator) {
      return citel.reply(tlang().admin);
    }
    let checkinfo = (await sck.findOne({
      id: citel.chat
    })) || (await new sck({
      id: citel.chat
    }).save());
    if (text.toLowerCase().startsWith("on") || text.toLowerCase().startsWith("act") || text.toLowerCase().startsWith("enable")) {
      if (checkinfo.antidemote == "true") {
        return await citel.send("*_Anti_Demote Already Enabled In Current Chat!_*");
      }
      await sck.updateOne({
        id: citel.chat
      }, {
        antidemote: "true"
      });
      return await citel.send("*_Anti_Demote Enable Succesfully!_ _No One Demote Here Now_.*");
    } else if (text.toLowerCase().startsWith("off") || text.toLowerCase().startsWith("deact") || text.toLowerCase().startsWith("disable")) {
      if (checkinfo.antidemote == "false") {
        return await citel.send("*_Anti_Demote Already Disabled In Current Chat!_*");
      }
      await sck.updateOne({
        id: citel.chat
      }, {
        antidemote: "false"
      });
      return await citel.send("*_Anti_Demote Disable Succesfully!_*");
    } else {
      return await citel.reply(`*_Please Toggle between "On" And "Off"._*\n*_To Enable & Disable Demoting Peoples!_*`);
    }
  });
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "antipromote",
    shortcut: ["antipm"],
    infocmd: "Detects Promote and Automaticaly demote promoted person.",
    kingclass: "group",
    kingpath: __filename
  }, async (Void, citel, text, {
    isCreator
  }) => {
    if (!citel.isGroup) {
      return citel.reply(tlang().group);
    }
    const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch(e => {}) : "";
    const participants = citel.isGroup ? await groupMetadata.participants : "";
    const groupAdmins = await getAdmin(Void, citel);
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isAdmins && !isCreator) {
      return citel.reply(tlang().admin);
    }
    let checkinfo = (await sck.findOne({
      id: citel.chat
    })) || (await new sck({
      id: citel.chat
    }).save());
    if (text.toLowerCase().startsWith("on") || text.toLowerCase().startsWith("act") || text.toLowerCase().startsWith("enable")) {
      if (checkinfo.antipromote == "true") {
        return await citel.send("*_Anti_Promote Already Enabled In Current Chat!_*");
      }
      await sck.updateOne({
        id: citel.chat
      }, {
        antipromote: "true"
      });
      return await citel.send("*_Anti_Promote Enable Succesfully!_ _No One Promote Here Now_.*");
    } else if (text.toLowerCase().startsWith("off") || text.toLowerCase().startsWith("deact") || text.toLowerCase().startsWith("disable")) {
      if (checkinfo.antipromote == "false") {
        return await citel.send("*_Anti_Promote Already Disabled In Current Chat!_*");
      }
      await sck.updateOne({
        id: citel.chat
      }, {
        antipromote: "false"
      });
      return await citel.send("*_Anti_Promote Disable Succesfully!_*");
    } else {
      return await citel.reply(`*_Please Toggle between "On" And "Off"._*\n*_To Stop Promoting Peoples in Chat_*`);
    }
  });
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "pdm",
    infocmd: "Detect Promote/Demote Users And Send Alerts in Chat ",
    kingclass: "group",
    kingpath: __filename
  }, async (Void, citel, text, {
    isCreator
  }) => {
    if (!citel.isGroup) {
      return citel.reply(tlang().group);
    }
    const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch(e => {}) : "";
    const participants = citel.isGroup ? await groupMetadata.participants : "";
    const groupAdmins = await getAdmin(Void, citel);
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isAdmins && !isCreator) {
      return citel.reply(tlang().admin);
    }
    let checkinfo = (await sck.findOne({
      id: citel.chat
    })) || (await new sck({
      id: citel.chat
    }).save());
    if (text.toLowerCase().startsWith("on") || text.toLowerCase().startsWith("act") || text.toLowerCase().startsWith("enable")) {
      if (checkinfo.pdm == "true") {
        return await citel.send("*_Promote/Demote Alerts Already Enabled In Current Chat!_*");
      }
      await sck.updateOne({
        id: citel.chat
      }, {
        pdm: "true"
      });
      return await citel.send("*_Promote/Demote Alerts Enable Succesfully!_*");
    } else if (text.toLowerCase().startsWith("off") || text.toLowerCase().startsWith("deact") || text.toLowerCase().startsWith("disable")) {
      if (checkinfo.pdm == "false") {
        return await citel.send("*_Promote/Demote Alerts Already Disabled In Current Chat!_*");
      }
      await sck.updateOne({
        id: citel.chat
      }, {
        pdm: "false"
      });
      return await citel.send("*_Promote/Demote Alerts Disable Succesfully!_*");
    } else {
      return await citel.reply(`*_Please Toggle between "On" And "Off"._*\n*_To get And Stop Promote/Demote Alerts_*`);
    }
  });
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "warn",
    infocmd: "Warns user in Group.",
    kingclass: "group",
    kingpath: __filename,
    use: "quote|reply|number"
  }, async (Void, citel, text, {
    isCreator
  }) => {
    if (!citel.isGroup) {
      return citel.reply(tlang().group);
    }
    const groupAdmins = await getAdmin(Void, citel);
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isAdmins) {
      return citel.reply(tlang().admin);
    }
    const S = m;
    function Z() {
      const F = ["126402oKAcRa", "date", "*_Removing User because Warn limit exceeded_*\n\n*_Total Warnings._*\n", "chat", "8qachoN", "580yXDZAo", "groupParticipantsUpdate", "114528WgITIL", "reply", "groupMetadata", "┃ *_•𝚃𝙸𝙼𝙴•_* ", "find", "locale", "log", "196311jXGmuc", "quoted", "save", "*\n┏━━⟪⟪ 🅼♥︎❚❚♥︎🆉 ⟫━⦿\n┃ *_•𝙸𝙽 𝙶𝚁𝙾𝚄𝙿•_* ", "759700KYdstU", "warnedby", "pushName", "reason", "8dUtMfa", "2BlOCqD", "550MdvhLT", "-★-❖-♕- *𝚆𝙰𝚁𝙽* -♕-❖-★-\n*_•𝚄𝚂𝙴𝚁•_* @", "54828ViphBF", "subject", "1100323uEahgH", "30204512uUuJcj", "*_There are total ", "split", "┃ *_•𝚆𝙰𝚁𝙽𝙴𝙳-𝙱𝚈•_* ", "length", "sender", "setDefault", "group", "Asia/karachi", "../Setting", "215XZLRSE", "HH:mm:ss", "warn", "remove"];
      Z = function () {
        return F;
      };
      return Z();
    }
    (function (U, w) {
      const c = m;
      const s = U();
      while (true) {
        try {
          const q = parseInt(c(491)) / 1 * (parseInt(c(496)) / 2) + parseInt(c(487)) / 3 * (parseInt(c(495)) / 4) + -parseInt(c(512)) / 5 * (-parseInt(c(516)) / 6) + -parseInt(c(501)) / 7 * (-parseInt(c(477)) / 8) + -parseInt(c(499)) / 9 * (-parseInt(c(478)) / 10) + parseInt(c(497)) / 11 * (parseInt(c(480)) / 12) + -parseInt(c(502)) / 13;
          if (q === w) {
            break;
          } else {
            s.push(s.shift());
          }
        } catch (B) {
          s.push(s.shift());
        }
      }
    })(Z, 460756);
    function m(Y, U) {
      const w = Z();
      m = function (s, q) {
        s = s - 477;
        let B = w[s];
        return B;
      };
      return m(Y, U);
    }
    if (!citel.quoted) {
      return citel[S(481)]("*_Please Reply a User_*");
    }
    const timesam = moment(moment()).format(S(513));
    moment.tz[S(508)](S(510))[S(485)]("id");
    try {
      let metadata = await Void[S(482)](citel[S(519)]);
      await new warndb({
        id: citel.quoted[S(507)][S(504)]("@")[0] + S(514),
        reason: text,
        group: metadata[S(500)],
        warnedby: citel[S(493)],
        date: timesam
      })[S(489)]();
      let ment = citel[S(488)][S(507)];
      Void.sendMessage(citel.chat, {
        text: S(498) + citel[S(488)][S(507)][S(504)]("@")[0] + "\n*_•𝚁𝙴𝙰𝚂𝙾𝙽•_* " + text + "\n*_•𝚆𝙰𝚁𝙽𝙴𝙳-𝙱𝚈•_* " + citel[S(493)],
        mentions: [citel[S(488)][S(507)]]
      }, {
        quoted: citel
      });
      let h = await warndb[S(484)]({
        id: citel.quoted[S(507)][S(504)]("@")[0] + S(514)
      });
      const name = require(S(511));
      if (h[S(506)] > name.warncount) {
        teskd = S(518);
        let h = await warndb[S(484)]({
          id: citel[S(488)][S(507)][S(504)]("@")[0] + S(514)
        });
        teskd += S(503) + h[S(506)] + "  warnings._*\n";
        for (let i = 0; i < h[S(506)]; i++) {
          teskd += "*" + (i + 1) + S(490) + h[i][S(509)] + "\n";
          teskd += S(483) + h[i][S(517)] + "\n";
          teskd += S(505) + h[i][S(492)] + "\n";
          teskd += "┃ *_•𝚁𝙴𝙰𝚂𝙾𝙽•_* " + h[i][S(494)] + "\n┃ *_•𝙳𝙴𝚅𝙴𝙻𝙾𝙿𝙴𝙳-𝙱𝚈•_* *𝙼 𝚉𝚄𝙱𝙰𝙸𝚁*\n┗━━━━━━━━━━⦿\n\n";
        }
        citel[S(481)](teskd);
        await Void[S(479)](citel.chat, [citel.quoted[S(507)]], S(515));
      }
    } catch (Y) {
      console[S(486)](Y);
    }
  });
  
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "common",
    infocmd: "Get common participants in two groups, and kick using .common kick, jid",
    kingclass: "owner",
    kingpath: __filename
  }, async (Void, citel, text, {
    isCreator
  }) => {
    var _0x87a531 = _0xd64c;
    (function (_0x26f08a, _0x14609e) {
      var _0x98c35b = _0xd64c;
      var _0x1aec32 = _0x26f08a();
      while (true) {
        try {
          var _0x14857e = -parseInt(_0x98c35b(203)) / 1 + -parseInt(_0x98c35b(207)) / 2 + parseInt(_0x98c35b(231)) / 3 * (parseInt(_0x98c35b(219)) / 4) + -parseInt(_0x98c35b(228)) / 5 + -parseInt(_0x98c35b(208)) / 6 + parseInt(_0x98c35b(210)) / 7 + parseInt(_0x98c35b(218)) / 8 * (parseInt(_0x98c35b(223)) / 9);
          if (_0x14857e === _0x14609e) {
            break;
          } else {
            _0x1aec32.push(_0x1aec32.shift());
          }
        } catch (_0x311bff) {
          _0x1aec32.push(_0x1aec32.shift());
        }
      }
    })(_0x4a96, 981425);
    let jids = await parsedJid(text);
    var group1;
    var group2;
    if (jids[_0x87a531(238)] > 1) {
      group1 = jids[0][_0x87a531(202)](_0x87a531(213)) ? jids[0] : citel[_0x87a531(221)];
      group2 = jids[1][_0x87a531(202)](_0x87a531(213)) ? jids[1] : citel[_0x87a531(221)];
    } else if (jids[_0x87a531(238)] == 1) {
      group1 = citel[_0x87a531(221)];
      group2 = jids[0].includes("@g.us") ? jids[0] : citel[_0x87a531(221)];
    } else {
      return await citel.send(_0x87a531(220));
    }
    if (group2 === group1) {
      return await citel[_0x87a531(209)](_0x87a531(226));
    }
    var g1 = await Void.groupMetadata(group1);
    var g2 = await Void.groupMetadata(group2);
    var common = g1[_0x87a531(232)].filter(({
      id: _0x215617
    }) => g2.participants[_0x87a531(211)](({
      id: _0xa9d3a3
    }) => _0xa9d3a3 === _0x215617)) || [];
    if (common[_0x87a531(238)] == 0) {
      return await citel[_0x87a531(209)]("Theres no Common Users in Both Groups");
    }
    let kick = text[_0x87a531(233)](",")[0][_0x87a531(206)]() === _0x87a531(227) ? true : false;
    let reason = false;
    var heading = _0x87a531(236);
    if (kick) {
      let chat = {
        chat: group1
      };
      heading = "  *Kicking Common Participants*";
      const groupAdmins = (await getAdmin(Void, chat)) || [];
      var botNumber = await Void.decodeJid(Void.user.id);
      var isBotAdmins = groupAdmins[_0x87a531(202)](botNumber) || false;
      var isAdmins = groupAdmins[_0x87a531(202)](citel[_0x87a531(224)]) || false;
      if (!isBotAdmins || !isAdmins) {
        kick = false;
        heading = _0x87a531(230);
      }
      if (!isBotAdmins) {
        reason = "*❒ Reason:* _I Can't Kick Common Participants Without Getting Admin Role,So Provide Admin Role First,_\n";
      }
      if (!isAdmins) {
        reason = "*❒ Reason:* _Only Group Admin Can Kick Common Users Through This Command_\n";
      }
    }
    function _0xd64c(_0x32c6f8, _0x2d697c) {
      var _0x4a96f3 = _0x4a96();
      _0xd64c = function (_0xd64cbf, _0x5aabfa) {
        _0xd64cbf = _0xd64cbf - 201;
        var _0x256505 = _0x4a96f3[_0xd64cbf];
        return _0x256505;
      };
      return _0xd64c(_0x32c6f8, _0x2d697c);
    }
    function _0x4a96() {
      var _0x375d41 = ["sender", "push", "Please Provide Valid Group Jid", "kick", "7605210eeYGmA", "923184474176@s.whatsapp.net", "  *乂 Can't Kick Common Participants*", "138543ZVCNcn", "participants", "split", "@s.whatsapp.net", "\n*❒ Group2:* ", "   *List Of Common Participants*", "user", "length", "caption", "includes", "946278jKrKhT", "_Members_\n\n\n", "\n*❒ Group1:* ", "trim", "1283014cwDqub", "6253704DutAwi", "send", "12524057XHlruT", "some", "\n\n\n©", "@g.us", "923004591719@s.whatsapp.net", "  *⬡* @", "   \n", "groupParticipantsUpdate", "3132728ehxlpC", "120EgDLWk", `*_Please\x20Provide\x20a\x20Group\x20Jid,_*\x0a*To\x20Get\x20common\x20participants\x20in\x20two\x20groups,*\x0a*Also\x20kick\x20using\x20${prefix}common\x20kick,\x20jid*`, "chat", "Error removing participants:", "45UpvHCU"];
      _0x4a96 = function () {
        return _0x375d41;
      };
      return _0x4a96();
    }
    var msg = " " + heading + _0x87a531(216) + (reason ? reason : "") + _0x87a531(205) + g1.subject + _0x87a531(235) + g2.subject + "\n*❒ Common Counts:* _" + common[_0x87a531(238)] + _0x87a531(204);
    var commons = [];
    common.map(async _0x5484ff => {
      var _0x4ac9dd = _0x87a531;
      msg += _0x4ac9dd(215) + _0x5484ff.id[_0x4ac9dd(233)]("@")[0] + "\n";
      commons[_0x4ac9dd(225)](_0x5484ff.id.split("@")[0] + _0x4ac9dd(234));
    });
    await citel[_0x87a531(209)](msg + (_0x87a531(212) + name[_0x87a531(201)]), {
      mentions: commons
    });
    if (kick && !reason) {
      try {
        var botNumber = await Void.decodeJid(Void[_0x87a531(237)].id);
        for (const user of commons) {
          if (botNumber === user || user === _0x87a531(214) || user === _0x87a531(229)) {
            continue;
          }
          await new Promise(_0x5d963f => setTimeout(_0x5d963f, 1000));
          await Void[_0x87a531(217)](group1, [user], "remove");
        }
      } catch (_0x5636c1) {
        console.error(_0x87a531(222), _0x5636c1);
      }
    }
    return;
  });
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "diff",
    infocmd: "Get difference of participants in two groups",
    kingclass: "owner",
    kingpath: __filename
  }, async (Void, citel, text, {
    isCreator
  }) => {
    function _0x32d6(_0x1c5452, _0xd9c18b) {
      var _0x2c296b = _0x2c29();
      _0x32d6 = function (_0x32d6d6, _0x371807) {
        _0x32d6d6 = _0x32d6d6 - 430;
        var _0x3418f7 = _0x2c296b[_0x32d6d6];
        return _0x3418f7;
      };
      return _0x32d6(_0x1c5452, _0xd9c18b);
    }
    function _0x2c29() {
      var _0x45aad0 = ["  *⬡* @", "send", "includes", "filter", "\n*❒ Differ Counts:* _", "length", "participants", "3634530paWHrR", "subject", "48PrVAuc", "130RPKGzs", "chat", "\n\n\n©", "8110230jpjYbb", "groupMetadata", "  *乂 List Of Different Participants* \n\n*❒ Group1:* ", "7080cVcMZN", "4qYOlNg", "split", "1733097idxGVh", "@s.whatsapp.net", "push", "@g.us", "\n*❒ Group2:* ", "321146RceypW", "map", "*_Please Provide a Group Jid_*\n*_To Get Different participants with in group_*", "190807KCVkbV", "388449gIdOpg", "_Members_\n\n\n"];
      _0x2c29 = function () {
        return _0x45aad0;
      };
      return _0x2c29();
    }
    var _0x1d7f58 = _0x32d6;
    (function (_0x17cc23, _0x4b891e) {
      var _0x39378e = _0x32d6;
      var _0x3fed02 = _0x17cc23();
      while (true) {
        try {
          var _0x3a2e9b = parseInt(_0x39378e(453)) / 1 + -parseInt(_0x39378e(442)) / 2 + parseInt(_0x39378e(445)) / 3 * (-parseInt(_0x39378e(443)) / 4) + parseInt(_0x39378e(439)) / 5 + -parseInt(_0x39378e(433)) / 6 + parseInt(_0x39378e(450)) / 7 * (-parseInt(_0x39378e(435)) / 8) + -parseInt(_0x39378e(454)) / 9 * (-parseInt(_0x39378e(436)) / 10);
          if (_0x3a2e9b === _0x4b891e) {
            break;
          } else {
            _0x3fed02.push(_0x3fed02.shift());
          }
        } catch (_0x4a2b92) {
          _0x3fed02.push(_0x3fed02.shift());
        }
      }
    })(_0x2c29, 911684);
    let jids = await parsedJid(text);
    var group1;
    var group2;
    if (jids[_0x1d7f58(431)] > 1) {
      group1 = jids[0][_0x1d7f58(458)]("@g.us") ? jids[0] : citel[_0x1d7f58(437)];
      group2 = jids[1][_0x1d7f58(458)]("@g.us") ? jids[1] : citel[_0x1d7f58(437)];
    } else if (jids[_0x1d7f58(431)] == 1) {
      group1 = citel[_0x1d7f58(437)];
      group2 = jids[0][_0x1d7f58(458)](_0x1d7f58(448)) ? jids[0] : citel.chat;
    } else {
      return await citel.send(_0x1d7f58(452));
    }
    if (group2 === group1) {
      return await citel[_0x1d7f58(457)]("Please Provide Valid Group Jid");
    }
    var g1 = await Void[_0x1d7f58(440)](group1);
    var g2 = await Void[_0x1d7f58(440)](group2);
    var diff = g1[_0x1d7f58(432)][_0x1d7f58(459)](({
      id: _0x240eaa
    }) => !g2.participants.some(({
      id: _0x5fe1e0
    }) => _0x5fe1e0 === _0x240eaa)) || [];
    if (diff[_0x1d7f58(431)] == 0) {
      return await citel[_0x1d7f58(457)]("Theres no Different Users in Both Groups");
    }
    var msg = _0x1d7f58(441) + g1[_0x1d7f58(434)] + _0x1d7f58(449) + g2[_0x1d7f58(434)] + _0x1d7f58(430) + diff[_0x1d7f58(431)] + _0x1d7f58(455);
    var diffs = [];
    diff[_0x1d7f58(451)](async _0x299f43 => {
      var _0x5dc1b3 = _0x1d7f58;
      msg += _0x5dc1b3(456) + _0x299f43.id[_0x5dc1b3(444)]("@")[0] + "\n";
      diffs[_0x5dc1b3(447)](_0x299f43.id[_0x5dc1b3(444)]("@")[0] + _0x5dc1b3(446));
    });
    return await citel[_0x1d7f58(457)](msg + (_0x1d7f58(438) + name.caption), {
      mentions: diffs
    });
  });
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "block",
    infocmd: "blocks that person",
    kingclass: "owner",
    kingpath: __filename,
    use: "quote/reply user."
  }, async (bot, man, text, {
    isCreator
  }) => {
    if (!isCreator) {
      man.reply(tlang().owner);
    }
    let users = man.quoted ? man.quoted.sender : man.mentionedJid[0] ? man.mentionedJid[0] : "";
    if (!users) {
      return await send.reply("*_Reply/Mention a User_*");
    }
    let num = users.replace("@s.whatsapp.net", "");
    await bot.updateBlockStatus(users, "block").then(res => man.reply(`*@${num} _blocked Successfully.._!*`, {
      mentions: [users]
    })) //console.log(jsonformat(res))
    .catch(err => console.log(jsonformat(err)));
  });
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "unblock",
    infocmd: "Unblocked to the quoted user.",
    kingclass: "owner",
    kingpath: __filename
  }, async (Void, citel, text, {
    isCreator
  }) => {
    if (!isCreator) {
      citel.reply(tlang().owner);
    }
    let users = citel.quoted ? citel.quoted.sender : citel.mentionedJid[0] ? citel.mentionedJid[0] : false;
    if (!users) {
      return await citel.reply("*_Rreply/mention an User_*");
    }
    let num = users.replace("@s.whatsapp.net", "");
    await Void.updateBlockStatus(users, "unblock").then(res => citel.send(`*@${num} _Unblocked Succesfully..!_*`, {
      mentions: [users]
    })).catch(err => console.log(jsonformat(err)));
  });
  Module_Exports({
    kingcmd: "newgc",
    infocmd: "Create New Group",
    kingclass: "whatsapp",
    kingpath: __filename,
    use: "<group name> <user mentions>"
  }, async (message, args) => {
      if (!message.isCreator) {
        return message.send(tlang().owner);
      }
      if (!args) {
        return await message.send(`*_Provide a name to create a new Group!!!_*\n*_Ex: ${prefix + 'newgc'} My New Group @user1,2,3.._*`);
      }
  
      let groupName = args;
      if (groupName.toLowerCase() === "info") {
        return await message.send(`\n  *It's a command to create a new group*\n  \t\`\`\`Ex: ${prefix + 'newgc'} My New Group\`\`\`\n  \n*You can also add people in new group*\n  \t\`\`\`Just reply or mention users\`\`\`\n`.trim());
      }
  
      let participants = [message.sender];
      if (message.quoted) {
        participants.push(message.quoted.sender);
      }
      if (message.mentionedJid && message.mentionedJid[0]) {
        participants.push(...message.mentionedJid);
        try {
          message.mentionedJid.forEach(mention => {
            let mentionName = mention.split("@")[0].trim();
            groupName = groupName.replace(new RegExp("@" + mentionName, "g"), "");
          });
        } catch { }
      }
  
      const trimmedGroupName = groupName.substring(0, 60);
      const newGroup = await message.bot.groupCreate(trimmedGroupName, participants);
      if (newGroup) {
        let welcomeMessage = await message.bot.sendMessage(newGroup.id, {
          text: "*_Hey Buddy, Welcome to the new Group_*\n" + Config.caption
        });
        try {
          var inviteCode = await message.bot.groupInviteCode(newGroup.id);
        } catch {
          var inviteCode = false;
        }
        var inviteLink = "https://chat.whatsapp.com/" + inviteCode;
        var contextInfo = {
          externalAdReply: {
            title: "𝗔𝗦𝗧𝗔-𝗠𝗗",
            body: trimmedGroupName,
            renderLargerThumbnail: true,
            thumbnail: log0,
            mediaType: 1,
            mediaUrl: inviteLink,
            sourceUrl: inviteLink
          }
        };
        return await send(message, `*_Hurray, New group created!!!_*\n${inviteCode ? "*_" + inviteLink + "_*" : ""}`.trim(), {
          contextInfo
        }, "", welcomeMessage);
      } else {
        await message.send("*_Can't create new group, Sorry!!_*");
      }
  });
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "invite",
    shortcut: ["glink"],
    infocmd: "get group link.",
    kingclass: "group",
    kingpath: __filename
  }, async (Void, citel, text, {
    isCreator
  }) => {
    if (!citel.isGroup) {
      return citel.reply(tlang().group);
    }
    const groupAdmins = await getAdmin(Void, citel);
    const botNumber = await Void.decodeJid(Void.user.id);
    const isBotAdmins = groupAdmins.includes(botNumber);
    if (!isBotAdmins) {
      return citel.reply(tlang().admin);
    }
    var str1 = await Void.groupInviteCode(citel.chat);
    var str2 = "https://chat.whatsapp.com/";
    var mergedString = `${str2}${str1}`;
    return citel.reply("*_Group Invite Link Is Here_* \n*_" + mergedString + "_*");
  });
  
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "revoke",
    infocmd: "reset group link.",
    kingclass: "group",
    kingpath: __filename
  }, async (Void, citel, text, {
    isCreator
  }) => {
    if (!citel.isGroup) {
      return citel.reply(tlang().group);
    }
    const groupAdmins = await getAdmin(Void, citel);
    const botNumber = await Void.decodeJid(Void.user.id);
    const isBotAdmins = groupAdmins.includes(botNumber);
    if (!isBotAdmins) {
      return citel.reply(tlang().admin);
    }
    var code = await Void.groupRevokeInvite(citel.chat);
    return citel.reply("*_Group Link Revoked SuccesFully_*");
  });
  //---------------------------------------------------------------------------
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "onlyadmin",
    shortcut: ["antimessge", "oadmin"],
    infocmd: "Only Admins Allow to Send Message, Others kick.",
    kingclass: "group",
    kingpath: __filename
  }, async (Void, citel, text, {
    cmdName,
    isCreator
  }) => {
    const _0x4b01ef = _0x5a6c;
    (function (_0x42afd8, _0x18cab2) {
      const _0x4e6b35 = _0x5a6c;
      const _0x2aa161 = _0x42afd8();
      while (true) {
        try {
          const _0x19acf1 = parseInt(_0x4e6b35(214)) / 1 * (-parseInt(_0x4e6b35(212)) / 2) + parseInt(_0x4e6b35(246)) / 3 * (-parseInt(_0x4e6b35(247)) / 4) + parseInt(_0x4e6b35(219)) / 5 + -parseInt(_0x4e6b35(228)) / 6 * (parseInt(_0x4e6b35(215)) / 7) + parseInt(_0x4e6b35(242)) / 8 * (-parseInt(_0x4e6b35(226)) / 9) + parseInt(_0x4e6b35(236)) / 10 + parseInt(_0x4e6b35(231)) / 11;
          if (_0x19acf1 === _0x18cab2) {
            break;
          } else {
            _0x2aa161.push(_0x2aa161.shift());
          }
        } catch (_0x44723d) {
          _0x2aa161.push(_0x2aa161.shift());
        }
      }
    })(_0x4da6, 888981);
    if (!citel[_0x4b01ef(221)]) {
      return citel[_0x4b01ef(210)](tlang()[_0x4b01ef(208)]);
    }
    const groupAdmins = await getAdmin(Void, citel);
    const botNumber = await Void[_0x4b01ef(245)](Void.user.id);
    const isAdmins = citel.isGroup ? groupAdmins[_0x4b01ef(227)](citel.sender) : false;
    const isBotAdmins = citel[_0x4b01ef(221)] ? groupAdmins[_0x4b01ef(227)](botNumber) : false;
    function _0x5a6c(_0x3f3e7c, _0x356792) {
      const _0x4da637 = _0x4da6();
      _0x5a6c = function (_0x5a6c42, _0xf5f5e0) {
        _0x5a6c42 = _0x5a6c42 - 207;
        let _0x21b611 = _0x4da637[_0x5a6c42];
        return _0x21b611;
      };
      return _0x5a6c(_0x3f3e7c, _0x356792);
    }
    if (!isAdmins && !isCreator) {
      return citel.reply(tlang()[_0x4b01ef(243)]);
    }
    function _0x4da6() {
      const _0x9c8c1f = ["enable", "*_Please, Provide Admin Role First_*", "3469104gRwIaq", "admin", " Succesfully set to kick message senders!_*\n*_Now Only Admins Allow to Send Message in Group_*", "decodeJid", "3LabDje", "3529436fszUMZ", "Disabled", "act", "group", "deact", "reply", "*_Onlyadmin Already Disabled in Current Chat_*", "206cFcBdy", "onlyadmin", "13014HUmNeg", "425446MzPaLC", "send", "toLowerCase", "off", "6182310CJrGPU", " in this Group!_*\n *_Use: ", "isGroup", "announcement", " Succesfully Disable in group!_*\n*_Now everyone Send Message in Group_*", "findOne", "split", "27jvVnaa", "includes", "54OSXEKx", "false", "updateOne", "31428661iArpHf", "startsWith", " on/off_*", "groupSettingUpdate", "true", "8660850UseQjN", "save", "chat", "*_Onlyadmin Already Enabled in Current Chat_*"];
      _0x4da6 = function () {
        return _0x9c8c1f;
      };
      return _0x4da6();
    }
    let checkinfo = (await sck[_0x4b01ef(224)]({
      id: citel[_0x4b01ef(238)]
    })) || (await new sck({
      id: citel[_0x4b01ef(238)]
    })[_0x4b01ef(237)]());
    let textt = text ? text[_0x4b01ef(217)]().trim() : false;
    let action = textt ? textt[_0x4b01ef(225)](" ")[0] : false;
    if (!action) {
      return await citel[_0x4b01ef(216)]("*_" + cmdName + " " + (checkinfo[_0x4b01ef(213)] === "false" ? _0x4b01ef(248) : "Enabled") + _0x4b01ef(220) + (prefix + cmdName) + _0x4b01ef(233));
    } else if (action[_0x4b01ef(232)](_0x4b01ef(218)) || action[_0x4b01ef(232)](_0x4b01ef(209)) || action[_0x4b01ef(232)]("disable")) {
      if (checkinfo.onlyadmin === _0x4b01ef(229)) {
        return await citel[_0x4b01ef(210)](_0x4b01ef(211));
      }
      await sck.updateOne({
        id: citel[_0x4b01ef(238)]
      }, {
        onlyadmin: _0x4b01ef(229)
      });
      return await citel[_0x4b01ef(216)]("*" + cmdName + _0x4b01ef(223));
    } else if (action[_0x4b01ef(232)]("on") || action[_0x4b01ef(232)](_0x4b01ef(207)) || action[_0x4b01ef(232)](_0x4b01ef(240))) {
      if (checkinfo[_0x4b01ef(213)] === _0x4b01ef(235)) {
        return await citel[_0x4b01ef(210)](_0x4b01ef(239));
      }
      if (isBotAdmins) {
        await sck[_0x4b01ef(230)]({
          id: citel[_0x4b01ef(238)]
        }, {
          onlyadmin: _0x4b01ef(235)
        });
        await Void[_0x4b01ef(234)](citel.chat, _0x4b01ef(222));
        return await citel[_0x4b01ef(216)]("*" + cmdName + _0x4b01ef(244));
      } else {
        return await citel[_0x4b01ef(210)](_0x4b01ef(241));
      }
    } else {
      return await citel[_0x4b01ef(210)]("*_Please Provide Valid Instruction_*\n*Ex: _" + (prefix + cmdName) + " on/off_*");
    }
  });
  
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "devwarn",
    shortcut: ["dwarn"],
    infocmd: "sends warning from developer",
    kingclass: "developer",
    use: "reply to any person"
  }, async (sigma, person, memo, {
    isCreator
  }) => {
    if (!isCreator) {
      return person.reply(tlang().owner);
    }
    if (!person.isGroup) {
      return person.reply(tlang().group);
    }
    if (!person.quoted) {
      return person.reply(`Please reply to a Person`);
    }
    var bio = await sigma.fetchStatus(person.quoted.sender);
    var bioo = bio.status;
    var setAt = bio.setAt.toString();
    var words = setAt.split(" ");
    if (words.length > 3) {
      setAt = words.slice(0, 5).join(" ");
    }
    var num = person.quoted.sender.split("@")[0];
    let pfp;
    try {
      pfp = await sigma.profilePictureUrl(person.quoted.sender, "image");
    } catch (e) {
      pfp = (await sigma.profilePictureUrl(person.sender, "image")) || "https://telegra.ph/file/29a8c892a1d18fdb26028.jpg";
    } //|| 'https://telegra.ph/file/29a8c892a1d18fdb26028.jpg' ;  }
  
    let username = await sck1.findOne({
      id: person.quoted.sender
    });
    var tname = username.name;
    let Maher = `     
  ┏━━⟪⟪ 🅼♥︎❚❚♥︎🆉 ⟫━⦿  
  ┃✗ *•ᴅᴇᴠᴇʟᴏᴘᴇʀ's ᴡᴀʀɴɪɴɢ•*
  ┃✗ *•ɴᴀᴍᴇ•* ${tname}
  ┃✗ *•ɴᴜᴍ•* ${num}
  ┃✗   *•ᴋᴇᴇᴘ ᴄᴀʟᴍ ᴅᴜᴅᴇ•*
  ┃✗ *•ᴅᴏɴ'ᴛ ᴀʙᴜsᴇ•*
  ┃✗ *•ᴅᴏɴ'ᴛ sᴘᴀᴍ•*
  ┃✗ *•ᴅᴏɴ'ᴛ ᴜsᴇ ʙᴏᴛ•*
  ┃✗ *•ᴅᴏɴ'ᴛ sᴇɴᴅ ʟɪɴᴋs•*
  ┃✗ *•ᴏᴛʜᴇʀ ᴡɪsᴇ•*
  ┃✗ *•ʏᴏᴜ ᴡɪʟʟ•*
  ┃✗ *•ʙᴇ ᴋɪᴄᴋᴇᴅ•*
  ┃✗ *•ᴀᴜᴛʜᴏʀ•* ᴍᴀʜᴇʀ ᴢᴜʙᴀɪʀ
  ┗━━━━━━━━━━⦿      `;
    let king = {
      image: {
        url: pfp
      },
      caption: Maher,
      footer: tlang().footer,
      headerType: 4,
      contextInfo: {
        externalAdReply: {
          title: `${name.ownername}`,
          body: ``,
          thumbnail: log0,
          mediaType: 4,
          mediaUrl: "",
          sourceUrl: `${waUrl}`
        }
      }
    };
    return await sigma.sendMessage(person.chat, king, {
      quoted: person
    });
  });
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "antibot",
    infocmd: "kick Bot Users from Group!",
    kingclass: "group",
    kingpath: __filename
  }, async (Void, citel, text, {
    cmdName,
    isCreator
  }) => {
    function _0x2d85(_0xaa10, _0x1528ed) {
      const _0x376bc6 = _0x376b();
      _0x2d85 = function (_0x2d8530, _0x1aafaf) {
        _0x2d8530 = _0x2d8530 - 136;
        let _0x6283a1 = _0x376bc6[_0x2d8530];
        return _0x6283a1;
      };
      return _0x2d85(_0xaa10, _0x1528ed);
    }
    const _0x2c4fcf = _0x2d85;
    (function (_0x847c4d, _0x58ffb9) {
      const _0xa39a68 = _0x2d85;
      const _0x181098 = _0x847c4d();
      while (true) {
        try {
          const _0x4acbad = parseInt(_0xa39a68(175)) / 1 * (-parseInt(_0xa39a68(164)) / 2) + -parseInt(_0xa39a68(150)) / 3 + -parseInt(_0xa39a68(158)) / 4 * (-parseInt(_0xa39a68(149)) / 5) + parseInt(_0xa39a68(151)) / 6 + -parseInt(_0xa39a68(157)) / 7 + -parseInt(_0xa39a68(160)) / 8 + parseInt(_0xa39a68(156)) / 9;
          if (_0x4acbad === _0x58ffb9) {
            break;
          } else {
            _0x181098.push(_0x181098.shift());
          }
        } catch (_0x3ca238) {
          _0x181098.push(_0x181098.shift());
        }
      }
    })(_0x376b, 101996);
    if (!citel[_0x2c4fcf(166)]) {
      return citel[_0x2c4fcf(172)](tlang()[_0x2c4fcf(141)]);
    }
    const groupAdmins = await getAdmin(Void, citel);
    const botNumber = await Void[_0x2c4fcf(143)](Void[_0x2c4fcf(165)].id);
    const isAdmins = citel[_0x2c4fcf(166)] ? groupAdmins.includes(citel[_0x2c4fcf(173)]) : false;
    const isBotAdmins = citel[_0x2c4fcf(166)] ? groupAdmins[_0x2c4fcf(154)](botNumber) : false;
    if (!isAdmins && !isCreator) {
      return citel[_0x2c4fcf(172)](tlang()[_0x2c4fcf(146)]);
    }
    let checkinfo = (await sck[_0x2c4fcf(162)]({
      id: citel[_0x2c4fcf(155)]
    })) || (await new sck({
      id: citel[_0x2c4fcf(155)]
    })[_0x2c4fcf(177)]());
    let textt = text ? text.toLowerCase()[_0x2c4fcf(136)]() : false;
    let action = textt ? textt[_0x2c4fcf(167)](" ")[0] : false;
    function _0x376b() {
      const _0x26ca64 = ["act", "updateOne", "deact", "reply", "sender", " in this Group!_*\n *Use: _", "31743uMncUs", "disable", "save", "trim", "*_Antibot Succesfully Disable in group!_*", "*_Provide Admin Role First_*", "false", "Enabled", "group", "*_Antibot Succesfully set to kick Bot Users!_*", "decodeJid", "send", "*_Antibot Already Enabled Here_*", "admin", "*_Antibot Already Disabled Here_*", "startsWith", "267310Oakvjx", "610857GRgPyR", "649932PmmMyY", "Disabled", "off", "includes", "chat", "5877639YkNrHt", "1231230pAMugo", "4OsaJqn", "antibot", "1143136tzUKkL", "*_Antibot Currently ", "findOne", "enable", "12iaZUIV", "user", "isGroup", "split", " on/off_*"];
      _0x376b = function () {
        return _0x26ca64;
      };
      return _0x376b();
    }
    if (!action) {
      return await citel.send(_0x2c4fcf(161) + (checkinfo[_0x2c4fcf(159)] === _0x2c4fcf(139) ? _0x2c4fcf(152) : _0x2c4fcf(140)) + _0x2c4fcf(174) + (prefix + cmdName) + _0x2c4fcf(168));
    } else if (action[_0x2c4fcf(148)](_0x2c4fcf(153)) || action[_0x2c4fcf(148)](_0x2c4fcf(171)) || action[_0x2c4fcf(148)](_0x2c4fcf(176))) {
      if (checkinfo.antibot === _0x2c4fcf(139)) {
        return await citel[_0x2c4fcf(172)](_0x2c4fcf(147));
      }
      await sck[_0x2c4fcf(170)]({
        id: citel[_0x2c4fcf(155)]
      }, {
        antibot: _0x2c4fcf(139)
      });
      return await citel[_0x2c4fcf(144)](_0x2c4fcf(137));
    } else if (action[_0x2c4fcf(148)]("on") || action[_0x2c4fcf(148)](_0x2c4fcf(169)) || action[_0x2c4fcf(148)](_0x2c4fcf(163))) {
      if (checkinfo[_0x2c4fcf(159)] === "true") {
        return await citel[_0x2c4fcf(172)](_0x2c4fcf(145));
      }
      if (isBotAdmins) {
        await sck.updateOne({
          id: citel.chat
        }, {
          antibot: "true"
        });
        return await citel[_0x2c4fcf(144)](_0x2c4fcf(142));
      } else {
        return await citel[_0x2c4fcf(172)](_0x2c4fcf(138));
      }
    } else {
      return await citel[_0x2c4fcf(172)]("*_Please Provide Valid Instruction_*\n*Ex: _" + (prefix + cmdName) + _0x2c4fcf(168));
    }
  });
  //---------------------------------------------------------------------------
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "disable",
    infocmd: "disable cmds in Group.!",
    kingclass: "group",
    kingpath: __filename
  }, async (Void, citel, text, {
    isCreator
  }) => {
    const _0x1d9361 = _0x127b;
    (function (_0x123c59, _0x38488e) {
      const _0x4f5927 = _0x127b;
      const _0x2dc94b = _0x123c59();
      while (true) {
        try {
          const _0x1b484b = -parseInt(_0x4f5927(475)) / 1 * (-parseInt(_0x4f5927(448)) / 2) + -parseInt(_0x4f5927(451)) / 3 + parseInt(_0x4f5927(444)) / 4 * (parseInt(_0x4f5927(453)) / 5) + parseInt(_0x4f5927(458)) / 6 + parseInt(_0x4f5927(481)) / 7 + -parseInt(_0x4f5927(470)) / 8 * (parseInt(_0x4f5927(468)) / 9) + -parseInt(_0x4f5927(487)) / 10 * (parseInt(_0x4f5927(480)) / 11);
          if (_0x1b484b === _0x38488e) {
            break;
          } else {
            _0x2dc94b.push(_0x2dc94b.shift());
          }
        } catch (_0x255304) {
          _0x2dc94b.push(_0x2dc94b.shift());
        }
      }
    })(_0xc473, 209034);
    if (!citel[_0x1d9361(443)]) {
      return citel[_0x1d9361(462)](tlang()[_0x1d9361(469)]);
    }
    const groupAdmins = await getAdmin(Void, citel);
    const botNumber = await Void[_0x1d9361(477)](Void[_0x1d9361(459)].id);
    const isAdmins = citel[_0x1d9361(443)] ? groupAdmins.includes(citel.sender) : false;
    const isBotAdmins = citel[_0x1d9361(443)] ? groupAdmins[_0x1d9361(463)](botNumber) : false;
    function _0xc473() {
      const _0x5035f2 = ["cmds", "2484216cqyAHk", "user", "' is not a bot cmd, Provide valid cmd_*", "*_Uhh Dear, I can't disable that cmd_*", "send", "includes", "split", "*_Theres no cmd disabled in current group_*", "disablecmds", "test", "9jTOFxv", "group", "1000024agaHtD", "find", "kingcmd", "false,", "\n*_Disable cmds :_* ```", "1IvBDbJ", "enable", "decodeJid", "false", "toLowerCase", "11418UpETmg", "1264900QSGmLC", "commands", "updateOne", "list", "```", "findOne", "6860EBnErX", "*_Disable cmds :_* ```", "shortcut", "*Provide cmd name to disable in group*\n*Ex ", "replace", "isGroup", "92rfIqmr", "chat", "*_Provided cmd already in disable cmds_*", "info", "227118msrhpy", "startsWith", "trim", "77598ksrfVq", "\" Succesfully added in Disable cmds_*", "79060BsAVtu", "reply", "disable", "admin"];
      _0xc473 = function () {
        return _0x5035f2;
      };
      return _0xc473();
    }
    if (!isAdmins && !isCreator) {
      return citel[_0x1d9361(454)](tlang()[_0x1d9361(456)]);
    }
    function _0x127b(_0x124a51, _0x480f65) {
      const _0xc47391 = _0xc473();
      _0x127b = function (_0x127b61, _0x4f91c7) {
        _0x127b61 = _0x127b61 - 440;
        let _0x3e747f = _0xc47391[_0x127b61];
        return _0x3e747f;
      };
      return _0x127b(_0x124a51, _0x480f65);
    }
    let checkinfo = (await sck[_0x1d9361(486)]({
      id: citel[_0x1d9361(445)]
    })) || (await new sck({
      id: citel[_0x1d9361(445)]
    }).save());
    let textt = text ? text[_0x1d9361(479)]()[_0x1d9361(450)]() : false;
    let cmdName = textt ? textt[_0x1d9361(464)](" ")[0] : "";
    if (!cmdName) {
      return await citel[_0x1d9361(462)](_0x1d9361(441) + prefix + "disable tag(to disabled 'tag' cmd)/info*");
    } else if (cmdName[_0x1d9361(449)](_0x1d9361(447)) || cmdName.startsWith(_0x1d9361(484)) || cmdName[_0x1d9361(449)](_0x1d9361(457))) {
      return await citel.send(checkinfo[_0x1d9361(466)] === _0x1d9361(478) ? _0x1d9361(465) : _0x1d9361(488) + checkinfo[_0x1d9361(466)][_0x1d9361(442)]("false,", "") + "```");
    } else if (cmdName[_0x1d9361(449)](_0x1d9361(476)) || cmdName[_0x1d9361(449)](_0x1d9361(455))) {
      return await citel[_0x1d9361(454)](_0x1d9361(461));
    } else if (cmdName) {
      const cmds = sɪɢᴍᴀ_ᴍᴅ.commands[_0x1d9361(471)](_0x3d1011 => _0x3d1011[_0x1d9361(472)] === cmdName) || sɪɢᴍᴀ - ᴍᴅ[_0x1d9361(482)][_0x1d9361(471)](_0x2cf945 => _0x2cf945[_0x1d9361(440)] && _0x2cf945.shortcut[_0x1d9361(463)](cmdName));
      if (cmds) {
        let newCmd = cmds[_0x1d9361(472)][_0x1d9361(442)](/[.*+?^${}()|[\]\\]/g, "\\$&");
        let regex = new RegExp("\\b" + newCmd + "\\b");
        if (regex[_0x1d9361(467)](checkinfo[_0x1d9361(466)])) {
          return await citel[_0x1d9361(462)](_0x1d9361(446));
        }
        var newDisable_Cmd = checkinfo[_0x1d9361(466)] + "," + cmds[_0x1d9361(472)];
        await sck[_0x1d9361(483)]({
          id: citel[_0x1d9361(445)]
        }, {
          disablecmds: newDisable_Cmd
        });
        let lists = newDisable_Cmd.replace(_0x1d9361(473), "");
        return await citel[_0x1d9361(462)]("*_\"" + cmdName + _0x1d9361(452) + (lists === "" ? "" : _0x1d9361(474) + lists + _0x1d9361(485)));
      } else {
        return await citel.reply("*_'" + cmdName + _0x1d9361(460));
      }
    }
  });
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "enable",
    infocmd: "enable a Command in Group.!",
    kingclass: "group",
    kingpath: __filename
  }, async (Void, citel, text, {
    isCreator
  }) => {
    const _0x19acb0 = _0x2b87;
    (function (_0x1e83d3, _0x35eaa4) {
      const _0x18315e = _0x2b87;
      const _0x2f59dd = _0x1e83d3();
      while (true) {
        try {
          const _0x16b8b5 = -parseInt(_0x18315e(252)) / 1 + parseInt(_0x18315e(257)) / 2 * (parseInt(_0x18315e(259)) / 3) + -parseInt(_0x18315e(261)) / 4 * (-parseInt(_0x18315e(258)) / 5) + parseInt(_0x18315e(248)) / 6 + -parseInt(_0x18315e(264)) / 7 * (parseInt(_0x18315e(266)) / 8) + parseInt(_0x18315e(256)) / 9 * (-parseInt(_0x18315e(277)) / 10) + parseInt(_0x18315e(269)) / 11;
          if (_0x16b8b5 === _0x35eaa4) {
            break;
          } else {
            _0x2f59dd.push(_0x2f59dd.shift());
          }
        } catch (_0x2a57d0) {
          _0x2f59dd.push(_0x2f59dd.shift());
        }
      }
    })(_0x59df, 795277);
    if (!citel.isGroup) {
      return citel[_0x19acb0(260)](tlang()[_0x19acb0(255)]);
    }
    const groupAdmins = await getAdmin(Void, citel);
    const botNumber = await Void[_0x19acb0(246)](Void[_0x19acb0(270)].id);
    const isAdmins = citel[_0x19acb0(254)] ? groupAdmins.includes(citel[_0x19acb0(272)]) : false;
    const isBotAdmins = citel[_0x19acb0(254)] ? groupAdmins[_0x19acb0(245)](botNumber) : false;
    function _0x59df() {
      const _0x2fc64a = ["165YTTviz", "1506531DdbIjN", "send", "137844wiflDz", "startsWith", "test", "14TQRbZa", "updateOne", "5147512SXhXBs", "false", "all", "19530247uQLOXJ", "user", "admin", "sender", "save", "replace", "chat", "_There's no cmd Disabled with *", "710Zslghn", "toLowerCase", "includes", "decodeJid", "trim", "7264044TkjRho", "reply", "findOne", "*_All disable cmds Succesfully Enabled_*", "1360455GGWakc", "\" Succesfully removed from Disable cmds_*", "isGroup", "group", "149949qpNFMz", "2emBDDA"];
      _0x59df = function () {
        return _0x2fc64a;
      };
      return _0x59df();
    }
    if (!isAdmins && !isCreator) {
      return citel[_0x19acb0(249)](tlang()[_0x19acb0(271)]);
    }
    function _0x2b87(_0x559939, _0x1e01c1) {
      const _0x59dff7 = _0x59df();
      _0x2b87 = function (_0x2b8751, _0x158178) {
        _0x2b8751 = _0x2b8751 - 245;
        let _0x8a8f58 = _0x59dff7[_0x2b8751];
        return _0x8a8f58;
      };
      return _0x2b87(_0x559939, _0x1e01c1);
    }
    let checkinfo = (await sck[_0x19acb0(250)]({
      id: citel[_0x19acb0(275)]
    })) || (await new sck({
      id: citel.chat
    })[_0x19acb0(273)]());
    let textt = text ? text[_0x19acb0(278)]()[_0x19acb0(247)]() : false;
    let cmdName = textt ? "," + textt.split(" ")[0] : "";
    let ReplaceCmd = cmdName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    let regex = new RegExp("\\b" + ReplaceCmd + "\\b");
    if (!cmdName || cmdName === "") {
      return await citel[_0x19acb0(260)]("*Please provide disabled cmd name to enable it*\n*Ex " + prefix + "enable tag(if 'tag' cmd disabled)/all(reset disables)*");
    } else if (cmdName[_0x19acb0(262)](_0x19acb0(268))) {
      await sck[_0x19acb0(265)]({
        id: citel.chat
      }, {
        disablecmds: _0x19acb0(267)
      });
      return await citel[_0x19acb0(260)](_0x19acb0(251));
    } else if (regex[_0x19acb0(263)](checkinfo.disablecmds) && checkinfo.disablecmds[_0x19acb0(245)](cmdName)) {
      let newCmds = checkinfo.disablecmds[_0x19acb0(274)](regex, "");
      await sck[_0x19acb0(265)]({
        id: citel[_0x19acb0(275)]
      }, {
        disablecmds: newCmds
      });
      return await citel[_0x19acb0(260)]("*_\"" + cmdName[_0x19acb0(274)](",", "") + _0x19acb0(253));
    } else {
      return await citel[_0x19acb0(260)](_0x19acb0(276) + cmdName[_0x19acb0(274)](",", "") + "* name_");
    }
  });
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "jid",
    infocmd: "get jid of replied user in a group.",
    kingclass: "owner",
    kingpath: __filename
  }, async (Void, citel, text, {
    isCreator
  }) => {
    if (citel.quoted) {
      return citel.reply(citel.quoted.sender);
  
      /*  if(!isCreator) return citel.reply(tlang().owner)
           const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch((e) => {}) : "";
      const participants = citel.isGroup ? await groupMetadata.participants : "";
       let textt = `_Here is jid address of all users of_\n *- ${groupMetadata.subject}*\n\n`
       for (let mem of participants) {
               textt += `📍 ${mem.id}\n`;
           }*/
    } else {
      return citel.reply(citel.chat);
    }
  });
  
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "tagall",
    infocmd: "Tags all user in group.",
    kingclass: "group",
    kingpath: __filename
  }, async (bot, man, text, {
    isCreator
  }) => {
    if (!man.isGroup) {
      return man.reply(tlang().group);
    }
    const groupMetadata = man.isGroup ? await bot.groupMetadata(man.chat).catch(e => {}) : "";
    const participants = man.isGroup ? await groupMetadata.participants : "";
    const groupAdmins = await getAdmin(bot, man);
    const isAdmins = man.isGroup ? groupAdmins.includes(man.sender) : false;
    if (!isAdmins) {
      return man.reply(tlang().admin);
    }
    let sigma = `
  ┏━━⟪⟪ ${mztit} ⟫━⦿
  ┃✗ *_•𝙼𝙴𝚂𝚂𝙰𝙶𝙴•_* ${text ? text : ""}
  ┃✗ *_•${fancytext("TAGGED BY", 35)}•_* ${name.ownername}
  `;
    for (let mem of participants) {
      sigma += `┃✗ @${mem.id.split("@")[0]}\n┗━━━━━━━━━━⦿
  `;
    }
    let Maher = {
      text: sigma,
      footer: tlang().footer,
      headerType: 4,
      contextInfo: {
        externalAdReply: {
          title: `${Gname}`,
          body: "Easy to Use",
          thumbnail: log0,
          mediaType: 4,
          mediaUrl: "",
          sourceUrl: `${waUrl}`
        }
      }
    };
    bot.sendMessage(man.chat, Maher, {
      mentions: participants.map(a => a.id)
    }, {
      quoted: man
    });
  });
  
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "kik",
    infocmd: "Kick all numbers from a certain country",
    kingclass: "group",
    kingpath: __filename
  }, async (Void, citel, text, {
    isCreator
  }) => {
    if (!citel.isGroup) {
      return citel.reply(tlang().group);
    }
    if (!text) {
      return await citel.reply(`*_Provide Me Country Code. Ex: ${prefix}kik 91_*`);
    }
    const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch(e => {}) : "";
    const groupAdmins = await getAdmin(Void, citel);
    let isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isAdmins) {
      if (isCreator) {
        citel.reply(tlang().admin);
      } else {
        return citel.reply(tlang().admin);
      }
    }
    let find = text.split(" ")[0].replace("+", "");
    let error = "*_These Users Not Kicked_*\n\t";
    let users = await groupMetadata.participants;
    let hmanykik = 0;
    let iskikstart = false;
    const botNumber = await Void.decodeJid(Void.user.id);
    for (let i of users) {
      let isuseradmin = groupAdmins.includes(i.id) || false;
      if (i.id.startsWith(find) && !isuseradmin) {
        if (!iskikstart) {
          iskikstart = true;
          await citel.reply(`*_Kicking ALL the Users With ${find} Country Code_*`);
        }
        try {
          await Void.groupParticipantsUpdate(citel.chat, [i.id], "remove");
          hmanykik++;
        } catch (e) {
          console.log("Error While Kicking : ", e);
        }
      }
    }
    if (hmanykik == 0) {
      return await citel.reply(`*_There Is No User Found With ${find} Country Code_*`);
    } else {
      return await citel.reply(`*_Hurray, ${hmanykik.toString()} Users With ${find} Country Code kicked SuccessFully_*`);
    }
  });
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "num",
    infocmd: "get all numbers from a certain country",
    kingclass: "group",
    kingpath: __filename
  }, async (Void, citel, text, {
    isCreator
  }) => {
    if (!citel.isGroup) {
      return citel.reply(tlang().group);
    }
    if (!text) {
      return await citel.reply(`*_Provide Me Country Code. Ex: ${prefix}num 92_*`);
    }
    const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch(e => {}) : "";
    const groupAdmins = await getAdmin(Void, citel);
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isAdmins && !isCreator) {
      return citel.reply(tlang().admin);
    }
    let find = text.split(" ")[0];
    let users = await groupMetadata.participants;
    let nums = `*_List Of Users With ${find} Country Code_*\n`;
    let num = "";
    for (let i of users) {
      if (i.id.startsWith(find)) {
        num += i.id.split("@")[0] + "\n";
      }
    }
    if (!num) {
      nums = `*_There Is No Users With ${find} Country Code_*`;
    } else {
      nums += num;
    }
    await citel.reply(nums);
  });
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "request",
    infocmd: "Sends requst to main Bot developer.",
    kingclass: "developer",
    use: "add new feature"
  }, async (bot, person, text, {
    isCreator
  }) => {
    if (!isCreator) {
      return person.reply(tlang().admin);
    }
    if (!text) {
      return person.reply(`*_Example : ${prefix}request hello dev please add a downloader feature_*`);
    }
    textt = `*sɪɢᴍᴀ ᴹᴰ* *_𝚁𝙴𝚀𝚄𝙴𝚂𝚃 𝙲𝙴𝙽𝚃𝙴𝚁_*`;
    teks1 = `\n\n*_𝚄𝚂𝙴𝚁_* : @${person.sender.split("@")[0]}\n*_𝚁𝙴𝚀𝚄𝙴𝚂𝚃_* : ${text}`;
    teks2 = `\n\n*_Hi Dear_*, ${person.pushName}.*_Your Request Has Been Forwarded To My Developer_*.`;
    for (let i of owner) {
      bot.sendMessage(i + "@s.whatsapp.net", {
        text: textt + teks1,
        mentions: [person.sender]
      }, {
        quoted: person
      });
    }
    bot.sendMessage(person.chat, {
      text: textt + teks2,
      mentions: [person.sender]
    }, {
      quoted: person
    });
  });
  //---------------------------------------------------------------------------
  
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "rwarn",
    infocmd: "Deletes 1 previously given warns of quoted user.",
    kingclass: "group",
    kingpath: __filename,
    use: ""
  }, async (bot, man, text, {
    isCreator
  }) => {
    if (!isCreator) {
      return man.reply(tlang().owner);
    }
    if (!man.quoted) {
      return man.reply("*_Reply/Mention a User_*");
    }
    await warndb.deleteOne({
      id: man.quoted.sender.split("@")[0] + "warn"
    });
    return man.reply("*_Removed 1 Previous warn of this User_*");
  });
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "poll",
    infocmd: "Makes poll in group.",
    kingclass: "group",
    kingpath: __filename,
    use: `question;option1,option2,option3.....`
  }, async (Void, citel, text, {
    isCreator
  }) => {
    if (!isCreator) {
      return citel.reply(tlang().owner);
    }
    let [poll, opt] = text.split(";");
    if (text.split(";") < 2) {
      return await citel.reply(`${prefix}poll question;option1,option2,option3.....`);
    }
    let options = [];
    for (let i of opt.split(",")) {
      options.push(i);
    }
    await Void.sendMessage(citel.chat, {
      poll: {
        name: poll,
        values: options
      }
    });
  });
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "profile",
    infocmd: "Shows profile of user.",
    kingclass: "group",
    kingpath: __filename
  }, async (Void, citel, text) => {
    var bio = await Void.fetchStatus(citel.sender);
    var bioo = bio.status;
    let meh = citel.sender;
    const userq = await Levels.fetch(citel.sender, "RandomXP");
    const lvpoints = userq.level;
    var role = "GOD";
    if (lvpoints <= 2) {
      var role = "Citizen";
    } else if (lvpoints <= 4) {
      var role = "Baby Wizard";
    } else if (lvpoints <= 6) {
      var role = "Wizard";
    } else if (lvpoints <= 8) {
      var role = "Wizard Lord";
    } else if (lvpoints <= 10) {
      var role = "Baby Mage";
    } else if (lvpoints <= 12) {
      var role = "Mage";
    } else if (lvpoints <= 14) {
      var role = "Master of Mage";
    } else if (lvpoints <= 16) {
      var role = "Child of Nobel";
    } else if (lvpoints <= 18) {
      var role = "Nobel";
    } else if (lvpoints <= 20) {
      var role = "Speed of Elite";
    } else if (lvpoints <= 22) {
      var role = "Elite";
    } else if (lvpoints <= 24) {
      var role = "Ace I";
    } else if (lvpoints <= 26) {
      var role = "Ace II";
    } else if (lvpoints <= 28) {
      var role = "Ace Master";
    } else if (lvpoints <= 30) {
      var role = "Ace Dominator";
    } else if (lvpoints <= 32) {
      var role = "Ace Elite";
    } else if (lvpoints <= 34) {
      var role = "Ace Supreme";
    } else if (lvpoints <= 36) {
      var role = "Supreme I";
    } else if (lvpoints <= 38) {
      var role = "Supreme Ii";
    } else if (lvpoints <= 40) {
      var role = "Supreme Master";
    } else if (lvpoints <= 42) {
      var role = "Legend III";
    } else if (lvpoints <= 44) {
      var role = "Legend II";
    } else if (lvpoints <= 46) {
      var role = "Legend";
    } else if (lvpoints <= 55) {
      var role = "•𝐊𝐈𝐍𝐆•";
    }
    let ttms = `${userq.xp}` / 8;
    const timenow = moment(moment()).format("HH:mm:ss");
    moment.tz.setDefault("Asia/Karachi").locale("id");
    let pfp;
    try {
      pfp = await Void.profilePictureUrl(citel.sender, "image");
    } catch (e) {
      pfp = await botpic();
    }
    const profile = `
  ┏━━⟪⟪ ${mztit} ⟫━⦿	    
  ┃✗ *_•ᴘʀᴏғɪʟᴇ ɪɴғᴏʀᴍᴀᴛɪᴏɴ•_* 
  ┃✗ *_•ᴜsᴇʀɴᴀᴍᴇ•_* ${citel.pushName}
  ┃✗ *_•ʙɪᴏ•_* ${bioo}
  ┃✗ *_•ʀᴏʟᴇ•_* ${role}
  ┃✗ *_•ʟᴇᴠᴇʟ•_* ${userq.level}
  ┃✗ *_•ᴛᴏᴛᴀʟ ᴍᴇssᴀɢᴇ•_* ${ttms}
  ┃✗ *_•ᴘᴏᴡᴇʀᴇᴅ ʙʏ• sɪɢᴍᴀ ᴹᴰ_*
  ┗━━━━━━━━━━⦿
  `;
    let buttonMessage = {
      image: {
        url: pfp
      },
      caption: profile,
      footer: tlang().footer,
      headerType: 4
    };
    Void.sendMessage(citel.chat, buttonMessage, {
      quoted: citel
    });
  });
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "rank",
    infocmd: "Sends rank card of user.",
    kingclass: "group",
    kingpath: __filename
  }, async (Void, citel, text) => {
    const userq = await Levels.fetch(citel.sender, "RandomXP");
    const lvpoints = userq.level;
    var role = "GOD✨";
    if (lvpoints <= 2) {
      var role = "Citizen";
    } else if (lvpoints <= 4) {
      var role = "Baby Wizard";
    } else if (lvpoints <= 6) {
      var role = "Wizard";
    } else if (lvpoints <= 8) {
      var role = "Wizard Lord";
    } else if (lvpoints <= 10) {
      var role = "Baby Mage";
    } else if (lvpoints <= 12) {
      var role = "Mage";
    } else if (lvpoints <= 14) {
      var role = "Master of Mage";
    } else if (lvpoints <= 16) {
      var role = "Child of Nobel";
    } else if (lvpoints <= 18) {
      var role = "Nobel";
    } else if (lvpoints <= 20) {
      var role = "Speed of Elite";
    } else if (lvpoints <= 22) {
      var role = "Elite";
    } else if (lvpoints <= 24) {
      var role = "Ace I";
    } else if (lvpoints <= 26) {
      var role = "Ace II";
    } else if (lvpoints <= 28) {
      var role = "Ace Master";
    } else if (lvpoints <= 30) {
      var role = "Ace Dominator";
    } else if (lvpoints <= 32) {
      var role = "Ace Elite";
    } else if (lvpoints <= 34) {
      var role = "Ace Supreme";
    } else if (lvpoints <= 36) {
      var role = "Supreme I";
    } else if (lvpoints <= 38) {
      var role = "Supreme Ii";
    } else if (lvpoints <= 40) {
      var role = "Supreme Master";
    } else if (lvpoints <= 42) {
      var role = "Legend III";
    } else if (lvpoints <= 44) {
      var role = "Legend II";
    } else if (lvpoints <= 46) {
      var role = "Legend";
    } else if (lvpoints <= 55) {
      var role = "•𝐊𝐈𝐍𝐆•";
    }
    let disc = citel.sender.substring(3, 7);
    let textr = "";
    textr += `┏━━⟪⟪ ${mztit} ⟫━⦿\n┃✗ •ʜɪ•  ${citel.pushName}\n`;
    let ttms = `${userq.xp}` / 8;
    textr += `┃✗ •ʀᴏʟᴇ• ${role} \n┃✗ •ᴇxᴘ• ${userq.xp} / ${Levels.xpFor(userq.level + 1)}\n┃✗ •ʟᴇᴠᴇʟ• ${userq.level}\n┃✗ •ᴛᴏᴛᴀʟ ᴍᴇssᴀɢᴇs• ${ttms}\n┗━━━━━━━━━━⦿`;
    try {
      ppuser = await Void.profilePictureUrl(citel.sender, "image");
    } catch {
      ppuser = THUMB_IMAGE;
    }
    Void.sendMessage(citel.chat, {
      image: await getBuffer(ppuser),
      caption: textr
    }, {
      quoted: citel
    });
  });
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "leaderboard",
    shortcut: ["deck"],
    infocmd: "To check leaderboard",
    kingclass: "general",
    kingpath: __filename
  }, async (Void, citel) => {
    const fetchlb = await Levels.fetchLeaderboard("RandomXP", 5);
    let leadtext = ` 
  *✯─────────────✯*
   *✯──● LeaderBoard ●──✯*
  *✯─────────────✯*
  \n\n`;
    for (let i = 0; i < fetchlb.length; i++) {
      const lvpoints = fetchlb[i].level;
      var role = "GOD";
      if (lvpoints <= 2) {
        var role = "Citizen";
      } else if (lvpoints <= 4) {
        var role = "Baby Wizard";
      } else if (lvpoints <= 6) {
        var role = "Wizard";
      } else if (lvpoints <= 8) {
        var role = "Wizard Lord";
      } else if (lvpoints <= 10) {
        var role = "Baby Mage";
      } else if (lvpoints <= 12) {
        var role = "Mage";
      } else if (lvpoints <= 14) {
        var role = "Master of Mage";
      } else if (lvpoints <= 16) {
        var role = "Child of Nobel";
      } else if (lvpoints <= 18) {
        var role = "Nobel";
      } else if (lvpoints <= 20) {
        var role = "Speed of Elite";
      } else if (lvpoints <= 22) {
        var role = "Elite";
      } else if (lvpoints <= 24) {
        var role = "Ace I";
      } else if (lvpoints <= 26) {
        var role = "Ace II";
      } else if (lvpoints <= 28) {
        var role = "Ace Master";
      } else if (lvpoints <= 30) {
        var role = "Ace Dominator";
      } else if (lvpoints <= 32) {
        var role = "Ace Elite";
      } else if (lvpoints <= 34) {
        var role = "Ace Supreme";
      } else if (lvpoints <= 36) {
        var role = "Supreme I";
      } else if (lvpoints <= 38) {
        var role = "Supreme Ii";
      } else if (lvpoints <= 40) {
        var role = "Supreme Master";
      } else if (lvpoints <= 42) {
        var role = "Legend III";
      } else if (lvpoints <= 44) {
        var role = "Legend II";
      } else if (lvpoints <= 46) {
        var role = "Legend";
      } else if (lvpoints <= 55) {
        var role = "•𝐊𝐈𝐍𝐆•";
      }
      let data = await sck1.findOne({
        id: fetchlb[i].userID
      });
      let namew = fetchlb[i].userID;
      let ttms = fetchlb[i].xp / 8;
      leadtext += `*${i + 1}*\n*•𝙽𝙰𝙼𝙴•* ${data.name}\n*•𝙻𝙴𝚅𝙴𝙻•* ${fetchlb[i].level}\n*•𝙿𝙾𝙸𝙽𝚃𝚂•* ${fetchlb[i].xp}\n*•𝚁𝙾𝙻𝙴•* ${role}\n*•𝙼𝙴𝚂𝚂𝙰𝙶𝙴𝚂•* ${ttms}\n✯────────────────────✯\n`;
    }
    return citel.reply(leadtext);
  });
  
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "promote",
    infocmd: "Provides admin role to replied/quoted user",
    kingclass: "group",
    kingpath: __filename,
    use: "quote|reply|number"
  }, async (Void, citel, text, {
    isCreator
  }) => {
    if (!citel.isGroup) {
      return citel.reply(tlang().group);
    }
    const groupAdmins = await getAdmin(Void, citel);
    const botNumber = await Void.decodeJid(Void.user.id);
    const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isBotAdmins) {
      return citel.reply(tlang().admin);
    }
    if (!isAdmins) {
      return citel.reply(tlang().admin);
    }
    try {
      let users = citel.quoted ? citel.quoted.sender : citel.mentionedJid[0] ? citel.mentionedJid[0] : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
      if (!users) {
        return await citel.send("*_Reply/Mention to an User_*");
      }
      await Void.groupParticipantsUpdate(citel.chat, [users], "promote");
      await citel.send(`*_User promoted Succesfully!_*`);
      return await Void.sendMessage(citel.chat, {
        react: {
          text: "",
          key: citel.key
        }
      });
    } catch (e) {
      console.log("Promote error : ", e);
      await Void.sendMessage(citel.chat, {
        react: {
          text: "",
          key: citel.key
        }
      });
      return await citel.reply(tlang().botAdmin);
    }
  });
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "demote",
    infocmd: "Demotes replied/quoted user from group",
    kingclass: "group",
    kingpath: __filename,
    use: "<quote|reply|number>"
  }, async (Void, citel, text, {
    isCreator
  }) => {
    if (!citel.isGroup) {
      return citel.reply(tlang().group);
    }
    const groupAdmins = await getAdmin(Void, citel);
    const botNumber = await Void.decodeJid(Void.user.id);
    const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isBotAdmins) {
      return await citel.reply(tlang().admin);
    }
    if (!isAdmins) {
      return citel.reply(tlang().admin);
    }
    try {
      let users = citel.quoted ? citel.quoted.sender : citel.mentionedJid[0] ? citel.mentionedJid[0] : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
      if (!users) {
        return await citel.send("*_Reply/Mention to an User_*");
      }
      await Void.groupParticipantsUpdate(citel.chat, [users], "demote");
      await citel.send(`*_User demoted Succesfully!_*`);
      return await Void.sendMessage(citel.chat, {
        react: {
          text: "",
          key: citel.key
        }
      });
    } catch (e) {
      console.log("Demote error : ", e);
      await Void.sendMessage(citel.chat, {
        react: {
          text: "",
          key: citel.key
        }
      });
      return await citel.reply(tlang().botAdmin);
    }
  });
  
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "kick",
    infocmd: "Kicks replied/quoted user from group.",
    kingclass: "group",
    kingpath: __filename,
    use: "<quote|reply|number>"
  }, async (Void, citel, text, {
    isCreator
  }) => {
    //if (!isCreator) return citel.reply("*_Only My Owner Can Use This Command_*")
    if (!citel.isGroup) {
      return citel.reply(tlang().group);
    }
    const groupAdmins = await getAdmin(Void, citel);
    const botNumber = await Void.decodeJid(Void.user.id);
    const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isBotAdmins) {
      return await citel.reply(tlang().admin);
    }
    if (!isAdmins) {
      return citel.reply(tlang().admin);
    }
    try {
      let users = citel.quoted ? citel.quoted.sender : citel.mentionedJid[0] ? citel.mentionedJid[0] : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
      if (!users) {
        return citel.send("*_Please, Reply/Mention to an User_*");
      }
      await Void.groupParticipantsUpdate(citel.chat, [users], "remove");
      await citel.send(`*_Hurray, One IDiot Kicked Successfully_*`);
      return await Void.sendMessage(citel.chat, {
        react: {
          text: "",
          key: citel.key
        }
      });
    } catch (e) {
      console.log("Kick error : ", e);
      await Void.sendMessage(citel.chat, {
        react: {
          text: "",
          key: citel.key
        }
      });
      return await citel.reply(tlang().botAdmin);
    }
  });
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "groupmode",
    shortcut: ["gmode"],
    infocmd: "mute and unmute group.",
    kingclass: "group",
    kingpath: __filename
  }, async (bot, man, text) => {
    //if (!man.isGroup) return man.reply(tlang().group);
    const groupAdmins = await getAdmin(bot, man);
    const botNumber = await bot.decodeJid(bot.user.id);
    const isBotAdmins = man.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = man.isGroup ? groupAdmins.includes(man.sender) : false;
    //if (!man.isGroup) return man.reply(tlang().group);
    if (!isBotAdmins) {
      return man.reply(tlang().botAdmin);
    }
    if (!isAdmins) {
      return man.reply(tlang().admin);
    }
    let Group = await sck.findOne({
      id: man.chat
    });
    if (text.split(" ")[0] == "close" || text.split(" ")[0] == "mute") {
      await bot.groupSettingUpdate(man.chat, "announcement").then(res => man.reply(`*_ɢʀᴏᴜᴘ ᴄʜᴀᴛ ᴍᴜᴛᴇᴅ_*`)).catch(err => man.reply("Error :" + err));
    } else if (text.split(" ")[0] === "open" || text.split(" ")[0] === "unmute") {
      await bot.groupSettingUpdate(man.chat, "not_announcement").then(res => man.reply(`*_ɢʀᴏᴜᴘ ᴄʜᴀᴛ ᴜɴ-ᴍᴜᴛᴇᴅ_*`)).catch(err => man.reply("Error : " + err));
    } else if (text == "Detail" || text == "Info" || text == "info" || text == "details") {
      const pp = (await bot.profilePictureUrl(man.chat, "image").catch(_ => null)) || "";
      const groupAdmins = participants.filter(p => p.admin);
      const listAdmin = groupAdmins.map((v, i) => `  ${i + 1}. wa.me/${v.id.split("@")[0]}`).join("\n");
      const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === "superadmin")?.id || man.chat.split`-`[0] + "@s.whatsapp.net";
      let ginfos = `
         *「 INFO GROUP 」*
   *▢ ID :*
      • ${groupMetadata.id}
   *▢ NAME :* 
      • ${groupMetadata.subject}
   *▢ Members :*
      • ${participants.length}
   *▢ Group Owner :*
      • wa.me/${owner.split("@")[0]}
   *▢ Admins :*
   ${listAdmin}
   *▢ Description :*
      • ${groupMetadata.infocmd?.toString() || "unknown"}
   *▢ 🪢 Extra Group Configuration :*";
     • Group Nsfw :    ${Group.nsfw == "true" ? "✅" : "❎"} 
     • Antilink        :    ${Group.antilink == "true" ? "✅" : "❎"}
     • Economy      :    ${Group.economy == "true" ? "✅" : "❎"}
     • Events         :     ${Group.events == "true" ? "✅" : "❎"}
   `.trim();
      if (Group.events == "true") {
        ginfos += "\n*▢ Wellcome bot :* \n  • " + Group.welcome;
        ginfos += "\n\n*▢ Goodbye bot :* \n  • " + Group.goodbye;
      }
      return await bot.sendMessage(man.chat, {
        image: {
          url: pp
        },
        caption: ginfos
      }, {
        quoted: man
      });
    } else {
      return await man.reply(`*_Give me Text from Below Options_*
   1: ${prefix}gmode mute
   2: ${prefix}gmode unmute
  
   `);
      //let buttons = [{ buttonId: `${prefix}group open`, buttonText: { displayText: "📍Unmute",},type: 1,},{buttonId: `${prefix}group close`,buttonText: {displayText: "📍Mute",},type: 1, },];     await bot.sendButtonText(man.chat,buttons,`Group Mode`, bot.user.name, man);
    }
  });
  //---------------------------------------------------------------------------
  
  //---------------------------------------------------------------------------
  
  Module_Exports({
    kingcmd: "fullgpp",
    shortcut: ["fgp"],
    infocmd: "Sets full  pic in Group..",
    kingclass: "group"
  }, async (bot, man, memo) => {
    const _0x4abbbf = _0x5bb4;
    (function (_0x13d7c6, _0x8bc947) {
      const _0x259bc2 = _0x5bb4;
      const _0x10b260 = _0x13d7c6();
      while (true) {
        try {
          const _0x306f21 = parseInt(_0x259bc2(402)) / 1 + parseInt(_0x259bc2(391)) / 2 + -parseInt(_0x259bc2(396)) / 3 + -parseInt(_0x259bc2(401)) / 4 + -parseInt(_0x259bc2(387)) / 5 + -parseInt(_0x259bc2(405)) / 6 + parseInt(_0x259bc2(409)) / 7 * (parseInt(_0x259bc2(388)) / 8);
          if (_0x306f21 === _0x8bc947) {
            break;
          } else {
            _0x10b260.push(_0x10b260.shift());
          }
        } catch (_0x1c1a0a) {
          _0x10b260.push(_0x10b260.shift());
        }
      }
    })(_0x323c, 963502);
    if (!man[_0x4abbbf(393)]) {
      return await man[_0x4abbbf(408)](tlang()[_0x4abbbf(380)]);
    }
    function _0x5bb4(_0xeb8310, _0x3268ff) {
      const _0x323c8d = _0x323c();
      _0x5bb4 = function (_0x5bb44f, _0x56b4b1) {
        _0x5bb44f = _0x5bb44f - 378;
        let _0x38ee75 = _0x323c8d[_0x5bb44f];
        return _0x38ee75;
      };
      return _0x5bb4(_0xeb8310, _0x3268ff);
    }
    if (!man.quoted) {
      return await man[_0x4abbbf(408)]("*_Reply Any Image To Set full Group Icon_*");
    }
    if (man[_0x4abbbf(384)][_0x4abbbf(378)] != "imageMessage") {
      return await man[_0x4abbbf(408)](_0x4abbbf(390));
    }
    function _0x323c() {
      const _0x18ae47 = ["download", "535270ulHSfx", "7494288pOesFz", "set", "*_Reply To An Image, Idiot_*", "3767082nhMrcD", "scaleToFit", "isGroup", "read", "*_I'm Not Admin In This Chat,_*\n*_Provide Admin Role To Update Group Icon_*", "2512509jkkzwU", "chat", "getWidth", "*_Full Group Icon Updated Successfully_*", "crop", "5700504cCGKrX", "843473GBbmqF", "normalize", "decodeJid", "1983690GnNTjc", "includes", "MIME_JPEG", "reply", "7wUnEFg", "mtype", "sender", "group", "```Error While Updating full Group Profile :``` ", "getBufferAsync", "getHeight", "quoted", "picture"];
      _0x323c = function () {
        return _0x18ae47;
      };
      return _0x323c();
    }
    const groupAdmins = await getAdmin(bot, man);
    const botNumber = await bot[_0x4abbbf(404)](bot.user.id);
    const isBotAdmins = groupAdmins.includes(botNumber) || false;
    const isAdmins = groupAdmins[_0x4abbbf(406)](man[_0x4abbbf(379)]) || false;
    if (!isBotAdmins) {
      return await man[_0x4abbbf(408)](_0x4abbbf(395));
    }
    if (!isAdmins) {
      return await man[_0x4abbbf(408)](tlang().admin);
    }
    const media = await man[_0x4abbbf(384)][_0x4abbbf(386)]();
    try {
      const {
        query
      } = bot;
      const {
        preview
      } = await generateProfilePicture(media);
      await query({
        tag: "iq",
        attrs: {
          to: man[_0x4abbbf(397)],
          type: _0x4abbbf(389),
          xmlns: "w:profile:picture"
        },
        content: [{
          tag: _0x4abbbf(385),
          attrs: {
            type: "image"
          },
          content: preview
        }]
      });
      return await man[_0x4abbbf(408)](_0x4abbbf(399));
    } catch (_0x632d01) {
      return await man[_0x4abbbf(408)](_0x4abbbf(381) + _0x632d01);
    }
    async function generateProfilePicture(_0x3da926) {
      const _0x527026 = _0x4abbbf;
      const _0x462396 = await Jimp[_0x527026(394)](_0x3da926);
      const _0x1c1f73 = _0x462396[_0x527026(398)]();
      const _0x176031 = _0x462396[_0x527026(383)]();
      const _0x887df7 = _0x462396[_0x527026(400)](0, 0, _0x1c1f73, _0x176031);
      return {
        img: await _0x887df7[_0x527026(392)](324, 720)[_0x527026(382)](Jimp[_0x527026(407)]),
        preview: await _0x887df7[_0x527026(403)]()[_0x527026(382)](Jimp[_0x527026(407)])
      };
    }
  });
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "grouppic",
    shortcut: ["gpp"],
    infocmd: "Sets a profile pic in Group..",
    kingclass: "group"
  }, async (bot, man, write) => {
    if (!man.isGroup) {
      return man.reply(tlang().group);
    }
    const groupAdmins = await getAdmin(bot, man);
    const botNumber = await bot.decodeJid(bot.user.id);
    const isBotAdmins = man.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = man.isGroup ? groupAdmins.includes(man.sender) : false;
    let mime = man.quoted.mtype;
    if (!man.isGroup) {
      man.reply(tlang().group);
    }
    if (!isAdmins) {
      man.reply(tlang().admin);
    }
    if (!isBotAdmins) {
      man.reply(tlang().botadmin);
    }
    if (!man.quoted) {
      return man.reply(`Send/Reply Image With Caption`);
    }
    if (!/image/.test(mime)) {
      return man.reply(`Send/Reply Image With Caption`);
    }
    if (/webp/.test(mime)) {
      return man.reply(`Send/Reply Image With Caption`);
    }
    let media = await bot.downloadAndSaveMediaMessage(man.quoted);
    await bot.updateProfilePicture(man.chat, {
      url: media
    }).catch(err => fs.unlinkSync(media));
    man.reply("*_Group icon updated Successfully_*");
  });
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "tag",
    shortcut: ["hidetag", "htag"],
    infocmd: "Tags everyperson of group without mentioning their numbers",
    kingclass: "group",
    kingpath: __filename,
    use: "<text>"
  }, async (Void, citel, text, {
    isCreator
  }) => {
    if (!text && !citel.quoted) {
      return citel.reply(`*Ex : ${prefix}tag Hi Everyone*`);
    }
    if (!text) {
      text = citel.quoted.text;
    }
    if (!citel.isGroup) {
      return citel.reply(tlang().group);
    }
    const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch(e => {}) : "";
    const participants = citel.isGroup ? await groupMetadata.participants : "";
    const groupAdmins = await getAdmin(Void, citel);
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isAdmins && !isCreator) {
      return citel.reply(tlang().admin);
    }
    Void.sendMessage(citel.chat, {
      text: text,
      mentions: participants.map(a => a.id)
    }, {
      quoted: citel
    });
  });
  //---------------------------------------------------------------------------
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "tagadmin",
    infocmd: "Tags only Admin numbers",
    kingclass: "group",
    kingpath: __filename,
    use: ""
  }, async (bot, man, text) => {
    if (!man.isGroup) {
      return man.reply(tlang().group);
    }
    const groupMetadata = man.isGroup ? await bot.groupMetadata(man.chat).catch(e => {}) : "";
    const participants = man.isGroup ? await groupMetadata.participants : "";
    const groupAdmins = participants.filter(p => p.admin);
    const isAdmins = man.isGroup ? groupAdmins.includes(man.sender) : false;
    const listAdmin = groupAdmins.map((v, i) => `┃✗ @${v.id.split("@")[0]}`).join("\n");
    let tag = `┏━━⟪⟪ ${mztit} ⟫━⦿\n┃✗ *_•𝚃𝙰𝙶𝙶𝙴𝙳 𝙱𝚈•_* @${man.sender.split("@")[0]}
      ${text ? "≡ bot :" + text : ""}
  ┏━━ *_•𝙰𝙳𝙼𝙸𝙽𝚂•_* ━⦿
  ${listAdmin}
  ┗━━━━━━━━━━⦿\n*_⤹★ᴘᴏᴡᴇʀᴇᴅ ʙʏ★⤸ sɪɢᴍᴀ ᴹᴰ_*
      `.trim();
    return await bot.sendMessage(man.chat, {
      text: tag,
      mentions: [man.sender, ...groupAdmins.map(v => v.id)]
    });
  });
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "add",
    infocmd: "Add that person in group",
    kingclass: "group",
    kingpath: __filename,
    use: "number"
  }, async (Void, citel, text, {
    isCreator
  }) => {
    //if (!isCreator) return citel.reply("```Only My Owner Can Use This Command```")
    if (!citel.isGroup) {
      return citel.reply(tlang().group);
    }
    const groupAdmins = await getAdmin(Void, citel);
    const botNumber = await Void.decodeJid(Void.user.id);
    const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
    if (!isBotAdmins) {
      return await citel.reply(tlang().admin);
    }
    if (!isAdmins) {
      return citel.reply(tlang().admin);
    }
    let users = citel.quoted ? citel.quoted.sender : citel.mentionedJid[0] ? citel.mentionedJid[0] : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    if (!users) {
      return await citel.reply("*_Please Provide An User._*");
    }
    if (citel.sender == botNumber) {
      await Void.groupParticipantsUpdate(citel.chat, [users], "add");
      await citel.send(`*_User Added Succesfully!_*`);
      return await Void.sendMessage(citel.chat, {
        react: {
          text: "",
          key: citel.key
        }
      });
    } else {
      await Void.sendMessage(citel.chat, {
        react: {
          text: "",
          key: citel.key
        }
      });
      await Void.sendMessage(users, {
        text: `Here's The Group Invite Link\n User @${citel.sender.split("@")[0]} *_Wants To Add You in bellow Group_*\n https://chat.whatsapp.com/${await Void.groupInviteCode(citel.chat)} _ \n*_Join If YOu Feel Free_*?`,
        mentions: [citel.sender]
      }, {
        quoted: citel
      });
      return await citel.reply(`_Unable To Add User, Invite Sent_`);
    }
  });
  //--------------------------------------------------------------------------- 
  Module_Exports({
    kingcmd: "getjids",
    shortcut: ["gjid", "gjids"],
    infocmd: "Sends chat id of every groups.",
    kingclass: "group",
    kingpath: __filename
  }, async (Void, citel, text, {
    isCreator
  }) => {
    if (!isCreator) {
      return citel.reply(tlang().owner);
    }
    n = await Void.groupFetchAllParticipating();
    const c = Object.entries(n).slice(0).map(t => t[1]);
    let a = "";
    let onlyJids = false;
    let onlyNames = false;
    if (text.includes("jid")) {
      onlyJids = true;
    } else if (text.includes("name")) {
      onlyNames = true;
    }
    await citel.reply(`*_Fetching ${onlyJids ? "Only jids" : onlyNames ? "Only Names" : "Names and Jids"} from ${c.length} Groups_*`);
    await sleep(2000);
    for (var i of c.map(t => t.id)) {
      a += onlyJids ? "" : `\n*•𝙶𝚁𝙾𝚄𝙿•* ${n[i].subject} `;
      a += onlyNames ? "" : `\n*•𝙹𝙸𝙳•* ${i}\n`;
    }
    return await citel.send(a);
  
    /*
    
    
    let getGroups = await Void.groupFetchAllParticipating();
    let anu = Object.values(getGroups).map(v => v.id);
    let res = `All groups jid\n\n`;
    await citel.reply(`Fetching jid from ${anu.length} Groups`);
    
    await Promise.all(anu.map(async i => {
     let metadata = await Void.groupMetadata(i);
     await sleep(2000); 
    res += ` ------------- ${i} -------------\n`;
    res += `*Name :* ${metadata.subject}\n`;
    
    }));
    return await citel.reply(res);
    //return await Void.sendMessage(citel.chat,{text:res},{quoted:citel})
    
    //----------------------------------------------------------------------
    
    
    
    let getGroups = await Void.groupFetchAllParticipating();
               let groups = Object.entries(getGroups)
                   .slice(0)
                   .map((entry) => entry[1]);
               let anu = groups.map((v) => v.id);
               let jackhuh = `All groups jid\n\n`
               citel.reply(`Fetching jid from ${anu.length} Groups`)
               for (let i of anu) {
                   let metadata = await Void.groupMetadata(i);
                   await sleep(500)
                   jackhuh += `*Subject:-* ${metadata.subject}\n`
                  // jackhuh += `*Member :* ${metadata.participants.length}\n`
                   jackhuh += `*Jid:-* ${i}\n\n`
    
               }
               citel.reply(jackhuh)
        */
  });
  //---------------------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "del",
    shortcut: ["delete", "dlt"],
    infocmd: "Deletes message of any user",
    kingclass: "group",
    kingpath: __filename,
    use: "<quote/reply message.>"
  }, async (Void, citel, text, {
    isCreator
  }) => {
    if (!citel.isGroup && isCreator) {
      const key = {
        remoteJid: citel.chat,
        fromMe: false,
        id: citel.quoted.id,
        participant: citel.quoted.sender
      };
      return await Void.sendMessage(citel.chat, {
        delete: key
      });
    }
    if (!citel.quoted.isBot) {
      if (!citel.isGroup) {
        return citel.reply(tlang().group);
      }
      const groupAdmins = await getAdmin(Void, citel);
      const botNumber = await Void.decodeJid(Void.user.id);
      const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
      const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
      if (!isAdmins) {
        return citel.reply(tlang().admin);
      }
      if (!isBotAdmins) {
        return citel.reply(tlang().admin);
      }
      if (!citel.quoted) {
        return citel.reply(`*_Please reply to any message._*`);
      }
      let {
        chat,
        fromMe,
        id
      } = citel.quoted;
      const key = {
        remoteJid: citel.chat,
        fromMe: false,
        id: citel.quoted.id,
        participant: citel.quoted.sender
      };
      await Void.sendMessage(citel.chat, {
        delete: key
      });
    }
  });
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "checkwarn",
    infocmd: "Check warns",
    shortcut: ["cwarn"],
    kingclass: "group",
    kingpath: __filename,
    use: "<quoted/reply user.>"
  }, async (bot, man, text, {
    isCreator
  }) => {
    if (!isCreator) {
      return man.reply(tlang().owner);
    }
    if (!man.isGroup) {
      return man.reply(tlang().group);
    }
    if (!man.quoted) {
      return man.reply("*_Reply/Mention a User_*");
    }
    teskd = `*_All Warnings._*\n\n`;
    let h = await warndb.find({
      id: man.quoted.sender.split("@")[0] + "warn"
    });
    console.log(h);
    teskd += `*_There are Total ${h.length}  warnings_*\n`;
    for (let i = 0; i < h.length; i++) {
      teskd += `*${i + 1}*\n┏━━⟪⟪ ${mztit} ⟫━⦿\n┃✗ *_•𝙸𝙽 𝙶𝚁𝙾𝚄𝙿•_* ${h[i].group}\n`;
      teskd += `┃✗ *_•𝚃𝙸𝙼𝙴•_* ${h[i].date}\n`;
      teskd += `┃✗ *_•𝚆𝙰𝚁𝙽𝙴𝙳 𝙱𝚈•_* ${h[i].warnedby}\n`;
      teskd += `┃✗ *_•𝚁𝙴𝙰𝚂𝙾𝙽•_* ${h[i].reason}\n┗━━━━━━━━━━⦿\n`;
    }
    man.reply(teskd);
  });
  //---------------------------------------------------------------------------
  Module_Exports({
    kingcmd: "broadcast",
    infocmd: "Bot makes a broadcast in all groups",
    kingclass: "group",
    kingpath: __filename,
    use: "<text for broadcast.>"
  }, async (Void, citel, text, {
    isCreator
  }) => {
    if (!isCreator) {
      return citel.reply(tlang().owner);
    }
    if (!text) {
      return await citel.reply(`*_Uhh Dear, Provide text to broadcast in all groups_*`);
    }
    let getGroups = await Void.groupFetchAllParticipating();
    let groups = Object.entries(getGroups).slice(0).map(entry => entry[1]);
    let anu = groups.map(v => v.id);
    citel.send(`*_Send Broadcast To ${anu.length} Group Chat, Finish Time ${anu.length * 1.5} second_*`);
    for (let i of anu) {
      await sleep(1500);
      let txt = `*--❗${tlang().title} Broadcast❗--*\n\n *🍀Author:* ${citel.pushName}\n\n${text}`;
      let buttonMessaged = {
        image: log0,
        caption: txt,
        footer: citel.pushName,
        headerType: 1,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: false,
          externalAdReply: {
            title: "Broadcast by " + citel.pushName,
            body: tlang().title,
            thumbnail: log0,
            mediaUrl: "",
            mediaType: 2,
            sourceUrl: gurl,
            showAdAttribution: true
          }
        }
      };
      await Void.sendMessage(i, buttonMessaged, {
        quoted: citel
      });
    }
    return await citel.reply(`*Successful Sending Broadcast To ${anu.length} Group(s)*`);
  });
  
  //---------------------------------------------------------------------------
  Module_Exports({
    on: "text"
  }, async (Void, citel) => {
    const randomXp = 8;
    let usrname = citel.pushName;
    const hasLeveledUp = await Levels.appendXp(citel.sender, "RandomXP", randomXp);
    if (hasLeveledUp) {
      const sck1 = await Levels.fetch(citel.sender, "RandomXP");
      const lvpoints = sck1.level;
      var role = "GOD";
      if (lvpoints <= 2) {
        var role = "Citizen";
      } else if (lvpoints <= 4) {
        var role = "Baby Wizard";
      } else if (lvpoints <= 6) {
        var role = "Wizard";
      } else if (lvpoints <= 8) {
        var role = "Wizard Lord";
      } else if (lvpoints <= 10) {
        var role = "Baby Mage";
      } else if (lvpoints <= 12) {
        var role = "Mage";
      } else if (lvpoints <= 14) {
        var role = "Master of Mage";
      } else if (lvpoints <= 16) {
        var role = "Child of Nobel";
      } else if (lvpoints <= 18) {
        var role = "Nobel";
      } else if (lvpoints <= 20) {
        var role = "Speed of Elite";
      } else if (lvpoints <= 22) {
        var role = "Elite";
      } else if (lvpoints <= 24) {
        var role = "Ace I";
      } else if (lvpoints <= 26) {
        var role = "Ace II";
      } else if (lvpoints <= 28) {
        var role = "Ace Master";
      } else if (lvpoints <= 30) {
        var role = "Ace Dominator";
      } else if (lvpoints <= 32) {
        var role = "Ace Elite";
      } else if (lvpoints <= 34) {
        var role = "Ace Supreme";
      } else if (lvpoints <= 36) {
        var role = "Supreme I";
      } else if (lvpoints <= 38) {
        var role = "Supreme Ii";
      } else if (lvpoints <= 40) {
        var role = "Supreme Master";
      } else if (lvpoints <= 42) {
        var role = "Legend III";
      } else if (lvpoints <= 44) {
        var role = "Legend II";
      } else if (lvpoints <= 46) {
        var role = "Legend";
      } else if (lvpoints <= 55) {
        var role = "•𝐊𝐈𝐍𝐆•";
      } else {
        var role = "Kiddo";
      }
      if (name.levelupmessage !== "false") {
        await Void.sendMessage(citel.chat, {
          image: {
            url: await botpic()
          },
          caption: `
  ┏━━⟪⟪ ${mztit} ⟫━⦿
  ┃✗ *•ᴡᴏᴡ,sᴏᴍᴇᴏɴᴇ ᴊᴜsᴛ•*
  ┃✗ *•ʟᴇᴠᴇʟᴇᴅ ᴜᴘ ʜᴜʜ•*
  ┃✗ *•ɴᴀᴍᴇ•* ${citel.pushName}
  ┃✗ *•ʟᴇᴠᴇʟ•* ${sck1.level}🍭
  ┃✗ *•ᴇxᴘ•* ${sck1.xp} / ${Levels.xpFor(sck1.level + 1)}
  ┃✗ *•ʀᴏʟᴇ•* *${role}*
  ┗━━━━━━━━━━⦿\n ${scap}`
        }, {
          quoted: citel
        });
      }
    }
  });